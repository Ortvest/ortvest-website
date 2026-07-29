import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPostsResult } from '@lib/cms-api';
import { serializeJsonLd } from '@lib/seo';
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
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        'uk-UA': `${baseUrl}/ua/blog`,
        pl: `${baseUrl}/pl/blog`,
        'x-default': `${baseUrl}/en/blog`,
      },
      types: {
        'application/rss+xml': `${baseUrl}/blog/rss.xml`,
      },
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
  const blogSchema = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogSchema) }} />
      <Header />
      <main>
        <BlogListingClient posts={posts} hasError={result.status === 'error'} />
        <Contact />
      </main>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
