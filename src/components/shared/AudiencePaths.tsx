import Link from 'next/link';

const paths = [
  {
    sector: 'State Government',
    description: 'FAIRA-ready AI governance and compliance for Queensland state agencies.',
    href: '/solutions/state-government',
  },
  {
    sector: 'Local Councils',
    description: 'AI solutions for municipal operations, infrastructure, and community services.',
    href: '/solutions/local-councils',
  },
  {
    sector: 'Queensland Health',
    description: 'Clinically-aware AI governance aligned to the QH AI Framework.',
    href: '/solutions/queensland-health',
  },
];

export default function AudiencePaths() {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-light leading-tight tracking-tight mb-3">
            <span className="text-zinc-400">AI solutions for </span>
            <span className="text-white font-normal">Queensland&apos;s public sector</span>
          </h2>
          <p className="text-base sm:text-lg font-light text-zinc-400 max-w-2xl">
            Governance-first AI for state agencies, local councils, and Queensland Health — built to meet your compliance obligations from day one.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {paths.map((path) => (
            <Link
              key={path.sector}
              href={path.href}
              className="group border border-zinc-800 rounded-lg p-6 hover:border-green-400/40 transition-colors"
            >
              <h3 className="text-white font-medium text-lg mb-2 group-hover:text-green-400 transition-colors">
                {path.sector}
              </h3>
              <p className="text-zinc-400 text-sm font-light mb-4">{path.description}</p>
              <span className="text-green-400 text-sm font-medium inline-flex items-center gap-1">
                Learn more
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
