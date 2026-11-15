// GEO teaser logic. Signal A (AI-crawler access) is self-hosted and needs no keys.
// Signal B (answer engine — "does AI name you") activates when PERPLEXITY_API_KEY
// is set; until then it is skipped and the teaser degrades gracefully.

export type TeaserBranch =
  | 'punch_blocked'
  | 'punch_not_named'
  | 'there_but_everywhere'
  | 'dig_deeper';

export type Teaser = { branch: TeaserBranch; headline: string; body: string };

export type AccessResult = {
  status: 'accessible' | 'blocked' | 'unknown';
  blocked: string[]; // engine names whose crawler is blocked
};

const AI_BOTS: { engine: string; ua: string }[] = [
  { engine: 'ChatGPT', ua: 'Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)' },
  { engine: 'Perplexity', ua: 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)' },
  { engine: 'Google', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
];

export function normaliseDomain(raw: string): string {
  return raw
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/.*$/, '')
    .toLowerCase();
}

async function fetchWithTimeout(url: string, ua: string, ms = 6000) {
  return fetch(url, { headers: { 'user-agent': ua }, redirect: 'follow', signal: AbortSignal.timeout(ms) });
}

// SIGNAL A — real, no key required. Hits the site + robots.txt as each AI crawler.
export async function checkAiAccess(domain: string): Promise<AccessResult> {
  const url = `https://${domain}/`;
  let robots = '';
  try {
    const r = await fetchWithTimeout(`https://${domain}/robots.txt`, AI_BOTS[0].ua, 5000);
    if (r.ok) robots = (await r.text()).toLowerCase();
  } catch {
    /* robots missing is not a block */
  }

  const checks = await Promise.all(
    AI_BOTS.map(async (b) => {
      // robots.txt: a blanket Disallow: / under this bot or * counts as blocked
      if (robotsDisallowsRoot(robots, b.ua)) return { engine: b.engine, blocked: true };
      try {
        const res = await fetchWithTimeout(url, b.ua, 6000);
        return { engine: b.engine, blocked: res.status === 403 || res.status === 401 };
      } catch {
        return { engine: b.engine, blocked: false, inconclusive: true };
      }
    })
  );

  const blocked = checks.filter((c) => c.blocked).map((c) => c.engine);
  const allInconclusive = checks.every((c) => 'inconclusive' in c && c.inconclusive);
  return {
    status: allInconclusive ? 'unknown' : blocked.length ? 'blocked' : 'accessible',
    blocked,
  };
}

function robotsDisallowsRoot(robots: string, ua: string): boolean {
  if (!robots) return false;
  const token = /gptbot/i.test(ua) ? 'gptbot' : /perplexity/i.test(ua) ? 'perplexitybot' : 'googlebot';
  // crude but safe: only trip on an explicit "user-agent: <token|*>" block with "disallow: /"
  const blocks = robots.split(/user-agent:/i).slice(1);
  for (const b of blocks) {
    const agent = b.split('\n')[0].trim();
    if (agent === '*' || agent === token) {
      if (/\n\s*disallow:\s*\/\s*(\n|$)/i.test('\n' + b)) return true;
    }
  }
  return false;
}

// SIGNAL B — "does AI name you vs competitors". Only runs with a Perplexity key.
export type AnswerResult = { named: boolean; competitors: string[] } | null;

export async function checkAiAnswer(domain: string, query: string): Promise<AnswerResult> {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) return null; // not configured yet → caller degrades to "dig deeper"
  try {
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'sonar',
        messages: [{ role: 'user', content: query }],
      }),
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) throw new Error(`perplexity ${res.status}`);
    const data = await res.json();
    const text: string = data?.choices?.[0]?.message?.content ?? '';
    const brand = domain.split('.')[0];
    const named = new RegExp(`\\b${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text);
    return { named, competitors: [] };
  } catch (e) {
    throw e; // caller logs + alerts + degrades
  }
}

export function decideTeaser(access: AccessResult, answer: AnswerResult): Teaser {
  if (access.status === 'blocked') {
    return {
      branch: 'punch_blocked',
      headline: "AI can't even read your site",
      body: `${access.blocked.join(', ')} ${access.blocked.length > 1 ? 'are' : 'is'} blocked from your site. You can't be recommended if AI can't read you — and that's fixable.`,
    };
  }
  if (!answer) {
    return {
      branch: 'dig_deeper',
      headline: 'Your visibility needs a proper look',
      body: "We can't tell from the surface whether AI recommends you. Your free Snapshot checks every engine — enter your email and we'll dig in.",
    };
  }
  if (answer.named) {
    return {
      branch: 'there_but_everywhere',
      headline: 'AI named you here — but everywhere?',
      body: "That's one question, one engine, one moment. Your Snapshot checks ChatGPT, Gemini, Perplexity and Google AI for the questions that win you work.",
    };
  }
  return {
    branch: 'punch_not_named',
    headline: 'AI named your competitors, not you',
    body: answer.competitors.length
      ? `We asked AI who to hire — it named ${answer.competitors.slice(0, 2).join(' and ')}. Not you.`
      : "We asked AI who to hire — it didn't name you. See who it named instead.",
  };
}
