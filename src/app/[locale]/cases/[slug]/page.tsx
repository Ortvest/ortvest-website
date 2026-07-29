import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { cases } from '@modules/Cases/data';
import { CaseDetail } from '@modules/Cases/features/CaseDetail';

interface CasePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  return cases
    .filter((caseItem) => !caseItem.isNDA)
    .map((caseItem) => ({
      slug: caseItem.id,
    }));
}

export async function generateMetadata({ params }: CasePageProps) {
  const { slug, locale } = params;
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

  return <CaseDetail caseItem={caseItem} />;
}
