import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPosts } from '@lib/cms-api';
import { BlogListingClient } from '@modules/Blog/BlogListingClient/BlogListingClient';
import { Contact } from '@modules/Contact';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';

const baseUrl = 'https://www.ortvest.com';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'blogPage.metadata' });
  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { en: '/en/blog', ua: '/ua/blog', pl: '/pl/blog' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/blog`,
      siteName: 'Ortvest',
      locale: locale === 'ua' ? 'uk_UA' : locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const rows = await fetchCmsBlogPosts(locale);
  const posts = rowsToCardModels(rows);

  return (
    <ReduxProvider>
      <Header />
      <main>
        <BlogListingClient posts={posts} />
        <Contact />
      </main>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
