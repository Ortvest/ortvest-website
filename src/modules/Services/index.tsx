'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader, SectionReveal } from '@shared/components';

import {
  IconArrowRight,
  IconCode,
  IconDeviceMobile,
  IconPalette,
  IconPencil,
  IconPhoto,
  IconStack2,
  IconTrendingUp,
  IconWorld,
} from '@tabler/icons-react';

const designItems = [
  { key: 'uiux', icon: IconStack2 },
  { key: 'web', icon: IconWorld },
  { key: 'app', icon: IconDeviceMobile },
  { key: 'brand', icon: IconPencil },
  { key: 'graphic', icon: IconPhoto },
] as const;

const devItems = [
  { key: 'web', icon: IconWorld },
  { key: 'mobile', icon: IconDeviceMobile },
  { key: 'landing', icon: IconWorld },
  { key: 'api', icon: IconCode },
  { key: 'saas', icon: IconStack2 },
  { key: 'performance', icon: IconTrendingUp },
  { key: 'support', icon: IconPencil },
] as const;

const marketingPackages = [
  { tier: 'Basic', keys: ['seo', 'analytics', 'context', 'smm', 'targeted'], itemsKey: 'marketingBasicItems' },
  { tier: 'Advanced', keys: ['email', 'content', 'copy', 'crm'], itemsKey: 'marketingAdvancedItems' },
  { tier: 'Premium', keys: ['strategy', 'research', 'competitors'], itemsKey: 'marketingPremiumItems' },
] as const;

export function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="section-padding bg-white" aria-labelledby="services-heading">
      <Container>
        <SectionReveal direction="right">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('subtitle')}
            icon={IconStack2}
            className="mb-12"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <InteractiveCard icon={<IconPalette className="h-5 w-5" />}>
              <h3 className="text-h4 text-black">{t('design')}</h3>
              <ul className="mt-4 space-y-2.5" role="list">
                {designItems.map(({ key, icon: Icon }) => (
                  <li key={key} className="flex items-center gap-2.5 text-body-sm text-black/70">
                    <Icon className="h-4 w-4 text-black/40" />
                    {t(`designItems.${key}`)}
                  </li>
                ))}
              </ul>
            </InteractiveCard>
            <InteractiveCard icon={<IconCode className="h-5 w-5" />}>
              <h3 className="text-h4 text-black">{t('development')}</h3>
              <ul className="mt-4 space-y-2.5" role="list">
                {devItems.map(({ key, icon: Icon }) => (
                  <li key={key} className="flex items-center gap-2.5 text-body-sm text-black/70">
                    <Icon className="h-4 w-4 text-black/40" />
                    {t(`devItems.${key}`)}
                  </li>
                ))}
              </ul>
            </InteractiveCard>
          </div>

          <div className="mt-10">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-black/50">{t('marketing')}</h3>
            <div className="grid gap-5 sm:grid-cols-3">
              {marketingPackages.map(({ tier, keys, itemsKey }) => (
                <InteractiveCard key={tier} icon={<IconTrendingUp className="h-5 w-5" />}>
                  <h4 className="text-h4 text-black">{t(`marketing${tier}`)}</h4>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-black/40">
                    {t('whatsIncluded')}
                  </p>
                  <ul className="mt-3 space-y-2" role="list">
                    {keys.map((key) => (
                      <li key={key} className="flex items-center gap-2 text-body-sm text-black/70">
                        <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                        {t(`${itemsKey}.${key}`)}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-black transition hover:text-accent-dark group">
                    {t('getQuote')}
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
