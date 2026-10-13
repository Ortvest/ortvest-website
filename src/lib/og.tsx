import type { ReactElement } from 'react';

/**
 * Shared layout for generated Open Graph cards (1200x630).
 *
 * Text is kept Latin-only on the generic card: `next/og` renders with its
 * bundled fallback font, so Cyrillic/extended glyphs are not guaranteed.
 * Dynamic cards (post / case titles) inherit whatever the content provides.
 * Titles are rendered on a flat brand background — covers are not used as a
 * backdrop, they are already busy accent-coloured title cards.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

const ACCENT = '#cdff4e';
const BACKGROUND = '#09090b';

type OgCardProps = {
  /** Small line above the headline, e.g. "Case study" or "Blog". */
  eyebrow?: string;
  headline: string;
  /** Optional supporting line under the headline. */
  subline?: string;
};

export function OgCard({ eyebrow, headline, subline }: OgCardProps): ReactElement {
  const headlineSize = headline.length > 90 ? 52 : headline.length > 55 ? 62 : 74;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BACKGROUND,
        padding: '64px 72px',
        fontFamily: 'system-ui, sans-serif',
      }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: ACCENT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 700,
            color: '#000',
          }}>
          O
        </div>
        <span style={{ fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: 2 }}>ORTVEST</span>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {eyebrow && (
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: ACCENT,
              textTransform: 'uppercase',
              letterSpacing: 3,
              marginBottom: 18,
            }}>
            {eyebrow}
          </span>
        )}
        <span style={{ fontSize: headlineSize, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>{headline}</span>
        {subline && (
          <span style={{ fontSize: 26, color: 'rgba(255,255,255,0.72)', marginTop: 22, lineHeight: 1.35 }}>
            {subline}
          </span>
        )}
      </div>

      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 22,
          color: 'rgba(255,255,255,0.6)',
        }}>
        <span>ortvest.com</span>
        <span>Poznań, Poland</span>
      </div>
    </div>
  );
}
