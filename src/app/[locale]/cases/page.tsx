import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { buildBreadcrumbSchema, buildCaseListSchema } from '@lib/schema';
import { buildLocaleAlternates, SITE_URL } from '@lib/seo';
import { CasesListingClient } from '@modules/Cases/CasesListingClient';
import { cases } from '@modules/Cases/data';
import { Contact } from '@modules/Contact';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';

import { JsonLd } from '../../../components/JsonLd';
import { RouteIntlProvider } from '../../../components/RouteIntlProvider';
import { CASES_CLIENT_NAMESPACES } from '../../../i18n/client-messages';

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

export default async function CasesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const [t, tNav] = await Promise.all([
    getTranslations({ locale, namespace: 'cases.page' }),
    getTranslations({ locale, namespace: 'nav' }),
  ]);

  const listedCases = cases
    .filter((caseItem) => !caseItem.isNDA)
    .map((caseItem) => ({ slug: caseItem.id, name: caseItem.title }));

  return (
    <ReduxProvider>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(locale, tNav('home'), [{ name: tNav('cases') }]),
          buildCaseListSchema(locale, t('metadata.title'), listedCases),
        ]}
      />
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
