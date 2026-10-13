import { ImageResponse } from 'next/og';

import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@lib/og';
import { cases } from '@modules/Cases/data';

export const alt = 'Ortvest case study';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image({ params }: { params: { locale: string; slug: string } }) {
  const caseItem = cases.find((item) => item.id === params.slug && !item.isNDA);

  return new ImageResponse(
    <OgCard eyebrow="Case study" headline={caseItem?.title ?? 'Ortvest case study'} subline={caseItem?.challenge} />,
    { ...size }
  );
}
