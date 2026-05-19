'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import type { BlogCardModel } from '@lib/blog-model';
import { formatBlogPostDate } from '@lib/blog-dates';

import { AuthorAvatar } from '@modules/Blog/AuthorAvatar';
import { BlogCoverPlaceholder } from '@modules/Blog/BlogCoverPlaceholder';

type Props = {
  post: BlogCardModel;
};

export function BlogPostCard({ post }: Props) {
  const locale = useLocale();
  const t = useTranslations('blogPage');
  const dateStr = formatBlogPostDate(post.published_at, locale);

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-2xl">
        {post.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <BlogCoverPlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent px-3 py-1 text-body-sm font-medium text-black">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-h3 line-clamp-2 text-black transition group-hover:text-black/90">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-body text-black/55">{post.excerpt}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-black/[0.06] pt-4 text-body-sm text-black/50">
          <span className="flex min-w-0 items-center gap-2">
            <AuthorAvatar name={post.authorName} size={32} />
            <span className="truncate font-medium text-black/70">{post.authorName}</span>
          </span>
          <span className="hidden sm:inline" aria-hidden="true">
            |
          </span>
          <span>{dateStr}</span>
          <span className="hidden sm:inline" aria-hidden="true">
            |
          </span>
          <span>{t('minRead', { n: post.readMinutes })}</span>
        </div>
      </div>
    </Link>
  );
}
