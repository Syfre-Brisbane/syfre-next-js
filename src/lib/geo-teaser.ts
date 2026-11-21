// GEO teaser logic. Signal A (AI-crawler access) is self-hosted and needs no keys.
// Signal B (answer engine — "does AI name you") activates when PERPLEXITY_API_KEY
// is set; until then it is skipped and the teaser degrades gracefully.

export type TeaserBranch =
  | 'punch_blocked'
  | 'punch_not_named'
  | 'there_but_everywhere'
  | 'dig_deeper';

export type Teaser = { branch: TeaserBranch; headline: string; body: string; prompt?: string };

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

const STATE_NAMES: Record<string, string> = {
  qld: 'Queensland', wa: 'Western Australia', nsw: 'New South Wales', vic: 'Victoria',
  sa: 'South Australia', nt: 'Northern Territory', act: 'Australian Capital Territory', tas: 'Tasmania',
};
function expandState(s: string): string {
  return STATE_NAMES[s.toLowerCase().replace(/[^a-z]/g, '')] || s;
}

// Title segments that are navigation labels or CMS defaults, not a business
// category — "Home - The Yoga Nook" must not become "best home in Sydney".
const JUNK_SEGMENTS = new Set([
  'home', 'home page', 'homepage', 'welcome', 'index', 'main', 'main page', 'front page',
  'about', 'about us', 'contact', 'contact us', 'official site', 'official website',
  'official home page', 'website', 'site', 'my site', 'my website', 'my blog', 'blog',
  'new page', 'landing page', 'coming soon', 'under construction', 'untitled',
  'just another wordpress site',
]);
function isJunkSegment(s: string): boolean {
  return JUNK_SEGMENTS.has(s.toLowerCase().replace(/\s+/g, ' ').trim());
}

// JSON-LD @type values too generic to be a buyer-query category; anything more
// specific ("Dentist", "YogaStudio") de-camels into a usable one.
const GENERIC_LD_TYPES = new Set([
  'organization', 'localbusiness', 'corporation', 'professionalservice', 'onlinebusiness',
  'onlinestore', 'store', 'business', 'brand', 'service', 'thing', 'website', 'webpage', 'place',
]);

