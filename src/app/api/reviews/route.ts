import { NextRequest, NextResponse } from 'next/server';

import { fetchPublishedReviews } from '@lib/fetch-reviews';
import { getReviewsCollection, type ReviewDoc } from '@lib/models/review';
import { parseCreateReviewInput } from '@lib/review-validation';

export async function GET() {
  try {
    const reviews = await fetchPublishedReviews();
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('GET /api/reviews error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = parseCreateReviewInput(body);

    if (!parsed.data) {
      return NextResponse.json({ error: parsed.error ?? 'Invalid request' }, { status: 400 });
    }

    const now = new Date();
    const collection = await getReviewsCollection();
    const result = await collection.insertOne({
      ...parsed.data,
      isPublished: false,
      createdAt: now,
      updatedAt: now,
    } as ReviewDoc);

    return NextResponse.json(
      { message: 'Review submitted successfully', id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/reviews error:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
