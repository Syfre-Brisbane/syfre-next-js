import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LuandaPresentationForm from '@/components/LuandaPresentationForm';

export const metadata: Metadata = {
  title: 'Qual-eFire | Learning Platform & AI — ACI Africa Luanda Presentation',
  description: 'Download the full presentation from Tim Dean\'s ACI Africa session in Luanda. Covers AI\'s impact on ARFF training, 6 strategic themes for training managers, and a real-world case study of AI-powered onboarding at scale.',
};

export default function LuandaPresentationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Minimal header */}
      <header className="px-6 py-6">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="syfre logo"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
      </header>

      <main className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Conference badge */}
          <div className="mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              ACI Africa 2026, Luanda
            </span>
          </div>

          {/* Hero section */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left: messaging */}
            <div className="flex-1 flex flex-col gap-8 lg:max-w-lg">
              <div className="flex flex-col gap-5">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.1] tracking-tight">
                  <span className="text-zinc-400">What AI means for aviation fire safety training — </span>
                  <span className="text-white font-normal">and what to do about it</span>
                </h1>
                <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
                  The full presentation from Tim Dean&apos;s ACI Africa session in Luanda. Practical frameworks, a real-world case study, and a clear picture of where aviation training is heading.
                </p>
              </div>

              {/* What's inside */}
              <div className="flex flex-col gap-4">
                <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">What&apos;s inside the presentation</p>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">6 strategic themes for training managers.</span> From compliance to operational readiness, managing skills fade, and shifting training upstream — before crews arrive on site
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">A Middle East airport case study.</span> How one major international airport onboards ~3,000 contractors per year using AI — with zero manual handoffs and a full audit trail
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">Why your own AI beats ChatGPT for compliance.</span> Answers grounded in your courses, your standards, your students — every response traceable to the source
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">The Qual-eFire platform in depth.</span> AI-powered assessments, competency mapping, ARFF course structure, and how it fits your existing training setup
                  </p>
                </div>
              </div>

              {/* Context callout */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-5">
                <p className="text-white font-medium text-base mb-3">This talk is for you if...</p>
                <div className="flex flex-col gap-2.5">
                  <p className="text-zinc-400 text-sm leading-relaxed">You&apos;re responsible for people being competent — not just compliant.</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">You want better learning outcomes without adding to your training budget or pulling crew off the floor.</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">You want to understand where AI actually fits in aviation fire safety training — not hype, but practical application.</p>
                </div>
              </div>

              {/* Presented by */}
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-zinc-500 text-sm mb-3">Presented by</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-semibold text-green-400">
                    TD
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Tim Dean</p>
                    <p className="text-zinc-500 text-sm">CEO, Qual-eFire</p>
                    <p className="text-zinc-600 text-xs mt-0.5">Serving aviation organisations across the Middle East, Africa, Asia-Pacific, and the Americas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="w-full lg:w-[28rem] shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-400/10 text-green-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">Free download</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Get the full presentation
              </h2>
              <p className="text-zinc-400 text-base mb-1">
                The complete slide deck from the ACI Africa 2026 session in Luanda — yours instantly.
              </p>
              <p className="text-green-400 text-sm font-medium mb-5">
                Takes 30 seconds. Instant access.
              </p>
              <LuandaPresentationForm />
            </div>
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-zinc-900 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="syfre logo"
              width={90}
              height={24}
              className="h-6 w-auto opacity-50"
            />
          </Link>
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Syfre AI Solutions
          </p>
        </div>
      </footer>
    </div>
  );
}
