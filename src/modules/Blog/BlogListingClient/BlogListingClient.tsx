'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Container } from '@shared/components';

import { formatBlogPostDate } from '@lib/blog-dates';
import type { BlogCardModel } from '@lib/blog-model';
import { AuthorAvatar } from '@modules/Blog/AuthorAvatar';
import { BlogCoverPlaceholder } from '@modules/Blog/BlogCoverPlaceholder';
import { BlogPostCard } from '@modules/Blog/BlogPostCard';
import { IconFileText } from '@tabler/icons-react';

const GRID_PAGE = 9;

type Props = {
  posts: BlogCardModel[];
};

export function BlogListingClient({ posts }: Props) {
  const t = useTranslations('blogPage');
  const locale = useLocale();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visibleExtra, setVisibleExtra] = useState(GRID_PAGE);

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((tag) => set.add(tag)));
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filtered = useMemo(() => {
    if (activeTag === null) return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  const hero = filtered[0];
  const gridPosts = filtered.slice(1);
  const visibleGrid = gridPosts.slice(0, visibleExtra);
  const hasMore = gridPosts.length > visibleExtra;

  function onTagClick(tagKey: string) {
    setActiveTag(tagKey === 'all' ? null : tagKey);
    setVisibleExtra(GRID_PAGE);
  }

  return (
    <div className="section-padding bg-white">
      <Container>
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="text-h1 text-black">{t('title')}</h1>
          <p className="mt-3 text-body-lg text-black/60">{t('subtitle')}</p>
        </header>

        {!hero ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <IconFileText className="mb-4 h-14 w-14 text-black/25" />
            <p className="max-w-md text-body-lg text-black/50">{t('emptyTitle')}</p>
          </div>
        ) : (
          <>
            {tags.length > 1 && (
              <div className="mb-10 flex flex-wrap justify-center gap-2">
                {tags.map((tag) => {
                  const isAll = tag === 'all';
                  const selected = isAll ? activeTag === null : activeTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => onTagClick(isAll ? 'all' : tag)}
                      className={`rounded-full px-4 py-2 text-body-sm font-medium transition duration-200 ${
                        selected ? 'bg-black text-white' : 'bg-black/[0.05] text-black hover:bg-black/[0.08]'
                      }`}>
                      {isAll ? t('filterAll') : tag}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hero */}
            <article className="mb-10 overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-card lg:flex">
              <div className="relative w-full shrink-0 overflow-hidden lg:w-[60%]">
                {hero.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={hero.cover_image} alt="" loading="lazy" className="block h-auto w-full" />
                ) : (
                  <div className="aspect-video">
                    <BlogCoverPlaceholder />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:max-w-[40%] lg:basis-[40%]">
                {hero.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {hero.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-accent px-3 py-1 text-body-sm font-medium text-black">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-display-sm line-clamp-3 font-bold text-black sm:text-[2rem]">{hero.title}</h2>
                <p className="mt-3 line-clamp-3 text-body-lg text-black/55">{hero.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-body-sm text-black/50">
                  <AuthorAvatar name={hero.authorName} size={32} />
                  <span className="font-medium text-black/70">{hero.authorName}</span>
                  <span aria-hidden="true">|</span>
                  <span>{formatBlogPostDate(hero.published_at, locale)}</span>
                  <span aria-hidden="true">|</span>
                  <span>{t('minRead', { n: hero.readMinutes })}</span>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/${locale}/blog/${hero.slug}`}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-black shadow-sm transition duration-200 hover:bg-accent-dark">
                    {t('readArticle')}
                  </Link>
                </div>
              </div>
            </article>

            {/* Grid */}
            {visibleGrid.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {visibleGrid.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleExtra((n) => n + GRID_PAGE)}
                  className="rounded-full border-2 border-black bg-white px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-black hover:text-white">
                  {t('loadMore')}
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
