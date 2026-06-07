'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Container, SectionHeader, SectionReveal } from '@shared/components';
import type { TablerIcon } from '@shared/types/icon.types';

import { accordionContent } from '@lib/motion';
import {
  IconArrowsExchange,
  IconArrowRight,
  IconChevronDown,
  IconLayoutDashboard,
  IconPlant,
  IconTruck,
  IconUsers,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

const nicheKeys = ['p2p', 'community', 'logistics', 'agritech'] as const;

type NicheKey = (typeof nicheKeys)[number];

const nicheIcons: Record<NicheKey, TablerIcon> = {
  p2p: IconArrowsExchange,
  community: IconUsers,
  logistics: IconTruck,
  agritech: IconPlant,
};

const nicheIconSizes: Record<NicheKey, string> = {
  p2p: 'h-[22px] w-[22px]',
  community: 'h-6 w-6',
  logistics: 'h-5 w-5',
  agritech: 'h-5 w-5',
};

const nicheCaseLinks: Partial<Record<NicheKey, string>> = {
  community: '/cases/yachtmate',
  logistics: '/cases/navexa',
};

type NicheCardProps = {
  nicheKey: NicheKey;
  icon: TablerIcon;
  iconClassName: string;
  tags: string[];
  index?: number;
  caseLink?: string;
  isOpen: boolean;
  onToggle: () => void;
};

function NicheCard({
  nicheKey,
  icon: Icon,
  iconClassName,
  tags,
  index,
  caseLink,
  isOpen,
  onToggle,
}: NicheCardProps) {
  const t = useTranslations('industries');

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      aria-expanded={isOpen}
      className={[
        'group relative flex flex-col overflow-hidden rounded-2xl bg-white p-5 cursor-pointer',
        'border shadow-card transition-colors transition-shadow duration-300',
        'hover:shadow-card-hover',
        isOpen ? 'border-accent/50 shadow-card-hover' : 'border-black/[0.08] hover:border-accent/20',
      ].join(' ')}>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-black transition-transform duration-300 group-hover:scale-105">
          <Icon className={iconClassName} />
        </div>
        <IconChevronDown
          className={`h-4 w-4 transition-all duration-300 ${isOpen ? 'rotate-180 text-black/60' : 'text-black/25'}`}
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        {index !== undefined && (
          <span className="text-xs font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
        )}

        <h3 className={`${index !== undefined ? 'mt-1' : 'mt-2'} text-h4 text-black`}>
          {t(`niches.${nicheKey}.title`)}
        </h3>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-black/10 px-3.5 py-1 text-xs text-black/55">
              {tag}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {!isOpen && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="mt-3 text-[11px] text-black/30 select-none">
              {t('clickToLearn')}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div key="desc" {...accordionContent} className="overflow-hidden">
              <div className="pt-3">
                <p className="text-body-sm text-black/60">{t(`niches.${nicheKey}.description`)}</p>
                {caseLink && (
                  <a
                    href={caseLink}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-block text-xs text-black/35 transition duration-150 hover:text-black/70">
                    {t('seeCase')} →
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Industries() {
  const t = useTranslations('industries');
  const [openKey, setOpenKey] = useState<NicheKey | null>(null);

  const toggle = (key: NicheKey) => setOpenKey((prev) => (prev === key ? null : key));

  return (
    <section id="industries" className="section-padding bg-white" aria-labelledby="industries-heading">
      <Container>
        <SectionReveal direction="right">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('subtitle')}
            icon={IconLayoutDashboard}
            className="mb-10"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {nicheKeys.map((key, i) => (
              <NicheCard
                key={key}
                nicheKey={key}
                icon={nicheIcons[key]}
                iconClassName={nicheIconSizes[key]}
                tags={t.raw(`niches.${key}.tags`) as string[]}
                index={i}
                caseLink={nicheCaseLinks[key]}
                isOpen={openKey === key}
                onToggle={() => toggle(key)}
              />
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
