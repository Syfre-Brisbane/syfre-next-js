import { MetadataRoute } from 'next';
import { getRecentArticles } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getRecentArticles(100);

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://syfre.ai/insights/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: 'https://syfre.ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://syfre.ai/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://syfre.ai/insights',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://syfre.ai/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...articleUrls,
  ];
}
