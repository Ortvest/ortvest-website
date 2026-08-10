import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { Container, SectionHeader, SectionReveal } from '@shared/components';

import { fetchPublishedReviews } from '@lib/fetch-reviews';
import { IconArrowRight, IconStar } from '@tabler/icons-react';

import { ReviewsCarousel } from './ReviewsCarousel';

export async function Reviews() {
  let reviews;
  try {
    reviews = await fetchPublishedReviews();
  } catch (error) {
    console.error('[Reviews] Failed to fetch published reviews from MongoDB:', error);
    return null;
  }

  if (reviews.length === 0) return null;

  const t = await getTranslations('reviews');
  const locale = await getLocale();

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

          <ReviewsCarousel reviews={reviews} />

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
