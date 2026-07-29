import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation webhook for blog content.
 *
 * The CMS calls this endpoint after publishing a post:
 *   POST /api/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *
 * This purges the 'blog' cache tag so the next visitor sees fresh content
 * without requiring a full redeploy.
 */
export async function POST(request: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    console.error('[Revalidate] REVALIDATE_SECRET is not set — webhook endpoint is disabled.');
    return NextResponse.json({ error: 'Revalidation is not configured.' }, { status: 503 });
  }

  const incomingSecret = request.headers.get('x-revalidate-secret');
  if (incomingSecret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  revalidateTag('blog');

  return NextResponse.json({ revalidated: true, tag: 'blog', ts: Date.now() });
}
