import { ObjectId } from 'mongodb';

import { getCollection } from '@lib/mongodb';

export const REVIEWS_COLLECTION = 'reviews';

export interface ReviewDoc {
  _id?: ObjectId;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  isPublished: boolean;
  projectSlug?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewPublic {
  _id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  createdAt: string;
}

export interface ReviewAdmin extends ReviewPublic {
  isPublished: boolean;
  projectSlug?: string | null;
  updatedAt: string;
}

export interface CreateReviewInput {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  projectSlug?: string | null;
}

export function toPublicReview(doc: ReviewDoc & { _id: ObjectId }): ReviewPublic {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    role: doc.role,
    company: doc.company,
    text: doc.text,
    rating: doc.rating,
    createdAt: doc.createdAt.toISOString(),
  };
}

export function toAdminReview(doc: ReviewDoc & { _id: ObjectId }): ReviewAdmin {
  return {
    ...toPublicReview(doc),
    isPublished: doc.isPublished,
    projectSlug: doc.projectSlug ?? null,
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function getReviewsCollection() {
  return getCollection(REVIEWS_COLLECTION);
}
