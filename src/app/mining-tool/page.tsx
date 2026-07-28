import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import OpenFileForm from '@/components/OpenFileForm';

export const metadata: Metadata = {
  title: 'OpenFile — Sixty Years of Exploration Data, Back on the Map',
  description:
    'OpenFile reads every exploration report ever filed — ASX announcements and 1960s typewritten scans alike — extracts the drilling data, human-verifies every number against the source, and reprices it at today\'s metal prices. Register for early access.',
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
                    Sixty years of exploration data,{' '}
                    <span className="font-normal">back on the map.</span>
                  </h1>
                  <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
                    Government archives call them open-file reports — tens of thousands of
                    drilling reports, some typewritten in the 1960s, most unread in decades.
                    OpenFile reads them, extracts every drill intercept, has a human verify
                    each number against the source page, and reprices the lot at today&apos;s
                    metal prices.
                  </p>
                  <p className={`font-mono text-sm ${GOLD}`}>OpenFile opens the files.</p>
                </div>

                {/* Proof points */}
                <div className="flex flex-col gap-4 border-t border-zinc-800/60 pt-7">
                  <div className="flex gap-3 items-start">
                    <span className={`font-mono text-sm ${GOLD} mt-0.5 shrink-0`}>—</span>
                    <p className="text-zinc-300 text-base leading-relaxed">
                      Reads last week&apos;s JORC announcements and 1964 typewritten scans with
                      the same pipeline
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
                      Ask one question across the whole library — every answer cites its
                      documents
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
              Decades of drilling, locked in PDFs.
            </h2>
            <div className="flex flex-col gap-4 text-zinc-300 text-lg font-light leading-relaxed">
              <p>
                Every exploration campaign ends in a report. ASX announcements, company
                reports, government open-file archives — the Northern Territory archive
                alone holds 1,300+ reports for a single mining district. A typewritten
                report from 1964 can contain drill intercepts nobody has looked at since
                it was filed.
              </p>
              <p className="text-white">
                The data isn&apos;t lost. It&apos;s just unread.
              </p>
            </div>
          </div>
        </section>

        {/* ============ THE PIPELINE ============ */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto">
            <Eyebrow>The pipeline</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-12">
              Extract. Verify. Reprice.
            </h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/30">
                <p className={`font-mono text-sm ${GOLD} mb-3`}>01 / EXTRACT</p>
                <p className="text-zinc-300 text-base leading-relaxed">
                  AI reads every document — modern announcements and sixty-year-old
                  typewritten scans — and pulls out each drill intercept: hole, depth,
                  grade, coordinates.
                </p>
              </div>
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/30">
                <p className={`font-mono text-sm ${GOLD} mb-3`}>02 / VERIFY</p>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Every extraction goes through a human verification workbench — source PDF
                  on one side, extracted rows on the other. Nothing enters the dataset
                  unverified.
                </p>
              </div>
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/30">
                <p className={`font-mono text-sm ${GOLD} mb-3`}>03 / REPRICE</p>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Every historical result is repriced at today&apos;s metal prices. Ground
                  that looked marginal at 1964 prices can look very different at
                  today&apos;s.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ VALUE UPLIFT ============ */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              <div className="flex-1">
                <Eyebrow>Value uplift</Eyebrow>
                <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-6">
                  Gold was US$35 an ounce in 1964.{' '}
                  <span className="font-normal">It isn&apos;t anymore.</span>
                </h2>
                <div className="flex flex-col gap-4 text-zinc-300 text-lg font-light leading-relaxed">
                  <p>
                    Until 1971 the gold price was fixed by law, not by a market. Every
                    intercept drilled in that era was judged against US$35 an ounce — and
                    walked away from at US$35 an ounce.
                  </p>
                  <p>
                    The same metres today are worth roughly 80× more. OpenFile reprices
                    every historical intercept, so on the national map, old ground
                    literally glows where today&apos;s prices transform yesterday&apos;s
                    results.
                  </p>
                </div>
              </div>
              {/* Glow visual */}
              <div className="shrink-0 flex items-center gap-6 sm:gap-8 py-4" aria-hidden="true">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-zinc-700 flex items-center justify-center">
                    <span className="font-mono text-zinc-500 text-sm">$35</span>
                  </div>
                  <p className="font-mono text-xs text-zinc-600">1964 / OZ</p>
                </div>
                <span className="font-mono text-zinc-600 text-xl">→</span>
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-[#E8B84B]/60 bg-[#E8B84B]/5 flex items-center justify-center"
                    style={{ boxShadow: '0 0 80px rgba(232, 184, 75, 0.25), inset 0 0 40px rgba(232, 184, 75, 0.08)' }}
                  >
                    <span className={`font-mono ${GOLD} text-2xl sm:text-3xl`}>~80×</span>
                  </div>
                  <p className={`font-mono text-xs ${GOLD}`}>TODAY</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PROOF STORY ============ */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <Eyebrow>Tennant Creek, 1964</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-6">
                The hole nobody assayed for gold.
              </h2>
              <div className="flex flex-col gap-4 text-zinc-300 text-lg font-light leading-relaxed mb-12">
                <p>
                  In 1964, drillers at Tennant Creek hit 8,000 ppm bismuth. They never
                  assayed that hole for gold — in 1964, nobody knew bismuth is a
                  pathfinder for gold in that style of deposit. The gold content of the
                  most anomalous rock in the project is unknown to this day.
                </p>
                <p>The report went into the government archive. It sat there for sixty years.</p>
                <p>
                  Asked one question about the project, OpenFile&apos;s AI found the assay
                  coverage gap — and recommended the follow-up: re-assay the archived
                  pulps. No new drilling required.{' '}
                  <span className="text-white">
                    A drill target, generated from a report nobody had read since 1964,
                    for the cost of a question.
                  </span>
                </p>
              </div>
            </div>

            {/* Workbench artifact */}
            <div className="border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* As filed */}
                <div className="bg-[#EDE6D6] text-[#3B3529] p-6 sm:p-8">
                  <p className="font-mono text-xs tracking-[0.2em] text-[#8A7D5F] mb-5">
                    AS FILED — 1964
                  </p>
                  <div className="font-mono text-sm leading-loose">
                    <p>TENNANT CREEK FIELD</p>
                    <p>DIAMOND DRILLING — ASSAY RETURNS</p>
                    <p className="mt-4">HOLE DDA4</p>
                    <p>BISMUTH ....... 8,000 ppm</p>
                    <p>GOLD .......... NOT ASSAYED</p>
                  </div>
                </div>
                {/* Extracted */}
                <div className="bg-zinc-900/60 p-6 sm:p-8 border-t md:border-t-0 md:border-l border-zinc-800">
                  <p className="font-mono text-xs tracking-[0.2em] text-zinc-500 mb-5">
                    EXTRACTED
                  </p>
                  <div className="font-mono text-sm leading-loose text-zinc-300">
                    <p>
                      <span className="text-zinc-500">hole:</span> DDA4
                    </p>
                    <p>
                      <span className="text-zinc-500">Bi:</span> 8,000 ppm
                    </p>
                    <p>
                      <span className="text-zinc-500">Au:</span>{' '}
                      <span className={GOLD}>— no assay on record</span>
                    </p>
                    <p className="mt-4 text-zinc-500">
                      status: <span className="text-zinc-300">flagged — assay coverage gap</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* AI answer */}
              <div className="border-t border-zinc-800 bg-[#0B0A08] p-6 sm:p-8">
                <p className="font-mono text-sm text-zinc-500 mb-3">
                  &gt; what should we look at next on this project?
                </p>
                <p className={`font-mono text-sm sm:text-base leading-relaxed ${GOLD}`}>
                  DDA4 returned 8,000 ppm bismuth — never assayed for gold. In a Tennant
                  Creek system, that is a screaming gold indicator. Recommended follow-up:
                  re-assay the archived pulps before planning any new drilling.
                </p>
              </div>
            </div>
            <p className="text-zinc-600 text-sm mt-4">
              Illustration of OpenFile&apos;s verification workbench — extracted rows sit
              beside the source, and a human checks every number before it counts.
            </p>
          </div>
        </section>

        {/* ============ WHAT YOU CAN DO ============ */}
        <section className="px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto">
            <Eyebrow>What you can do</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-12">
              Ask the whole archive at once.
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-lg font-medium">Plain-English questions</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Ask across the whole library in plain English. Every answer cites the
                  documents it came from.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-lg font-medium">Every hole on a national map</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Drill collars from every report, with the government&apos;s official
                  deposit register overlaid.
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
                <h3 className="text-white text-lg font-medium">Straight to the source</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Click from any answer or any hole to the original document it came from.
                </p>
              </div>
            </div>
            <p className="text-zinc-400 text-base leading-relaxed border-l-2 border-[#E8B84B]/40 pl-5 mt-12 max-w-2xl">
              Other tools visualise the data you already have. OpenFile creates data nobody
              has — extracted from the archives everyone ignores, verified against the
              source, priced in today&apos;s terms.
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
                  The archive knows where to drill.
                </h2>
                <p className="text-zinc-300 text-lg font-light leading-relaxed max-w-xl">
                  OpenFile is in early access, built with exploration teams. Register your
                  interest, tell us what you&apos;d ask the archive, and help shape what it
                  becomes.
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
