import { NextRequest, NextResponse } from 'next/server';

import { isAdminAuthorized } from '@lib/admin-auth';
import { getReviewsCollection, type ReviewDoc, toAdminReview } from '@lib/models/review';
import { ObjectId } from 'mongodb';

type RouteContext = { params: { id: string } };

function parseObjectId(id: string): ObjectId | null {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const objectId = parseObjectId(params.id);
  if (!objectId) {
    return NextResponse.json({ error: 'Invalid review id' }, { status: 400 });
  }

  try {
    const body = (await request.json()) as { isPublished?: unknown };
    if (typeof body.isPublished !== 'boolean') {
      return NextResponse.json({ error: 'isPublished must be a boolean' }, { status: 400 });
    }

    const collection = await getReviewsCollection();
    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: { isPublished: body.isPublished, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({
      review: toAdminReview(result as ReviewDoc & { _id: ObjectId }),
    });
  } catch (error) {
    console.error('PATCH /api/admin/reviews/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const objectId = parseObjectId(params.id);
  if (!objectId) {
    return NextResponse.json({ error: 'Invalid review id' }, { status: 400 });
  }

  try {
    const collection = await getReviewsCollection();
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Review deleted' });
  } catch (error) {
    console.error('DELETE /api/admin/reviews/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
