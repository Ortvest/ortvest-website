import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { buildBreadcrumbSchema, buildCaseStudySchema } from '@lib/schema';
import { buildLocaleAlternates, SITE_URL } from '@lib/seo';
import { cases } from '@modules/Cases/data';
import { CaseDetail } from '@modules/Cases/features/CaseDetail';

import { JsonLd } from '../../../../components/JsonLd';
import { RouteIntlProvider } from '../../../../components/RouteIntlProvider';
import { CASE_DETAIL_CLIENT_NAMESPACES } from '../../../../i18n/client-messages';
import { locales } from '../../../../i18n/routing';

interface CasePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Cartesian product of all locales × all non-NDA slugs so Next.js can
// pre-render every combination without falling back to dynamic rendering.
export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    cases
      .filter((caseItem) => !caseItem.isNDA)
      .map((caseItem) => ({
        locale,
        slug: caseItem.id,
      }))
  );
}

// Any [locale]/[slug] combination not returned above is a 404, never dynamic.
export const dynamicParams = false;

export async function generateMetadata({ params }: CasePageProps) {
  const { slug, locale } = params;
  // Must be called before getTranslations — generateMetadata runs in its
  // own execution context, separate from the page component.
  unstable_setRequestLocale(locale);

  const caseItem = cases.find((c) => c.id === slug);

  if (!caseItem || caseItem.isNDA) {
    return {
      title: 'Case not found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const t = await getTranslations({ locale, namespace: `caseStudies.${slug}.meta` });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(SITE_URL),
    alternates: buildLocaleAlternates(locale, `/cases/${slug}`),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/cases/${slug}`,
      siteName: 'Ortvest',
      locale: locale === 'ua' ? 'uk_UA' : locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'article',
      // Social image comes from opengraph-image.tsx in this segment.
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug, locale } = params;
  unstable_setRequestLocale(locale);
  const caseItem = cases.find((c) => c.id === slug);

  if (!caseItem || caseItem.isNDA) {
    notFound();
  }

  const [tMeta, tNav] = await Promise.all([
    getTranslations({ locale, namespace: `caseStudies.${slug}.meta` }),
    getTranslations({ locale, namespace: 'nav' }),
  ]);

  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(locale, tNav('home'), [
            { name: tNav('cases'), path: '/cases' },
            { name: caseItem.title },
          ]),
          buildCaseStudySchema({
            locale,
            slug,
            title: caseItem.title,
            description: tMeta('description'),
            image: caseItem.coverImage ?? caseItem.preview ?? caseItem.images?.[0],
          }),
        ]}
      />
      <RouteIntlProvider locale={locale} namespaces={CASE_DETAIL_CLIENT_NAMESPACES} caseStudyId={slug}>
        <CaseDetail caseItem={caseItem} />
      </RouteIntlProvider>
    </>
  );
}
