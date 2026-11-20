import { NextRequest, NextResponse } from 'next/server';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import {
  normaliseDomain,
  checkAiAccess,
  inferBusiness,
  buildAnswerQuery,
  displayPrompt,
  checkAiAnswer,
  decideTeaser,
  type AnswerResult,
} from '@/lib/geo-teaser';

// Alert channel reuses the same SES setup as /api/lead. Best-effort: an alert that
// fails must never break the visitor's request.
const ALERT_TO = process.env.LEAD_TO_EMAIL || 'steve.macfarlane@syfre.ai';
const ALERT_FROM = process.env.LEAD_FROM_EMAIL || 'steve.macfarlane@syfre.ai';
const ses = new SESv2Client({
  region: process.env.SES_REGION || 'ap-southeast-2',
  credentials:
    process.env.SES_AWS_ACCESS_KEY_ID && process.env.SES_AWS_SECRET_ACCESS_KEY
      ? { accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY }
      : undefined,
});

function log(level: string, event: string, data: Record<string, unknown> = {}) {
  console.log(JSON.stringify({ level, event, at: new Date().toISOString(), ...data }));
}

// Every tool use is a lead signal — the domain alone identifies the business,
// so one email fires per check, deliberately with no cooldown and no self-IP
// filtering. Best-effort: a failed send must never break the visitor's request.
const SIGNAL_TO = [...new Set([ALERT_TO, 'steve.shaw@syfre.ai'])];
async function leadSignal(subject: string, body: string) {
  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: ALERT_FROM,
        Destination: { ToAddresses: SIGNAL_TO },
        Content: { Simple: { Subject: { Data: `[GEO lead signal] ${subject}` }, Body: { Text: { Data: body } } } },
      })
    );
  } catch (e) {
    log('error', 'signal_email.send_failed', { err: String(e) });
  }
}

// Throttle alerts so a flapping provider doesn't send hundreds of emails.
const lastAlert = new Map<string, number>();
async function alert(kind: string, subject: string, body: string) {
  const now = Date.now();
  if (now - (lastAlert.get(kind) || 0) < 15 * 60 * 1000) return; // 15-min cooldown per kind
  lastAlert.set(kind, now);
  log('alert', 'alert.fired', { kind, subject });
  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: ALERT_FROM,
        Destination: { ToAddresses: [ALERT_TO] },
        Content: { Simple: { Subject: { Data: `[GEO teaser] ${subject}` }, Body: { Text: { Data: body } } } },
      })
    );
  } catch (e) {
    log('error', 'alert.send_failed', { kind, err: String(e) });
  }
}

// Naive per-instance rate limit (prod: move to KV/Redis). Abuse = demand signal,
// so we alert rather than silently block.
const hits = new Map<string, { n: number; t: number }>();
function rateTrip(ip: string): boolean {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || now - cur.t > 60 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  cur.n += 1;
  if (cur.n === 21) alert('abuse', `Rate limit tripped for ${ip}`, `${ip} exceeded 20 teaser requests/hour. Keen prospect or abuse — now throttled.`);
  return cur.n > 20;
}

const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})+$/i;
function isPublicDomain(d: string): boolean {
  if (!DOMAIN_RE.test(d)) return false;
  if (/^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(d)) return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(d)) return false; // no raw IPs
  return true;
}

export async function POST(request: NextRequest) {
  const t0 = Date.now();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const ua = request.headers.get('user-agent') || '';

  if (/bot|crawl|curl|python|headless|spider/i.test(ua)) {
    log('warn', 'teaser.bot_blocked', { ip });
    return NextResponse.json({ teaser: null });
  }
  if (rateTrip(ip)) {
    log('warn', 'teaser.rate_limited', { ip });
    return NextResponse.json({ teaser: null });
  }

  let domain = '';
  let attribution = '';
  try {
    const body = await request.json();
    domain = normaliseDomain(String(body?.domain || ''));
    // Client-captured UTM/referrer summary — free text, so cap + strip newlines.
    attribution = String(body?.attribution || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 300);
  } catch {
    return NextResponse.json({ teaser: null }, { status: 400 });
  }
  const attributionLine = attribution ? `\nTraffic source: ${attribution}` : '';
  if (!isPublicDomain(domain)) {
    log('info', 'teaser.bad_domain', { ip, domain });
    // Still a human hand-raiser — what they typed (often their email) may
    // identify them even though the check itself can't run.
    await leadSignal(
      `Tool used with invalid input: ${domain}`,
      `Someone used the /geo AI visibility checker but typed something that isn't a domain (often their email address).\n\nThey typed: ${domain}\nIP: ${ip}${attributionLine}\n\nNo email was captured via the form — if the input identifies them, it's worth chasing.`
    );
    return NextResponse.json({ teaser: null });
  }

  log('info', 'teaser.start', { ip, domain });

  // Signal A — real, no key.
  let access;
  try {
    access = await checkAiAccess(domain);
    log('info', 'signal.access.ok', { domain, status: access.status, blocked: access.blocked });
  } catch (e) {
    access = { status: 'unknown' as const, blocked: [] };
    log('error', 'signal.access.fail', { domain, err: String(e) });
    await alert('provider_access', 'Signal A (access) failing', `checkAiAccess errored for ${domain}: ${String(e)}`);
  }

  // Signal B — only if a crawler isn't already blocked (short-circuit) and a key exists.
  // Infer the business's category + city from its homepage so the buyer question is
  // sharp ("best personal injury lawyers in Brisbane"), not generic.
  let answer: AnswerResult = null;
  let promptText = '';
  if (access.status !== 'blocked') {
    try {
      const info = await inferBusiness(domain);
      const query = info.category.length >= 4 ? buildAnswerQuery(info) : '';
      promptText = query ? displayPrompt(info) : '';
      log('info', 'signal.infer.ok', { domain, brand: info.brandName, category: info.category, location: info.location, query });
      if (query) {
        answer = await checkAiAnswer(query, info.brandName, domain.split('.')[0]);
      }
    } catch (e) {
      log('error', 'signal.answer.fail', { domain, err: String(e) });
      await alert('provider_answer', 'Signal B (answer engine) failing', `checkAiAnswer errored for ${domain}: ${String(e)}`);
    }
  }

  const teaser = decideTeaser(access, answer, promptText);
  log('info', 'teaser.done', { domain, ms: Date.now() - t0, branch: teaser.branch });
  await leadSignal(
    `Site checked: ${domain}`,
    [
      'Someone just ran the /geo AI visibility check.',
      '',
      `Website: ${domain}`,
      `Result shown: ${teaser.branch}`,
      ...(promptText ? [`Prompt used: ${promptText}`] : []),
      `IP: ${ip}`,
      ...(attribution ? [`Traffic source: ${attribution}`] : []),
      '',
      'No email captured yet — if no Snapshot request follows, the domain itself is the lead.',
    ].join('\n')
  );
  return NextResponse.json({ teaser });
}
