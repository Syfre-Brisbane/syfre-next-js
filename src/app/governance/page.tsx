import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecondCTA from '@/components/SecondCTA';
import GovernanceHero from '@/components/governance/GovernanceHero';
import ComplianceMatrix from '@/components/governance/ComplianceMatrix';
import FAIRAProcess from '@/components/governance/FAIRAProcess';
import FrameworkCard from '@/components/governance/FrameworkCard';
import GovernanceFAQ from '@/components/governance/GovernanceFAQ';
import {
  ethicsPrinciples,
  fairaSteps,
  qgeaAlignments,
  governanceFAQs,
} from '@/lib/governance-data';

export const metadata: Metadata = {
  title: 'AI Governance & Compliance Hub | QGEA & FAIRA Alignment',
  description:
    'How Syfre aligns to the QGEA AI Governance Policy, supports FAIRA risk assessments, and maps to the 8 Australian AI Ethics Principles. Governance evidence for Queensland Government agencies.',
  alternates: {
    canonical: '/governance',
  },
  openGraph: {
    title: 'AI Governance & Compliance Hub | Syfre',
    description:
      'How Syfre aligns to the QGEA AI Governance Policy, supports FAIRA risk assessments, and maps to the 8 Australian AI Ethics Principles.',
    url: 'https://syfre.ai/governance',
    type: 'website',
    images: [OG_IMAGE],
  },
};

const governanceJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://syfre.ai/governance/#webpage',
      url: 'https://syfre.ai/governance',
      name: 'AI Governance & Compliance Hub | Syfre',
      description:
        'How Syfre aligns to the QGEA AI Governance Policy, supports FAIRA risk assessments, and maps to the 8 Australian AI Ethics Principles.',
      isPartOf: { '@id': 'https://syfre.ai/#website' },
      about: [
        {
          '@type': 'Thing',
          name: 'QGEA AI Governance Policy',
          description: 'The Queensland Government Enterprise Architecture policy governing AI use in Queensland Government agencies.',
        },
        {
          '@type': 'Thing',
          name: 'Foundational AI Risk Assessment (FAIRA)',
          description: 'The Queensland Government mandatory risk assessment process for AI systems.',
        },
        {
          '@type': 'Thing',
          name: '8 Australian AI Ethics Principles',
          description: 'The Australian Government framework of eight principles guiding ethical AI development and deployment.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: governanceFAQs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syfre.ai' },
        { '@type': 'ListItem', position: 2, name: 'Governance', item: 'https://syfre.ai/governance' },
      ],
    },
  ],
};

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(governanceJsonLd) }}
      />
      <Header />
      <main>
        <GovernanceHero />

        <ComplianceMatrix alignments={qgeaAlignments} />

        <FAIRAProcess steps={fairaSteps} />

        {/* 8 Australian AI Ethics Principles */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-4">
              <span className="text-zinc-400">How does Syfre address the </span>
              <span className="text-white font-normal">8 Australian AI Ethics Principles?</span>
            </h2>
            <p className="text-lg font-light text-zinc-400 mb-12 max-w-3xl">
              The 8 Australian AI Ethics Principles are the foundation of responsible AI in Australia. Queensland Government agencies must demonstrate alignment to these principles for all AI deployments. Here is how Syfre addresses each one.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ethicsPrinciples.map((principle, index) => (
                <FrameworkCard key={principle.name} principle={principle} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Sector solutions */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-8">
              <span className="text-zinc-400">How we work with </span>
              <span className="text-white font-normal">Queensland&apos;s public sector</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/solutions/state-government"
                className="group border border-zinc-800 rounded-lg p-6 hover:border-green-400/40 transition-colors"
              >
                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-green-400 transition-colors">
                  State Government
                </h3>
                <p className="text-zinc-400 text-sm font-light mb-4">
                  FAIRA-ready AI governance for Queensland state agencies, with audit-ready evidence for PAF gate reviews.
                </p>
                <span className="text-green-400 text-sm font-medium inline-flex items-center gap-1">
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/solutions/local-councils"
                className="group border border-zinc-800 rounded-lg p-6 hover:border-green-400/40 transition-colors"
              >
                <h3 className="text-white font-medium text-lg mb-2 group-hover:text-green-400 transition-colors">
                  Local Councils
                </h3>
                <p className="text-zinc-400 text-sm font-light mb-4">
                  AI solutions for municipal operations with governance scaled for council resources and community transparency.
                </p>
                <span className="text-green-400 text-sm font-medium inline-flex items-center gap-1">
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        <GovernanceFAQ faqs={governanceFAQs} />
      </main>
      <SecondCTA
        heading="Need help meeting your AI governance obligations?"
        subheading="Book a FAIRA-mapped briefing with our team."
        ctaText="Book a briefing"
        ctaHref="/contact"
      />
      <Footer />
    </div>
  );
}
