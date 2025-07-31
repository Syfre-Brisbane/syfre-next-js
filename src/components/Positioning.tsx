'use client';

import { useHomepage } from "@/hooks/useWordPress";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Positioning() {
  const { data: homepage, loading, error, getPositioningText } = useHomepage();

  if (loading) {
    return (
      <SkeletonTheme baseColor="#27272A" highlightColor="#3F3F46">
        <section className="px-6 py-40">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <div className="max-w-4xl text-center">
              <Skeleton height={60} count={3} className="mb-4" />
            </div>
          </div>
        </section>
      </SkeletonTheme>
    );
  }

  if (error) {
    console.error('Positioning error:', error);
  }

  const positioningText = getPositioningText();

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