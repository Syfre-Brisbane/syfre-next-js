interface ServiceJsonLdProps {
  serviceName: string;
  serviceDescription: string;
  serviceType: string;
  url: string;
}

export default function ServiceJsonLd({ serviceName, serviceDescription, serviceType, url }: ServiceJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Syfre AI Solutions',
    url: 'https://syfre.ai',
    logo: 'https://syfre.ai/logo.svg',
    description: 'Brisbane-based AI consulting and automation specialists.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
    areaServed: [
      { '@type': 'City', name: 'Brisbane' },
      { '@type': 'State', name: 'Queensland' },
      { '@type': 'Country', name: 'Australia' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: serviceName,
            description: serviceDescription,
            serviceType: serviceType,
            provider: {
              '@type': 'Organization',
              name: 'Syfre AI Solutions',
              url: 'https://syfre.ai',
            },
            areaServed: {
              '@type': 'City',
              name: 'Brisbane',
            },
          },
        },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@syfre.com.au',
      contactType: 'sales',
      url: 'https://syfre.ai/contact',
    },
    sameAs: [
      'https://www.linkedin.com/company/syfreai',
      'https://x.com/syfre_ai',
    ],
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
