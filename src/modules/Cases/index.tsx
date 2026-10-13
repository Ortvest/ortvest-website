import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { Container } from '@shared/components';

import { IconArrowRight } from '@tabler/icons-react';

import { type CaseExplorerItem, CasesExplorer } from './CasesExplorer';
import { portfolioGridCases } from './data';
import { CASE_NICHE_KEYS, deriveCaseTabKeys, EXPLORER_CASE_ORDER } from './explorer';

export async function Cases() {
  const t = await getTranslations('cases');
  const locale = await getLocale();

  const items = EXPLORER_CASE_ORDER.flatMap((id): CaseExplorerItem[] => {
    const caseItem = portfolioGridCases.find((c) => c.id === id);
    if (!caseItem) return [];

    const nicheKey = CASE_NICHE_KEYS[id] ?? 'p2p';

    return [
      {
        id: caseItem.id,
        title: caseItem.title,
        tags: t(`items.${id}.tags`),
        industryLabel: t(`items.${id}.industryLabel`),
        summary: t(`items.${id}.summary`),
        coverImage: caseItem.coverImage ?? caseItem.preview,
        accentColor: caseItem.accentColor ?? '#1a1a1a',
        isNDA: caseItem.isNDA,
        tabKeys: deriveCaseTabKeys(caseItem),
        nicheLabel: t(`nicheCta.${nicheKey}`),
      },
    ];
  });

  const tabLabels = {
    all: t('tabs.all'),
    websites: t('tabs.websites'),
    webServices: t('tabs.webServices'),
    mobileApps: t('tabs.mobileApps'),
    design: t('tabs.design'),
  };

  return (
    <section id="cases" className="section-padding bg-white" aria-labelledby="cases-heading">
      <Container>
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-widest text-black/40">{t('eyebrow')}</p>
            <h2 id="cases-heading" className="text-h1 font-extrabold leading-tight text-black">
              {t('title')}
            </h2>
          </div>
          <p className="max-w-sm text-body-sm leading-relaxed text-black/50 lg:pt-10">{t('subtitle')}</p>
        </div>

        <CasesExplorer
          items={items}
          tabLabels={tabLabels}
          locale={locale}
          ndaProtectedLabel={t('ndaProtected')}
          ctaLabel={t('nicheCta.letsTalk')}
        />

        <Link
          href={`/${locale}/cases`}
          className="group mt-10 flex items-center justify-between gap-6 rounded-2xl bg-black px-6 py-6
            text-white transition hover:bg-zinc-900 sm:px-8">
          <span>
            <span className="block text-xl font-extrabold sm:text-2xl">{t('section.viewAll')}</span>
            <span className="mt-1 block font-mono text-xs text-white/50">
              {portfolioGridCases.length} {t('viewAllSuffix')}
            </span>
          </span>
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-black
              transition group-hover:scale-105">
            <IconArrowRight size={20} />
          </span>
        </Link>
      </Container>
    </section>
  );
}
