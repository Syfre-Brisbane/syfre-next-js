import Link from 'next/link';

const credentials = [
  {
    label: 'Ethics-Led',
    description: 'Every engagement mapped to the 8 Australian AI Ethics Principles',
  },
  {
    label: 'Human-in-the-Loop',
    description: 'AI systems built with human oversight at every critical decision point',
  },
  {
    label: 'Auditable',
    description: 'Governance artefacts that are version-controlled, dated, and evidence-ready',
  },
];

export default function GovernanceCredentials() {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-light leading-tight tracking-tight mb-3">
            <span className="text-zinc-400">Responsible AI, </span>
            <span className="text-white font-normal">governed and evidenced</span>
          </h2>
          <p className="text-base sm:text-lg font-light text-zinc-400 max-w-2xl">
            We believe AI should augment human capability — and that belief requires governance to back it up.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {credentials.map((cred) => (
            <div key={cred.label} className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
              <div className="text-green-400 font-semibold text-sm mb-2">{cred.label}</div>
              <p className="text-zinc-400 text-sm font-light">{cred.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/governance"
            className="text-green-400 text-sm font-medium hover:text-green-300 transition-colors inline-flex items-center gap-1"
          >
            Learn about our governance approach
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
