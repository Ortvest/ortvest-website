import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { RouteIntlProvider } from '../../../components/RouteIntlProvider';
import { CASES_CLIENT_NAMESPACES } from '../../../i18n/client-messages';
import { ReduxProvider } from '@global/store/ReduxProvider';
import { buildLocaleAlternates, SITE_URL } from '@lib/seo';
import { CasesListingClient } from '@modules/Cases/CasesListingClient';
import { Contact } from '@modules/Contact';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';

const baseUrl = SITE_URL;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'cases.page' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    metadataBase: new URL(baseUrl),
    alternates: buildLocaleAlternates(locale, '/cases'),
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
      <RouteIntlProvider locale={locale} namespaces={CASES_CLIENT_NAMESPACES}>
        <main>
          <CasesListingClient />
          <Contact />
        </main>
      </RouteIntlProvider>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
