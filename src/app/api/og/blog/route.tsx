import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')?.trim() || 'Ortvest field notes';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#000',
        color: '#fff',
        padding: '72px',
        fontFamily: 'system-ui, sans-serif',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 42,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            background: '#cdff4e',
            color: '#000',
            fontSize: 24,
            fontWeight: 800,
          }}>
          O
        </div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>Ortvest · Field notes</div>
      </div>

      <div
        style={{
          maxWidth: 1020,
          fontSize: title.length > 80 ? 54 : 64,
          fontWeight: 750,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
        }}>
        {title.slice(0, 140)}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: '#a1a1aa' }}>
        Cold starts · Trust systems · Marketplace building
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
