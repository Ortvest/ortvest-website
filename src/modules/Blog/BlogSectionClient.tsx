'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { formatBlogPostDate } from '@lib/blog-dates';
import type { BlogCardModel } from '@lib/blog-model';
import { BlogCoverPlaceholder } from '@modules/Blog/BlogCoverPlaceholder';
import { IconArrowRight, IconLayoutColumns } from '@tabler/icons-react';

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

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}...`;
}

function PostCover({
  post,
  aspectClass,
  overlay,
}: {
  post: BlogCardModel;
  aspectClass: string;
  overlay?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden bg-zinc-950 ${aspectClass}`}>
      {post.cover_image ? (
        <Image
          src={post.cover_image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1160px) 50vw, 580px"
        />
      ) : (
        <BlogCoverPlaceholder />
      )}
      {overlay}
    </div>
  );
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
  const gridPosts = filtered.slice(1, 4);

  if (!featured) return null;

  const featuredUrl = `/${locale}/blog/${featured.slug}`;

  return (
    <section id="blog" className="bg-white px-6 py-20" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-[1160px]">
        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <IconLayoutColumns size={13} className="text-zinc-400" />
            <span className="text-xs uppercase tracking-widest text-zinc-400">{t('label')}</span>
          </div>
          <h2 id="blog-heading" className="mb-2 text-h1 font-bold text-zinc-950">
            {t('title')}
          </h2>
          <p className="text-body text-zinc-400">{t('subtitle')}</p>
        </div>

        {/* Tag filters */}
        {tags.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTag('all')}
              className={`cursor-pointer select-none rounded-full border px-3.5 py-1.5 text-xs transition ${
                activeTag === 'all'
                  ? 'border-zinc-950 bg-zinc-950 text-white'
                  : 'border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-950'
              }`}>
              {t('filterAll')}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`cursor-pointer select-none rounded-full border px-3.5 py-1.5 text-xs transition ${
                  activeTag === tag
                    ? 'border-zinc-950 bg-zinc-950 text-white'
                    : 'border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-950'
                }`}>
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Featured card */}
        <Link
          href={featuredUrl}
          className="mb-6 grid cursor-pointer grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-zinc-200 transition-colors duration-200 hover:border-zinc-400 md:grid-cols-2">
          <PostCover
            post={featured}
            aspectClass="aspect-[16/10]"
            overlay={
              featured.tags[0] ? (
                <div className="absolute bottom-0 left-0 p-5">
                  <span className="mb-3 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold tracking-wide text-black">
                    {featured.tags[0]}
                  </span>
                  <p className="max-w-[280px] text-[18px] font-bold leading-snug text-white">{featured.title}</p>
                </div>
              ) : (
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="max-w-[280px] text-[18px] font-bold leading-snug text-white">{featured.title}</p>
                </div>
              )
            }
          />

          <div className="flex flex-col justify-between p-7">
            <div>
              {featured.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="mb-3 text-[20px] font-bold leading-snug text-zinc-950">{featured.title}</h3>
              <p className="mb-5 flex-1 text-body-sm leading-relaxed text-zinc-400">
                {truncate(featured.excerpt, 150)}
              </p>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-bold text-accent">
                  {authorInitials(featured.authorName)}
                </span>
                <span className="text-[12px] font-medium text-zinc-950">{featured.authorName}</span>
                <span className="mx-1 text-zinc-300">·</span>
                <span className="text-[12px] text-zinc-400">{formatBlogPostDate(featured.published_at, locale)}</span>
                <span className="mx-1 text-zinc-300">·</span>
                <span className="text-[12px] text-zinc-400">{t('minRead', { n: featured.readMinutes })}</span>
              </div>
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border-none bg-zinc-950 px-[18px] py-[9px] text-[13px] font-semibold text-white transition hover:opacity-85">
                {t('readArticle')}
                <IconArrowRight size={13} />
              </span>
            </div>
          </div>
        </Link>

        {/* Grid */}
        {gridPosts.length > 0 && (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => {
              const postUrl = `/${locale}/blog/${post.slug}`;

              return (
                <Link
                  key={post.id}
                  href={postUrl}
                  className="cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400">
                  <PostCover
                    post={post}
                    aspectClass="aspect-[16/9]"
                    overlay={
                      post.tags[0] ? (
                        <div className="absolute bottom-0 left-0 p-4">
                          <span className="inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-black">
                            {post.tags[0]}
                          </span>
                        </div>
                      ) : null
                    }
                  />

                  <div className="p-4">
                    {post.tags.length > 0 && (
                      <div className="mb-2.5 flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="mb-2 text-[14px] font-semibold leading-snug text-zinc-950">{post.title}</h3>
                    <p className="mb-3 text-[12px] leading-relaxed text-zinc-400">{truncate(post.excerpt, 100)}</p>

                    <div className="flex items-center gap-1.5 border-t border-zinc-100 pt-3">
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-zinc-950 text-[8px] font-bold text-accent">
                        {authorInitials(post.authorName)}
                      </span>
                      <span className="text-[11px] font-medium text-zinc-600">{post.authorName}</span>
                      <span className="mx-0.5 h-1 w-1 rounded-full bg-zinc-200" />
                      <span className="text-[11px] text-zinc-400">{formatBlogPostDate(post.published_at, locale)}</span>
                      <span className="ml-auto text-[11px] text-zinc-400">{t('minRead', { n: post.readMinutes })}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* View all */}
        <div className="mt-2 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex cursor-pointer items-center gap-2 border-b border-zinc-950 pb-px text-[14px] font-medium text-zinc-950 transition hover:opacity-60">
            {t('viewAll')}
            <IconArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
