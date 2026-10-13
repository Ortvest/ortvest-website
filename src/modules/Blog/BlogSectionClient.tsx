'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Container, SectionReveal } from '@shared/components';

import { formatBlogPostDateShort } from '@lib/blog-dates';
import type { BlogCardModel } from '@lib/blog-model';
import { IconArrowRight } from '@tabler/icons-react';

type Props = {
  posts: BlogCardModel[];
  locale: string;
};

function authorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
}

export function BlogSectionClient({ posts, locale }: Props) {
  const t = useTranslations('blog');
  const [activeTag, setActiveTag] = useState('all');

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filtered = useMemo(() => {
    if (activeTag === 'all') return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  const featured = filtered[0];
  const listPosts = filtered.slice(1, 6);

  if (!featured) return null;

  const featuredUrl = `/${locale}/blog/${featured.slug}`;
  const featuredAuthorName = featured.authorName || t('authorFallback');

  return (
    <section id="blog" className="section-padding bg-white" aria-labelledby="blog-heading">
      <Container>
        <SectionReveal direction="left">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/40">{t('label')}</p>
              <h2 id="blog-heading" className="text-h1 font-extrabold leading-tight text-black">
                {t('title')}
              </h2>
            </div>
            <p className="max-w-sm text-body-sm leading-relaxed text-black/55 lg:pt-2">{t('subtitle')}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            {/* Featured post */}
            <Link href={featuredUrl} className="group flex flex-col rounded-2xl bg-black p-7 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-black">
                  {t('latest')}
                </span>
                {featured.tags[0] && <span className="font-mono text-xs text-white/40">{featured.tags[0]}</span>}
              </div>

              <h3 className="mt-6 text-[26px] font-extrabold leading-snug text-white sm:text-[28px]">
                {featured.title}
              </h3>
              <p className="mt-4 line-clamp-4 text-body-sm leading-relaxed text-white/60">{featured.excerpt}</p>

              <div className="mt-auto pt-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                      {authorInitials(featuredAuthorName)}
                    </span>
                    <span className="text-sm font-medium text-white">{featuredAuthorName}</span>
                  </div>
                  <span className="font-mono text-xs text-white/40">
                    {formatBlogPostDateShort(featured.published_at, locale, { withYear: true })}
                    {' · '}
                    {t('minutes', { n: featured.readMinutes })}
                  </span>
                </div>

                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition group-hover:bg-white/90">
                  {t('readArticle')}
                  <IconArrowRight size={14} />
                </span>
              </div>
            </Link>

            {/* Filters + list */}
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2" role="group" aria-label={t('filterAll')}>
                <button
                  type="button"
                  onClick={() => setActiveTag('all')}
                  className={`cursor-pointer select-none rounded-full border px-4 py-2 text-sm font-medium transition ${
                    activeTag === 'all'
                      ? 'border-black bg-black text-white'
                      : 'border-black/15 text-black/70 hover:border-black/40 hover:text-black'
                  }`}>
                  {t('filterAll')}
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`cursor-pointer select-none rounded-full border px-4 py-2 text-sm font-medium transition ${
                      activeTag === tag
                        ? 'border-black bg-black text-white'
                        : 'border-black/15 text-black/70 hover:border-black/40 hover:text-black'
                    }`}>
                    {tag}
                  </button>
                ))}
              </div>

              <div className="mt-5 divide-y divide-black/10 border-t border-black/10">
                {listPosts.map((post) => {
                  const postUrl = `/${locale}/blog/${post.slug}`;
                  return (
                    <Link key={post.id} href={postUrl} className="group block py-5">
                      <h3 className="text-[17px] font-bold leading-snug text-black transition group-hover:underline">
                        {post.title}
                      </h3>
                      <div className="mt-2.5 flex flex-wrap items-center gap-2.5 font-mono text-xs text-black/40">
                        <span>{formatBlogPostDateShort(post.published_at, locale)}</span>
                        <span className="h-1 w-7 rounded-full bg-black/15" aria-hidden />
                        <span>{t('minutes', { n: post.readMinutes })}</span>
                        {post.tags[0] && <span>{post.tags[0]}</span>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* View all banner */}
          <Link
            href={`/${locale}/blog`}
            className="group mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-black px-6 py-6 sm:px-8">
            <div>
              <p className="text-lg font-bold text-white sm:text-xl">{t('viewAll')}</p>
              <p className="mt-1 text-sm text-white/50">
                {t('bannerCount', { n: posts.length })} · {t('bannerCadence')}
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-black transition group-hover:bg-accent-dark">
              <IconArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </SectionReveal>
      </Container>
    </section>
  );
}
