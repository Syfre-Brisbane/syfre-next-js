import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecondCTA from '@/components/SecondCTA';
import SolutionCard from '@/components/solutions/SolutionCard';
import { solutionsList } from '@/lib/solutions-data';

export const metadata: Metadata = {
  title: 'AI Solutions for Queensland Government',
  description: 'FAIRA-ready AI solutions for Queensland state agencies, local councils, and Queensland Health. Governance-first AI aligned to the QGEA AI Governance Policy.',
  alternates: {
    canonical: '/solutions',
  },
  openGraph: {
    title: 'AI Solutions for Queensland Government | Syfre',
    description: 'FAIRA-ready AI solutions for Queensland state agencies, local councils, and Queensland Health.',
    url: 'https://syfre.ai/solutions',
    type: 'website',
    images: [OG_IMAGE],
  },
};

const solutionsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://syfre.ai/solutions/#collectionpage',
      url: 'https://syfre.ai/solutions',
      name: 'AI Solutions for Queensland Government',
      description: 'FAIRA-ready AI solutions for Queensland state agencies, local councils, and Queensland Health.',
      isPartOf: { '@id': 'https://syfre.ai/#website' },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: solutionsList.map((solution, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: solution.title,
          url: `https://syfre.ai/solutions/${solution.slug}`,
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syfre.ai' },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://syfre.ai/solutions' },
      ],
    },
  ],
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionsJsonLd) }}
      />
      <Header />
      <main>
        <section className="px-4 sm:px-6 pt-12 sm:pt-24 pb-16 sm:pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.1] tracking-tight mb-6">
                <span className="text-zinc-400">AI Solutions for </span>
                <span className="text-white font-normal">Queensland Government</span>
              </h1>
              <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
                Governance-first AI for state agencies, local councils, and Queensland Health. Every solution is aligned to the QGEA AI Governance Policy and FAIRA requirements — with audit-ready evidence produced as standard.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutionsList.map((solution) => (
                <SolutionCard key={solution.slug} solution={solution} />
              ))}
            </div>
          </div>
        </section>
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
