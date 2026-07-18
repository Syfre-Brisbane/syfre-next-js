interface ServiceJsonLdProps {
  serviceName: string;
  serviceDescription: string;
  serviceType: string;
  slug: string;
  url: string;
}

export default function ServiceJsonLd({ serviceName, serviceDescription, serviceType, slug, url }: ServiceJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: serviceName,
        description: serviceDescription,
        serviceType: serviceType,
        url: url,
        provider: { '@id': 'https://syfre.ai/#organization' },
        areaServed: [
          { '@type': 'City', name: 'Brisbane' },
          { '@type': 'State', name: 'Queensland' },
          { '@type': 'Country', name: 'Australia' },
        ],
        mainEntityOfPage: { '@id': `${url}#webpage` },
      },
      {
        // Extends the sitewide #organization entity declared in the root
        // layout; same @id so the nodes merge rather than duplicating.
        '@type': 'ProfessionalService',
        '@id': 'https://syfre.ai/#organization',
        name: 'Syfre AI Solutions',
        url: 'https://syfre.ai',
        founder: {
          '@type': 'Person',
          name: 'Steve Macfarlane',
          jobTitle: 'Founder & AI Consultant',
          url: 'https://syfre.ai',
          sameAs: [
            'https://www.linkedin.com/in/stevemacfarlaneaibrisbane',
          ],
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url: url,
        isPartOf: { '@id': 'https://syfre.ai/#website' },
        mainEntity: { '@id': `${url}#service` },
        author: {
          '@type': 'Person',
          name: 'Steve Macfarlane',
          jobTitle: 'Founder & AI Consultant',
          url: 'https://syfre.ai',
          sameAs: [
            'https://www.linkedin.com/in/stevemacfarlaneaibrisbane',
          ],
          worksFor: { '@id': 'https://syfre.ai/#organization' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://syfre.ai',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://syfre.ai/services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: serviceName,
            item: `https://syfre.ai/services/${slug}`,
          },
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
