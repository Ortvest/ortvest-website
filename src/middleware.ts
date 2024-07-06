import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ua', 'pl'],

  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(en|ua|pl)/:path*'],
};
