import Image from 'next/image';
import { getImageUrl } from '@/lib/image-utils';
import { HomepageData } from '@/types/wordpress';

interface HeroProps {
  homepage: HomepageData | null;
}

export default function Hero({ homepage }: HeroProps) {
  const heroTitle = {
    part_1: homepage?.acf?.hero_title?.part_1,
    part_2: homepage?.acf?.hero_title?.part_2,
    highlight: homepage?.acf?.hero_title?.highlight,
    part_3: homepage?.acf?.hero_title?.part_3,
  };

  const heroImageUrl = getImageUrl(homepage?.acf?.hero_image);

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-16 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-16">
        <div className="max-w-4xl">
        <h1 className="text-left text-4xl sm:text-9xl leading-tight sm:leading-none tracking-tight sm:tracking-tighter">
          <span className="text-zinc-300 font-light">
            {heroTitle.part_1}{" "}
          </span>
          <span>
            <span className="text-zinc-300 font-light">{heroTitle.part_2} </span>
            <span className="text-white font-normal">{heroTitle.highlight} </span>
            <span className="text-zinc-300 font-light">{heroTitle.part_3}</span>
          </span>
        </h1>
        </div>

        <div className="w-full">
          <div className="relative w-full h-64 sm:h-96 md:h-[760px] rounded-xl overflow-hidden">
            {heroImageUrl && (
              <Image
                src={heroImageUrl}
                alt="Syfre AI hero image"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
