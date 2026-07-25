import { MetadataRoute } from 'next';

import { fetchCmsBlogPosts } from '@lib/cms-api';
import { cases } from '@modules/Cases/data';

const baseUrl = 'https://www.ortvest.com';
const locales = ['en', 'ua', 'pl'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const generatedAt = new Date();
  const blogRowsByLocale = await Promise.all(
    locales.map(async (locale) => [locale, await fetchCmsBlogPosts(locale)] as const)
  );

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: generatedAt,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/cases`,
      lastModified: generatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: generatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]);

  const caseRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    cases
      .filter((caseItem) => !caseItem.isNDA)
      .map((caseItem) => ({
        url: `${baseUrl}/${locale}/cases/${caseItem.id}`,
        lastModified: generatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
  );

  const blogRoutes: MetadataRoute.Sitemap = blogRowsByLocale.flatMap(([locale, rows]) =>
    rows.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...caseRoutes, ...blogRoutes];
}
