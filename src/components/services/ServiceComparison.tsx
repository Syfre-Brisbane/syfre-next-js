import { ServiceComparisonRow } from '@/types/services';

interface ServiceComparisonProps {
  heading: string;
  intro?: string;
  leftLabel: string;
  rightLabel: string;
  rows: ServiceComparisonRow[];
}

// Two-column comparison table. Tables are one of the structures LLMs extract
// and cite most reliably, so this contrasts the two disciplines row by row.
export default function ServiceComparison({
  heading,
  intro,
  leftLabel,
  rightLabel,
  rows,
}: ServiceComparisonProps) {
  if (rows.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-3">
          {heading}
        </h2>
        {intro && (
          <p className="text-zinc-300 font-normal mb-10 max-w-3xl leading-relaxed">{intro}</p>
        )}
        <div className="overflow-x-auto mt-10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="py-4 pr-4 text-sm font-medium text-zinc-300 uppercase tracking-wide">
                  &nbsp;
                </th>
                <th className="py-4 px-4 text-base font-medium text-zinc-300">{leftLabel}</th>
                <th className="py-4 pl-4 text-base font-medium text-green-400">{rightLabel}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-b border-zinc-800 align-top">
                  <td className="py-5 pr-4 text-sm font-medium text-white whitespace-nowrap">
                    {row.dimension}
                  </td>
                  <td className="py-5 px-4 text-zinc-300 font-normal leading-relaxed">{row.left}</td>
                  <td className="py-5 pl-4 text-zinc-300 font-normal leading-relaxed">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
