import { getReviewsCollection } from '@lib/models/review';
import type { ReviewItem } from '@modules/Reviews/ReviewCard';

type ReviewProjection = {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
};

function toReviewItem(doc: ReviewProjection): ReviewItem {
  return {
    name: doc.name,
    role: doc.role,
    company: doc.company,
    text: doc.text,
    rating: doc.rating,
  };
}

export async function fetchPublishedReviews(): Promise<ReviewItem[]> {
  const collection = await getReviewsCollection();
  const docs = await collection
    .find({ isPublished: true })
    .sort({ createdAt: -1 })
    .project<ReviewProjection>({
      _id: 0,
      name: 1,
      role: 1,
      company: 1,
      text: 1,
      rating: 1,
    })
    .toArray();

  return docs.map(toReviewItem);
}
