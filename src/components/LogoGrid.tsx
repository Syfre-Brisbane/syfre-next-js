'use client';

import { useHomepage } from '@/hooks/useWordPress';
import { getImageUrl } from '@/lib/image-utils';
import { useEffect, useRef, useState } from 'react';

export default function LogoGrid() {
  const { data, loading, error } = useHomepage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showArrows, setShowArrows] = useState(false);
  const logos = data?.acf?.logos || [];

  // Check if we need to show arrows (mobile always, desktop when more than 4 logos)
  useEffect(() => {
    const checkShowArrows = () => {
      const isMobile = window.innerWidth < 640;
      const shouldShowArrows = isMobile || logos.length > 4;
      setShowArrows(shouldShowArrows);
    };

    checkShowArrows();
    window.addEventListener('resize', checkShowArrows);
    return () => window.removeEventListener('resize', checkShowArrows);
  }, [logos.length]);

  // Update scroll button states
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Auto-scroll logic (only on desktop when arrows are hidden)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || logos.length === 0 || showArrows) return;

    // Only auto-scroll on desktop when no manual controls
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
  }, [logos, showArrows]);

  // Initialize scroll buttons on mount
  useEffect(() => {
    updateScrollButtons();
  }, [logos]);

  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    
    setTimeout(updateScrollButtons, 300);
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    setTimeout(updateScrollButtons, 300);
  };

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
        <div className="w-full relative">
          {/* Left Arrow */}
          {showArrows && (
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                canScrollLeft 
                  ? 'hover:bg-white/20 hover:border-white/30 text-white cursor-pointer' 
                  : 'text-white/30 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
          )}

          {/* Right Arrow */}
          {showArrows && (
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
                canScrollRight 
                  ? 'hover:bg-white/20 hover:border-white/30 text-white cursor-pointer' 
                  : 'text-white/30 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          )}

          {/* Logo Container */}
          <div 
            className={`overflow-hidden ${showArrows ? 'mx-12' : ''}`}
          >
            <div 
              ref={scrollRef}
              className={`flex gap-4 sm:gap-8 items-center justify-center overflow-y-hidden ${
                showArrows ? 'overflow-x-auto scrollbar-hide' : 'overflow-x-auto sm:overflow-hidden'
              }`}
              style={{ scrollBehavior: 'smooth' }}
              onScroll={updateScrollButtons}
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
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}