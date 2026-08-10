import { getReviewsCollection, type ReviewDoc, toPublicReview } from '@lib/models/review';
import type { ReviewItem } from '@modules/Reviews/ReviewCard';

export async function fetchPublishedReviews(): Promise<ReviewItem[]> {
  const collection = await getReviewsCollection();
  const docs = await collection
    .find({ isPublished: true })
    .sort({ createdAt: -1 })
    .project({
      name: 1,
      role: 1,
      company: 1,
      text: 1,
      rating: 1,
      createdAt: 1,
    })
    .toArray();

  return docs.map((doc) => toPublicReview(doc as ReviewDoc & { _id: import('mongodb').ObjectId }));
}
