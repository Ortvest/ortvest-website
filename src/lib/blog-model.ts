import { excerptFromContent, readMinutesFromContent } from '@lib/blog-content';
import type { CmsBlogPostRow } from '@lib/cms-api';

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
    excerpt: excerptFromContent(row.content, 200),
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
