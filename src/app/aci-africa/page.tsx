import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AciAfricaForm from '@/components/AciAfricaForm';

export const metadata: Metadata = {
  title: 'Qual-eFire | AI-Powered Aviation Fire Safety Training | ACI Africa 2026',
  description: 'Qual-eFire transforms aviation fire safety training with AI. Upload your existing content, generate adaptive micro-assessments, and monitor competency in real time.',
};

export default function AciAfricaPage() {
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
                  <span className="text-zinc-400">Don&apos;t discover a competency gap </span>
                  <span className="text-white font-normal">after an incident</span>
                </h1>
                <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
                  Annual assessments check the box. They don&apos;t guarantee your fire crews are competent today. Qual-eFire catches knowledge decay before it reaches the apron.
                </p>
              </div>

              {/* Problem section */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-5">
                <p className="text-white font-medium text-base mb-3">Sound familiar?</p>
                <div className="flex flex-col gap-2.5">
                  <p className="text-zinc-400 text-sm leading-relaxed">Your team passed their last assessment, but you can&apos;t be sure they&apos;d pass one today.</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">Training pulls crew off the floor for days when you&apos;re already short-staffed.</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">You have shelves of training material, but no way to know if any of it stuck.</p>
                </div>
              </div>

              {/* Why bespoke */}
              <div className="flex flex-col gap-4">
                <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Every airport is different. So is every install.</p>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">Built around your content.</span> Upload your existing courses (PPT, PDF, SCORM, video) and the AI structures them into competency-mapped learning paths specific to your operation
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">Mapped to your performance criteria.</span> Every AI-generated question ties directly to the competency standards your airport is measured against
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed">
                    <span className="text-white font-medium">Configured for your structure.</span> Group training by station, department, or role. Traffic-light dashboards show exactly who&apos;s competent across every team
                  </p>
                </div>
              </div>

              {/* What you get in the workshop */}
              <div className="border-t border-zinc-800 pt-6">
                <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-4">What you get in the workshop</p>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-start">
                    <span className="text-green-400 font-semibold text-sm mt-0.5 w-5 shrink-0">1.</span>
                    <p className="text-zinc-300 text-sm">A review of your current training structure and where AI can close gaps</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-green-400 font-semibold text-sm mt-0.5 w-5 shrink-0">2.</span>
                    <p className="text-zinc-300 text-sm">A live walkthrough of Qual-eFire using content relevant to your operation</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-green-400 font-semibold text-sm mt-0.5 w-5 shrink-0">3.</span>
                    <p className="text-zinc-300 text-sm">A tailored implementation roadmap you can take to your leadership team</p>
                  </div>
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
                    <p className="text-zinc-500 text-sm">Qual-eFire</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="w-full lg:w-[28rem] shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-400/10 text-green-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">Complimentary</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Reserve your AI Training Strategy Session
              </h2>
              <p className="text-zinc-400 text-base mb-1">
                A one-on-one session where we assess your current training and build a strategy around your airport&apos;s specific requirements.
              </p>
              <p className="text-green-400 text-sm font-medium mb-5">
                Takes 30 seconds. No obligation.
              </p>
              <AciAfricaForm />
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
