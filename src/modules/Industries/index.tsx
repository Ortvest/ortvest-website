'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader, SectionReveal } from '@shared/components';

import { Anchor, ArrowLeftRight, ArrowRight, Building2, TrendingUp, Users } from 'lucide-react';

const nicheKeys = ['p2p', 'community', 'hospitality', 'conversion'] as const;

const nicheIcons = {
  p2p: ArrowLeftRight,
  community: Users,
  hospitality: Anchor,
  conversion: TrendingUp,
} as const;

export function Industries() {
  const locale = useLocale();
  const t = useTranslations('industries');

  return (
    <section id="industries" className="section-padding bg-white" aria-labelledby="industries-heading">
      <Container>
        <SectionReveal direction="right">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('subtitle')}
            icon={Building2}
            className="mb-10"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {nicheKeys.map((key, i) => {
              const Icon = nicheIcons[key];
              const tags = t.raw(`niches.${key}.tags`) as string[];

              return (
                <InteractiveCard key={key} icon={<Icon className="h-5 w-5" />}>
                  <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-1 text-h4 text-black">{t(`niches.${key}.title`)}</h3>
                  <p className="mt-2 text-body-sm text-black/60">{t(`niches.${key}.description`)}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/10 px-3.5 py-1 text-xs text-black/55">
                        {tag}
                      </span>
                    ))}
                  </div>
                </InteractiveCard>
              );
            })}
          </div>

          <p className="mt-8 max-w-3xl text-body-sm leading-relaxed text-black/50">
            {t('logisticsNote')}{' '}
            <Link
              href={`/${locale}/cases/navexa`}
              className="font-medium text-black/60 underline-offset-2 hover:text-black hover:underline">
              Navexa
            </Link>
            {' & '}
            <Link
              href={`/${locale}/cases/teya`}
              className="font-medium text-black/60 underline-offset-2 hover:text-black hover:underline">
              Teya
            </Link>
            <ArrowRight className="ml-1 inline h-3.5 w-3.5 -translate-y-px text-black/40" aria-hidden />
          </p>
        </SectionReveal>
      </Container>
    </section>
  );
}
