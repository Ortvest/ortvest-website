import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { CasesListingClient } from '@modules/Cases/CasesListingClient';
import { Contact } from '@modules/Contact';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';

const baseUrl = 'https://www.ortvest.com';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'cases.page' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/cases`,
      languages: {
        en: `${baseUrl}/en/cases`,
        ua: `${baseUrl}/ua/cases`,
        pl: `${baseUrl}/pl/cases`,
      },
    },
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url: `${baseUrl}/${locale}/cases`,
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
