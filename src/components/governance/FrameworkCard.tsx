import { EthicsPrinciple } from '@/lib/governance-data';

interface FrameworkCardProps {
  principle: EthicsPrinciple;
  index: number;
}

export default function FrameworkCard({ principle, index }: FrameworkCardProps) {
  return (
    <div className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
      <div className="flex items-start gap-4">
        <span className="text-green-400 text-sm font-semibold bg-green-400/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
          {index + 1}
        </span>
        <div>
          <h3 className="text-white font-medium text-lg mb-2">{principle.name}</h3>
          <p className="text-zinc-400 text-sm font-light mb-3">{principle.description}</p>
          <p className="text-zinc-300 text-sm font-light">
            <span className="text-green-400 font-medium">Syfre&apos;s commitment: </span>
            {principle.syfreCommitment}
          </p>
        </div>
      </div>
    </div>
  );
}
