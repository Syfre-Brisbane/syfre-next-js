import { QGEAAlignment } from '@/lib/governance-data';

interface ComplianceMatrixProps {
  alignments: QGEAAlignment[];
}

export default function ComplianceMatrix({ alignments }: ComplianceMatrixProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-4">
          <span className="text-zinc-400">How does Syfre align with </span>
          <span className="text-white font-normal">QGEA AI governance requirements?</span>
        </h2>
        <p className="text-lg font-light text-zinc-400 mb-12 max-w-3xl">
          The QGEA AI Governance Policy sets the floor for AI use across Queensland Government agencies. Here is how Syfre maps to each core requirement.
        </p>
        <div className="flex flex-col gap-6">
          {alignments.map((alignment) => (
            <div key={alignment.requirement} className="border border-zinc-800 rounded-lg p-6">
              <h3 className="text-white font-medium text-lg mb-2">{alignment.requirement}</h3>
              <p className="text-zinc-400 text-sm font-light mb-3">{alignment.description}</p>
              <div className="bg-zinc-900 rounded-lg p-4">
                <p className="text-zinc-300 text-sm font-light">
                  <span className="text-green-400 font-medium">Syfre&apos;s approach: </span>
                  {alignment.syfreApproach}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
