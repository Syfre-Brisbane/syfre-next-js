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
        '@type': 'ProfessionalService',
        name: 'Syfre AI Solutions',
        url: 'https://syfre.ai',
        logo: 'https://syfre.ai/logo.svg',
        description: 'Brisbane-based AI consulting and automation specialists.',
        founder: {
          '@type': 'Person',
          name: 'Steve Macfarlane',
          jobTitle: 'Founder & AI Consultant',
          url: 'https://syfre.ai',
          sameAs: [
            'https://www.linkedin.com/in/stevemacfarlaneaibrisbane',
          ],
        },
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
      },
      {
        '@type': 'WebPage',
        url: url,
        author: {
          '@type': 'Person',
          name: 'Steve Macfarlane',
          jobTitle: 'Founder & AI Consultant',
          url: 'https://syfre.ai',
          sameAs: [
            'https://www.linkedin.com/in/stevemacfarlaneaibrisbane',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'Syfre AI Solutions',
            url: 'https://syfre.ai',
          },
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
