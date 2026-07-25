import type { Metadata } from 'next';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { type LegalPageDocument, LocalizedLegalContent } from '@shared/components/LocalizedLegalContent';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legalPages.terms.metadata' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default async function TermsOfUsePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const legalPages = messages.legalPages as unknown as Record<string, LegalPageDocument>;

  return (
    <ReduxProvider>
      <Header />
      <LocalizedLegalContent content={legalPages.terms} />
      <Footer />
    </ReduxProvider>
  );
}
