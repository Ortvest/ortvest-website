'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Container, SectionReveal } from '@shared/components';

import {
  SiGo,
  SiGraphql,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTypescript,
} from '@icons-pack/react-simple-icons';
import {
  IconAnchor,
  IconArrowRight,
  IconArrowsExchange,
  IconBrandAws,
  IconBrandDocker,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconCode,
  IconMouse,
  IconPalette,
  IconPlant,
  IconPlugConnected,
  IconRefresh,
  IconServer,
  IconStarFilled,
  IconTopologyStar,
  IconTrendingUp,
  IconTruck,
  IconUsers,
  type IconProps,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'what' | 'industries' | 'process' | 'technologies';

type AnyIcon = React.ComponentType<{
  size?: number | string;
  color?: string;
  className?: string;
}>;

type TFn = ReturnType<typeof useTranslations<'servicesSection'>>;

// ─── Static data ──────────────────────────────────────────────────────────────

const TABS: { id: Tab; labelKey: `tabs.${Tab}` }[] = [
  { id: 'what', labelKey: 'tabs.what' },
  { id: 'industries', labelKey: 'tabs.industries' },
  { id: 'process', labelKey: 'tabs.process' },
  { id: 'technologies', labelKey: 'tabs.technologies' },
];

const industries: {
  id: number;
  Icon: AnyIcon;
  number: string;
  key: 'p2p' | 'community' | 'hospitality' | 'sporttech' | 'conversion';
  tagKeys: string[];
  colSpan2?: boolean;
}[] = [
  {
    id: 0,
    Icon: IconArrowsExchange as AnyIcon,
    number: '01',
    key: 'p2p',
    tagKeys: ['t1', 't2', 't3'],
  },
  {
    id: 1,
    Icon: IconUsers as AnyIcon,
    number: '02',
    key: 'community',
    tagKeys: ['t1', 't2', 't3'],
  },
  {
    id: 2,
    Icon: IconAnchor as AnyIcon,
    number: '03',
    key: 'hospitality',
    tagKeys: ['t1', 't2', 't3'],
  },
  {
    id: 3,
    Icon: IconStarFilled as AnyIcon,
    number: '04',
    key: 'sporttech',
    tagKeys: ['t1', 't2', 't3'],
  },
  {
    id: 4,
    Icon: IconMouse as AnyIcon,
    number: '05',
    key: 'conversion',
    tagKeys: ['t1', 't2', 't3', 't4'],
    colSpan2: true,
  },
];

const expandingIndustries: {
  id: string;
  Icon: React.ComponentType<IconProps>;
  key: 'logistics' | 'agritech';
  tagKeys: string[];
}[] = [
  {
    id: 'logistics',
    Icon: IconTruck,
    key: 'logistics',
    tagKeys: ['t1', 't2', 't3', 't4'],
  },
  {
    id: 'agritech',
    Icon: IconPlant,
    key: 'agritech',
    tagKeys: ['t1', 't2', 't3', 't4'],
  },
];

const processSteps: {
  id: number;
  stepKey: '1' | '2' | '3' | '4' | '5';
  tags: string[];
  optional: boolean;
}[] = [
  { id: 0, stepKey: '1', tags: ['Interviews', 'Competitor analysis', 'Tech audit'], optional: false },
  { id: 1, stepKey: '2', tags: ['Figma', 'Prototyping', 'Design system'], optional: false },
  { id: 2, stepKey: '3', tags: ['1-week sprints', 'Weekly demos', 'Code review'], optional: false },
  { id: 3, stepKey: '4', tags: ['Landing page', 'SEO', 'Analytics', 'GTM strategy'], optional: true },
  { id: 4, stepKey: '5', tags: ['CI/CD', 'Monitoring', 'Retainer'], optional: false },
];

type TechItem = { name: string; Icon: AnyIcon; isTabler?: boolean };
type TechGroup = {
  labelKey: 'tech.frontend' | 'tech.databases' | 'tech.backend' | 'tech.realtime' | 'tech.infra';
  items: TechItem[];
};

const techGroups: TechGroup[] = [
  {
    labelKey: 'tech.frontend',
    items: [
      { name: 'React', Icon: SiReact as AnyIcon },
      { name: 'React Native', Icon: SiReact as AnyIcon },
      { name: 'Next.js', Icon: SiNextdotjs as AnyIcon },
      { name: 'TypeScript', Icon: SiTypescript as AnyIcon },
    ],
  },
  {
    labelKey: 'tech.databases',
    items: [
      { name: 'PostgreSQL', Icon: SiPostgresql as AnyIcon },
      { name: 'Redis', Icon: SiRedis as AnyIcon },
      { name: 'MongoDB', Icon: SiMongodb as AnyIcon },
    ],
  },
  {
    labelKey: 'tech.backend',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs as AnyIcon },
      { name: 'GoLang', Icon: SiGo as AnyIcon },
      { name: 'Python', Icon: SiPython as AnyIcon },
      { name: 'REST API', Icon: IconServer as AnyIcon, isTabler: true },
      { name: 'GraphQL', Icon: SiGraphql as AnyIcon },
    ],
  },
  {
    labelKey: 'tech.realtime',
    items: [
      { name: 'MQTT', Icon: IconTopologyStar as AnyIcon, isTabler: true },
      { name: 'WebSocket', Icon: IconPlugConnected as AnyIcon, isTabler: true },
    ],
  },
  {
    labelKey: 'tech.infra',
    items: [
      { name: 'AWS', Icon: IconBrandAws as AnyIcon, isTabler: true },
      { name: 'Docker', Icon: IconBrandDocker as AnyIcon, isTabler: true },
      { name: 'CI/CD', Icon: IconRefresh as AnyIcon, isTabler: true },
    ],
  },
];

