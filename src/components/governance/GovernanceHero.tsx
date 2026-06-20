export default function GovernanceHero() {
  return (
    <section className="px-4 sm:px-6 pt-12 sm:pt-24 pb-16 sm:pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 w-fit">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-300">AI Governance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.1] tracking-tight">
            <span className="text-zinc-400">Governance & </span>
            <span className="text-white font-normal">Compliance Hub</span>
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
              Syfre&apos;s AI governance approach is built on a simple principle: AI should augment human capability, not replace human judgement. Every governance framework, risk assessment, and compliance artefact we produce is grounded in this commitment.
            </p>
            <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
              This page documents how Syfre aligns to the QGEA AI Governance Policy, supports agencies through the FAIRA process, and maps every engagement to the 8 Australian AI Ethics Principles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
