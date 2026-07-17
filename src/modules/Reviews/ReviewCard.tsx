'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { IconStar } from '@tabler/icons-react';

import styles from './ReviewCard.module.css';

export interface ReviewItem {
  id?: string;
  _id?: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function StarRating({ rating }: { rating: number }) {
  const t = useTranslations('reviews');

  return (
    <div className="flex items-center gap-2" aria-label={t('ratingAriaLabel', { n: rating })}>
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <IconStar
            key={i}
            size={16}
            className={i < rating ? 'fill-accent text-accent' : 'text-black/15'}
            stroke={1.5}
          />
        ))}
      </div>
      <span className="text-body-sm font-medium text-black/60">{rating.toFixed(1)}</span>
    </div>
  );
}

function AuthorAvatar({ name }: { name: string }) {
  const t = useTranslations('reviews');
  const initials = getInitials(name);

  return (
    <div
      role="img"
      aria-label={t('avatarAlt', { name })}
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-black/70">
      {initials}
    </div>
  );
}

export function ReviewCard({ review }: { review: ReviewItem }) {
  const t = useTranslations('reviews');
  const textRef = useRef<HTMLQuoteElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el || expanded) return;

    const checkTruncation = () => {
      setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    };

    checkTruncation();

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(el);
    return () => observer.disconnect();
  }, [review.text, expanded]);

  const showToggle = isTruncated || expanded;

  return (
    <article className="flex flex-col rounded-xl border border-black/[0.08] bg-white p-6 transition-colors hover:border-black/20">
      <StarRating rating={review.rating} />

      <blockquote
        ref={textRef}
        className={`mt-4 text-[15px] font-normal not-italic leading-[1.6] text-black/85 ${
          !expanded ? styles['review-card__text--clamped'] : ''
        }`}>
        {review.text}
      </blockquote>

      {showToggle && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 self-start text-body-sm font-medium text-black/55 transition-colors hover:text-black"
          aria-expanded={expanded}>
          {expanded ? t('readLess') : t('readMore')}
        </button>
      )}

      <div className="mt-5 border-t border-black/[0.06] pt-5">
        <div className="flex items-center gap-3">
          <AuthorAvatar name={review.name} />
          <div className="min-w-0">
            <p className="truncate text-body-sm font-medium text-black">{review.name}</p>
            <p className="truncate text-body-sm text-black/50">
              {review.role}, {review.company}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ReviewCardSkeleton() {
  return <div className="h-[240px] animate-pulse rounded-xl border border-black/[0.06] bg-black/[0.03]" />;
}
