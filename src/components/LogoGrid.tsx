'use client';

import { useHomepage } from '@/hooks/useWordPress';
import { getImageUrl } from '@/lib/image-utils';
import { useEffect, useRef } from 'react';

export default function LogoGrid() {
  const { data, loading, error } = useHomepage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const logos = data?.acf?.logos || [];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || logos.length === 0) return;

    // Only auto-scroll on desktop (screen width >= 640px)
    const isDesktop = window.innerWidth >= 640;
    if (!isDesktop) return;

    let scrollPosition = 0;
    const speed = 0.3; // pixels per frame
    let animationId: number;

    const animate = () => {
      scrollPosition += speed;
      
      // Get container and content dimensions
      const containerWidth = scrollContainer.clientWidth;
      const scrollWidth = scrollContainer.scrollWidth;
      const maxScroll = scrollWidth - containerWidth;
      
      // If we've scrolled to the end, stop the animation
      if (scrollPosition >= maxScroll) {
        scrollPosition = maxScroll;
        scrollContainer.scrollLeft = scrollPosition;
        return;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [logos]);

  if (loading) return <div>Loading logos...</div>;
  if (error) return <div>Error loading logos: {error}</div>;

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-32 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10 items-center justify-center">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-light text-center text-zinc-100 tracking-tight leading-7 sm:leading-8">
            Who We Work With
          </h2>
        </div>

        {/* Logo Carousel */}
        <div className="w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-4 sm:gap-8 items-center justify-center overflow-x-auto overflow-y-hidden sm:overflow-hidden"
            style={{ scrollBehavior: 'smooth' }}
          >
            {logos.map((logoItem, index) => (
              <div 
                key={index}
                className="relative w-[150px] sm:w-[200px] h-[75px] sm:h-[100px] flex items-center justify-center shrink-0"
              >
                <img
                  src={getImageUrl(logoItem.logo)}
                  alt={`Client logo ${index + 1}`}
                  className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}