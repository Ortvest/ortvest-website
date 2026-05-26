import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { CasesListingClient } from '@modules/Cases/CasesListingClient';
import { Contact } from '@modules/Contact';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ortvest.com';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'cases.page' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}/cases`,
      languages: { en: '/en/cases', ua: '/ua/cases', pl: '/pl/cases' },
    },
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url: `/${locale}/cases`,
      siteName: 'Ortvest',
      locale: locale === 'ua' ? 'uk_UA' : locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
    },
  };
}

export default function CasesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <ReduxProvider>
      <Header />
      <main>
        <CasesListingClient />
        <Contact />
      </main>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
