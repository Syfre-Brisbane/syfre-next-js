import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MiningToolForm from '@/components/MiningToolForm';

export const metadata: Metadata = {
  title: 'AI for Mining Operations — Register Your Interest',
  description:
    'Syfre is building an AI tool for mining operations. Register your interest for early access and updates.',
};

export default function MiningToolPage() {
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
          {/* Early access badge */}
          <div className="mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Early access
            </span>
          </div>

          {/* Hero section */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left: messaging */}
            <div className="flex-1 flex flex-col gap-8 lg:max-w-lg">
              <div className="flex flex-col gap-5">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.1] tracking-tight">
                  <span className="text-zinc-400">AI built for </span>
                  <span className="text-white font-normal">mining operations</span>
                </h1>
                <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
                  We&apos;re building a practical AI tool for the mining sector. Register your
                  interest to get early access and be the first to hear when it launches.
                </p>
              </div>

              {/* Why register */}
              <div className="flex flex-col gap-4">
                <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">
                  Why register now
                </p>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">Early access.</span> Be among the
                    first to use it and shape what it becomes
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">Built with operators.</span> Tell us
                    the problem you need solved and we&apos;ll build toward it
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">No spam.</span> Occasional updates
                    about this tool only — nothing else
                  </p>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="w-full lg:w-[28rem] shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-400/10 text-green-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  Register interest
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Get early access
              </h2>
              <p className="text-zinc-400 text-base mb-5">
                Leave your details and we&apos;ll be in touch with more information and next steps.
              </p>
              <MiningToolForm />
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
