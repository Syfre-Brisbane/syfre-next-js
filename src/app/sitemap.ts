import { MetadataRoute } from 'next';
import { getRecentArticles } from '@/lib/wordpress';
import { servicesList } from '@/lib/services-data';

// Regenerate sitemap every 5 minutes so new articles appear automatically
export const revalidate = 300;

// Stable last-modified date for static and service pages. Bump this only when
// those pages' content meaningfully changes — NOT on every deploy. Previously
// every URL reported `new Date()` on every regeneration, which made the
// lastModified signal worthless to Google and hurt crawl scheduling.
const STATIC_LAST_MODIFIED = new Date('2026-06-17');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getRecentArticles(100);

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://syfre.ai/insights/${article.slug}`,
    lastModified: article.modified ? new Date(article.modified) : STATIC_LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const serviceUrls: MetadataRoute.Sitemap = servicesList.map((service) => ({
    url: `https://syfre.ai/services/${service.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://syfre.ai',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://syfre.ai/solutions',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://syfre.ai/solutions/state-government',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://syfre.ai/solutions/local-councils',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://syfre.ai/governance',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://syfre.ai/services',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...serviceUrls,
    {
      url: 'https://syfre.ai/about',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://syfre.ai/contact',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://syfre.ai/insights',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://syfre.ai/privacy',
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...articleUrls,
  ];
}
