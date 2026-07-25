import { unstable_cache } from 'next/cache';

let missingCmsUrlLogged = false;

/**
 * Ortvest CMS base URL (server-side). Same resolution as cms-subscribe proxy.
 */
export function resolveCmsApiUrl(): string {
  const fromEnv = process.env.ORTVEST_CMS_API_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV !== 'production') {
    if (!missingCmsUrlLogged) {
      console.warn('[Ortvest CMS] ORTVEST_CMS_API_URL is not set. Falling back to http://localhost:3200.');
      missingCmsUrlLogged = true;
    }
    return 'http://localhost:3200';
  }
  if (!missingCmsUrlLogged) {
    console.error('[Ortvest CMS] ORTVEST_CMS_API_URL is not set. Blog content is unavailable.');
    missingCmsUrlLogged = true;
  }
  return '';
}

/** Row shape from CMS GET /api/blog (public published list). */
export type CmsBlogPostRow = {
  id: string;
  title: string;
  slug: string;
  content: unknown;
  cover_image: string | null;
  status: string;
  author_name: string | null;
  tags: string[];
  categories: string[];
  language: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const fetchOpts: RequestInit = {
  cache: 'no-store',
  headers: { Accept: 'application/json' },
};

export type CmsBlogPostsResult = {
  rows: CmsBlogPostRow[];
  status: 'success' | 'error';
};

const fetchCachedCmsBlogPosts = unstable_cache(
  async (base: string, language: string): Promise<CmsBlogPostRow[]> => {
    const q = new URLSearchParams({ language });
    const url = `${base}/api/blog?${q}`;
    const response = await fetch(url, fetchOpts);
    if (!response.ok) {
      throw new Error(`CMS blog request returned HTTP ${response.status}`);
    }
    const data = (await response.json()) as unknown;
    if (!Array.isArray(data)) {
      throw new Error('CMS blog request returned an invalid payload');
    }
    return data.filter((row): row is CmsBlogPostRow =>
      Boolean(row && typeof row === 'object' && (row as CmsBlogPostRow).status === 'published')
    );
  },
  ['ortvest-cms-blog-posts'],
  { revalidate: 60 }
);

export async function fetchCmsBlogPostsResult(locale: string): Promise<CmsBlogPostsResult> {
  const base = resolveCmsApiUrl();
  if (!base) return { rows: [], status: 'error' };
  const language = locale === 'ua' ? 'uk' : locale;
  try {
    const rows = await fetchCachedCmsBlogPosts(base, language);
    return { rows, status: 'success' };
  } catch (error) {
    console.error(`[Ortvest CMS] Failed to fetch published blog posts for locale "${locale}".`, error);
    return { rows: [], status: 'error' };
  }
}

export async function fetchCmsBlogPosts(locale: string): Promise<CmsBlogPostRow[]> {
  const result = await fetchCmsBlogPostsResult(locale);
  return result.rows;
}

export async function fetchCmsBlogPostBySlug(slug: string, locale?: string): Promise<CmsBlogPostRow | null> {
  const base = resolveCmsApiUrl();
  if (!base || !slug) return null;
  const url = `${base}/api/blog/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, fetchOpts);
    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`[Ortvest CMS] Failed to fetch blog post "${slug}": HTTP ${res.status}.`);
      }
      return null;
    }
    const row = (await res.json()) as CmsBlogPostRow;
    if (!row || row.status !== 'published') {
      console.error(`[Ortvest CMS] Blog post "${slug}" returned an invalid or unpublished payload.`);
      return null;
    }
    if (locale && row.language !== (locale === 'ua' ? 'uk' : locale)) return null;
    return row;
  } catch (error) {
    console.error(`[Ortvest CMS] Failed to fetch blog post "${slug}".`, error);
    return null;
  }
}