// Meta descriptions open with marketing framing ("Begin Iyengar Yoga at The
// Yoga Nook in Dulwich Hill"). Reduce the first clause to its category phrase:
// cut the brand mention and its tail, then drop opener/connective verbs.
const OPENERS =
  /^(welcome to|begin|discover|experience|explore|enjoy|find|get|book|join|try|shop|browse|choose|visit|we offer|we provide|we are|we're|offering|providing|offers?|provides?|is|are|your|the)\s+/i;
function categoryFromDescription(desc: string, brandName: string): string {
  let clause = desc.split(/[.!|–—]/)[0].trim();
  const bi = clause.toLowerCase().indexOf(brandName.toLowerCase());
  if (bi === 0) {
    clause = clause.slice(brandName.length).trim();
  } else if (bi > 0) {
    clause = clause.slice(0, bi).replace(/\b(at|from|with|by|of|to)\s*$/i, '').trim();
  } else {
    const ai = clause.toLowerCase().indexOf(' at ');
    if (ai > 0) clause = clause.slice(0, ai).trim();
  }
  for (let prev = ''; prev !== clause; ) {
    prev = clause;
    clause = clause.replace(OPENERS, '').trim();
  }
  return clause;
}

// Append a location to the buyer query ONLY when the category doesn't already
// localise it (titles often end in a city). Keeps "best lawyers brisbane" clean
// and only adds " in Western Australia" when there's no place in the category.
function locationClause(category: string, location: string): string {
  const cat = category.toLowerCase();
  const hasCity = AU_CITIES.some((c) => cat.includes(c.toLowerCase()));
  if (!location || location === 'Australia') return hasCity ? '' : ' in Australia';
  const lead = location.toLowerCase().split(',')[0].trim();
  return hasCity || cat.includes(lead) ? '' : ` in ${location}`;
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
  // author), plus its address, plus a specific business @type as a category
  // fallback ("YogaStudio" → "yoga studio").
  let gotOrgName = false;
  let ldCategory = '';
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const json = JSON.parse(m[1]);
      const nodes = Array.isArray(json) ? json : json['@graph'] ? json['@graph'] : [json];
      for (const n of nodes) {
        const rawTypes = ([] as unknown[]).concat(n?.['@type'] ?? []).map((t) => String(t));
        const types = rawTypes.map((t) => t.toLowerCase());
        const isOrg = types.some((t) =>
          /organization|localbusiness|corporation|professionalservice|legalservice|store|business/.test(t)
        );
        if (!gotOrgName && isOrg && typeof n?.name === 'string' && n.name.length < 60) {
          brandName = decode(n.name);
          gotOrgName = true;
        }
        const addr = n?.address;
        if (!ldCategory && (isOrg || addr)) {
          const specific = rawTypes.find(
            (t) => /^[A-Za-z]{3,40}$/.test(t) && !GENERIC_LD_TYPES.has(t.toLowerCase())
          );
          if (specific) ldCategory = specific.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
        }
        if (addr && !location) {
          const locality = decode(addr.addressLocality || '');
          const region = expandState(decode(addr.addressRegion || ''));
          if (locality && AU_CITIES.some((c) => c.toLowerCase() === locality.toLowerCase())) {
            location = region ? `${locality}, ${region}` : locality;
          } else if (region) {
            location = region; // suburb-level locality → use the state (natural for a buyer query)
          } else if (locality) {
            location = locality;
          }
        }
      }
    } catch {
      /* ignore malformed JSON-LD */
    }
  }

  // og:site_name is the brand when JSON-LD lacks an Organization node.
  if (!gotOrgName) {
    const og = decode(
      html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i)?.[1] || ''
    );
    if (og && og.length < 60) brandName = og;
  }

  // Location fallback: scan title/description for a known AU city.
  if (!location) {
    const hay = `${title} ${metaDesc}`;
    location = AU_CITIES.find((c) => new RegExp(`\\b${c}\\b`, 'i').test(hay)) || 'Australia';
  }

  // Category: take the title segment that is NOT the brand (titles are usually
  // "Brand | Category Location" or "Category Location | Brand") and not a
  // navigation label like "Home".
  const brandToken = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const segs = title
    .split(/[|–—\-·•]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const nonBrand = segs.filter(
    (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').indexOf(brandToken) === -1 && !isJunkSegment(s)
  );
  // Pronoun-led segments are taglines ("Your Local One Call Trade Specialists"),
  // not categories — they read garbled in the prompt we show the visitor, so
  // they rank behind every other source and are only a last resort.
  const isTagline = (s: string) => /^(your|you|we|our)\b/i.test(s.trim());
  const categoryish = nonBrand.filter((s) => !isTagline(s));
  category = (categoryish.sort((a, b) => b.length - a.length)[0] || '').trim();
  // Fallbacks: a specific JSON-LD business type, the meta description, then a
  // title tagline only if nothing better exists.
  if (category.length < 4 && ldCategory) category = ldCategory;
  if (category.length < 4) category = categoryFromDescription(metaDesc, brandName);
  if (category.length < 4) {
    category = (nonBrand.filter(isTagline).sort((a, b) => b.length - a.length)[0] || '').trim();
  }
  // The query/prompt prepend "top"/"best" themselves — drop superlative and
  // possessive prefixes ("Best…", "Your Local…").
  category = category.replace(/^(best|top|leading|premier|trusted|your|our)\s+/i, '').trim();
  if (isJunkSegment(category)) category = '';
  // Strip a trailing location so we don't double it in the query.
  if (category && location && location !== 'Australia') {
    category = category.replace(new RegExp(`\\s*(in|near)?\\s*${location}\\s*$`, 'i'), '').trim();
  }
  if (category.length > 80) category = category.slice(0, 80).trim();

  return { brandName, category, location };
}

export function buildAnswerQuery(info: BusinessInfo): string {
  return `Who are the top ${info.category}${locationClause(info.category, info.location)}? Reply with ONLY the business names, one per line — no numbering, no descriptions, no locations, no extra text.`;
}

// Human-readable version of the buyer question we ran (no formatting instructions).
export function displayPrompt(info: BusinessInfo): string {
  return `best ${info.category.toLowerCase()}${locationClause(info.category, info.location)}`;
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

  // The model returns one business name per line; clean + filter to real firms.
  const STATE_RE =
    /(western australia|queensland|new south wales|victoria|tasmania|south australia|northern territory|australian capital territory)|,\s*(WA|QLD|NSW|VIC|SA|NT|ACT)\b/i;
  const competitors: string[] = [];
  for (const raw of text.split('\n')) {
    const name = raw
      .trim()
      .replace(/^[-*•\d.)\s]+/, '') // leading bullets / numbering
      .replace(/\*+/g, '') // stray markdown bold
      .replace(/\s*[–—:].*$/, '') // trailing description after a dash/colon
      .trim();
    if (name.length < 2 || name.length > 48) continue;
    if (isBrand(name)) continue;
    if (STATE_RE.test(name)) continue;
    if (AU_CITIES.some((c) => name.toLowerCase() === c.toLowerCase())) continue;
    if (!competitors.includes(name)) competitors.push(name);
    if (competitors.length >= 3) break;
  }
  return { named, competitors };
}

export function decideTeaser(access: AccessResult, answer: AnswerResult, prompt?: string): Teaser {
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
      prompt,
    };
  }
  return {
    branch: 'punch_not_named',
    headline: 'AI named your competitors, not you',
    body: answer.competitors.length
      ? `It named ${answer.competitors.slice(0, 2).join(' and ')} — not you.`
      : "It didn't name you. Your Snapshot shows who it did.",
    prompt,
  };
}
