import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { cases } from '@modules/Cases/data';
import { CaseDetail } from '@modules/Cases/features/CaseDetail';

interface CasePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  return cases.map((c) => ({
    slug: c.id,
  }));
}

export async function generateMetadata({ params }: CasePageProps) {
  const { slug } = params;
  const caseItem = cases.find((c) => c.id === slug);

  if (!caseItem) {
    return {
      title: 'Case not found',
    };
  }

  const t = await getTranslations('cases');

  return {
    title: `${caseItem.title} | Ortvest`,
    description: caseItem.challenge,
  };
}

export default function CasePage({ params }: CasePageProps) {
  const { slug } = params;
  const caseItem = cases.find((c) => c.id === slug);

  if (!caseItem) {
    notFound();
  }

  return <CaseDetail caseItem={caseItem} />;
}
