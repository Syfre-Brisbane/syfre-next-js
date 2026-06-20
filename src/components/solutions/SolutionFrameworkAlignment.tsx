import { FrameworkAlignment } from '@/types/solutions';

interface SolutionFrameworkAlignmentProps {
  alignments: FrameworkAlignment[];
}

export default function SolutionFrameworkAlignment({ alignments }: SolutionFrameworkAlignmentProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
          <span className="text-zinc-400">How does this align to </span>
          <span className="text-white font-normal">Queensland Government frameworks?</span>
        </h2>
        <p className="text-lg font-light text-zinc-400 mb-12 max-w-3xl">
          Every Syfre engagement maps to the governance frameworks Queensland agencies are required to follow.
        </p>
        <div className="flex flex-col gap-6">
          {alignments.map((alignment) => (
            <div key={alignment.framework} className="border border-zinc-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <span className="text-green-400 text-xs font-semibold bg-green-400/10 rounded-full px-3 py-1 shrink-0 mt-0.5">
                  {alignment.framework}
                </span>
                <div>
                  <p className="text-zinc-300 text-sm font-light mb-2">{alignment.requirement}</p>
                  <p className="text-zinc-400 text-sm font-light">
                    <span className="text-green-400 font-medium">Syfre&apos;s approach: </span>
                    {alignment.syfreApproach}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
