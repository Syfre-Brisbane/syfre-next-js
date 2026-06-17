import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import ServicePageLayout from '@/components/services/ServicePageLayout';
import { getServiceBySlug } from '@/lib/services-data';

const service = getServiceBySlug('ai-roadmap-workshop')!;

const PAGE_URL = `https://syfre.ai/services/${service.slug}`;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  keywords: [
    'AI roadmap workshop',
    'AI roadmap workshop Brisbane',
    'AI strategy workshop',
    'governance-ready AI roadmap',
    'book an AI roadmap workshop',
    'AI opportunity assessment workshop',
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

const workshopEntitySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      '@id': `${PAGE_URL}#course`,
      name: 'AI Roadmap Workshop',
      description:
        'A focused, expert-led half-day workshop, followed by a delivered roadmap, that brings a cross-section of an organisation\'s people together to produce a prioritised, costed, governance-ready AI roadmap with genuine cultural buy-in. Delivers an AI Opportunity Register, a 12-month phased delivery roadmap, a governance scaffold, and executive business cases for priority initiatives.',
      url: PAGE_URL,
      provider: {
        '@type': 'Organization',
        '@id': 'https://syfre.ai/#organization',
        name: 'Syfre AI Solutions',
        url: 'https://syfre.ai',
      },
      educationalLevel: 'Executive',
      learningResourceType: 'Facilitated Workshop',
      teaches: [
        'AI opportunity identification',
        'AI use case prioritisation',
        'AI governance scaffolding',
        'AI risk assessment scoping',
        '8 Australian AI Ethics Principles mapping',
        'Cross-functional AI adoption and cultural buy-in',
        'AI business case development',
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'Executive leadership, transformation leads, CTOs, boards',
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        '@id': `${PAGE_URL}#course-instance`,
        name: 'Syfre AI Roadmap Workshop',
        courseMode: ['Onsite', 'Online'],
        courseWorkload: 'PT4H',
        location: [
          { '@type': 'City', name: 'Brisbane' },
          { '@type': 'State', name: 'Queensland' },
        ],
        instructor: {
          '@type': 'Person',
          name: 'Steve Macfarlane',
          jobTitle: 'Founder & AI Consultant',
          worksFor: { '@id': 'https://syfre.ai/#organization' },
          sameAs: ['https://www.linkedin.com/in/stevemacfarlaneaibrisbane'],
        },
      },
      offers: {
        '@type': 'Offer',
        '@id': `${PAGE_URL}#offer`,
        url: 'https://syfre.ai/contact',
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock',
        category: 'AI Strategy Workshop',
        seller: { '@id': 'https://syfre.ai/#organization' },
        eligibleRegion: [
          { '@type': 'City', name: 'Brisbane' },
          { '@type': 'State', name: 'Queensland' },
          { '@type': 'Country', name: 'Australia' },
        ],
      },
      about: [
        { '@type': 'Thing', name: 'AI Strategy' },
        { '@type': 'Thing', name: 'AI Roadmap' },
        { '@type': 'Thing', name: 'AI Governance' },
        { '@type': 'Thing', name: 'Australian AI Ethics Principles' },
      ],
    },
    {
      '@type': 'Event',
      '@id': `${PAGE_URL}#event`,
      name: 'Syfre AI Roadmap Workshop',
      description:
        'A half-day, expert-led AI Roadmap Workshop for Brisbane and Queensland organisations that brings a cross-section of staff together to produce a prioritised AI roadmap, governance scaffold, and executive business cases.',
      eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: [
        {
          '@type': 'Place',
          name: 'Brisbane (on-site)',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Brisbane',
            addressRegion: 'QLD',
            addressCountry: 'AU',
          },
        },
        {
          '@type': 'VirtualLocation',
          url: 'https://syfre.ai/contact',
        },
      ],
      organizer: { '@id': 'https://syfre.ai/#organization' },
      offers: { '@id': `${PAGE_URL}#offer` },
      url: PAGE_URL,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopEntitySchema) }}
      />
      <ServicePageLayout service={service} />
    </>
  );
}
