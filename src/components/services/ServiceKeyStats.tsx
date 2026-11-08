import { ServiceStat } from '@/types/services';

interface ServiceKeyStatsProps {
  heading: string;
  intro?: string;
  stats: ServiceStat[];
}

// Sourced statistics block. LLMs preferentially cite pages that make
// quantified, attributed claims, so each stat shows its source explicitly.
export default function ServiceKeyStats({ heading, intro, stats }: ServiceKeyStatsProps) {
  if (stats.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-3">
          {heading}
        </h2>
        {intro && (
          <p className="text-zinc-400 font-light mb-10 max-w-3xl leading-relaxed">{intro}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-zinc-900 rounded-xl p-6 sm:p-8">
              <p className="text-4xl sm:text-5xl font-light text-green-400 mb-4">{stat.value}</p>
              <p className="text-zinc-300 font-light leading-relaxed mb-4">{stat.label}</p>
              <p className="text-sm text-zinc-500 font-light">
                {stat.sourceUrl ? (
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    Source: {stat.source}
                  </a>
                ) : (
                  <>Source: {stat.source}</>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
