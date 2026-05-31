import { NextRequest, NextResponse } from 'next/server';

import { isAdminAuthorized } from '@lib/admin-auth';
import { getReviewsCollection, type ReviewDoc, toAdminReview } from '@lib/models/review';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const collection = await getReviewsCollection();
    const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
    const reviews = docs.map((doc) => toAdminReview(doc as ReviewDoc & { _id: ObjectId }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('GET /api/admin/reviews error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
