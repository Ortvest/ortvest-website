import { MetadataRoute } from 'next';

import { localesWithPublishedPosts } from '@lib/blog-model';
import { fetchCmsBlogPosts } from '@lib/cms-api';
import { localeToHreflang } from '@lib/seo';
import { cases } from '@modules/Cases/data';
import { SERVICE_INDEX_LOCALES, SERVICE_PAGES, servicePath } from '@modules/Services/servicePages';

const baseUrl = 'https://www.ortvest.com';
const locales = ['en', 'ua', 'pl'];

// Re-generate at most every 6 hours instead of on every crawler hit — the
// sitemap fans out to the CMS once per locale and used to answer in ~3s.
export const revalidate = 21600;

/**
 * Hand-maintained last-content-change dates for static routes.
 *
 * Deliberately NOT `new Date()`: a lastmod that moves on every crawl tells
 * Google nothing, so it gets discounted. Bump the date here when the page's
 * copy actually changes.
 */
const STATIC_ROUTE_UPDATED = {
  home: '2026-09-22',
  cases: '2026-09-22',
  partnership: '2026-09-22',
  blog: '2026-10-04',
  services: '2026-10-04',
} as const;

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency'];

/**
 * `xhtml:link` alternates for a localized path — one reciprocal set per URL,
 * with x-default pointing at English (or the first available locale).
 *
 * `pathFor` is a function because some paths are themselves localized:
 * `/en/services/mvp-development` is `/pl/uslugi/tworzenie-mvp`.
 */
function alternatesFor(pathFor: (locale: string) => string, availableLocales: readonly string[]) {
  const languages: Record<string, string> = {};
  for (const locale of availableLocales) {
    languages[localeToHreflang(locale)] = `${baseUrl}/${locale}${pathFor(locale)}`;
  }
  const fallback = availableLocales.includes('en') ? 'en' : availableLocales[0];
  if (fallback) languages['x-default'] = `${baseUrl}/${fallback}${pathFor(fallback)}`;
  return { languages };
}

function entriesFor(
  path: string | ((locale: string) => string),
  availableLocales: readonly string[],
  options: { lastModified: string | Date; changeFrequency: ChangeFrequency; priority: number }
): MetadataRoute.Sitemap {
  const pathFor = typeof path === 'function' ? path : () => path;
  const alternates = alternatesFor(pathFor, availableLocales);
  return availableLocales.map((locale) => ({
    url: `${baseUrl}/${locale}${pathFor(locale)}`,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogLocales = await localesWithPublishedPosts();
  const blogRowsByLocale = await Promise.all(
    blogLocales.map(async (locale) => [locale, await fetchCmsBlogPosts(locale)] as const)
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    ...entriesFor('', locales, {
      lastModified: STATIC_ROUTE_UPDATED.home,
      changeFrequency: 'monthly',
      priority: 1,
    }),
    ...entriesFor('/cases', locales, {
      lastModified: STATIC_ROUTE_UPDATED.cases,
      changeFrequency: 'monthly',
      priority: 0.9,
    }),
    ...entriesFor('/partnership', locales, {
      lastModified: STATIC_ROUTE_UPDATED.partnership,
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    // Only locales that actually have posts — an empty listing is noindexed.
    ...entriesFor('/blog', blogLocales, {
      lastModified: STATIC_ROUTE_UPDATED.blog,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    // Service pages exist only where their copy has been written.
    ...entriesFor((locale) => servicePath(locale), SERVICE_INDEX_LOCALES, {
      lastModified: STATIC_ROUTE_UPDATED.services,
      changeFrequency: 'monthly',
      priority: 0.9,
    }),
    ...SERVICE_PAGES.flatMap((page) =>
      entriesFor((locale) => servicePath(locale, page.slug), page.locales, {
        lastModified: STATIC_ROUTE_UPDATED.services,
        changeFrequency: 'monthly',
        priority: 0.9,
      })
    ),
  ];

  const caseRoutes: MetadataRoute.Sitemap = cases
    .filter((caseItem) => !caseItem.isNDA)
    .flatMap((caseItem) =>
      entriesFor(`/cases/${caseItem.id}`, locales, {
        lastModified: STATIC_ROUTE_UPDATED.cases,
        changeFrequency: 'yearly',
        priority: 0.8,
      })
    );

  // Posts are per-locale: hreflang alternates list only the locales where this
  // exact slug is published.
  const slugLocales = new Map<string, string[]>();
  for (const [locale, rows] of blogRowsByLocale) {
    for (const row of rows) {
      slugLocales.set(row.slug, [...(slugLocales.get(row.slug) ?? []), locale]);
    }
  }

  const blogRoutes: MetadataRoute.Sitemap = blogRowsByLocale.flatMap(([locale, rows]) =>
    rows.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: alternatesFor(() => `/blog/${post.slug}`, slugLocales.get(post.slug) ?? [locale]),
    }))
  );

  return [...staticRoutes, ...caseRoutes, ...blogRoutes];
}
