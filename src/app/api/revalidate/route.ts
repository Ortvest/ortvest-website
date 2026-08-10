import { revalidatePath, revalidateTag } from 'next/cache';
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

  // Purge fetch data cache entries tagged 'blog'
  revalidateTag('blog');

  // Explicitly purge the Full Route Cache for all blog listing and home pages
  // (covers cases where the page is fully static from generateStaticParams)
  for (const locale of ['en', 'ua', 'pl']) {
    revalidatePath(`/${locale}/blog`, 'page');
    revalidatePath(`/${locale}`, 'page');
  }
  revalidatePath('/', 'page');

  return NextResponse.json({ revalidated: true, tag: 'blog', ts: Date.now() });
}
