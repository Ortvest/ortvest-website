'use client';

import { useIsMobile } from '@shared/hooks/useIsMobile';

/**
 * Background like reference: soft amorphous blobs in salad green,
 * subtle grid, clearly visible but diffused. No tiny dots, large soft shapes.
 */

const SALAD = 'rgba(205, 255, 78,';

/** Soft blobs: left %, top %, width px, height px, opacity, blur px, animation delay (s) */
const SOFT_BLOBS: {
  left: string;
  top: string;
  width: number;
  height: number;
  opacity: number;
  blur: number;
  delay: number;
}[] = [
  { left: '55%', top: '5%', width: 420, height: 320, opacity: 0.18, blur: 120, delay: 0 },
  { left: '75%', top: '25%', width: 280, height: 340, opacity: 0.14, blur: 100, delay: 0.15 },
  { left: '15%', top: '15%', width: 320, height: 280, opacity: 0.12, blur: 110, delay: 0.25 },
  { left: '-5%', top: '45%', width: 380, height: 300, opacity: 0.1, blur: 100, delay: 0.1 },
  { left: '60%', top: '55%', width: 360, height: 260, opacity: 0.13, blur: 115, delay: 0.3 },
  { left: '85%', top: '65%', width: 300, height: 380, opacity: 0.15, blur: 105, delay: 0.2 },
  { left: '5%', top: '75%', width: 340, height: 280, opacity: 0.11, blur: 95, delay: 0.35 },
  { left: '35%', top: '35%', width: 260, height: 260, opacity: 0.08, blur: 90, delay: 0.4 },
];

/** Mobile: fewer blobs, no animation, reduced blur for scroll performance */
const MOBILE_BLOBS = SOFT_BLOBS.slice(0, 3).map((b) => ({ ...b, blur: Math.min(b.blur, 60) }));

export function BackgroundEffects() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Soft blobs — simplified on mobile for scroll performance */}
      <div className="absolute inset-0">
        {(isMobile ? MOBILE_BLOBS : SOFT_BLOBS).map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.left,
              top: b.top,
              width: b.width,
              height: b.height,
              background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${SALAD}${b.opacity}) 0%, transparent 70%)`,
              filter: `blur(${b.blur}px)`,
              transform: 'translate(-50%, -50%)',
              ...(isMobile ? { opacity: 1 } : { animation: `blobAppear 1.8s ease-out ${b.delay}s forwards`, opacity: 0 }),
            }}
          />
        ))}
      </div>

      {/* Large oval, mid-right, lower left — desktop only for scroll perf on mobile */}
      {!isMobile && (
        <>
          <div
            className="absolute right-0 top-0 h-[75%] w-[58%] rounded-full"
            style={{
              background: `radial-gradient(ellipse 70% 75% at 85% 25%, ${SALAD}0.22) 0%, transparent 58%)`,
              filter: 'blur(90px)',
            }}
          />
          <div
            className="absolute right-[-8%] top-[28%] h-[55%] w-[48%] rounded-full"
            style={{
              background: `radial-gradient(ellipse 65% 70% at 72% 48%, ${SALAD}0.18) 0%, transparent 62%)`,
              filter: 'blur(95px)',
            }}
          />
          <div
            className="absolute bottom-[-5%] left-[-5%] h-[50%] w-[52%] rounded-full"
            style={{
              background: `radial-gradient(ellipse 68% 62% at 28% 82%, ${SALAD}0.16) 0%, transparent 58%)`,
              filter: 'blur(88px)',
            }}
          />
        </>
      )}

      {/* Noise, light texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
