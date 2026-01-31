'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader } from '@shared/components';

import { staggerContainer, staggerItem, viewport } from '@lib/motion';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code,
  Globe,
  Image as ImageIcon,
  Layers,
  Palette,
  PenTool,
  Smartphone,
  TrendingUp,
} from 'lucide-react';

const designItems = [
  { key: 'uiux', icon: Layers },
  { key: 'web', icon: Globe },
  { key: 'app', icon: Smartphone },
  { key: 'brand', icon: PenTool },
  { key: 'graphic', icon: ImageIcon },
] as const;

const devItems = [
  { key: 'web', icon: Globe },
  { key: 'mobile', icon: Smartphone },
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
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
          icon={Layers}
          className="mb-12"
        />

        {/* Design & Development row */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}>
          {/* Design card */}
          <InteractiveCard icon={<Palette className="h-5 w-5" />}>
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

          {/* Development card */}
          <InteractiveCard icon={<Code className="h-5 w-5" />}>
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
        </motion.div>

        {/* Marketing packages */}
        <div className="mt-10">
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-black/50">{t('marketing')}</h3>
          <motion.div
            className="grid gap-5 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}>
            {marketingPackages.map(({ tier, keys, itemsKey }) => (
              <InteractiveCard key={tier} icon={<TrendingUp className="h-5 w-5" />}>
                <h4 className="text-h4 text-black">{t(`marketing${tier}`)}</h4>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-black/40">{t('whatsIncluded')}</p>
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
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </InteractiveCard>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
