import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Container } from '@shared/components';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { BlogArticleContent, metaDescriptionFromPost, readMinutesFromContent } from '@lib/blog-content';
import { formatBlogPostDate } from '@lib/blog-dates';
import { pickRelatedCards, rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPostBySlug, fetchCmsBlogPosts } from '@lib/cms-api';
import { AuthorAvatar } from '@modules/Blog/AuthorAvatar';
import { BlogCoverPlaceholder } from '@modules/Blog/BlogCoverPlaceholder';
import { BlogPostCard } from '@modules/Blog/BlogPostCard';
import { Contact } from '@modules/Contact';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';

const baseUrl = 'https://www.ortvest.com';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = params;
  const post = await fetchCmsBlogPostBySlug(slug);
  if (!post) {
    return { title: 'Blog | Ortvest' };
  }
  const description = metaDescriptionFromPost(post.content, post.title);
  const ogImage = post.cover_image ? [{ url: post.cover_image, alt: post.title }] : undefined;

  return {
    title: `${post.title} | Ortvest`,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.published_at ?? undefined,
      images: ogImage,
      locale: locale === 'ua' ? 'uk_UA' : locale === 'pl' ? 'pl_PL' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = params;
  unstable_setRequestLocale(locale);

  const post = await fetchCmsBlogPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blogPage' });
  const rows = await fetchCmsBlogPosts(locale);
  const allCards = rowsToCardModels(rows);
  const related = pickRelatedCards(allCards, post.slug, post.tags ?? [], 3);
  const readMin = readMinutesFromContent(post.content);
  const dateStr = post.published_at ? formatBlogPostDate(post.published_at, locale) : '';
  const authorName = post.author_name?.trim() || 'Ortvest';

  return (
    <ReduxProvider>
      <Header />
      <main>
        <article className="section-padding bg-white">
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

              <h1 className="mt-4 text-h1 text-black">{post.title}</h1>

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

              <div className="mt-10">
                <BlogArticleContent content={post.content} />
              </div>

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
