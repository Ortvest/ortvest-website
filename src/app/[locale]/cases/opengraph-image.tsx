import { ImageResponse } from 'next/og';

import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@lib/og';

export const alt = 'Ortvest case studies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Selected work"
      headline="Platforms for P2P, community and logistics products"
      subline="Five platforms that had to start empty — and what made them fill up."
    />,
    { ...size }
  );
}
