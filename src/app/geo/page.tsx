import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import GeoLanding from './GeoLanding';

const TITLE = 'Get Recommended by AI | Free AI Visibility Snapshot — Syfre';
const DESCRIPTION =
  'When buyers ask ChatGPT, Gemini, Perplexity and Google AI who to hire, does your business come up? Get a free AI Visibility Snapshot and see exactly where you stand.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/geo' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://syfre.ai/geo',
    type: 'website',
    images: [OG_IMAGE],
  },
};

// FAQ content lives here so the visible accordion and the FAQPage schema stay in
// sync — one source, rendered twice.
const faqs = [
  {
    q: 'What is an AI Visibility Snapshot?',
    a: 'A short report showing whether ChatGPT, Gemini, Perplexity and Google AI Overviews name your business when someone asks who to hire in your field — and the main reasons you are, or are not, in the answer.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. You get the Snapshot by email, no payment and no obligation. If you decide you want help acting on it, we can talk — but that is your call.',
  },
  {
    q: 'Will this work for my business?',
    a: 'It is built for established service businesses that already invest in being found and want to understand how AI search is changing who gets recommended.',
  },
  {
    q: 'What is GEO?',
    a: 'Generative Engine Optimisation — the work of making your business identifiable, credible and useful enough that AI assistants recommend and cite you in their answers, not just rank you in a list of links.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://syfre.ai/geo#webpage',
      url: 'https://syfre.ai/geo',
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { '@id': 'https://syfre.ai/#website' },
      about: { '@id': 'https://syfre.ai/#organization' },
      primaryImageOfPage: OG_IMAGE.url,
    },
    {
      '@type': 'Service',
      '@id': 'https://syfre.ai/geo#service',
      name: 'Generative Engine Optimisation (GEO)',
      serviceType: 'Generative Engine Optimisation',
      provider: { '@id': 'https://syfre.ai/#organization' },
      areaServed: { '@type': 'Country', name: 'Australia' },
      description:
        'Syfre helps businesses get recommended and cited inside AI answers from ChatGPT, Google AI Overviews, Gemini and Perplexity.',
      offers: {
        '@type': 'Offer',
        name: 'Free AI Visibility Snapshot',
        price: '0',
        priceCurrency: 'AUD',
        description:
          'A free report showing whether AI assistants name your business and what to fix first.',
        url: 'https://syfre.ai/geo',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://syfre.ai/geo#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syfre.ai' },
        { '@type': 'ListItem', position: 2, name: 'AI Visibility Snapshot', item: 'https://syfre.ai/geo' },
      ],
    },
  ],
};

export default function GeoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GeoLanding faqs={faqs} />
    </div>
  );
}
