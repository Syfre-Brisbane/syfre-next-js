import Image from 'next/image';
import { getImageUrl } from '@/lib/image-utils';
import { HomepageData } from '@/types/wordpress';

interface HumansProps {
  homepage: HomepageData | null;
}

export default function Humans({ homepage }: HumansProps) {
  const teamImageUrl = getImageUrl(homepage?.acf?.team_image);

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-0 w-full">
      {/* Same max-w-7xl container as every other homepage section, so the
          heading and photo line up with the page grid on wide screens. */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 sm:gap-12">
        <h2 className="text-3xl sm:text-5xl font-light leading-tight tracking-tight text-zinc-100 sm:shrink-0 sm:w-80 lg:w-96 xl:w-[432px] sm:pt-10">
          <span>A team of humans </span>
          <span className="text-white font-normal">powering</span>
          <span> innovations with AI</span>
        </h2>
        {/* Explicit height at every breakpoint: the image is `fill`, so an
            auto-height box collapses to zero. */}
        <div className="relative w-full sm:max-w-md lg:max-w-lg xl:max-w-3xl h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[670px] rounded-xl overflow-hidden">
          {teamImageUrl && (
            <Image
              src={teamImageUrl}
              alt="Brisbane Team photo"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, (max-width: 1280px) 512px, 768px"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
