import type { Metadata } from 'next';
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
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <Positioning />
      <ServicesGrid />
      <LogoGrid />
      <WhatWeDo />
      <CTA />
      <Insights />
      <Humans />
      <SecondCTA />
      <Footer />
    </div>
  );
}