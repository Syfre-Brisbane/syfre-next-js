import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import ServicePageLayout from '@/components/services/ServicePageLayout';
import { getServiceBySlug } from '@/lib/services-data';

const service = getServiceBySlug('ai-automation')!;

const PAGE_URL = `https://syfre.ai/services/${service.slug}`;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  keywords: [
    'AI automation Brisbane',
    'AI automation services',
    'book AI automation consultation',
    'book an AI automation consultation',
    'AI automation consultant Brisbane',
    'intelligent document processing Brisbane',
    'AI workflow automation Queensland',
  ],
  alternates: {
    canonical: `/services/${service.slug}`,
  },
  openGraph: {
    title: service.title,
    description: service.description,
    url: PAGE_URL,
    type: 'website',
    images: [OG_IMAGE],
  },
};

const consultationBookingSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#consultation-service`,
      name: 'AI Automation Consultation',
      alternateName: [
        'Book an AI Automation Consultation',
        'AI Automation Scoping Call',
        'AI Automation Discovery Call',
      ],
      description:
        'A 30-minute AI automation consultation with Syfre\'s lead AI consultant in Brisbane. Used to scope the right AI automation approach (intelligent document processing, workflow automation, exception handling, or RPA-plus-AI), identify the highest-ROI opportunity, and produce a fixed-scope build plan with timeline and indicative cost.',
      serviceType: 'AI Automation Consultation',
      category: 'AI Consulting',
      provider: {
        '@type': 'Organization',
        '@id': 'https://syfre.ai/#organization',
        name: 'Syfre AI Solutions',
        url: 'https://syfre.ai',
      },
      areaServed: [
        { '@type': 'City', name: 'Brisbane' },
        { '@type': 'State', name: 'Queensland' },
        { '@type': 'Country', name: 'Australia' },
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'Operations leaders, finance teams, customer service leaders, transformation owners',
      },
      offers: {
        '@type': 'Offer',
        '@id': `${PAGE_URL}#consultation-offer`,
        name: 'Book an AI automation consultation',
        description:
          'No-charge 30-minute AI automation consultation with a Brisbane-based AI consultant. Delivered via video conference or in person.',
        url: 'https://syfre.ai/contact',
        priceCurrency: 'AUD',
        price: '0',
        availability: 'https://schema.org/InStock',
        category: 'Free initial consultation',
        seller: { '@id': 'https://syfre.ai/#organization' },
        eligibleRegion: [
          { '@type': 'City', name: 'Brisbane' },
          { '@type': 'State', name: 'Queensland' },
          { '@type': 'Country', name: 'Australia' },
        ],
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book an AI automation consultation',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://calendly.com/steve-macfarlane-syfre',
            actionPlatform: [
              'https://schema.org/DesktopWebPlatform',
              'https://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'Reservation',
            name: 'AI Automation Consultation',
            provider: { '@id': 'https://syfre.ai/#organization' },
          },
        },
      },
      potentialAction: {
        '@type': 'ReserveAction',
        name: 'Book an AI automation consultation',
        target: 'https://calendly.com/steve-macfarlane-syfre',
      },
      about: [
        { '@type': 'Thing', name: 'AI Automation' },
        { '@type': 'Thing', name: 'Intelligent Document Processing' },
        { '@type': 'Thing', name: 'Workflow Automation' },
        { '@type': 'Thing', name: 'Robotic Process Automation' },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consultationBookingSchema) }}
      />
      <ServicePageLayout service={service} />
    </>
  );
}
