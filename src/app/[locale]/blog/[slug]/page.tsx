import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Container } from '@shared/components';

import { ReduxProvider } from '@global/store/ReduxProvider';
import {
  articleHeadingsFromContent,
  BlogArticleContent,
  metaDescriptionFromPost,
  readMinutesFromContent,
} from '@lib/blog-content';
import { formatBlogPostDate } from '@lib/blog-dates';
import { pickRelatedCards, rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPostBySlug, fetchCmsBlogPosts } from '@lib/cms-api';
import { serializeJsonLd } from '@lib/seo';
import { ArticleConversionCta } from '@modules/Blog/ArticleConversionCta';
import { ArticleReadingProgress } from '@modules/Blog/ArticleReadingProgress';
import { ArticleTableOfContents } from '@modules/Blog/ArticleTableOfContents';
import { AuthorAvatar } from '@modules/Blog/AuthorAvatar';
import { BlogCoverPlaceholder } from '@modules/Blog/BlogCoverPlaceholder';
import { BlogPostCard } from '@modules/Blog/BlogPostCard';
import { Contact } from '@modules/Contact';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';

const baseUrl = 'https://www.ortvest.com';
const locales = ['en', 'ua', 'pl'] as const;

interface Props {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = params;
  const [post, translatedRows] = await Promise.all([
    fetchCmsBlogPostBySlug(slug, locale),
    Promise.all(locales.map(async (candidate) => [candidate, await fetchCmsBlogPosts(candidate)] as const)),
  ]);
  if (!post) {
    return { title: 'Blog | Ortvest' };
  }
  const description = metaDescriptionFromPost(post.content, post.title);
  const languages = Object.fromEntries(
    translatedRows
      .filter(([, rows]) => rows.some((row) => row.slug === slug))
      .map(([candidate]) => [candidate === 'ua' ? 'uk-UA' : candidate, `${baseUrl}/${candidate}/blog/${slug}`])
  );
  const currentLanguage = locale === 'ua' ? 'uk-UA' : locale;
  languages[currentLanguage] = `${baseUrl}/${locale}/blog/${slug}`;
  languages['x-default'] = languages.en || languages[currentLanguage];

  return {
    title: `${post.title} | Ortvest`,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: post.title,
      description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at || post.published_at || post.created_at,
      ...(post.cover_image ? { images: [{ url: post.cover_image, alt: post.title }] } : {}),
      locale: locale === 'ua' ? 'uk_UA' : locale === 'pl' ? 'pl_PL' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(post.cover_image ? { images: [post.cover_image] } : {}),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = params;
  unstable_setRequestLocale(locale);

  const post = await fetchCmsBlogPostBySlug(slug, locale);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blogPage' });
  const tBlog = await getTranslations({ locale, namespace: 'blog' });
  const rows = await fetchCmsBlogPosts(locale);
  const allCards = rowsToCardModels(rows);
  const related = pickRelatedCards(allCards, post.slug, post.tags ?? [], 3);
  const readMin = readMinutesFromContent(post.content);
  const dateStr = post.published_at ? formatBlogPostDate(post.published_at, locale) : '';
  const authorName = post.author_name?.trim() || tBlog('authorFallback');
  const headings = articleHeadingsFromContent(post.content);
  const showTableOfContents = headings.length > 3;
  const articleUrl = `${baseUrl}/${locale}/blog/${slug}`;
  const description = metaDescriptionFromPost(post.content, post.title);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    ...(post.cover_image ? { image: post.cover_image } : {}),
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    inLanguage: locale === 'ua' ? 'uk-UA' : locale === 'pl' ? 'pl-PL' : 'en-US',
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ortvest',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icons/AppLogo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  return (
    <ReduxProvider>
      <ArticleReadingProgress articleId="blog-article" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }} />
      <Header />
      <main>
        <article id="blog-article" className="section-padding bg-white">
          <Container>
            <div className="mx-auto max-w-[720px]">
              <Link
                href={`/${locale}/blog`}
                className="text-body-sm font-medium text-black/60 transition duration-200 hover:text-accent">
                {t('back')}
              </Link>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-accent px-3 py-1 text-body-sm font-medium text-black">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mt-4 text-[2.25rem] font-bold leading-[1.12] text-black sm:text-h1">{post.title}</h1>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-body-sm text-black/50">
                <AuthorAvatar name={authorName} size={32} />
                <span className="font-medium text-black/70">{authorName}</span>
                {dateStr && (
                  <>
                    <span aria-hidden="true">|</span>
                    <span>{dateStr}</span>
                  </>
                )}
                <span aria-hidden="true">|</span>
                <span>{t('minRead', { n: readMin })}</span>
              </div>

              <div className="relative mt-8 w-full overflow-hidden rounded-2xl">
                {post.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.cover_image} alt="" loading="lazy" className="block h-auto w-full" />
                ) : (
                  <div className="aspect-video">
                    <BlogCoverPlaceholder />
                  </div>
                )}
              </div>
            </div>

            <div className="relative mx-auto mt-10 max-w-[70ch]">
              {showTableOfContents && (
                <ArticleTableOfContents headings={headings} title={t('tableOfContents')} />
              )}
              <BlogArticleContent content={post.content} locale={locale} />
              <ArticleConversionCta locale={locale} />
              <hr className="mt-14 border-0 border-t border-black/[0.08]" />
            </div>
          </Container>
        </article>

        {related.length > 0 && (
          <section className="section-padding bg-white" aria-labelledby="more-articles">
            <Container>
              <h2 id="more-articles" className="mb-8 text-center text-h2 text-black">
                {t('moreArticles')}
              </h2>
              <div className="mx-auto grid max-w-container gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {related.map((p) => (
                  <BlogPostCard key={p.id} post={p} />
                ))}
              </div>
            </Container>
          </section>
        )}

        <Contact />
      </main>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
