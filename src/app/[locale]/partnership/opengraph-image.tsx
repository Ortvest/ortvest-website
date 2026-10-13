import { ImageResponse } from 'next/og';

import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@lib/og';

export const alt = 'Technical partnership with Ortvest';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Partnership"
      headline="Not a build contract. Shared accountability."
      subline="Embedded team, build + equity, or a technical co-founder function."
    />,
    { ...size }
  );
}
