'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// ─── Paste the YouTube video ID here once the explainer is live ───────────────
// e.g. for https://youtu.be/AbC123xyz  →  const YOUTUBE_ID = 'AbC123xyz';
const YOUTUBE_ID = 'BwnNV9lGtVs';
// ──────────────────────────────────────────────────────────────────────────────

type Faq = { q: string; a: string };

const platforms = [
  {
    key: 'chatgpt',
    label: 'ChatGPT',
    named: false,
    instead: 'Names three competitors. Your business isn’t mentioned.',
    note: 'AI can’t confirm who you are — your name, address and phone appear in different forms across the web.',
  },
  {
    key: 'gemini',
    label: 'Gemini',
    named: true,
    instead: 'Lists you as one of four options, with no recommendation.',
    note: 'Listed, not endorsed — too few independent reviews for AI to vouch for you.',
  },
  {
    key: 'perplexity',
    label: 'Perplexity',
    named: false,
    instead: 'Names two competitors and cites their recent articles.',
    note: 'They publish content that answers buyer questions. Your site describes services instead.',
  },
  {
    key: 'overviews',
    label: 'Google AI Overviews',
    named: true,
    instead: 'Includes you in the summary — below two competitors.',
    note: 'Present but outranked. The page answering “cost” and “availability” belongs to a competitor.',
  },
] as const;

const gaps = [
  {
    title: 'AI can’t confirm who you are',
    detail:
      'Your business name, address and phone number appear in different forms across the web, so AI can’t form a confident picture of you.',
  },
  {
    title: 'There’s no evidence to quote',
    detail:
      'AI recommends businesses it can verify. Too few recent reviews and third-party mentions, and it won’t trust the recommendation.',
  },
  {
    title: 'Your content doesn’t answer the question',
    detail:
      'Buyers ask AI questions. Competitors publish direct answers; your site lists services, so AI quotes them instead.',
  },
];

const steps = [
  {
    title: 'Enter your website',
    detail: 'That’s all we need to focus the Snapshot on your business.',
  },
  {
    title: 'We check how AI sees you',
    detail: 'We run your business across ChatGPT, Gemini, Perplexity and Google AI Overviews.',
  },
  {
    title: 'Get your report',
    detail: 'A clear read on where you stand and what to fix first, straight to your inbox.',
  },
];

const BTN =
  'inline-flex items-center justify-center rounded-md bg-green-400 px-6 py-3.5 text-base font-semibold text-black transition-colors hover:bg-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

// Turn a pasted website into a readable label for the lead notification, so a
// name-free form still produces an identifiable lead (e.g. "yourbusiness.com.au").
function cleanDomain(url: string) {
  const d = url
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/.*$/, '');
  return d || url.trim();
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/* The one bold, on-subject moment: a live mock of four AI assistants answering a
   buyer's question — and whether the business is named. Auto-advances once, pauses
   on interaction, and holds still for reduced-motion users. */
function AnswerPreview() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const p = platforms[i];

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % platforms.length), 4500);
    return () => window.clearInterval(t);
  }, [paused, reduced]);

  return (
    <div className="w-full rounded-2xl border border-white/12 bg-gradient-to-b from-zinc-900/80 to-black p-5 shadow-2xl shadow-black/60 sm:p-7">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] text-zinc-400">Illustrative — not a live check</span>
        <span className="text-[13px] tabular-nums text-zinc-400">
          {i + 1}/{platforms.length}
        </span>
      </div>

      <p className="mt-4 text-2xl leading-snug tracking-tight text-zinc-100 sm:text-[28px]">
        “Who should I hire for <span className="text-zinc-300">[your service]</span> in Brisbane?”
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {platforms.map((pl, idx) => (
          <button
            key={pl.key}
            type="button"
            aria-pressed={idx === i}
            onClick={() => {
              setI(idx);
              setPaused(true);
            }}
            className={`rounded-md border px-3 py-2.5 text-left text-[13px] transition-colors ${
              idx === i
                ? 'border-green-400/70 bg-green-400/10 text-green-300'
                : 'border-white/12 text-zinc-300 hover:border-white/25 hover:text-zinc-200'
            }`}
          >
            {pl.label}
          </button>
        ))}
      </div>

      <div key={p.key} className="mt-6 min-h-[132px]">
        <span
          className={`inline-flex items-center rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-wider ${
            p.named ? 'bg-green-400/15 text-green-300' : 'bg-amber-400/15 text-amber-300'
          }`}
        >
          {p.named ? 'Named' : 'Not named'}
        </span>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-200">{p.instead}</p>
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">{p.note}</p>
      </div>
    </div>
  );
}

