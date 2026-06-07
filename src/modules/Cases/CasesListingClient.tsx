'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { IconArrowRight } from '@tabler/icons-react';

import { CasesMasonryCard } from './CasesMasonryCard';
import { type CaseIndustry, portfolioGridCases } from './data';

type FilterKey = 'all' | CaseIndustry;

const FILTER_KEYS: FilterKey[] = ['all', 'p2p', 'community', 'logistics', 'agritech'];

export function CasesListingClient() {
  const t = useTranslations('cases');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filteredCases = useMemo(() => {
    if (activeFilter === 'all') return portfolioGridCases;
    return portfolioGridCases.filter((c) => c.industries?.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1160px] px-6 py-16">
        <p className="mb-2 text-xs uppercase tracking-widest text-zinc-400">{t('page.label')}</p>
        <h1 className="text-h1 mb-3 font-bold text-zinc-950">{t('page.title')}</h1>
        <p className="max-w-xl text-body leading-relaxed text-zinc-400">{t('page.subtitle')}</p>

        <div className="mb-10 mt-8 flex flex-wrap gap-2">
          {FILTER_KEYS.map((filter) => {
            const isActive = activeFilter === filter;
            const label = filter === 'all' ? t('page.filter.all') : t(`filterIndustries.${filter}`);

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`cursor-pointer select-none rounded-full border px-3.5 py-1.5 text-xs transition ${
                  isActive
                    ? 'border-zinc-950 bg-zinc-950 text-white'
                    : 'border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-950'
                }`}>
                {label}
              </button>
            );
          })}
        </div>

        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [column-gap:12px]">
          {filteredCases.map((caseItem, index) => (
            <div key={caseItem.id} className="mb-3 break-inside-avoid">
              <CasesMasonryCard caseItem={caseItem} imageTall={index % 2 === 0} />
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center">
          <h2 className="mb-2 text-[18px] font-bold text-zinc-950">{t('page.cta.title')}</h2>
          <p className="mb-6 text-sm text-zinc-400">{t('page.cta.sub')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition hover:opacity-85">
              {t('page.cta.primary')}
              <IconArrowRight size={14} />
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="rounded-full border border-zinc-200 px-6 py-3 text-sm text-zinc-950 transition hover:border-zinc-400">
              {t('page.cta.secondary')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
