import { ImageResponse } from 'next/og';

import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@lib/og';

export const alt = 'Ortvest — websites, web services and mobile apps';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Default social card for every page under /[locale] that does not generate its
 * own (home, /cases, /blog, /partnership).
 */
export default function Image() {
  return new ImageResponse(
    <OgCard
      headline="Websites, web services and mobile apps"
      subline="Design, development and launch from one team in Poznań."
    />,
    { ...size }
  );
}
