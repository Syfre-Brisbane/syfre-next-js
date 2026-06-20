import { SolutionOutcome } from '@/types/solutions';

interface SolutionOutcomesProps {
  heading: string;
  items: SolutionOutcome[];
}

export default function SolutionOutcomes({ heading, items }: SolutionOutcomesProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.metric} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="text-green-400 font-semibold text-sm mb-2">{item.metric}</div>
              <p className="text-zinc-400 font-light leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
