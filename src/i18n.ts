import { getRequestConfig } from 'next-intl/server';

import { defaultLocale, locales } from './i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is a Promise — awaiting avoids the headers() fallback
  // that the deprecated `{ locale }` parameter triggered in ≥3.22.
  const requested = await requestLocale;

  // Fall back to defaultLocale for global pages (/, not-found, etc.)
  // where no [locale] segment is present.
  const locale = (locales as ReadonlyArray<string>).includes(requested ?? '')
    ? (requested as (typeof locales)[number])
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
