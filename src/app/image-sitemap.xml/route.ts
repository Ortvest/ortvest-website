import { localesWithPublishedPosts, rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPosts } from '@lib/cms-api';
import { SITE_URL } from '@lib/seo';
import { cases } from '@modules/Cases/data';

import { locales } from '../../i18n/routing';

/**
 * Image sitemap.
 *
 * Next 14's `sitemap.ts` has no `images` field (that arrived in Next 15), so
 * the image extension lives in its own file, listed alongside the main sitemap
 * in robots.txt. It matters here because the case studies *are* the portfolio:
 * every screen in them is content worth surfacing in image search.
 */
export const revalidate = 21600;

const MAX_IMAGES_PER_URL = 20;

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      '"': '&quot;',
      '&': '&amp;',
      "'": '&apos;',
      '<': '&lt;',
      '>': '&gt;',
    };
    return entities[character];
  });
}

type ImageEntry = { url: string; images: { loc: string; title: string }[] };

function caseEntries(): ImageEntry[] {
  return locales.flatMap((locale) =>
    cases
      .filter((caseItem) => !caseItem.isNDA)
      .map((caseItem) => {
        const sectionImages = (caseItem.sections ?? []).flatMap((section) => section.images ?? []);
        const all = [caseItem.coverImage, caseItem.preview, ...(caseItem.images ?? []), ...sectionImages].filter(
          (src): src is string => Boolean(src)
        );

        const unique = Array.from(new Set(all)).slice(0, MAX_IMAGES_PER_URL);
        return {
          url: `${SITE_URL}/${locale}/cases/${caseItem.id}`,
          images: unique.map((loc) => ({ loc, title: caseItem.title })),
        };
      })
      .filter((entry) => entry.images.length > 0)
  );
}

async function blogEntries(): Promise<ImageEntry[]> {
  const blogLocales = await localesWithPublishedPosts();
  const rowsByLocale = await Promise.all(
    blogLocales.map(async (locale) => [locale, await fetchCmsBlogPosts(locale)] as const)
  );

  return rowsByLocale.flatMap(([locale, rows]) =>
    rowsToCardModels(rows)
      .filter((post) => Boolean(post.cover_image))
      .map((post) => ({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        images: [{ loc: post.cover_image as string, title: post.title }],
      }))
  );
}

export async function GET() {
  const entries = [...caseEntries(), ...(await blogEntries())];

  const body = entries
    .map(({ url, images }) =>
      [
        '<url>',
        `<loc>${escapeXml(url)}</loc>`,
        ...images.map(
          (image) =>
            `<image:image><image:loc>${escapeXml(image.loc)}</image:loc>` +
            `<image:title>${escapeXml(image.title)}</image:title></image:image>`
        ),
        '</url>',
      ].join('')
    )
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ',
    'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    body,
    '</urlset>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
    },
  });
}
