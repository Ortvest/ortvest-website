'use client';

import { useTranslations } from 'next-intl';

import { SectionHeader } from '@shared/components';

import { IconNews } from '@tabler/icons-react';

export function BlogSectionHeader() {
  const t = useTranslations('blogSection');

  return (
    <SectionHeader
      eyebrow="Blog"
      title={t('title')}
      description={t('subtitle')}
      icon={IconNews}
      align="center"
      headingId="blog-heading"
      className="mx-auto mb-10"
    />
  );
}
