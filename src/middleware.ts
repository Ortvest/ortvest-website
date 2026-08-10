import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from './i18n/routing';

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  // Skip API, Next/Vercel internals, static assets, and SEO/root text files.
  // Without this, paths like /llms.txt can be treated as [locale] and return HTML.
  matcher: [
    '/((?!api|_next|_vercel|favicon\\.ico|robots\\.txt|sitemap\\.xml|llms\\.txt|.*\\..*).*)',
  ],
};
