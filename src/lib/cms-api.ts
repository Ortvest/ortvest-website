const IS_BUILD = process.env.NEXT_PHASE === 'phase-production-build';

let missingCmsUrlLogged = false;

/**
 * Ortvest CMS base URL (server-side only).
 * Reads ORTVEST_CMS_API_URL. Throws during `next build` if the variable is absent
 * so the build fails loudly rather than producing an empty blog/sitemap.
 */
export function resolveCmsApiUrl(): string {
  const fromEnv = process.env.ORTVEST_CMS_API_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;

  if (IS_BUILD) {
    throw new Error(
      '[Ortvest CMS] ORTVEST_CMS_API_URL is not set. ' +
        'Set it to your CMS origin (e.g. https://cms.ortvest.com) before running `next build`.'
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!missingCmsUrlLogged) {
      console.warn(
        '[Ortvest CMS] ORTVEST_CMS_API_URL is not set. Falling back to http://localhost:3200.'
      );
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

/**
 * Shared fetch options for all CMS blog requests.
 * Uses native Next.js ISR with a 5-minute revalidation window and the 'blog' cache tag
 * so `revalidateTag('blog')` from the /api/revalidate webhook instantly invalidates all
 * blog data without a full redeploy.
 */
const blogFetchOpts: RequestInit = {
  next: { revalidate: 300, tags: ['blog'] },
  headers: { Accept: 'application/json' },
};

export type CmsBlogPostsResult = {
  rows: CmsBlogPostRow[];
  status: 'success' | 'error';
};

async function fetchRawCmsBlogPosts(base: string, language: string): Promise<CmsBlogPostRow[]> {
  const q = new URLSearchParams({ language });
  const url = `${base}/api/blog?${q}`;
  const response = await fetch(url, blogFetchOpts);
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
}

export async function fetchCmsBlogPostsResult(locale: string): Promise<CmsBlogPostsResult> {
  const base = resolveCmsApiUrl();
  if (!base) return { rows: [], status: 'error' };
  const language = locale === 'ua' ? 'uk' : locale;
  try {
    const rows = await fetchRawCmsBlogPosts(base, language);
    return { rows, status: 'success' };
  } catch (error) {
    if (IS_BUILD) throw error;
    console.error(
      `[Ortvest CMS] Failed to fetch published blog posts for locale "${locale}".`,
      error
    );
    return { rows: [], status: 'error' };
  }
}

export async function fetchCmsBlogPosts(locale: string): Promise<CmsBlogPostRow[]> {
  const result = await fetchCmsBlogPostsResult(locale);
  return result.rows;
}

export async function fetchCmsBlogPostBySlug(
  slug: string,
  locale?: string
): Promise<CmsBlogPostRow | null> {
  const base = resolveCmsApiUrl();
  if (!base || !slug) return null;
  const url = `${base}/api/blog/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, blogFetchOpts);
    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`[Ortvest CMS] Failed to fetch blog post "${slug}": HTTP ${res.status}.`);
      }
      return null;
    }
    const row = (await res.json()) as CmsBlogPostRow;
    if (!row || row.status !== 'published') {
      console.error(
        `[Ortvest CMS] Blog post "${slug}" returned an invalid or unpublished payload.`
      );
      return null;
    }
    if (locale && row.language !== (locale === 'ua' ? 'uk' : locale)) return null;
    return row;
  } catch (error) {
    if (IS_BUILD) throw error;
    console.error(`[Ortvest CMS] Failed to fetch blog post "${slug}".`, error);
    return null;
  }
}
