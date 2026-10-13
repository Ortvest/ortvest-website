import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@lib/og';
import { findServicePage } from '@modules/Services/servicePages';

export const alt = 'Ortvest service';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: { locale: string; slug: string } }) {
  const definition = findServicePage(params.slug);
  if (!definition || !definition.locales.includes(params.locale)) {
    return new ImageResponse(<OgCard headline="Ortvest" />, { ...size });
  }

  const t = await getTranslations({ locale: params.locale, namespace: `servicePages.${params.slug}` });

  return new ImageResponse(
    <OgCard eyebrow={t('hero.eyebrow')} headline={t('meta.ogTitle')} subline={t('cardSummary')} />,
    { ...size }
  );
}
