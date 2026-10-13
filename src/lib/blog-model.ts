import { excerptFromContent, readMinutesFromContent } from '@lib/blog-content';
import { type CmsBlogPostRow, fetchCmsBlogPostsResult } from '@lib/cms-api';

import { locales } from '../i18n/routing';

export type BlogCardModel = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  tags: string[];
  published_at: string;
  authorName: string;
  excerpt: string;
  readMinutes: number;
};

export function resolvePublishedAt(row: CmsBlogPostRow): string | null {
  return row.published_at ?? row.created_at ?? null;
}

export function rowToCardModel(row: CmsBlogPostRow): BlogCardModel | null {
  if (row.status !== 'published') return null;
  const publishedAt = resolvePublishedAt(row);
  if (!publishedAt) return null;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    cover_image: row.cover_image,
    tags: Array.isArray(row.tags) ? row.tags : [],
    published_at: publishedAt,
    authorName: row.author_name?.trim() || '',
    excerpt: row.excerpt?.trim() || excerptFromContent(row.content, 200),
    readMinutes: readMinutesFromContent(row.content),
  };
}

export function rowsToCardModels(rows: CmsBlogPostRow[]): BlogCardModel[] {
  const list = rows.map(rowToCardModel).filter(Boolean) as BlogCardModel[];
  return list.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
}

export function pickRelatedCards(
  all: BlogCardModel[],
  currentSlug: string,
  tagList: string[],
  limit = 3
): BlogCardModel[] {
  const others = all.filter((p) => p.slug !== currentSlug);
  const scored = others.map((p) => ({
    p,
    score: p.tags.filter((t) => tagList.includes(t)).length,
  }));
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.p.published_at).getTime() - new Date(a.p.published_at).getTime();
  });
  return scored.slice(0, limit).map((s) => s.p);
}

/**
 * Locales that currently have at least one published post. A locale with an
 * empty blog must not be advertised through hreflang, linked from the sitemap
 * or indexed — an empty listing is a low-quality page for Google.
 *
 * A failed CMS request counts as "has posts" on purpose. The caller uses this
 * to decide `noindex`, and a transient outage during an ISR revalidation must
 * never be able to deindex a page that is actually fine.
 */
export async function localesWithPublishedPosts(): Promise<string[]> {
  const resultsByLocale = await Promise.all(
    locales.map(async (candidate) => [candidate, await fetchCmsBlogPostsResult(candidate)] as const)
  );
  return resultsByLocale
    .filter(([, result]) => result.status === 'error' || rowsToCardModels(result.rows).length > 0)
    .map(([candidate]) => candidate);
}
