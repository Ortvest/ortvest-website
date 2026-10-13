import { ImageResponse } from 'next/og';

import { fetchCmsBlogPostBySlug } from '@lib/cms-api';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@lib/og';

export const alt = 'Ortvest blog';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Follows the article's own ISR window.
export const revalidate = 300;

/**
 * Branded card with the post title. The cover image is deliberately not used as
 * a background: covers are already title cards on a bright accent background,
 * so text on top of them is unreadable.
 */
export default async function Image({ params }: { params: { locale: string; slug: string } }) {
  const post = await fetchCmsBlogPostBySlug(params.slug, params.locale);

  return new ImageResponse(<OgCard eyebrow="Blog" headline={post?.title ?? 'Ortvest blog'} />, { ...size });
}
