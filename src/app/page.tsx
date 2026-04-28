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

const homepageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://syfre.ai/#webpage',
  url: 'https://syfre.ai',
  name: 'Syfre AI Solutions | Brisbane AI Consulting & Automation',
  description: 'Brisbane-based AI consulting specialists. We build AI strategy, automation, machine learning, and agentic AI solutions for ambitious businesses.',
  isPartOf: { '@id': 'https://syfre.ai/#website' },
  about: { '@id': 'https://syfre.ai/#organization' },
  mainEntity: {
    '@type': 'ProfessionalService',
    '@id': 'https://syfre.ai/#localbusiness',
    name: 'Syfre AI Solutions',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Consulting Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Strategy Consulting', url: 'https://syfre.ai/services/ai-strategy-consulting' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation', url: 'https://syfre.ai/services/ai-automation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Machine Learning & Predictive Modelling', url: 'https://syfre.ai/services/machine-learning-predictive-modelling' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Agentic AI Solutions', url: 'https://syfre.ai/services/agentic-ai-solutions' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Intelligence & Data Analytics', url: 'https://syfre.ai/services/business-intelligence-data-analytics' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Generative Engine Optimisation (GEO)', url: 'https://syfre.ai/services/generative-engine-optimisation' } },
      ],
    },
  },
};

export default async function Home() {
  const homepage = await getHomepageData() as HomepageData | null;

  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <Header />
      <main>
        <Hero homepage={homepage} />
        <Positioning homepage={homepage} />
        <ServicesGrid homepage={homepage} />
        <LogoGrid homepage={homepage} />
        <WhatWeDo homepage={homepage} />
        <CTA />
        <Insights />
        <Humans homepage={homepage} />
        <SecondCTA />
      </main>
      <Footer />
    </div>
  );
}