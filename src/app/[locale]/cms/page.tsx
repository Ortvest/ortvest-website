import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { Contact } from '@modules/Contact';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';
import { CMSPage } from '@modules/CMSPage';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ortvest.com';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'cmsPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}/cms`,
      languages: { en: '/en/cms', ua: '/ua/cms', pl: '/pl/cms' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/cms`,
      siteName: 'Ortvest',
      locale: locale === 'ua' ? 'uk_UA' : locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
    },
  };
}

export default function CmsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <ReduxProvider>
      <Header />
      <main>
        <CMSPage />
        <Contact />
      </main>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
