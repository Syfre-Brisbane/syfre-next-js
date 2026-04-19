import { HomepageData } from '@/types/wordpress';

interface PositioningProps {
  homepage: HomepageData | null;
}

export default function Positioning({ homepage }: PositioningProps) {
  const positioningText = {
    part1: homepage?.acf?.positioning?.part_1,
    highlight: homepage?.acf?.positioning?.highlight,
    part2: homepage?.acf?.positioning?.part_2,
  };

  return (
    <section className="px-6 py-40">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="max-w-4xl text-center">
        <p className="text-5xl font-light leading-tight tracking-tight">
          <span className="text-zinc-300">
            {positioningText.part1}{" "}
          </span>
          <span className="text-white font-normal">
            {positioningText.highlight}{" "}
          </span>
          <span className="text-zinc-300">
            {positioningText.part2}
          </span>
        </p>
        </div>
      </div>
    </section>
  );
}
