'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Container, SectionHeader, SectionReveal } from '@shared/components';

import { IconArrowRight, IconStar } from '@tabler/icons-react';

import { ReviewCardSkeleton, type ReviewItem } from './ReviewCard';
import { ReviewsCarousel } from './ReviewsCarousel';

export function Reviews() {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data: { reviews?: ReviewItem[] }) => {
        setReviews(data.reviews ?? []);
      })
      .catch(() => setReviews([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && reviews.length === 0) return null;

  return (
    <section id="reviews" className="section-padding bg-white" aria-labelledby="reviews-heading">
      <Container>
        <SectionReveal direction="left">
          <SectionHeader
            eyebrow={t('label')}
            title={t('title')}
            icon={IconStar}
            className="mb-10"
            headingId="reviews-heading"
          />

          {isLoading ? (
            <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <ReviewCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ReviewsCarousel reviews={reviews} />
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-8">
            <p className="text-[15px] text-black/70">{t('cta.text')}</p>
            <Link
              href={`/${locale}/leave-a-review`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-black transition hover:underline">
              {t('cta.link')}
              <IconArrowRight size={14} />
            </Link>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
