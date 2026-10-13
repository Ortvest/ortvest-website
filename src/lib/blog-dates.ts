export function blogLocaleTag(siteLocale: string): string {
  if (siteLocale === 'ua') return 'uk-UA';
  if (siteLocale === 'pl') return 'pl-PL';
  return 'en-US';
}

export function formatBlogPostDate(iso: string, siteLocale: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(blogLocaleTag(siteLocale), {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

/** Compact `Oct 4` / `Oct 4, 2026` form used by the homepage field-notes teaser. */
export function formatBlogPostDateShort(iso: string, siteLocale: string, options?: { withYear?: boolean }): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(blogLocaleTag(siteLocale), {
    month: 'short',
    day: 'numeric',
    ...(options?.withYear ? { year: 'numeric' } : {}),
  }).format(d);
}
