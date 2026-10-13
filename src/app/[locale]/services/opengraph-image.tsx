import { ImageResponse } from 'next/og';

import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@lib/og';

export const alt = 'What Ortvest builds';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Services"
      headline="Marketplaces, P2P products and member networks"
      subline="Pick the shape closest to what you are building."
    />,
    { ...size }
  );
}
