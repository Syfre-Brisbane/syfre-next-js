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

function LeadForm() {
  const [site, setSite] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot → mapped to the API's `Website` bot-trap
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

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
          Website: hp,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('done');
      } else {
        setStatus('error');
        setError(data.message || 'Something went wrong. Check your details and try again.');
      }
    } catch {
      setStatus('error');
      setError('Couldn’t reach us just now. Try again in a moment.');
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-green-400/30 bg-green-400/5 p-6 sm:p-8">
        <h3 className="text-2xl tracking-tight text-white">You’re in.</h3>
        <p className="mt-2 text-zinc-300">
          Your AI Visibility Snapshot is on its way — keep an eye out for an email from syfre.ai.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/12 bg-zinc-900/40 p-6 sm:p-8">
      <div className="grid gap-4">
        <label className="block">
          <span className="sr-only">Your website</span>
          <input
            type="text"
            required
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="yourbusiness.com.au"
            inputMode="url"
            autoComplete="url"
            className="w-full rounded-md border border-white/15 bg-black px-4 py-3 text-base text-white placeholder:text-zinc-400 focus:border-green-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="w-full rounded-md border border-white/15 bg-black px-4 py-3 text-base text-white placeholder:text-zinc-400 focus:border-green-400 focus:outline-none"
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
      </div>

      <button type="submit" disabled={status === 'submitting'} className={`${BTN} mt-5 w-full disabled:opacity-60`}>
        {status === 'submitting' ? 'Sending…' : 'Get my free Snapshot'}
      </button>

      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-amber-300">
          {error}
        </p>
      )}
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
    </form>
  );
}

export default function GeoLanding({ faqs }: { faqs: Faq[] }) {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });

  return (
    <>
      {/* Header — logo + one action, no nav. Keep the focus on the single goal. */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="https://syfre.ai" aria-label="Syfre home" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Syfre" width={99} height={36} className="h-7 w-auto" priority />
            <span className="text-sm tracking-tight text-green-400">/ GEO</span>
          </a>
          <button type="button" onClick={scrollToForm} className="text-sm font-medium text-white hover:text-green-400">
            Get my free Snapshot
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
              <div className="mt-8 max-w-md">
                <LeadForm />
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
                <button type="button" onClick={scrollToForm} className={`${BTN} mt-8`}>
                  Get my free Snapshot
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
        <section ref={formRef} id="snapshot-form" className="scroll-mt-20 border-t border-white/10 bg-zinc-950/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-normal leading-tight tracking-tight sm:text-5xl">
                  Find out what AI says about you.
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-300">
                  Your competitors are already in the answer. See where you stand — free.
                </p>
              </div>
              <LeadForm />
            </div>
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
    </>
  );
}
