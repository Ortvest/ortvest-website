'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { EASE } from '@lib/motion';
import { animate, motion, type PanInfo, useMotionValue } from 'framer-motion';

import { ReviewCard, type ReviewItem } from './ReviewCard';

const GRID_CLASS = 'grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3';

function chunkReviews(reviews: ReviewItem[], size: number) {
  const pages: ReviewItem[][] = [];
  for (let i = 0; i < reviews.length; i += size) {
    pages.push(reviews.slice(i, i + size));
  }
  return pages;
}

function reviewKey(review: ReviewItem) {
  return review._id ?? review.id ?? review.name;
}

type ReviewsSliderProps = {
  reviews: ReviewItem[];
  perPage: number;
  gridClassName?: string;
};

function ReviewsSlider({ reviews, perPage, gridClassName }: ReviewsSliderProps) {
  const t = useTranslations('reviews');
  const pages = useMemo(() => chunkReviews(reviews, perPage), [reviews, perPage]);
  const pageCount = pages.length;
  const [activePage, setActivePage] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const goTo = useCallback(
    (index: number) => {
      setActivePage(Math.max(0, Math.min(pageCount - 1, index)));
    },
    [pageCount]
  );

  useEffect(() => {
    setActivePage((prev) => Math.min(prev, Math.max(0, pageCount - 1)));
  }, [pageCount]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const measure = () => setSlideWidth(node.offsetWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (slideWidth === 0) return;
    animate(x, -activePage * slideWidth, { duration: 0.45, ease: EASE });
  }, [activePage, slideWidth, x]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (slideWidth === 0 || pageCount <= 1) return;

    const threshold = slideWidth * 0.18;
    let next = activePage;

    if (info.offset.x < -threshold || info.velocity.x < -400) {
      next = activePage + 1;
    } else if (info.offset.x > threshold || info.velocity.x > 400) {
      next = activePage - 1;
    }

    goTo(next);
  };

  if (pageCount <= 1) {
    return (
      <div className={gridClassName ?? GRID_CLASS}>
        {reviews.map((review) => (
          <ReviewCard key={reviewKey(review)} review={review} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div ref={containerRef} className="overflow-hidden" aria-roledescription="carousel">
        <motion.div
          className="flex cursor-grab select-none active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragElastic={0.08}
          dragMomentum={false}
          dragConstraints={slideWidth > 0 ? { left: -(pageCount - 1) * slideWidth, right: 0 } : undefined}
          onDragEnd={handleDragEnd}>
          {pages.map((pageReviews, pageIndex) => (
            <div key={pageIndex} className={`w-full shrink-0 ${gridClassName ?? GRID_CLASS}`}>
              {pageReviews.map((review) => (
                <ReviewCard key={reviewKey(review)} review={review} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label={t('paginationLabel')}>
        {pages.map((_, index) => {
          const isActive = index === activePage;
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={t('pageLabel', { n: index + 1 })}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive ? 'w-7 bg-black' : 'w-2 bg-black/20 hover:bg-black/35'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ReviewsCarousel({ reviews }: { reviews: ReviewItem[] }) {
  return (
    <>
      <div className="md:hidden">
        <ReviewsSlider reviews={reviews} perPage={1} gridClassName="grid items-start gap-5" />
      </div>

      <div className="hidden md:block">
        {reviews.length <= 3 ? (
          <div className={GRID_CLASS}>
            {reviews.map((review) => (
              <ReviewCard key={reviewKey(review)} review={review} />
            ))}
          </div>
        ) : (
          <ReviewsSlider reviews={reviews} perPage={3} gridClassName={GRID_CLASS} />
        )}
      </div>
    </>
  );
}
