import { IconStar } from '@tabler/icons-react';

import styles from './ReviewCard.module.css';

export interface ReviewItem {
  _id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`${rating} out of 5 stars`}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <IconStar
            key={i}
            size={16}
            className={i < rating ? 'fill-[#A3CC00] text-[#A3CC00]' : 'text-zinc-200'}
            stroke={1.5}
          />
        ))}
      </div>
      <span className="text-sm text-black/70">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-l-none rounded-r-xl border border-black/[0.06] border-l-[3px] border-l-[#C5F135] bg-[#FAFAF8] py-8 px-7 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)]">
      <StarRating rating={review.rating} />
      <blockquote
        className={`${styles['review-card__text']} flex-1 text-[15px] font-normal not-italic leading-[1.7] text-[#1a1a1a]`}>
        {review.text}
      </blockquote>
      <div className="mt-auto">
        <p className="text-body-sm font-semibold text-[#0a0a0a]">{review.name}</p>
        <p className="text-body-sm text-black/50">
          {review.role}, {review.company}
        </p>
      </div>
    </article>
  );
}

export function ReviewCardSkeleton() {
  return <div className="h-[220px] animate-pulse rounded-2xl border border-black/[0.06] bg-black/[0.03]" />;
}
