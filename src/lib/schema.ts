import { localeToHreflang, SITE_URL } from './seo';

/**
 * JSON-LD builders.
 *
 * Rules of the house:
 * - Organization and WebSite are site-wide (rendered from the locale layout).
 * - Every other schema type must be rendered ONLY on a page where the matching
 *   content is actually visible. FAQPage in particular: Google requires the
 *   Q&A to be on-page, so it lives on the pages that render an FAQ, never
 *   in the layout.
 * - Stable `@id` values let Google merge the entity across pages.
 */

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Raster logo (180x180 PNG from app/apple-icon.tsx) — Google ignores SVG logos. */
const LOGO_URL = `${SITE_URL}/apple-icon`;

/**
 * Street-level contact details.
 *
 * Fill these in and the Organization entity is emitted as a ProfessionalService
 * (a LocalBusiness subtype) with a full postal address, which is what Google
 * needs to treat Ortvest as a local entity for "software house Poznań"-type
 * queries. Left empty, the markup stays an Organization with city-level address
 * only — incomplete address data is worse than none, so nothing is guessed.
 */
const CONTACT = {
  /**
   * Must match the Google Business Profile listing character for character —
   * a formatting mismatch is a common reason Google fails to merge the entity.
   * The official form is `ul. Augustyna Szamarzewskiego 21 lok. 2`.
   */
  streetAddress: 'Augustyna Szamarzewskiego 21/2',
  postalCode: '60-514',
  telephone: '+48 731 728 031',
  /** Geocoded from the street address (OpenStreetMap, Jeżyce / Rynek Jeżycki). */
  latitude: '52.411100',
  longitude: '16.898515',
  /** NIP, also published as the EU VAT number with the PL prefix. */
  nip: '7812111756',
  /** Polish company register number, published as a typed identifier. */
  krs: '0001244461',
} as const;

const hasStreetAddress = Boolean(CONTACT.streetAddress && CONTACT.postalCode);

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    // ProfessionalService is a LocalBusiness subtype and requires a real street
    // address; without one we stay a plain Organization.
    '@type': hasStreetAddress ? 'ProfessionalService' : 'Organization',
    '@id': ORG_ID,
    name: 'Ortvest',
    legalName: 'Ortvest sp. z o.o.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 180,
      height: 180,
    },
    image: LOGO_URL,
    description:
      'Ortvest designs and builds websites, web services and mobile apps, including the platforms behind them.',
    email: 'contact@ortvest.com',
    ...(CONTACT.telephone ? { telephone: CONTACT.telephone } : {}),
    ...(CONTACT.nip ? { vatID: `PL${CONTACT.nip}`, taxID: CONTACT.nip } : {}),
    ...(CONTACT.krs ? { identifier: { '@type': 'PropertyValue', propertyID: 'KRS', value: CONTACT.krs } } : {}),
    address: {
      '@type': 'PostalAddress',
      ...(CONTACT.streetAddress ? { streetAddress: CONTACT.streetAddress } : {}),
      ...(CONTACT.postalCode ? { postalCode: CONTACT.postalCode } : {}),
      addressLocality: 'Poznań',
      addressCountry: 'PL',
    },
    ...(CONTACT.latitude && CONTACT.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: CONTACT.latitude,
            longitude: CONTACT.longitude,
          },
        }
      : {}),
    areaServed: [
      { '@type': 'Country', name: 'Poland' },
      { '@type': 'Place', name: 'European Union' },
    ],
    knowsLanguage: ['en', 'pl', 'uk'],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 15,
    },
    sameAs: [
      'https://www.linkedin.com/company/ortvest/',
      'https://www.instagram.com/ortvest',
      'https://clutch.co/profile/ortvest',
      // Add the Google Business Profile link here once the listing is verified.
    ],
  };
}

export function buildWebSiteSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Ortvest',
    url: SITE_URL,
    inLanguage: localeToHreflang(locale),
    publisher: { '@id': ORG_ID },
  };
}

export type FaqItem = { q: string; a: string };

/** Render only on pages where these exact questions are visible. */
export function buildFaqSchema(items: FaqItem[]) {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export type BreadcrumbItem = {
  name: string;
  /** Path without the locale prefix, e.g. `/blog` or `/cases/yachtmate`. Omit for the current page. */
  path?: string;
};

/**
 * BreadcrumbList for a localized page. The home crumb is prepended by the caller
 * via `homeName`, so each locale gets its own wording.
 */
export function buildBreadcrumbSchema(locale: string, homeName: string, items: BreadcrumbItem[]) {
  const all: BreadcrumbItem[] = [{ name: homeName, path: '' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path === undefined ? {} : { item: `${SITE_URL}/${locale}${item.path}` }),
    })),
  };
}

export type CaseListItem = { slug: string; name: string; description?: string };

/** ItemList of real case studies for the /cases listing. */
export function buildCaseListSchema(locale: string, name: string, items: CaseListItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url: `${SITE_URL}/${locale}/cases`,
    inLanguage: localeToHreflang(locale),
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/${locale}/cases/${item.slug}`,
        name: item.name,
      })),
    },
  };
}

export type CaseStudySchemaInput = {
  locale: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
};

export function buildCaseStudySchema({ locale, slug, title, description, image }: CaseStudySchemaInput) {
  const url = `${SITE_URL}/${locale}/cases/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#case`,
    name: title,
    headline: title,
    description,
    url,
    inLanguage: localeToHreflang(locale),
    ...(image ? { image } : {}),
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export type ServiceSchemaInput = {
  locale: string;
  /** Localized path without the locale prefix, e.g. `/uslugi/tworzenie-mvp`. */
  path: string;
  name: string;
  description: string;
};

/** Service entity for a service landing page. */
export function buildServiceSchema({ locale, path, name, description }: ServiceSchemaInput) {
  const url = `${SITE_URL}/${locale}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    serviceType: name,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'Poland' },
      { '@type': 'Place', name: 'European Union' },
    ],
    inLanguage: localeToHreflang(locale),
  };
}

export type ServiceListItem = { path: string; name: string; description: string };

/** ItemList of the service pages, rendered on the services index. */
export function buildServiceListSchema(locale: string, name: string, indexPath: string, items: ServiceListItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url: `${SITE_URL}/${locale}${indexPath}`,
    inLanguage: localeToHreflang(locale),
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/${locale}${item.path}`,
        name: item.name,
        description: item.description,
      })),
    },
  };
}
