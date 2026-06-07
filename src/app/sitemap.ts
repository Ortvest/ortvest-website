import { MetadataRoute } from 'next';

const baseUrl = 'https://www.ortvest.com';
const locales = ['en', 'ua', 'pl'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: locale === 'en' ? baseUrl : `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  return routes;
}
