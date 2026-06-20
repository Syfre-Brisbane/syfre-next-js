interface SolutionJsonLdProps {
  name: string;
  description: string;
  audienceType: string;
  slug: string;
}

export default function SolutionJsonLd({ name, description, audienceType, slug }: SolutionJsonLdProps) {
  const url = `https://syfre.ai/solutions/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: name,
        description: description,
        provider: {
          '@type': 'Organization',
          name: 'Syfre AI Solutions',
          url: 'https://syfre.ai',
          '@id': 'https://syfre.ai/#organization',
        },
        areaServed: {
          '@type': 'State',
          name: 'Queensland',
          containedInPlace: {
            '@type': 'Country',
            name: 'Australia',
          },
        },
        audience: {
          '@type': 'GovernmentOrganization',
          name: audienceType,
        },
        serviceType: 'AI Governance and Consulting',
        url: url,
      },
      {
        '@type': 'WebPage',
        url: url,
        name: name,
        description: description,
        isPartOf: { '@id': 'https://syfre.ai/#website' },
        about: [
          { '@type': 'Thing', name: 'QGEA AI Governance Policy' },
          { '@type': 'Thing', name: 'Foundational AI Risk Assessment (FAIRA)' },
          { '@type': 'Thing', name: 'Australian AI Ethics Principles' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syfre.ai' },
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://syfre.ai/solutions' },
          { '@type': 'ListItem', position: 3, name: name, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
