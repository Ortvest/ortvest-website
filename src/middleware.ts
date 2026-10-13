import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from './i18n/routing';
import {
  findServicePage,
  findServicePageByLocalizedSlug,
  localizedServiceSlug,
  SERVICE_INDEX_LOCALES,
  servicePath,
  serviceSegment,
} from './modules/Services/servicePages';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

const INTERNAL_SERVICE_SEGMENT = 'services';

type ServiceRequest = { locale: string; segment: string; slug?: string };

/** Parse `/pl/uslugi/tworzenie-mvp` into its parts, or null if it is not a service URL. */
function parseServiceRequest(pathname: string): ServiceRequest | null {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2 || parts.length > 3) return null;

  const [locale, segment, slug] = parts;
  if (!SERVICE_INDEX_LOCALES.includes(locale)) return null;
  if (segment !== serviceSegment(locale) && segment !== INTERNAL_SERVICE_SEGMENT) return null;

  return { locale, segment, slug };
}

function rewriteTo(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.rewrite(url);
}

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}

/**
 * Service pages live at `[locale]/services/[slug]` in the App Router but are
 * published under localized URLs (`/pl/uslugi/tworzenie-mvp`). This rewrites the
 * localized URL onto the internal route, and redirects the internal URL to the
 * localized one, so each page is reachable at exactly one address per locale.
 *
 * Deeper paths (`.../opengraph-image`) are deliberately left alone: Next builds
 * those URLs from the internal route and they must keep resolving.
 */
function handleServiceUrl(request: NextRequest): NextResponse | null {
  const parsed = parseServiceRequest(request.nextUrl.pathname);
  if (!parsed) return null;

  const { locale, segment, slug } = parsed;
  const localizedSegment = serviceSegment(locale);
  // Nothing to translate when the locale publishes under the internal segment.
  if (localizedSegment === INTERNAL_SERVICE_SEGMENT) return null;

  // Localized URL → render the internal route.
  if (segment === localizedSegment) {
    if (!slug) return rewriteTo(request, `/${locale}/${INTERNAL_SERVICE_SEGMENT}`);

    const page = findServicePageByLocalizedSlug(locale, slug);
    if (!page) return null; // unknown slug — let it 404 through the catch-all
    return rewriteTo(request, `/${locale}/${INTERNAL_SERVICE_SEGMENT}/${page.slug}`);
  }

  // Internal (English) URL under a locale that publishes its own → redirect.
  if (!slug) return redirectTo(request, `/${locale}${servicePath(locale)}`);

  const page = findServicePage(slug);
  if (!page || !page.locales.includes(locale)) return null;

  return redirectTo(request, `/${locale}/${localizedSegment}/${localizedServiceSlug(page, locale)}`);
}

export default function middleware(request: NextRequest) {
  const serviceResponse = handleServiceUrl(request);
  if (serviceResponse) return serviceResponse;

  return intlMiddleware(request);
}

export const config = {
  // Skip API, Next/Vercel internals, static assets, and SEO/root text files.
  // Without this, paths like /llms.txt can be treated as [locale] and return HTML.
  matcher: ['/((?!api|_next|_vercel|favicon\\.ico|robots\\.txt|sitemap\\.xml|llms\\.txt|.*\\..*).*)'],
};
