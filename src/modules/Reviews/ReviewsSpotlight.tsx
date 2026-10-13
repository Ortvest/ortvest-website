'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { DURATION, EASE } from '@lib/motion';
import { IconArrowLeft, IconArrowRight, IconQuoteFilled } from '@tabler/icons-react';
import { AnimatePresence, m } from 'framer-motion';

import { getInitials, type ReviewItem } from './ReviewCard';

function reviewKey(review: ReviewItem, index: number) {
  return `${review.name}|${review.company}|${index}`;
}

type SpotlightQuoteProps = {
  review: ReviewItem;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

function SpotlightQuote({ review, index, total, onPrev, onNext }: SpotlightQuoteProps) {
  const t = useTranslations('reviews');
  const textRef = useRef<HTMLQuoteElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el || expanded) return;

    const checkTruncation = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    checkTruncation();

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(el);
    return () => observer.disconnect();
  }, [review.text, expanded]);

  const showToggle = isTruncated || expanded;

  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
      <div
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent sm:h-16 sm:w-16">
        <IconQuoteFilled size={26} className="text-black" />
      </div>

      <div className="min-w-0">
        <blockquote
          ref={textRef}
          className={`text-xl font-medium leading-snug text-black sm:text-2xl ${!expanded ? 'line-clamp-3' : ''}`}>
          {review.text}
        </blockquote>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-black">{review.name}</p>
            <p className="text-body-sm text-black/50">
              {review.role}, {review.company}
            </p>
          </div>

          <div className="flex items-center gap-5">
            {showToggle && (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                className="text-sm font-medium text-black underline underline-offset-2 transition hover:text-black/70">
                {expanded ? t('readLess') : t('readMore')}
              </button>
            )}

            {total > 1 && (
              <>
                <span className="font-mono text-xs text-black/40">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label={t('prev')}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black transition hover:border-black hover:bg-black hover:text-white">
                    <IconArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label={t('next')}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black transition hover:border-black hover:bg-black hover:text-white">
                    <IconArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewsSpotlight({ reviews }: { reviews: ReviewItem[] }) {
  const t = useTranslations('reviews');
  const [activeIndex, setActiveIndex] = useState(0);
  const total = reviews.length;
  const active = reviews[activeIndex];

  const goTo = (index: number) => setActiveIndex(((index % total) + total) % total);

  if (!active) return null;

  return (
    <div>
      <AnimatePresence mode="wait">
        <m.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: DURATION.normal, ease: EASE }}>
          <SpotlightQuote
            review={active}
            index={activeIndex}
            total={total}
            onPrev={() => goTo(activeIndex - 1)}
            onNext={() => goTo(activeIndex + 1)}
          />
        </m.div>
      </AnimatePresence>

      {total > 1 && (
        <nav
          aria-label={t('paginationLabel')}
          className="mt-8 flex gap-8 overflow-x-auto border-t border-black/[0.08] pt-5 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}>
          {reviews.map((review, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={reviewKey(review, index)}
                type="button"
                onClick={() => goTo(index)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={t('viewReview', { name: review.name })}
                className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap border-b-2 pb-3 transition-colors ${
                  isActive ? 'border-black' : 'border-transparent'
                }`}>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    isActive ? 'bg-black text-white' : 'bg-black/[0.06] text-black/40'
                  }`}>
                  {getInitials(review.name)}
                </span>
                <span className="text-left">
                  <span
                    className={`block text-body-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-black/40'}`}>
                    {review.name}
                  </span>
                  <span className={`block text-xs transition-colors ${isActive ? 'text-black/50' : 'text-black/30'}`}>
                    {review.company}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
