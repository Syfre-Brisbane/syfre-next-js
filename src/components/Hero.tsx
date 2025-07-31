'use client';

import { useHomepage } from '@/hooks/useWordPress';
import { getImageUrl } from '@/lib/image-utils';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Hero() {
  const { data: homepage, loading, error, getHeroTitle } = useHomepage();

  if (loading) {
    return (
      <SkeletonTheme baseColor="#27272A" highlightColor="#3F3F46">
        <section className="px-4 sm:px-6 py-8 sm:py-16 w-full">
          <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-16">
            <div className="max-w-4xl">
              <Skeleton height={64} count={2} className="mb-4 sm:hidden" />
              <Skeleton height={96} count={2} className="mb-4 hidden sm:block" />
            </div>
            
            <div className="w-full">
              <Skeleton height={256} className="rounded-xl sm:hidden" />
              <Skeleton height={760} className="rounded-xl hidden sm:block" />
            </div>
          </div>
        </section>
      </SkeletonTheme>
    );
  }

  if (error) {
    console.error('Hero error:', error);
  }

  const heroTitle = getHeroTitle();

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
          <div
            className="w-full h-64 sm:h-96 md:h-[760px] rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImageUrl}')` }}
          />
        </div>
      </div>
    </section>
  );
}