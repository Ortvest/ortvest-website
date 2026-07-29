import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0a0a0a',
        color: '#fff',
        padding: '72px 80px',
        fontFamily: 'system-ui, sans-serif',
      }}>
      {/* Top: logo mark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            background: '#cdff4e',
            color: '#000',
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}>
          O
        </div>
        <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>Ortvest</span>
      </div>

      {/* Middle: headline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            maxWidth: 900,
          }}>
          Build products
          <br />
          <span style={{ color: '#cdff4e' }}>people trust.</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            maxWidth: 640,
          }}>
          Marketplaces, P2P platforms and member networks — design&nbsp;&amp;&nbsp;engineering from Ortvest.
        </div>
      </div>

      {/* Bottom: domain */}
      <div
        style={{
          fontSize: 20,
          color: 'rgba(255,255,255,0.35)',
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
        ortvest.com
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
