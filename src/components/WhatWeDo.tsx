'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useHomepage } from '@/hooks/useWordPress';
import { getImageUrl } from '@/lib/image-utils';

export default function WhatWeDo() {
  const { data, loading, error } = useHomepage();
  const [activeCard, setActiveCard] = useState('');
  
  const wwdData = data?.acf?.wwd || [];
  
  // Set initial active card when data loads
  useEffect(() => {
    if (wwdData.length > 0 && !activeCard) {
      setActiveCard(`wwd-0`);
    }
  }, [wwdData, activeCard]);

  // Update active card based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const cards = wwdData.map((_, index) => ({
        id: `wwd-${index}`,
        element: document.getElementById(`card-wwd-${index}`)
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const card of cards) {
        if (card.element) {
          const rect = card.element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveCard(card.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [wwdData]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  const handleLinkClick = (cardId: string) => {
    setActiveCard(cardId);
    
    // Smooth scroll to the card
    const cardElement = document.getElementById(`card-${cardId}`);
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-16 w-full scroll-smooth">
      <div className="max-w-7xl mx-auto">
        {/* Main heading - spans full width above everything */}
        <div className="flex flex-col gap-8 mb-8">
          <h2 className="text-3xl sm:text-6xl font-light leading-tight sm:leading-tight text-zinc-300 tracking-tight sm:tracking-tight max-w-5xl">
            We work with <span className="text-white font-normal">ambitious</span> teams to build systems that generate real commercial impact.
          </h2>
        </div>

        {/* Mobile: Single column layout */}
        <div className="flex flex-col gap-8 sm:hidden">
          <p className="text-lg sm:text-2xl font-light leading-7 sm:leading-8 text-zinc-100 tracking-tight sm:tracking-tight">
            We partner with CEOs, product teams and technical leaders who need clarity, capability and a high standard of delivery. Working within complex sectors, moving fast, and solving real problems.
          </p>
          
          <p className="text-lg sm:text-xl font-normal leading-7 sm:leading-8 text-zinc-100">
            We do this by
          </p>

          {/* Mobile cards */}
          <div className="flex flex-col gap-6">
            {wwdData.map((item, index) => (
              <div key={index} className="bg-zinc-900 rounded-xl w-full">
                <div className="bg-zinc-800 rounded-t-xl px-6 py-8 h-[250px] flex items-center justify-center">
                  <div className="w-full h-[200px] flex items-center justify-center overflow-hidden">
                    <img 
                      src={getImageUrl(item.image)}
                      alt={`${item.title} illustration`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-2xl font-light leading-8 text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light text-zinc-400 leading-6">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Left and Right sections */}
        <div className="hidden sm:flex gap-16 lg:gap-24 xl:gap-32 items-start">
          {/* Left side content - sticky within section */}
          <div className="flex flex-col gap-10 max-w-xl shrink-0 sticky top-20 self-start">
            <p className="text-2xl font-light leading-8 text-zinc-100 tracking-tight">
              We partner with CEOs, product teams and technical leaders who need clarity, capability and a high standard of delivery. Working within complex sectors, moving fast, and solving real problems.
            </p>
            
            <p className="text-xl font-normal leading-8 text-zinc-100">
              We do this by
            </p>

            <div className="flex flex-col gap-8 w-full">
              {wwdData.map((item, index) => {
                const cardId = `wwd-${index}`;
                const isActive = activeCard === cardId;
                
                return (
                  <div key={cardId}>
                    <button
                      onClick={() => handleLinkClick(cardId)}
                      className="flex items-center justify-between w-full text-left hover:opacity-80 transition-all duration-300 cursor-pointer"
                    >
                      <span className={`text-lg font-light transition-colors duration-300 ${
                        isActive ? 'text-zinc-100' : 'text-zinc-500'
                      }`}>
                        {item.title}
                      </span>
                      <ArrowRightIcon className={`w-6 h-6 transition-colors duration-300 ${
                        isActive ? 'text-green-400' : 'text-zinc-500'
                      }`} />
                    </button>
                    {index < wwdData.length - 1 && (
                      <div className="h-px bg-zinc-600 w-full mt-8"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side - Cards section */}
          <div className="flex flex-col gap-16 items-start shrink-0">
            {wwdData.map((item, index) => {
              const cardId = `wwd-${index}`;
              return (
                <div key={cardId} id={`card-${cardId}`} className="bg-zinc-900 rounded-xl w-full max-w-2xl scroll-mt-20">
                  <div className="bg-zinc-800 rounded-t-xl px-20 py-16 h-96 flex items-center justify-center">
                    <div className="w-full h-80 flex items-center justify-center overflow-hidden">
                      <img 
                        src={getImageUrl(item.image)}
                        alt={`${item.title} illustration`}
                        className="w-80 h-64 object-cover rounded"
                      />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col gap-3">
                    <h3 className="text-4xl font-light leading-tight text-white tracking-tight max-w-md">
                      {item.title}
                    </h3>
                    <p className="text-base font-light text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}