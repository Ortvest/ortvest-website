import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { localesWithPublishedPosts, rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPostsResult } from '@lib/cms-api';
import { buildBreadcrumbSchema } from '@lib/schema';
import { buildHreflangLanguages, SITE_URL } from '@lib/seo';
import { BlogListingClient } from '@modules/Blog/BlogListingClient/BlogListingClient';
import { Contact } from '@modules/Contact';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';

import { JsonLd } from '../../../components/JsonLd';
import { RouteIntlProvider } from '../../../components/RouteIntlProvider';
import { BLOG_CLIENT_NAMESPACES } from '../../../i18n/client-messages';

// Revalidate every 5 minutes in addition to on-demand webhook revalidation.
// This prevents the Full Route Cache from becoming stale indefinitely.
export const revalidate = 300;

const baseUrl = SITE_URL;

/** Locale served by /blog/rss.xml. */
const FEED_LOCALE = 'en';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const [t, availableLocales] = await Promise.all([
    getTranslations({ locale, namespace: 'blogPage.metadata' }),
    localesWithPublishedPosts(),
  ]);
  const hasPosts = availableLocales.includes(locale);
  const hreflangLocales = availableLocales.length > 0 ? availableLocales : [locale];

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
    ...(hasPosts ? {} : { robots: { index: false, follow: true } }),
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: buildHreflangLanguages(hreflangLocales, (loc) => `${baseUrl}/${loc}/blog`),
      // The feed is English-only, so only the English listing advertises it.
      ...(locale === FEED_LOCALE ? { types: { 'application/rss+xml': `${baseUrl}/blog/rss.xml` } } : {}),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/blog`,
      siteName: 'Ortvest',
      locale: locale === 'ua' ? 'uk_UA' : locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const [result, tMetadata, tBlog] = await Promise.all([
    fetchCmsBlogPostsResult(locale),
    getTranslations({ locale, namespace: 'blogPage.metadata' }),
    getTranslations({ locale, namespace: 'blog' }),
  ]);
  const posts = rowsToCardModels(result.rows);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const breadcrumbSchema = buildBreadcrumbSchema(locale, tNav('home'), [{ name: tNav('blog') }]);
  const blogSchema =
    posts.length === 0
      ? null
      : {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: tMetadata('title'),
          description: tMetadata('description'),
          url: `${baseUrl}/${locale}/blog`,
          inLanguage: locale === 'ua' ? 'uk-UA' : locale === 'pl' ? 'pl-PL' : 'en-US',
          publisher: {
            '@type': 'Organization',
            name: 'Ortvest',
            url: baseUrl,
          },
          blogPost: posts.slice(0, 20).map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: `${baseUrl}/${locale}/blog/${post.slug}`,
            datePublished: post.published_at,
            ...(post.cover_image ? { image: post.cover_image } : {}),
            author: {
              '@type': 'Person',
              name: post.authorName || tBlog('authorFallback'),
            },
          })),
        };

  return (
    <ReduxProvider>
      <JsonLd schema={[breadcrumbSchema, blogSchema]} />
      <Header />
      <RouteIntlProvider locale={locale} namespaces={BLOG_CLIENT_NAMESPACES}>
        <main>
          <BlogListingClient posts={posts} hasError={result.status === 'error'} />
          <Contact />
        </main>
      </RouteIntlProvider>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
