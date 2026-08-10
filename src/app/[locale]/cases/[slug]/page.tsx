import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { RouteIntlProvider } from '../../../../components/RouteIntlProvider';
import { CASE_DETAIL_CLIENT_NAMESPACES } from '../../../../i18n/client-messages';
import { cases } from '@modules/Cases/data';
import { CaseDetail } from '@modules/Cases/features/CaseDetail';
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
  };
}

export default function CasePage({ params }: CasePageProps) {
  const { slug, locale } = params;
  unstable_setRequestLocale(locale);
  const caseItem = cases.find((c) => c.id === slug);

  if (!caseItem || caseItem.isNDA) {
    notFound();
  }

  return (
    <RouteIntlProvider locale={locale} namespaces={CASE_DETAIL_CLIENT_NAMESPACES} caseStudyId={slug}>
      <CaseDetail caseItem={caseItem} />
    </RouteIntlProvider>
  );
}
