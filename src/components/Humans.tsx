'use client';

import { useHomepage } from '@/hooks/useWordPress';
import { getImageUrl } from '@/lib/image-utils';

export default function Humans() {
  const { data, loading, error } = useHomepage();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;
  
  const teamImageUrl = getImageUrl(data?.acf?.team_image);
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
        <div className="relative">
          <img
            src={teamImageUrl}
            alt="Brisbane Team photo"
            className="w-full h-[300px] object-cover rounded-xl"
          />
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
        <div className="relative">
          <img
            src={teamImageUrl}
            alt="Brisbane Team photo"
            className="w-full max-w-md lg:max-w-lg xl:max-w-3xl h-auto lg:h-[500px] xl:h-[670px] object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}