import Link from 'next/link';
import { SolutionPageData } from '@/types/solutions';

interface SolutionCardProps {
  solution: SolutionPageData;
}

export default function SolutionCard({ solution }: SolutionCardProps) {
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="bg-zinc-900 rounded-xl p-6 sm:p-8 hover:bg-zinc-800 transition-colors group flex flex-col gap-4"
    >
      <span className="text-green-400 text-sm font-medium">{solution.badge}</span>
      <h2 className="text-white font-medium text-xl group-hover:text-green-400 transition-colors">
        {solution.jsonLd.name}
      </h2>
      <p className="text-zinc-400 font-light leading-relaxed text-base">
        {solution.description}
      </p>
      <span className="text-green-400 text-sm font-medium mt-auto inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        Learn more
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
