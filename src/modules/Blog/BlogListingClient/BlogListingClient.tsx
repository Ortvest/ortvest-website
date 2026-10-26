'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Container } from '@shared/components';

import { blogPostMonthKey, formatBlogPostDateShort, formatBlogPostMonthYear } from '@lib/blog-dates';
import type { BlogCardModel } from '@lib/blog-model';
import { IconAlertTriangle, IconArrowRight, IconFileText, IconSearch } from '@tabler/icons-react';

const QUICK_LINKS = 4;

type Props = {
  posts: BlogCardModel[];
  hasError?: boolean;
};

type MonthGroup = {
  key: string;
  label: string;
  posts: BlogCardModel[];
};

export function BlogListingClient({ posts, hasError = false }: Props) {
  const t = useTranslations('blogPage');
  const tBlog = useTranslations('blog');
  const locale = useLocale();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => p.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [posts]);

  const byTag = useMemo(() => {
    if (activeTag === null) return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return byTag;
    return byTag.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
  }, [byTag, query]);

  const groups = useMemo(() => {
    const map = new Map<string, MonthGroup>();
    filtered.forEach((post) => {
      const key = blogPostMonthKey(post.published_at);
      const existing = map.get(key);
      if (existing) {
        existing.posts.push(post);
      } else {
        map.set(key, { key, label: formatBlogPostMonthYear(post.published_at, locale), posts: [post] });
      }
    });
    return Array.from(map.values());
  }, [filtered, locale]);

  const quickLinks = posts.slice(0, QUICK_LINKS);

  const authorName = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => {
      const name = p.authorName || tBlog('authorFallback');
      counts.set(name, (counts.get(name) ?? 0) + 1);
    });
    let best = tBlog('authorFallback');
    let bestCount = 0;
    counts.forEach((count, name) => {
      if (count > bestCount) {
        best = name;
        bestCount = count;
      }
    });
    return best;
  }, [posts, tBlog]);

  return (
    <div className="section-padding bg-white">
      <Container>
        <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/40">{t('eyebrow')}</p>
            <h1 className="text-display font-extrabold leading-[0.95] tracking-tight text-black sm:text-[4.5rem]">
              {t('title')}
            </h1>
          </div>
          {!hasError && posts.length > 0 && (
            <div className="max-w-sm lg:text-right">
              <p className="text-body-lg text-black/60">{t('subtitle')}</p>
              <p className="mt-3 text-body-sm text-black/40">{t('byline', { name: authorName, n: posts.length })}</p>
            </div>
          )}
        </header>

        {hasError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <IconAlertTriangle className="mb-4 h-14 w-14 text-black/25" />
            <h2 className="text-h3 text-black">{t('errorTitle')}</h2>
            <p className="mt-3 max-w-md text-body-lg text-black/50">{t('errorText')}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <IconFileText className="mb-4 h-14 w-14 text-black/25" />
            <p className="max-w-md text-body-lg text-black/50">{t('emptyTitle')}</p>
          </div>
        ) : (
          <>
            {quickLinks.length > 0 && (
              <section className="mb-12">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-black/40">
                  {t('startWithQuestion')}
                </p>
                <div className="grid grid-cols-1 divide-y divide-black/10 border-y border-black/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                  {quickLinks.map((post) => (
                    <Link
                      key={post.id}
                      href={`/${locale}/blog/${post.slug}`}
                      className="group flex flex-col gap-3 px-5 py-6 transition duration-200 hover:bg-black/[0.02] first:pl-0 last:pr-0">
                      <h3 className="text-h4 leading-snug text-black">{post.title}</h3>
                      <span className="flex items-start gap-1.5 text-body-sm text-black/55">
                        <span className="line-clamp-2">{post.excerpt}</span>
                        <IconArrowRight
                          size={14}
                          className="mt-0.5 shrink-0 transition duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className={`rounded-full px-4 py-2 text-body-sm font-medium transition duration-200 ${
                    activeTag === null ? 'bg-black text-white' : 'bg-black/[0.05] text-black hover:bg-black/[0.08]'
                  }`}>
                  {t('filterAll')} {posts.length}
                </button>
                {tagCounts.map(([tag, count]) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`rounded-full px-4 py-2 text-body-sm font-medium transition duration-200 ${
                      activeTag === tag ? 'bg-black text-white' : 'bg-black/[0.05] text-black hover:bg-black/[0.08]'
                    }`}>
                    {tag} {count}
                  </button>
                ))}
              </div>
              <label className="relative block w-full sm:w-72">
                <IconSearch
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  aria-label={t('searchPlaceholder')}
                  className="h-10 w-full rounded-full border border-black/10 bg-white pl-10 pr-4 text-body-sm text-black placeholder:text-black/35 focus:border-black/30 focus:outline-none"
                />
              </label>
            </div>

            {groups.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <IconFileText className="mb-4 h-14 w-14 text-black/25" />
                <p className="max-w-md text-body-lg text-black/50">{t('noResults')}</p>
              </div>
            ) : (
              <div className="border-t border-black/10">
                {groups.map((group) => (
                  <div
                    key={group.key}
                    className="grid grid-cols-1 border-b border-black/10 py-8 lg:grid-cols-[140px_1fr] lg:gap-x-8">
                    <p className="mb-6 text-body-sm uppercase tracking-wide text-black/40 lg:mb-0">{group.label}</p>
                    <div className="divide-y divide-black/10">
                      {group.posts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/${locale}/blog/${post.slug}`}
                          className="group block py-6 first:pt-0 last:pb-0">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-h3 text-black transition duration-200 group-hover:underline">
                              {post.title}
                            </h3>
                            <IconArrowRight
                              size={20}
                              className="mt-1.5 shrink-0 text-black/40 transition duration-200 group-hover:translate-x-1 group-hover:text-black"
                            />
                          </div>
                          <p className="mt-2 line-clamp-2 max-w-2xl text-body text-black/55">{post.excerpt}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-2.5 text-body-sm text-black/40">
                            <span>{formatBlogPostDateShort(post.published_at, locale)}</span>
                            <span className="h-1 w-7 rounded-full bg-black/15" aria-hidden />
                            <span>{t('minRead', { n: post.readMinutes })}</span>
                            {post.tags.length > 0 && <span>{post.tags.join(' · ')}</span>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl bg-black p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="text-h3 text-white">{t('cta.title')}</p>
                <p className="mt-2 text-body text-white/55">{t('cta.body')}</p>
              </div>
              <Link
                href={`/${locale}#contact`}
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-black transition duration-200 hover:bg-accent-dark">
                {t('cta.button')}
                <IconArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