type MarketingTier = { labelKey: string; itemKeys: string[] };

type WhatCard = {
  id: number;
  Icon: React.ComponentType<IconProps>;
  titleKey: string;
  descKey: string;
  optionalBadge?: boolean;
  tags: string[];
  colSpan2?: boolean;
  itemKeys?: string[];
  tiers?: MarketingTier[];
};

const whatCards: WhatCard[] = [
  {
    id: 0,
    Icon: IconPalette,
    titleKey: 'design.title',
    descKey: 'design.desc',
    tags: ['Figma', 'Prototyping', 'Design system'],
    itemKeys: ['design.i1', 'design.i2', 'design.i3', 'design.i4', 'design.i5'],
  },
  {
    id: 1,
    Icon: IconCode,
    titleKey: 'dev.title',
    descKey: 'dev.desc',
    tags: ['React', 'Next.js', 'Node.js', 'Go'],
    itemKeys: ['dev.i1', 'dev.i2', 'dev.i3', 'dev.i4', 'dev.i5'],
  },
  {
    id: 2,
    Icon: IconTrendingUp,
    titleKey: 'marketing.title',
    descKey: 'marketing.desc',
    optionalBadge: true,
    tags: ['SEO', 'Ads', 'Content', 'CRM', 'Analytics'],
    colSpan2: true,
    tiers: [
      {
        labelKey: 'marketing.basic',
        itemKeys: ['marketing.b1', 'marketing.b2', 'marketing.b3', 'marketing.b4'],
      },
      {
        labelKey: 'marketing.advanced',
        itemKeys: ['marketing.a1', 'marketing.a2', 'marketing.a3', 'marketing.a4'],
      },
      {
        labelKey: 'marketing.premium',
        itemKeys: ['marketing.p1', 'marketing.p2', 'marketing.p3', 'marketing.p4'],
      },
    ],
  },
];

// ─── Animation presets ────────────────────────────────────────────────────────

const tabPanel = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' as const } },
};

const expandBody = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto', transition: { duration: 0.25, ease: 'easeOut' as const } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' as const } },
};

// ─── "What we do" sub-component ──────────────────────────────────────────────

