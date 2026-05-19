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
