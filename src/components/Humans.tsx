import Image from 'next/image';
import { getImageUrl } from '@/lib/image-utils';
import { HomepageData } from '@/types/wordpress';

interface HumansProps {
  homepage: HomepageData | null;
}

export default function Humans({ homepage }: HumansProps) {
  const teamImageUrl = getImageUrl(homepage?.acf?.team_image);

  return (
    <section className="flex flex-col gap-2.5 px-4 sm:px-10 py-8 sm:py-0 w-full">
      {/* Mobile: Single column layout */}
      <div className="flex flex-col gap-8 sm:hidden">
        <div className="text-left">
          <h2 className="text-3xl font-light leading-tight tracking-tight text-zinc-100">
            <span>A team of humans </span>
            <span className="text-white font-normal">powering</span>
            <span> innovations with AI</span>
          </h2>
        </div>
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
          {teamImageUrl && (
            <Image
              src={teamImageUrl}
              alt="Brisbane Team photo"
              fill
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Desktop: Side by side layout */}
      <div className="hidden sm:flex items-start justify-between w-full">
        {/* Left side - Text and Button */}
        <div className="flex flex-col gap-9 w-80 lg:w-96 xl:w-[432px] pt-10">
          <div className="text-left">
            <h2 className="text-5xl font-light leading-tight tracking-tight text-zinc-100">
              <span>A team of humans </span>
              <span className="text-white font-normal">powering</span>
              <span> innovations with AI</span>
            </h2>
          </div>
        </div>
        <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-3xl h-auto lg:h-[500px] xl:h-[670px] rounded-xl overflow-hidden">
          {teamImageUrl && (
            <Image
              src={teamImageUrl}
              alt="Brisbane Team photo"
              fill
              sizes="(max-width: 1024px) 448px, (max-width: 1280px) 512px, 768px"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
