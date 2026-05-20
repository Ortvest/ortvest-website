'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Container, SectionHeader, SectionReveal } from '@shared/components';

import { EASE } from '@lib/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase } from 'lucide-react';

import { CaseCard } from './CaseCard';
import { type CaseIndustry, portfolioGridCases } from './data';

type IndustryFilter = 'all' | CaseIndustry;

const FILTER_KEYS: IndustryFilter[] = ['all', 'p2p', 'community', 'hospitality', 'conversion', 'logistics'];

export function Cases() {
  const t = useTranslations('cases');
  const [activeFilter, setActiveFilter] = useState<IndustryFilter>('all');

  const filteredCases =
    activeFilter === 'all'
      ? portfolioGridCases
      : portfolioGridCases.filter((c) => c.industries?.includes(activeFilter));

  return (
    <section id="cases" className="section-padding bg-white" aria-labelledby="cases-heading">
      <Container>
        <SectionReveal direction="left">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('subtitle')}
            icon={Briefcase}
            className="mb-8"
          />

          <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:p-6">
            <p className="text-body-sm text-black/70">{t('ndaBanner')}</p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {FILTER_KEYS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? 'bg-black text-white'
                    : 'border border-black/10 bg-transparent text-black/70 hover:bg-black/[0.04]'
                }`}>
                {t(`filterIndustries.${filter}`)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            {filteredCases.length > 0 ? (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCases.map((caseItem) => (
                  <motion.div
                    key={caseItem.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: EASE }}>
                    <CaseCard caseItem={caseItem} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center">
                <p className="mb-6 max-w-lg text-body-lg text-black/70">{t('emptyState')}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
                  {t('beFirstButton')}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 text-center">
            <p className="mx-auto mb-6 max-w-xl text-body-sm text-black/60">{t('ctaText')}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#consultation"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
                {t('ctaButton')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black/80 transition hover:border-black/30 hover:text-black">
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
