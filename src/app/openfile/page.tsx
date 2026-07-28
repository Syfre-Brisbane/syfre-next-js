import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import OpenFileForm from '@/components/OpenFileForm';

export const metadata: Metadata = {
  title: 'OpenFile — Find What\'s Been Overlooked',
  description:
    'OpenFile loads your exploration data, the public archives, or both — extracts the drilling data, human-verifies every number against the source, and uses AI to flag overlooked intercepts and new ground worth exploring. Register for early access.',
};

const GOLD = 'text-[#E8B84B]';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className={`font-mono text-xs tracking-[0.2em] uppercase ${GOLD} mb-4`}>{children}</p>
  );
}

export default function OpenFilePage() {
  return (
    <div className="min-h-screen bg-[#0B0A08] text-white">
      {/* Minimal header */}
      <header className="px-6 py-6 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="syfre logo"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <span className="font-mono text-xs text-zinc-500 tracking-wider hidden sm:block">
          OPENFILE / EARLY ACCESS
        </span>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section className="px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              {/* Left: messaging */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                  <p className={`font-mono text-2xl sm:text-3xl font-semibold tracking-tight ${GOLD}`}>
                    OpenFile
                    <span className="text-zinc-500 font-normal text-base sm:text-lg ml-3">by Syfre</span>
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-light leading-[1.08] tracking-tight">
                    Find what&apos;s been <span className="font-normal">overlooked.</span>
                  </h1>
                  <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
                    OpenFile loads your exploration data, the public archives, or both —
                    extracts every drill intercept, has a human verify each number against
                    the source, and uses AI to flag what deserves a second look: intercepts
                    never followed up, assay gaps, new ground worth exploring.
                  </p>
                </div>

                {/* Proof points */}
                <div className="flex flex-col gap-4 border-t border-zinc-800/60 pt-7">
                  <div className="flex gap-3 items-start">
                    <span className={`font-mono text-sm ${GOLD} mt-0.5 shrink-0`}>—</span>
                    <p className="text-zinc-300 text-base leading-relaxed">
                      Works on your own project files and on public reports — modern JORC
                      announcements and decades-old typewritten scans alike
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className={`font-mono text-sm ${GOLD} mt-0.5 shrink-0`}>—</span>
                    <p className="text-zinc-300 text-base leading-relaxed">
                      Every data point human-verified against the source document before it
                      counts
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className={`font-mono text-sm ${GOLD} mt-0.5 shrink-0`}>—</span>
                    <p className="text-zinc-300 text-base leading-relaxed">
                      Ask one question across everything — every answer cites its documents
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="w-full lg:w-[26rem] shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#E8B84B]/10 text-[#E8B84B] text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    Early access
                  </span>
                  <span className="text-zinc-500 text-xs">Takes 30 seconds</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Get early access</h2>
                <p className="text-zinc-400 text-base mb-5">
                  Built with mining operators — help shape it.
                </p>
                <OpenFileForm />
              </div>
            </div>
          </div>
        </section>

        {/* ============ THE PROBLEM ============ */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900">
          <div className="max-w-3xl mx-auto">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-6">
              Nobody has read all of it.
            </h2>
            <div className="flex flex-col gap-4 text-zinc-300 text-lg font-light leading-relaxed">
              <p>
                Every exploration campaign ends in a report. They pile up on your own
                server and in the government archives. Intercepts get drilled, logged,
                filed, and forgotten. Assays get run for one metal and not another.
                Ground changes hands and its history doesn&apos;t follow.
              </p>
              <p className="text-white">
                The data isn&apos;t lost. It&apos;s just unread.
              </p>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-12">
              Load. Verify. Discover.
            </h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/30">
                <p className={`font-mono text-sm ${GOLD} mb-3`}>01 / LOAD</p>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Bring your own project data, pull from the public archives, or combine
                  the two. AI reads every document and extracts each drill intercept:
                  hole, depth, grade, coordinates.
                </p>
              </div>
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/30">
                <p className={`font-mono text-sm ${GOLD} mb-3`}>02 / VERIFY</p>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Every extraction goes through a human verification workbench — source
                  document on one side, extracted rows on the other. Nothing enters the
                  dataset unverified.
                </p>
              </div>
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/30">
                <p className={`font-mono text-sm ${GOLD} mb-3`}>03 / DISCOVER</p>
                <p className="text-zinc-300 text-base leading-relaxed">
                  AI works across the verified dataset to flag what people missed —
                  intercepts never followed up, holes never assayed for the metal that
                  matters, ground nobody connected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ASK ============ */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto">
            <Eyebrow>Ask</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-6">
              Questions a team of geos would take weeks to answer.
            </h2>
            <p className="text-zinc-300 text-lg font-light leading-relaxed max-w-2xl mb-10">
              Ask in plain English, across everything you&apos;ve loaded. Every answer
              cites the documents it came from, and you can click straight through to the
              source.
            </p>

            {/* Example questions — terminal style */}
            <div className="border border-zinc-800 rounded-2xl bg-zinc-900/40 p-6 sm:p-8 flex flex-col gap-4 font-mono text-sm sm:text-base">
              <p className="text-zinc-300">
                <span className={GOLD}>&gt;</span> Which holes on this ground were never
                assayed for gold?
              </p>
              <p className="text-zinc-300">
                <span className={GOLD}>&gt;</span> Show every intercept over 1 g/t that
                was never followed up.
              </p>
              <p className="text-zinc-300">
                <span className={GOLD}>&gt;</span> What did the three previous owners of
                this tenement each conclude — and where do they disagree?
              </p>
              <p className="text-zinc-300">
                <span className={GOLD}>&gt;</span> Which pathfinder anomalies here were
                never tested for the metal they point to?
              </p>
            </div>

            {/* Capabilities */}
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 mt-14">
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-lg font-medium">Every hole on one map</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Drill collars from everything you&apos;ve loaded, with the
                  government&apos;s official deposit register overlaid.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-lg font-medium">Decades fused in 3D</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Drilling from different companies and different decades over the same
                  ground, in one 3D scene.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-lg font-medium">Answers with citations</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  No black box — every answer names the reports it came from.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-lg font-medium">Straight to the source</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Click from any answer or any hole to the original document.
                </p>
              </div>
            </div>

            <p className="text-zinc-400 text-base leading-relaxed border-l-2 border-[#E8B84B]/40 pl-5 mt-12 max-w-2xl">
              Other tools visualise the data you already have. OpenFile also creates data
              nobody has — extracted from reports no one has read in decades, verified
              against the source, and searched with your own data in one place.
            </p>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              <div className="flex-1">
                <Eyebrow>Early access</Eyebrow>
                <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-6">
                  Your next target may already be on file.
                </h2>
                <p className="text-zinc-300 text-lg font-light leading-relaxed max-w-xl">
                  OpenFile is in early access, built with exploration teams. Register your
                  interest, tell us what you&apos;d ask it, and help shape what it becomes.
                </p>
              </div>
              <div className="w-full lg:w-[26rem] shrink-0">
                <OpenFileForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-zinc-900 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
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
