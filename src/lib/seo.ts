import { defaultLocale, locales, type Locale } from '../i18n/routing';

/** Canonical site origin — always www, matching production redirects. */
export const SITE_URL = 'https://www.ortvest.com';

/**
 * Map URL locale segment → hreflang language code (ISO 639-1 / BCP 47).
 * Path stays `/ua`, but hreflang must be `uk` (Ukrainian), not `ua` (Ukraine).
 */
export function localeToHreflang(locale: string): string {
  if (locale === 'ua') return 'uk';
  return locale;
}

function normalizePath(pathWithoutLocale = ''): string {
  if (!pathWithoutLocale || pathWithoutLocale === '/') return '';
  return pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
}

function localeUrl(locale: string, pathWithoutLocale = ''): string {
  return `${SITE_URL}/${locale}${normalizePath(pathWithoutLocale)}`;
}

/**
 * Reciprocal hreflang set for a localized path.
 * - `canonical` points at the current locale (self)
 * - `languages` includes en / uk / pl + x-default → English
 * - URL paths keep `/ua`; hreflang key for Ukrainian is `uk`
 */
export function buildLocaleAlternates(locale: string, pathWithoutLocale = '') {
  const path = normalizePath(pathWithoutLocale);
  const languages: Record<string, string> = {
    'x-default': localeUrl(defaultLocale, path),
  };

  for (const loc of locales) {
    languages[localeToHreflang(loc)] = localeUrl(loc, path);
  }

  return {
    canonical: localeUrl(locale, path),
    languages,
  };
}

/** Build hreflang map from an explicit list of available URL locales (e.g. blog posts). */
export function buildHreflangLanguages(
  availableLocales: readonly string[],
  pathForLocale: (locale: string) => string,
  options?: { defaultLocale?: Locale }
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of availableLocales) {
    languages[localeToHreflang(loc)] = pathForLocale(loc);
  }
  const fallback = options?.defaultLocale ?? defaultLocale;
  languages['x-default'] = languages[localeToHreflang(fallback)] ?? pathForLocale(fallback);
  return languages;
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
