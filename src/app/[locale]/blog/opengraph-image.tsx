import { ImageResponse } from 'next/og';

import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@lib/og';

export const alt = 'Ortvest blog — building platforms that start empty';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Blog"
      headline="Notes on marketplaces, P2P products and member networks"
      subline="What we learned building platforms that had to start empty."
    />,
    { ...size }
  );
}