function VideoBlock() {
  if (YOUTUBE_ID) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-zinc-900">
        <div className="relative aspect-video">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0`}
            title="Syfre — how buyers find you in AI search"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex aspect-video flex-col items-start justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-zinc-900/50 p-8">
      <p className="max-w-md text-2xl leading-snug tracking-tight text-zinc-200 sm:text-3xl">
        From searching. To being <span className="text-green-400">chosen.</span>
      </p>
      <p className="text-sm text-zinc-400">Explainer video — add your YouTube link to go live.</p>
    </div>
  );
}

const TEASER_FALLBACK = {
  headline: 'Let’s look properly',
  body: 'We’ll check how AI answers for your business across ChatGPT, Gemini, Perplexity and Google AI — your free Snapshot has the detail.',
};

// ── Attribution + analytics ──────────────────────────────────────────────────
// First-touch UTM/referrer for the session, so lead emails and HubSpot can say
// which ad sent the visitor. GA4 events fire via the gtag loaded in layout.tsx.
const ATTRIB_KEY = 'syfre_attribution';
function captureAttribution(): string {
  try {
    const existing = sessionStorage.getItem(ATTRIB_KEY);
    if (existing) return existing;
    const params = new URLSearchParams(window.location.search);
    const parts: string[] = [];
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content']) {
      const v = params.get(k);
      if (v) parts.push(`${k}=${v.slice(0, 60)}`);
    }
    if (document.referrer) {
      const refHost = new URL(document.referrer).hostname;
      if (refHost && refHost !== window.location.hostname) parts.push(`referrer=${refHost}`);
    }
    const attrib = parts.join(', ');
    if (attrib) sessionStorage.setItem(ATTRIB_KEY, attrib);
    return attrib;
  } catch {
    return '';
  }
}

function track(event: string, params?: Record<string, unknown>) {
  try {
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', event, params);
  } catch {
    /* analytics must never break the form */
  }
}

// Full-screen step-by-step scan. Stays mounted while closed so a visitor who
// reopens it lands back on their result instead of starting over.
function ScanTakeover({
  open,
  variant,
  onClose,
}: {
  open: boolean;
  variant: 'default' | 'exit';
  onClose: () => void;
}) {
  const [step, setStep] = useState<'site' | 'checking' | 'result'>('site');
  const [site, setSite] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot → mapped to the API's `Website` bot-trap
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [siteHint, setSiteHint] = useState('');
  const [teaser, setTeaser] = useState<{ headline: string; body: string; prompt?: string }>(TEASER_FALLBACK);
  const [stage, setStage] = useState(0); // which scanning line is active
  const siteInputRef = useRef<HTMLInputElement>(null);

  // Capture UTMs on landing, before any in-site navigation can lose them.
  useEffect(() => {
    captureAttribution();
  }, []);

  // Open/close mechanics: lock page scroll, close on Escape, focus the input.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    if (step === 'site') siteInputRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step, onClose]);

  // Step 1 → run the live check, SHOW the result, then reveal email. The result
  // gates the email so the visitor always sees it. 15s client cap + fallback.
  async function onCheckSite(e: React.FormEvent) {
    e.preventDefault();
    const raw = site.trim();
    if (!raw) return;
    // Classic trap: people type their email into the first box (it's the thing
    // forms usually ask for). Keep it — prefill step 2 — and ask for the site,
    // instead of letting the server reject it silently.
    if (/^\S+@\S+\.\S+$/.test(raw)) {
      setEmail(raw);
      setSite('');
      setSiteHint(
        'That looks like your email — we’ve saved it for your Snapshot. Now enter your website, e.g. yourbusiness.com.au'
      );
      return;
    }
    // Looser version of the server's domain check (no lookbehind — old Safari
    // throws on it) so a typo gets a helpful nudge, not the fallback teaser.
    if (!/^[a-z0-9-]{1,63}(\.[a-z0-9-]{1,63})+$/i.test(cleanDomain(raw))) {
      setSiteHint('Enter your website address, like yourbusiness.com.au');
      return;
    }
    setSiteHint('');
    setStep('checking');
    setStage(0);
    const started = Date.now();
    // Advance the stage list while the real check runs, and hold a ~3.5s floor
    // so the scan reads as real work rather than a flash.
    const stageTimer = window.setInterval(() => setStage((s) => Math.min(s + 1, 3)), 2500);
    try {
      const ctrl = new AbortController();
      // 25s cap: Perplexity's retry path can run ~20s and the staged screen
      // makes the wait legible — better a slow real result than the fallback.
      const to = window.setTimeout(() => ctrl.abort(), 25000);
      const res = await fetch('/api/geo-teaser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: site, attribution: captureAttribution() }),
        signal: ctrl.signal,
      });
      window.clearTimeout(to);
      const data = await res.json();
      const shown = data?.teaser ?? TEASER_FALLBACK;
      setTeaser(shown);
      track('geo_check', { check_result: (shown as { branch?: string }).branch || 'fallback' });
    } catch {
      setTeaser(TEASER_FALLBACK);
      track('geo_check', { check_result: 'client_error' });
    }
    const dwell = Math.max(0, 3500 - (Date.now() - started));
    if (dwell) await new Promise((r) => window.setTimeout(r, dwell));
    window.clearInterval(stageTimer);
    setStep('result');
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          First_Name: cleanDomain(site),
          Email: email,
          Description: `AI Visibility Snapshot request. Website to audit: ${site}`,
          Lead_Source: 'AI Visibility Snapshot (GEO landing)',
          Audit_Website: site,
          Teaser_Context: teaser
            ? `${teaser.headline} — ${teaser.body}${teaser.prompt ? ` (prompt: “${teaser.prompt}”)` : ''}`
            : '',
          Attribution: captureAttribution(),
          Website: hp,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('done');
        track('generate_lead', { method: 'geo_snapshot' });
        // LinkedIn conversion "Snapshot request (GEO landing)" — id from Campaign Manager.
        try {
          (window as Window & { lintrk?: (a: string, b?: object) => void }).lintrk?.('track', {
            conversion_id: 30677516,
          });
        } catch {
          /* analytics must never break the form */
        }
        // OpenAI/ChatGPT Ads conversion "Snapshot request" (pixel: Syfre website pixel).
        try {
          (window as Window & { oaiq?: (...args: unknown[]) => void }).oaiq?.('measure', 'lead_created', {
            type: 'customer_action',
          });
        } catch {
          /* analytics must never break the form */
        }
      } else {
        setStatus('error');
        setError(data.message || 'Something went wrong. Check your details and try again.');
      }
    } catch {
      setStatus('error');
      setError('Couldn’t reach us just now. Try again in a moment.');
    }
  }

  const inputCls =
    'w-full rounded-md border border-white/15 bg-black px-4 py-3.5 text-lg text-white placeholder:text-zinc-500 focus:border-green-400 focus:outline-none disabled:opacity-60';

  const domain = cleanDomain(site);
  const scanStages = [
    `Reading ${domain || 'your site'}…`,
    'Working out your category and location…',
    'Asking a live AI engine who it recommends…',
    'Checking whether you’re named…',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Free AI visibility scan"
      className={`fixed inset-0 z-50 overflow-y-auto bg-black ${open ? '' : 'hidden'}`}
    >
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-5">
        <div className="flex items-center justify-between">
          <span className="text-sm tracking-tight text-zinc-400">
            Syfre <span className="text-green-400">/ GEO</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-2 text-2xl leading-none text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10">
          {status === 'done' ? (
            <div>
              <h2 className="text-4xl leading-tight tracking-tight text-white sm:text-5xl">You’re in.</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-zinc-300">
                Your AI Visibility Snapshot is on its way — keep an eye out for an email from syfre.ai.
              </p>
              <button type="button" onClick={onClose} className={`${BTN} mt-8`}>
                Back to the page
              </button>
            </div>
          ) : step === 'site' ? (
            <div>
              <p className="text-sm font-medium text-green-400">Step 1 of 3 — your website</p>
              <h2 className="mt-3 text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                {variant === 'exit' ? 'Before you go — one quick look?' : 'Let’s scan your site.'}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-300">
                {variant === 'exit'
                  ? 'Twenty seconds to find out whether AI recommends you — or your competitors. We’ll scan your site, ask a live AI engine, and show you the answer right here.'
                  : 'We’ll read your website the way AI does to work out what you do and where you do it, then ask a live AI engine who it recommends for that work. Your result — and who’s named — is on the next screen.'}
              </p>
              <form onSubmit={onCheckSite} className="mt-8">
                <label className="block">
                  <span className="sr-only">Your website</span>
                  <input
                    ref={siteInputRef}
                    type="text"
                    required
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    placeholder="yourbusiness.com.au"
                    inputMode="url"
                    autoComplete="url"
                    className={inputCls}
                  />
                </label>
                {siteHint && (
                  <p role="alert" className="mt-2 text-sm text-amber-300">
                    {siteHint}
                  </p>
                )}
                <button type="submit" className={`${BTN} mt-4 w-full text-lg`}>
                  Scan my site →
                </button>
              </form>
              <p className="mt-4 text-[13px] text-zinc-400">
                Free · takes about 20 seconds · no email needed to see your result.
              </p>
            </div>
          ) : step === 'checking' ? (
            <div aria-live="polite">
              <p className="text-sm font-medium text-green-400">Step 2 of 3 — scanning</p>
              <h2 className="mt-3 text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                Scanning <span className="text-green-400">{domain}</span>
              </h2>
              <ul className="mt-10 space-y-5">
                {scanStages.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 text-lg">
                    {i < stage ? (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-400/15 text-sm text-green-400">
                        ✓
                      </span>
                    ) : i === stage ? (
                      <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-white/20 border-t-green-400 motion-reduce:animate-none" />
                    ) : (
                      <span className="h-5 w-5 shrink-0 rounded-full border border-white/15" />
                    )}
                    <span className={i <= stage ? 'text-zinc-100' : 'text-zinc-500'}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-green-400">Step 3 of 3 — your result</p>
              <h2 className="mt-3 text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                {teaser.headline}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-200">{teaser.body}</p>
              {teaser.prompt && (
                <p className="mt-4 text-sm text-zinc-400">
                  We asked one AI engine, live, just now:{' '}
                  <span className="text-zinc-300">“{teaser.prompt}”</span>.
                </p>
              )}
              <div className="mt-9 rounded-2xl border border-green-400/25 bg-green-400/[0.05] p-6 sm:p-7">
                <p className="text-[15px] leading-relaxed text-zinc-200">
                  That’s one question, on one engine. Your buyers ask dozens — across ChatGPT, Gemini,
                  Perplexity and Google AI. Your free Snapshot checks them all.
                </p>
                <form onSubmit={onSubmit} className="mt-4">
                  <label className="block">
                    <span className="sr-only">Email</span>
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      autoComplete="email"
                      className={inputCls}
                    />
                  </label>
                  {/* Honeypot: hidden from people, catches bots. Maps to the API's `Website` trap. */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    className="hidden"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`${BTN} mt-4 w-full disabled:opacity-60`}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Get my free Snapshot'}
                  </button>
                  {status === 'error' && (
                    <p role="alert" className="mt-3 text-sm text-amber-300">
                      {error}
                    </p>
                  )}
                </form>
                <p className="mt-4 text-[13px] text-zinc-400">
                  Free. No obligation. Sent to your inbox. See our{' '}
                  <a
                    href="https://syfre.ai/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 underline underline-offset-2 hover:text-green-400"
                  >
                    privacy policy
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Area sparkline for a value climbing over time.
function Spark({ points, label }: { points: number[]; label: string }) {
  const w = 260, h = 70, pad = 5;
  const max = Math.max(...points), min = Math.min(...points);
  const x = (i: number) => pad + (i / (points.length - 1)) * (w - 2 * pad);
  const y = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - 2 * pad);
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1).toFixed(1)},${h - pad} L${x(0).toFixed(1)},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={label} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#05df72" stopOpacity="0.3" />
          <stop offset="1" stopColor="#05df72" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkGrad)" />
      <path d={line} fill="none" stroke="#05df72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ranked horizontal bars — hero (us/our client) in brand green, the field in
// neutral zinc. Direct-labelled values so identity isn't colour-alone.
function HBars({ data, label }: { data: { value: number; hero?: boolean }[]; label: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-2" role="img" aria-label={label}>
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full ${d.hero ? 'bg-green-400' : 'bg-zinc-600'}`}
              style={{ width: `${Math.round((d.value / max) * 100)}%` }}
            />
          </div>
          <span
            className={`w-9 shrink-0 text-right text-xs tabular-nums ${d.hero ? 'text-green-300' : 'text-zinc-400'}`}
          >
            {d.value}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default function GeoLanding({ faqs }: { faqs: Faq[] }) {
  const [scanOpen, setScanOpen] = useState(false);
  const [scanVariant, setScanVariant] = useState<'default' | 'exit'>('default');
  const openScan = (placement: string) => {
    track('geo_scan_open', { placement });
    setScanVariant('default');
    setScanOpen(true);
    try {
      sessionStorage.setItem('syfre_scan_opened', '1');
    } catch {
      /* private mode */
    }
  };

  // Exit intent (desktop): one last, polite shot at the scan — once per
  // session, armed only after 10s on page, and never for a visitor who has
  // already opened the takeover themselves. Mobile has no reliable signal.
  useEffect(() => {
    const armAt = Date.now() + 10_000;
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return; // only true exits via the top edge
      if (Date.now() < armAt) return;
      try {
        if (sessionStorage.getItem('syfre_exit_prompted') || sessionStorage.getItem('syfre_scan_opened'))
          return;
        sessionStorage.setItem('syfre_exit_prompted', '1');
      } catch {
        return;
      }
      track('geo_scan_open', { placement: 'exit_intent' });
      setScanVariant('exit');
      setScanOpen(true);
    };
    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, []);

  return (
    <>
      {/* Header — logo + one action, no nav. Keep the focus on the single goal. */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="https://syfre.ai" aria-label="Syfre home" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Syfre" width={99} height={36} className="h-7 w-auto" priority />
            <span className="text-sm tracking-tight text-green-400">/ GEO</span>
          </a>
          <button
            type="button"
            onClick={() => openScan('header')}
            className="text-sm font-medium text-white hover:text-green-400"
          >
            Scan my site
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 sm:pt-20">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-5 flex items-center gap-2 text-sm text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
                Generative Engine Optimisation for Australian business
              </p>
              <h1 className="text-4xl font-normal leading-[1.05] tracking-tight sm:text-6xl">
                <span className="text-zinc-300">When buyers ask AI who to hire,</span>
                <br />
                does your name come up?
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
                See exactly how ChatGPT, Gemini, Perplexity and Google AI answer for your business —
                your free AI Visibility Snapshot.
              </p>
              <div className="mt-9">
                <button
                  type="button"
                  onClick={() => openScan('hero')}
                  className={`${BTN} px-8 py-5 text-lg`}
                >
                  Scan my site — free →
                </button>
                <p className="mt-3 text-sm text-zinc-400">
                  A real AI answer for your market in ~20 seconds. No email needed to see your result.
                </p>
              </div>
            </div>
            <AnswerPreview />
          </div>
        </section>

        {/* The shift — video */}
        <section className="border-t border-white/10 bg-zinc-950/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                  Ten links became one answer.
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-300">
                  Buyers used to scroll a page of results. Now they ask an assistant and act on what it
                  says. If you’re not in that answer, you’re not on the shortlist.
                </p>
              </div>
              <VideoBlock />
            </div>
          </div>
        </section>

        {/* Why you're invisible */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="max-w-2xl text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Why AI leaves you out of the answer
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {gaps.map((g) => (
                <div key={g.title} className="border-t border-white/15 pt-5">
                  <h3 className="text-xl leading-snug tracking-tight text-white">{g.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">{g.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What the Snapshot shows */}
        <section className="border-t border-white/10 bg-zinc-950/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                  See the answer. Spot the gaps.
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-300">
                  Your Snapshot shows, platform by platform, whether AI names your business when a buyer
                  asks — and the specific reasons it does or doesn’t. A clear starting point, not a guess.
                </p>
                <button type="button" onClick={() => openScan('mid')} className={`${BTN} mt-8`}>
                  Scan my site — free
                </button>
              </div>
              {/* Compact sample report, clearly fictional */}
              <div className="rounded-2xl border border-white/12 bg-zinc-900/60 p-6 sm:p-7">
                <div className="mb-4 text-[11px] uppercase tracking-wider text-amber-300">
                  Example — fictional business, illustrative data
                </div>
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-lg tracking-tight text-white">Example Trades Co</div>
                    <div className="text-sm text-zinc-400">Brisbane</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl leading-none text-green-400">2/4</div>
                    <div className="text-[11px] text-zinc-400">platforms name you</div>
                  </div>
                </div>
                <ul className="mt-4 space-y-3">
                  {platforms.map((p) => (
                    <li key={p.key} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-zinc-300">{p.label}</span>
                      <span
                        className={`rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                          p.named ? 'bg-green-400/15 text-green-300' : 'bg-amber-400/15 text-amber-300'
                        }`}
                      >
                        {p.named ? 'Named' : 'Not named'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              How it works
            </h2>
            <ol className="mt-12 grid gap-10 sm:grid-cols-3">
              {steps.map((s, idx) => (
                <li key={s.title} className="border-t border-white/15 pt-5">
                  <div className="text-sm text-green-400">Step {idx + 1}</div>
                  <h3 className="mt-2 text-xl leading-snug tracking-tight text-white">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">{s.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Credibility */}
        <section className="border-t border-white/10 bg-zinc-950/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                AI is our work, not a sideline.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-zinc-300">
                Syfre is a Brisbane AI consultancy. We build production AI systems for businesses and
                government — and we bring that same engineering rigour to how your business shows up in
                AI search. No jargon, no guesswork, and an honest read on what’s worth fixing.
              </p>
            </div>
          </div>
        </section>

        {/* Proof — story first, numbers as evidence */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="max-w-2xl text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Proof it works
            </h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/12 bg-zinc-900/40 p-6 sm:p-8">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                  Advanced manufacturing, Australia
                </div>
                <h3 className="mt-3 text-2xl leading-snug tracking-tight text-white">
                  Their buyers arrive already sold.
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
                  When people ask AI who to buy from in this field, one manufacturing client of ours is
                  named six times out of ten — more than anyone else. They put the sales that followed
                  in the hundreds of thousands of dollars.
                </p>
                <div className="mt-5">
                  <HBars
                    label="This client is named in about 60% of AI answers in its field, the clear number one"
                    data={[{ value: 60, hero: true }, { value: 43 }, { value: 16 }, { value: 9 }]}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/12 bg-zinc-900/40 p-6 sm:p-8">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                  Checkmate — employment background checks
                </div>
                <h3 className="mt-3 text-2xl leading-snug tracking-tight text-white">
                  A buyer in the US asked Claude who to trust. It said Checkmate.
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
                  She became a client. Checkmate turns up in about a third of AI answers on background
                  checking, usually first or second, ahead of names like Checkr.
                </p>
                <blockquote className="mt-5 border-l-2 border-green-400/60 pl-4 text-[15px] leading-relaxed text-zinc-200">
                  “She said Claude was ‘a massive fan of Checkmate’ and one of its most-recommended
                  options. Clearly, what you’re doing on AEO is working.”
                </blockquote>
                <div className="mt-2 pl-4 text-sm text-zinc-400">— Checkmate, Syfre client</div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/12 bg-zinc-900/40 p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-zinc-400">
                    Syfre — our own site
                  </div>
                  <h3 className="mt-3 text-2xl leading-snug tracking-tight text-white">
                    We do this for ourselves.
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
                    Our own search impressions are up 5.6× in 90 days, on the same playbook your
                    Snapshot draws on. And every mention rate on this page is measured across hundreds
                    of real buyer questions, every month — not one-off screenshots.
                  </p>
                </div>
                <div>
                  <Spark
                    label="Syfre's weekly search impressions climbed 5.6 times over 90 days"
                    points={[151, 192, 319, 299, 234, 119, 156, 280, 269, 378, 458, 547, 853]}
                  />
                  <div className="mt-1 flex justify-between text-[11px] tabular-nums text-zinc-500">
                    <span>~150/wk</span>
                    <span>90 days</span>
                    <span>~850/wk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Questions, answered
            </h2>
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg tracking-tight text-white marker:content-['']">
                    {f.q}
                    <span className="text-green-400 transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA + form */}
        <section id="snapshot-form" className="scroll-mt-20 border-t border-white/10 bg-zinc-950/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
              Find out what AI says about you.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-300">
              Your competitors are already in the answer. See where you stand — free.
            </p>
            <button
              type="button"
              onClick={() => openScan('footer')}
              className={`${BTN} mt-8 px-8 py-5 text-lg`}
            >
              Scan my site — free →
            </button>
            <p className="mt-3 text-sm text-zinc-400">
              ~20 seconds · no email needed to see your result.
            </p>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Syfre" width={99} height={36} className="h-6 w-auto" />
            <span className="text-sm text-zinc-400">Brisbane AI consultancy</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="https://syfre.ai" className="hover:text-green-400">
              syfre.ai
            </a>
            <a href="https://syfre.ai/privacy" className="hover:text-green-400">
              Privacy
            </a>
          </div>
        </div>
      </footer>

      <ScanTakeover open={scanOpen} variant={scanVariant} onClose={() => setScanOpen(false)} />
    </>
  );
}
