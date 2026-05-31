import { NextRequest, NextResponse } from 'next/server';

import { getReviewsCollection, toPublicReview, type ReviewDoc } from '@lib/models/review';
import { parseCreateReviewInput } from '@lib/review-validation';

export async function GET() {
  try {
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

    const reviews = docs.map((doc) => toPublicReview(doc as ReviewDoc & { _id: import('mongodb').ObjectId }));

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
