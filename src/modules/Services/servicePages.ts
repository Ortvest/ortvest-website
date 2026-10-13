/**
 * Service landing pages.
 *
 * Each entry is one indexable URL per locale, targeting a query people actually
 * search for. Copy lives in `messages/<locale>.json` under
 * `servicePages.<slug>`; this file holds the structure, the cross-links (proof
 * cases, related posts) that make the page earn its place, and the localized
 * URLs.
 *
 * URLs are localized in both segments: `/en/services/marketplace-development`
 * and `/pl/uslugi/tworzenie-marketplace`. The App Router directory stays
 * `[locale]/services/[slug]` with the English slug as the param — `middleware`
 * rewrites the localized path onto it and redirects the English path under a
 * non-English locale to the localized one, so each page has exactly one
 * reachable URL per locale.
 *
 * `locales` is the list of locales the page exists in — anything else 404s, the
 * same way /business does. Add a locale here only once its copy is written and
 * reviewed, because hreflang and the sitemap read this list.
 */
export type ServicePageDefinition = {
  /** Canonical (English) slug — also the App Router `[slug]` param. */
  slug: string;
  /** Per-locale URL slug. Locales missing here fall back to `slug`. */
  slugs: Record<string, string>;
  /** Case study ids from @modules/Cases/data used as proof on this page. */
  caseIds: string[];
  /** Blog slugs offered as related reading — the page's outbound internal links. */
  postSlugs: string[];
  locales: string[];
};

/** Per-locale first path segment. ASCII only: `usługi` would be percent-encoded. */
export const SERVICE_SEGMENTS: Record<string, string> = {
  en: 'services',
  pl: 'uslugi',
};

export const DEFAULT_SERVICE_SEGMENT = 'services';

export const SERVICE_PAGES: ServicePageDefinition[] = [
  {
    slug: 'booking-website-development',
    slugs: { pl: 'strony-z-rezerwacja-online' },
    caseIds: ['pachaca', 'skisailclub', 'teya'],
    postSlugs: ['service-business-two-sided-product', 'pachaca-booking-flow-on-demand', 'why-website-quotes-differ'],
    locales: ['en', 'pl'],
  },
  {
    slug: 'marketplace-development',
    slugs: { pl: 'tworzenie-marketplace' },
    caseIds: ['pachaca', 'sharingground', 'skisailclub'],
    postSlugs: [
      'day-one-question-marketplace-cold-start',
      'marketplace-admin-tooling-operational-features',
      'vibe-coding-marketplace-real-cost',
    ],
    locales: ['en', 'pl'],
  },
  {
    slug: 'p2p-platform-development',
    slugs: { pl: 'tworzenie-platform-p2p' },
    caseIds: ['sharingground', 'pachaca', 'yachtmate'],
    postSlugs: [
      'p2p-platform-vs-marketplace',
      'marketplace-admin-tooling-operational-features',
      'day-one-question-marketplace-cold-start',
    ],
    locales: ['en', 'pl'],
  },
  {
    slug: 'community-platform-development',
    slugs: { pl: 'platformy-spolecznosciowe' },
    caseIds: ['yachtmate', 'skisailclub', 'profitcraft'],
    postSlugs: ['day-one-question-marketplace-cold-start', 'service-business-two-sided-product'],
    locales: ['en', 'pl'],
  },
  {
    slug: 'mvp-development',
    slugs: { pl: 'tworzenie-mvp' },
    caseIds: ['sharingground', 'pachaca', 'yachtmate'],
    postSlugs: [
      'vibe-coding-marketplace-real-cost',
      'why-website-quotes-differ',
      'day-one-question-marketplace-cold-start',
    ],
    locales: ['en', 'pl'],
  },
  {
    slug: 'mobile-app-development',
    slugs: { pl: 'tworzenie-aplikacji-mobilnych' },
    caseIds: ['pachaca', 'yachtmate', 'teya'],
    postSlugs: ['native-vs-cross-platform-vs-web-app', 'pachaca-booking-flow-on-demand', 'why-website-quotes-differ'],
    locales: ['en', 'pl'],
  },
];

/** Locales where the services index itself exists (union of all page locales). */
export const SERVICE_INDEX_LOCALES = Array.from(new Set(SERVICE_PAGES.flatMap((page) => page.locales)));

export function serviceSegment(locale: string): string {
  return SERVICE_SEGMENTS[locale] ?? DEFAULT_SERVICE_SEGMENT;
}

export function findServicePage(slug: string): ServicePageDefinition | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}

export function servicePagesForLocale(locale: string): ServicePageDefinition[] {
  return SERVICE_PAGES.filter((page) => page.locales.includes(locale));
}

export function localizedServiceSlug(page: ServicePageDefinition, locale: string): string {
  return page.slugs[locale] ?? page.slug;
}

/**
 * Localized path without the locale prefix: `/services/mvp-development`,
 * `/uslugi/tworzenie-mvp`, or just `/uslugi` for the index.
 */
export function servicePath(locale: string, slug?: string): string {
  const segment = serviceSegment(locale);
  if (!slug) return `/${segment}`;

  const page = findServicePage(slug);
  const localizedSlug = page ? localizedServiceSlug(page, locale) : slug;
  return `/${segment}/${localizedSlug}`;
}

/** Reverse lookup used by the middleware rewrite. */
export function findServicePageByLocalizedSlug(
  locale: string,
  localizedSlug: string
): ServicePageDefinition | undefined {
  return SERVICE_PAGES.find(
    (page) => page.locales.includes(locale) && localizedServiceSlug(page, locale) === localizedSlug
  );
}

/**
 * Service pages that list this post as related reading — the inverse of
 * `postSlugs`, so the blog links back into the commercial pages without a
 * second mapping to keep in sync.
 */
export function servicePagesForPost(postSlug: string, locale: string): ServicePageDefinition[] {
  return SERVICE_PAGES.filter((page) => page.locales.includes(locale) && page.postSlugs.includes(postSlug));
}