function WhatWeDoTab({
  t,
  openCard,
  setOpenCard,
}: {
  t: TFn;
  openCard: number | null;
  setOpenCard: (id: number | null) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {whatCards.map(({ id, Icon, titleKey, descKey, optionalBadge, tags, colSpan2, itemKeys, tiers }) => {
        const isOpen = openCard === id;

        return (
          <div
            key={id}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            onClick={() => setOpenCard(isOpen ? null : id)}
            onKeyDown={(e) => e.key === 'Enter' && setOpenCard(isOpen ? null : id)}
            className={[
              'group flex flex-col rounded-2xl border bg-zinc-900 p-5 cursor-pointer',
              'transition-colors duration-200',
              colSpan2 ? 'sm:col-span-2' : '',
              isOpen ? 'border-accent/30' : 'border-zinc-800 hover:border-zinc-700',
            ].join(' ')}>
            <div className="flex items-start justify-between">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-accent/10">
                <Icon size={18} className="text-accent" />
              </div>
              <IconChevronDown
                size={15}
                className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-zinc-400' : 'text-zinc-600'}`}
              />
            </div>

            <div className="mt-3 mb-2 flex items-center">
              <h3 className="text-h4 font-semibold text-white">{t(titleKey)}</h3>
              {optionalBadge && (
                <span className="ml-2 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 align-middle text-xs text-accent">
                  {t('optional')}
                </span>
              )}
            </div>

            <p className="mb-3 text-body-sm leading-relaxed text-zinc-500">{t(descKey)}</p>

            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-zinc-800 px-2 py-0.5 text-xs text-zinc-600">
                  {tag}
                </span>
              ))}
            </div>

            <AnimatePresence>
              {!isOpen && (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.18 } }}
                  exit={{ opacity: 0, transition: { duration: 0.08 } }}
                  className="mt-2 select-none text-xs text-zinc-700">
                  {t('tapToSee')}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isOpen && (
                <motion.div key="body" {...expandBody} className="overflow-hidden">
                  <div className="mt-4 border-t border-zinc-800 pt-3">
                    <p className="mb-2 text-[10px] uppercase tracking-widest text-zinc-600">{t('included')}</p>

                    {tiers ? (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {tiers.map(({ labelKey, itemKeys: keys }) => (
                          <div key={labelKey}>
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                              {t(labelKey)}
                            </p>
                            <ul className="space-y-1.5">
                              {keys.map((itemKey) => (
                                <li key={itemKey} className="flex items-start gap-2">
                                  <IconCheck size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                                  <span className="text-body-sm text-zinc-400">{t(itemKey)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-1.5">
                        {itemKeys!.map((itemKey) => (
                          <li key={itemKey} className="flex items-start gap-2">
                            <IconCheck size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                            <span className="text-body-sm text-zinc-400">{t(itemKey)}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <a
                      href="#contact"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent transition-all hover:gap-2">
                      {t('getQuote')}
                      <IconArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Industries sub-component ─────────────────────────────────────────────────

function IndustriesTab({
  t,
  openCard,
  setOpenCard,
}: {
  t: TFn;
  openCard: number | null;
  setOpenCard: (id: number | null) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {industries.map(({ id, Icon, number, key, tagKeys, colSpan2 }) => {
          const isOpen = openCard === id;
          return (
            <div
              key={id}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => setOpenCard(isOpen ? null : id)}
              onKeyDown={(e) => e.key === 'Enter' && setOpenCard(isOpen ? null : id)}
              className={[
                'group relative flex flex-col rounded-2xl border bg-zinc-900 p-5 cursor-pointer',
                'transition-colors duration-200',
                colSpan2 ? 'sm:col-span-2' : '',
                isOpen ? 'border-accent/40' : 'border-zinc-800 hover:border-zinc-700',
              ].join(' ')}>
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={18} color="currentColor" />
                </div>
                <IconChevronDown
                  size={15}
                  className={`text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>

              <p className="mt-3 mb-0.5 text-xs font-medium text-accent">{number}</p>
              <h3 className="text-h4 text-white">{t(`ind.${key}.title`)}</h3>

              <div className="mt-2 flex flex-wrap gap-1">
                {tagKeys.map((tagKey) => (
                  <span key={tagKey} className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500">
                    {t(`ind.${key}.${tagKey}`)}
                  </span>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {!isOpen ? (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.18 } }}
                    exit={{ opacity: 0, transition: { duration: 0.08 } }}
                    className="mt-2 select-none text-xs text-zinc-600">
                    {t('tapToLearn')}
                  </motion.p>
                ) : (
                  <motion.div key="desc" {...expandBody} className="overflow-hidden">
                    <p className="mt-3 text-body-sm leading-relaxed text-zinc-400">{t(`ind.${key}.desc`)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-800" />
        <span className="text-[10px] uppercase tracking-widest text-zinc-600">{t('expanding')}</span>
        <div className="h-px flex-1 bg-zinc-800" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {expandingIndustries.map(({ id, Icon, key, tagKeys }) => (
          <div
            key={id}
            className="flex flex-col rounded-2xl border border-dashed border-zinc-800 bg-zinc-900 p-5 transition-colors duration-200 hover:border-zinc-700">
            <div className="flex items-start justify-between">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-zinc-800">
                <Icon size={18} className="text-zinc-600" />
              </div>
              <span className="rounded-full border border-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-600">
                {t('comingSoon')}
              </span>
            </div>

            <h3 className="mb-2 mt-3 text-h4 font-semibold text-zinc-500">{t(`ind.${key}.title`)}</h3>
            <p className="mb-3 text-body-sm leading-relaxed text-zinc-600">{t(`ind.${key}.desc`)}</p>

            <div className="flex flex-wrap gap-1">
              {tagKeys.map((tagKey) => (
                <span key={tagKey} className="rounded-full border border-zinc-900 px-2 py-0.5 text-xs text-zinc-700">
                  {t(`ind.${key}.${tagKey}`)}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-3 inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-accent">
              {t('letsTalk')}
              <IconArrowRight size={13} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Process sub-component ────────────────────────────────────────────────────

function ProcessTab({
  t,
  activeStep,
  setActiveStep,
}: {
  t: TFn;
  activeStep: number;
  setActiveStep: (i: number) => void;
}) {
  return (
    <div>
      {processSteps.map((step, idx) => {
        const isActive = activeStep === step.id;

        return (
          <Fragment key={step.id}>
            {idx > 0 && (
              <div className="flex gap-4">
                <div className="flex w-8 flex-shrink-0 justify-center py-0">
                  {step.optional ? (
                    <div className="h-5 w-0 border-l border-dashed border-zinc-700" />
                  ) : (
                    <div className="h-5 w-px bg-zinc-800" />
                  )}
                </div>
                <div className="flex-1" />
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveStep(step.id)}
                className={[
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium',
                  'transition-colors duration-200 focus:outline-none',
                  isActive
                    ? 'border border-accent bg-accent text-black'
                    : step.optional
                      ? 'border border-dashed border-accent/50 bg-accent/10 text-accent hover:bg-accent/15'
                      : 'border border-zinc-700 bg-transparent text-zinc-500 hover:border-zinc-500 hover:text-zinc-300',
                ].join(' ')}>
                {step.id + 1}
              </button>

              <div
                className="flex-1 cursor-pointer py-3"
                role="button"
                tabIndex={0}
                onClick={() => setActiveStep(step.id)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveStep(step.id)}>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-semibold transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-zinc-400'
                    }`}>
                    {t(`process.${step.stepKey}.title`)}
                  </span>
                  {step.optional && (
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs text-accent">
                      {t('optional')}
                    </span>
                  )}
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div key="body" {...expandBody} className="overflow-hidden">
                      <p className="mt-1 text-body-sm leading-relaxed text-zinc-400">
                        {t(`process.${step.stepKey}.desc`)}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-zinc-600">
                        <IconClock size={13} />
                        <span>{t(`process.${step.stepKey}.dur`)}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

// ─── Technologies sub-component ───────────────────────────────────────────────

function TechnologiesTab({ t }: { t: TFn }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {techGroups.map(({ labelKey, items }) => (
        <div key={labelKey}>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">{t(labelKey)}</p>
          <div className="flex flex-wrap gap-2">
            {items.map(({ name, Icon, isTabler }) => (
              <div
                key={name}
                className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition-colors duration-150 hover:border-zinc-700 hover:text-zinc-300">
                {isTabler ? <Icon size={15} className="text-zinc-400" /> : <Icon size={15} color="currentColor" />}
                {name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseTab(param: string | null): Tab {
  if (param === 'what' || param === 'industries' || param === 'process' || param === 'technologies') return param;
  return 'what';
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ServicesSection() {
  const t = useTranslations('servicesSection');
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>(() => parseTab(searchParams.get('tab')));
  const [openWhatCard, setOpenWhatCard] = useState<number | null>(null);
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveTab(parseTab(searchParams.get('tab')));
  }, [searchParams]);

  const handleTabChange = useCallback(
    (tab: Tab) => {
      setActiveTab(tab);
      router.replace(`?tab=${tab}`, { scroll: false });
    },
    [router]
  );

  return (
    <section id="services" className="section-padding bg-zinc-950" aria-labelledby="services-section-heading">
      <Container>
        <SectionReveal direction="right">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">{t('label')}</p>
            <h2 id="services-section-heading" className="text-h2 text-white">
              {t('title')}
            </h2>
            <p className="mt-3 max-w-xl text-body-lg text-zinc-400">{t('subtitle')}</p>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={[
                  'flex-shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-150',
                  activeTab === tab.id
                    ? 'bg-accent font-semibold text-black'
                    : 'border border-zinc-700 font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white',
                ].join(' ')}>
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} {...tabPanel}>
              {activeTab === 'what' && <WhatWeDoTab t={t} openCard={openWhatCard} setOpenCard={setOpenWhatCard} />}
              {activeTab === 'industries' && <IndustriesTab t={t} openCard={openCard} setOpenCard={setOpenCard} />}
              {activeTab === 'process' && <ProcessTab t={t} activeStep={activeStep} setActiveStep={setActiveStep} />}
              {activeTab === 'technologies' && <TechnologiesTab t={t} />}
            </motion.div>
          </AnimatePresence>
        </SectionReveal>
      </Container>
    </section>
  );
}
