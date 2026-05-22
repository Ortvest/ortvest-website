'use client';

import { useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader, SectionReveal } from '@shared/components';

import { Anchor, ArrowLeftRight, ArrowRight, Building2, Sprout, TrendingUp, Trophy, Truck, Users } from 'lucide-react';

const nicheKeys = ['p2p', 'community', 'hospitality', 'sporttech', 'conversion'] as const;
const expandingKeys = ['logistics', 'agritech'] as const;

type NicheKey = (typeof nicheKeys)[number];
type ExpandingKey = (typeof expandingKeys)[number];
type IndustryKey = NicheKey | ExpandingKey;

const nicheIcons: Record<IndustryKey, typeof Truck> = {
  p2p: ArrowLeftRight,
  community: Users,
  hospitality: Anchor,
  sporttech: Trophy,
  conversion: TrendingUp,
  logistics: Truck,
  agritech: Sprout,
};

export function Industries() {
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
                      <span key={tag} className="rounded-full border border-black/10 px-3.5 py-1 text-xs text-black/55">
                        {tag}
                      </span>
                    ))}
                  </div>
                </InteractiveCard>
              );
            })}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {expandingKeys.map((key) => {
              const Icon = nicheIcons[key];
              const tags = t.raw(`niches.${key}.tags`) as string[];

              return (
                <InteractiveCard
                  key={key}
                  icon={<Icon className="h-5 w-5 opacity-60" />}
                  className="border-dashed opacity-75">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black/40">
                      {t('comingSoon.badge')}
                    </span>
                  </div>
                  <h3 className="mt-2 text-h4 text-black/70">{t(`niches.${key}.title`)}</h3>
                  <p className="mt-2 text-body-sm text-black/45">{t(`niches.${key}.description`)}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-black/[0.07] px-3.5 py-1 text-xs text-black/35">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex w-fit items-center gap-1 text-[12px] font-medium text-black/40 transition hover:text-black/70">
                    {t('comingSoon.cta')}
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </a>
                </InteractiveCard>
              );
            })}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
