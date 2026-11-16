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

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

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
  const blocks = robots.split(/user-agent:/i).slice(1);
  for (const b of blocks) {
    const agent = b.split('\n')[0].trim();
    if (agent === '*' || agent === token) {
      if (/\n\s*disallow:\s*\/\s*(\n|$)/i.test('\n' + b)) return true;
    }
  }
  return false;
}

// ── Homepage inference — turn a bare domain into "best <category> in <city>" ──
export type BusinessInfo = { brandName: string; category: string; location: string };

const AU_CITIES = [
  'Brisbane', 'Sydney', 'Melbourne', 'Perth', 'Adelaide', 'Canberra', 'Hobart', 'Darwin',
  'Gold Coast', 'Sunshine Coast', 'Newcastle', 'Wollongong', 'Geelong', 'Townsville', 'Cairns',
];

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&').replace(/&#38;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function inferBusiness(domain: string): Promise<BusinessInfo> {
  const label = domain.split('.')[0];
  let brandName = label.charAt(0).toUpperCase() + label.slice(1);
  let category = '';
  let location = '';

  let html = '';
  try {
    const res = await fetchWithTimeout(`https://${domain}/`, BROWSER_UA, 6000);
    html = await res.text();
  } catch {
    return { brandName, category: '', location: 'Australia' };
  }
  html = html.slice(0, 200_000); // cap

  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ''));
  const metaDesc = decode(
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] || ''
  );

  // JSON-LD: prefer an Organization/LocalBusiness name (not a WebPage title or
  // author), plus its address.
  let gotOrgName = false;
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const json = JSON.parse(m[1]);
      const nodes = Array.isArray(json) ? json : json['@graph'] ? json['@graph'] : [json];
      for (const n of nodes) {
        const types = ([] as unknown[]).concat(n?.['@type'] ?? []).map((t) => String(t).toLowerCase());
        const isOrg = types.some((t) =>
          /organization|localbusiness|corporation|professionalservice|legalservice|store|business/.test(t)
        );
        if (!gotOrgName && isOrg && typeof n?.name === 'string' && n.name.length < 60) {
          brandName = decode(n.name);
          gotOrgName = true;
        }
        const addr = n?.address;
        if (addr && !location) {
          const loc = [addr.addressLocality, addr.addressRegion].filter(Boolean).join(', ');
          if (loc) location = decode(loc);
        }
      }
    } catch {
      /* ignore malformed JSON-LD */
    }
  }

  // Location fallback: scan title/description for a known AU city.
  if (!location) {
    const hay = `${title} ${metaDesc}`;
    location = AU_CITIES.find((c) => new RegExp(`\\b${c}\\b`, 'i').test(hay)) || 'Australia';
  }

  // Category: take the title segment that is NOT the brand (titles are usually
  // "Brand | Category Location" or "Category Location | Brand").
  const brandToken = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const segs = title
    .split(/[|–—\-·•]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const nonBrand = segs.filter((s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').indexOf(brandToken) === -1);
  category = (nonBrand.sort((a, b) => b.length - a.length)[0] || '').trim();
  // Fallback to the meta description's first clause.
  if (category.length < 4) category = metaDesc.split(/[.|–—]/)[0].trim();
  // Strip a trailing location so we don't double it in the query.
  if (category && location && location !== 'Australia') {
    category = category.replace(new RegExp(`\\s*(in|near)?\\s*${location}\\s*$`, 'i'), '').trim();
  }
  if (category.length > 80) category = category.slice(0, 80).trim();

  return { brandName, category, location };
}

export function buildAnswerQuery(info: BusinessInfo): string {
  const loc = info.location && info.location !== 'Australia' ? info.location : 'Australia';
  const firstLocWord = loc.split(/[\s,]/)[0];
  const where = info.category.toLowerCase().includes(firstLocWord.toLowerCase()) ? '' : ` in ${loc}`;
  return `Who are the best ${info.category}${where}? List the top providers by name.`;
}

// SIGNAL B — "does AI name you vs competitors". Only runs with a Perplexity key.
export type AnswerResult = { named: boolean; competitors: string[] } | null;

export async function checkAiAnswer(query: string, brandName: string, domainLabel: string): Promise<AnswerResult> {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) return null; // not configured yet → caller degrades to "dig deeper"
  // Perplexity intermittently 403s requests from datacenter IPs; retry transient
  // failures a couple of times before giving up (then the caller degrades + alerts).
  const RETRYABLE = new Set([403, 408, 429, 500, 502, 503, 504]);
  let res: Response | undefined;
  for (let attempt = 0; attempt < 3; attempt++) {
    res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'sonar', messages: [{ role: 'user', content: query }] }),
      signal: AbortSignal.timeout(9000),
    });
    if (res.ok) break;
    if (attempt === 2 || !RETRYABLE.has(res.status)) throw new Error(`perplexity ${res.status}`);
    await new Promise((r) => setTimeout(r, 350 * (attempt + 1)));
  }
  if (!res || !res.ok) throw new Error('perplexity no response');
  const data = await res.json();
  const text: string =
    data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.delta?.content ?? '';

  // Detect by normalised match so "Fallon Solutions" matches "fallonsolutions"
  // regardless of spacing/punctuation.
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const nText = norm(text);
  const nLabel = norm(domainLabel);
  const nBrand = norm(brandName);
  const isBrand = (s: string) => {
    const n = norm(s);
    return (nLabel.length >= 4 && n.includes(nLabel)) || (nBrand.length >= 5 && n.includes(nBrand));
  };
  const named = (nLabel.length >= 4 && nText.includes(nLabel)) || (nBrand.length >= 5 && nText.includes(nBrand));

  // Light competitor extraction: bolded names, then numbered-list leads.
  const competitors: string[] = [];
  for (const m of text.matchAll(/\*\*([^*]{2,40})\*\*/g)) {
    const name = m[1].trim().replace(/[:–—-].*$/, '').trim();
    if (name && !isBrand(name) && !competitors.includes(name)) competitors.push(name);
    if (competitors.length >= 3) break;
  }
  if (!competitors.length) {
    for (const m of text.matchAll(/^\s*\d+\.\s*([A-Z][^\n–—:*]{2,40})/gm)) {
      const name = m[1].trim().replace(/[:–—-].*$/, '').trim();
      if (name && !isBrand(name) && !competitors.includes(name)) competitors.push(name);
      if (competitors.length >= 3) break;
    }
  }
  return { named, competitors };
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
    body: 'We asked AI who to hire — it named other firms, not you. Your Snapshot shows exactly who.',
  };
}
