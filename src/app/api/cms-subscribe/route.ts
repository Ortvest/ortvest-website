import { NextRequest, NextResponse } from 'next/server';

function resolveCmsApiUrl(): string {
  const fromEnv = process.env.ORTVEST_CMS_API_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:3200';
  return '';
}

/**
 * Proxies subscription checkout to Ortvest CMS (Stripe Checkout is created there).
 */
export async function POST(request: NextRequest) {
  const cmsUrl = resolveCmsApiUrl();
  if (!cmsUrl) {
    return NextResponse.json(
      {
        error: 'ORTVEST_CMS_API_URL is not set. Add it to .env (e.g. http://localhost:3200 for local CMS).',
      },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    plan?: 'monthly' | 'annually';
    locale?: string;
    cancel_path?: 'home' | 'cms';
  };

  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || new URL(request.url).origin;

  try {
    const res = await fetch(`${cmsUrl}/api/billing/website-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: body.plan ?? 'monthly',
        locale: body.locale ?? 'en',
        cancel_path: body.cancel_path ?? 'cms',
        site_origin: siteOrigin,
      }),
    });

    const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
    if (!res.ok) {
      return NextResponse.json(
        {
          error: data.error ?? `CMS returned ${res.status}. Is Ortvest CMS running at ${cmsUrl}?`,
        },
        { status: res.status >= 500 ? 502 : res.status }
      );
    }
    if (!data.url) {
      return NextResponse.json({ error: 'No checkout URL from CMS' }, { status: 502 });
    }
    return NextResponse.json({ url: data.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('cms-subscribe proxy error:', err);
    return NextResponse.json(
      {
        error: `Cannot reach CMS at ${cmsUrl}: ${msg}`,
      },
      { status: 502 }
    );
  }
}
