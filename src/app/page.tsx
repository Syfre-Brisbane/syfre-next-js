import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Positioning from '@/components/Positioning';
import ServicesGrid from '@/components/ServicesGrid';
import LogoGrid from '@/components/LogoGrid';
import WhatWeDo from '@/components/WhatWeDo';
import CTA from '@/components/CTA';
import Insights from '@/components/Insights';
import Humans from '@/components/Humans';
import SecondCTA from '@/components/SecondCTA';
import Footer from '@/components/Footer';
import { getHomepageData } from '@/lib/wordpress';
import { HomepageData } from '@/types/wordpress';

export const revalidate = 300; // revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Syfre AI Solutions | Brisbane AI Consulting & Automation',
  description: 'Brisbane-based AI consulting specialists. We build AI strategy, automation, machine learning, and agentic AI solutions for ambitious businesses.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Syfre AI Solutions | Brisbane AI Consulting & Automation',
    description: 'Brisbane-based AI consulting specialists. We build AI strategy, automation, machine learning, and agentic AI solutions for ambitious businesses.',
    url: 'https://syfre.ai',
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default async function Home() {
  const homepage = await getHomepageData() as HomepageData | null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero homepage={homepage} />
      <Positioning homepage={homepage} />
      <ServicesGrid homepage={homepage} />
      <LogoGrid homepage={homepage} />
      <WhatWeDo homepage={homepage} />
      <CTA />
      <Insights />
      <Humans homepage={homepage} />
      <SecondCTA />
      <Footer />
    </div>
  );
}