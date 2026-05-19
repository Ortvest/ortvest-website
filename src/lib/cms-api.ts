/**
 * Ortvest CMS base URL (server-side). Same resolution as cms-subscribe proxy.
 */
export function resolveCmsApiUrl(): string {
  const fromEnv = process.env.ORTVEST_CMS_API_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:3200';
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
  published_at: string | null;
  created_at: string;
};

const fetchOpts: RequestInit = {
  next: { revalidate: 60 },
  headers: { Accept: 'application/json' },
};

export async function fetchCmsBlogPosts(locale: string): Promise<CmsBlogPostRow[]> {
  const base = resolveCmsApiUrl();
  if (!base) return [];
  const q = new URLSearchParams();
  if (locale) q.set('language', locale);
  const url = `${base}/api/blog${q.toString() ? `?${q}` : ''}`;
  try {
    const res = await fetch(url, fetchOpts);
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is CmsBlogPostRow =>
        Boolean(row && typeof row === 'object' && (row as CmsBlogPostRow).status === 'published')
    );
  } catch {
    return [];
  }
}

export async function fetchCmsBlogPostBySlug(slug: string): Promise<CmsBlogPostRow | null> {
  const base = resolveCmsApiUrl();
  if (!base || !slug) return null;
  const url = `${base}/api/blog/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, fetchOpts);
    if (!res.ok) return null;
    const row = (await res.json()) as CmsBlogPostRow;
    if (!row || row.status !== 'published') return null;
    return row;
  } catch {
    return null;
  }
}
