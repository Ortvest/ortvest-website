import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { Container, SectionReveal } from '@shared/components';

import { CLUTCH_BLURB_WIDGET_HEIGHT, CLUTCH_BLURB_WIDGET_TYPE, CLUTCH_COMPANY_ID } from '@lib/clutch';
import { fetchPublishedReviews } from '@lib/fetch-reviews';
import { IconArrowRight } from '@tabler/icons-react';

import { ClutchWidget } from '../../components/ClutchWidget';

import { ReviewsSpotlight } from './ReviewsSpotlight';

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
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/40">{t('label')}</p>
              <h2 id="reviews-heading" className="text-h1 font-extrabold leading-tight text-black">
                {t('title')}
              </h2>
            </div>

            <div
              className="shrink-0"
              style={{ minHeight: CLUTCH_BLURB_WIDGET_HEIGHT === 'auto' ? '45px' : `${CLUTCH_BLURB_WIDGET_HEIGHT}px` }}>
              <ClutchWidget
                widgetType={CLUTCH_BLURB_WIDGET_TYPE}
                height={CLUTCH_BLURB_WIDGET_HEIGHT}
                companyId={CLUTCH_COMPANY_ID}
              />
            </div>
          </div>

          <div className="mb-10 border-t border-black/[0.08]" />

          <ReviewsSpotlight reviews={reviews} />

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
