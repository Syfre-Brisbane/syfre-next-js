import Link from 'next/link';
import { getRelatedSolutions } from '@/lib/solutions-data';

interface SolutionRelatedLinksProps {
  currentSlug: string;
  relatedSlugs: string[];
}

export default function SolutionRelatedLinks({ currentSlug, relatedSlugs }: SolutionRelatedLinksProps) {
  const related = getRelatedSolutions(relatedSlugs).filter((s) => s.slug !== currentSlug);

  if (related.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-8">
          Other solutions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {related.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="border border-zinc-800 rounded-lg p-6 hover:border-green-400/40 transition-colors group"
            >
              <span className="text-green-400 text-sm font-medium">{solution.badge}</span>
              <h3 className="text-white font-medium text-lg mt-2 mb-2 group-hover:text-green-400 transition-colors">
                {solution.jsonLd.name}
              </h3>
              <p className="text-zinc-400 text-sm font-light">{solution.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
