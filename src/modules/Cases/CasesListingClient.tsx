'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Container, SectionReveal } from '@shared/components';

import { IconArrowRight } from '@tabler/icons-react';

import { cases, type CaseItem } from './data';

type ServiceTag = 'website' | 'webService' | 'mobileApp' | 'design';
type CoverVariant = 'black' | 'gray' | 'lime' | 'nda';

type RowConfig = {
  id: string;
  tags: ServiceTag[];
  cover: CoverVariant;
};

/**
 * Curated display order + service-type tags + cover treatment for the
 * selected-projects page. This is presentation metadata for this one page —
 * independent of `industries`/`serviceTags` in `data.ts`, which drive the
 * homepage grid and case detail pages.
 */
const ROWS: RowConfig[] = [
  { id: 'pachaca', tags: ['mobileApp', 'webService'], cover: 'black' },
  { id: 'yachtmate', tags: ['webService'], cover: 'gray' },
  { id: 'sharingground', tags: ['webService'], cover: 'lime' },
  { id: 'skisailclub', tags: ['webService', 'website'], cover: 'black' },
  { id: 'navexa', tags: ['webService'], cover: 'nda' },
  { id: 'profitcraft', tags: ['website'], cover: 'gray' },
  { id: 'profitcraftauto', tags: ['website'], cover: 'black' },
  { id: 'teya', tags: ['website', 'design'], cover: 'lime' },
  { id: 'gambit', tags: ['website', 'design'], cover: 'gray' },
  { id: 'reskin', tags: ['design'], cover: 'black' },
];

const FILTER_KEYS: Array<ServiceTag | 'all'> = ['all', 'website', 'webService', 'mobileApp', 'design'];

const TAB_LABEL_KEY: Record<ServiceTag, string> = {
  website: 'tabs.websites',
  webService: 'tabs.webServices',
  mobileApp: 'tabs.mobileApps',
  design: 'tabs.design',
};

const COVER_CLASS: Record<Exclude<CoverVariant, 'nda'>, { bg: string; text: string; muted: string }> = {
  black: { bg: 'bg-black', text: 'text-white', muted: 'text-white/40' },
  gray: { bg: 'bg-[#eef1ea]', text: 'text-black', muted: 'text-black/40' },
  lime: { bg: 'bg-accent', text: 'text-black', muted: 'text-black/50' },
};

function CoverPanel({ row, caseItem, idx }: { row: RowConfig; caseItem: CaseItem; idx: string }) {
  const t = useTranslations('cases');

  if (row.cover === 'nda') {
    return (
      <div
        className="flex h-[260px] flex-col justify-between rounded-2xl p-5 sm:h-[300px]"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #0a0a0a 0px, #0a0a0a 10px, #161616 10px, #161616 20px)',
        }}>
        <div className="flex items-center justify-between font-mono text-[11px] text-white/40">
          <span>{idx}</span>
          <span className="uppercase tracking-wide">{t('page.ndaProtected')}</span>
        </div>
        <span className="text-2xl font-extrabold text-white sm:text-[28px]">{t('page.ndaLabel')}</span>
      </div>
    );
  }

  const palette = COVER_CLASS[row.cover];
  const previewSrc = caseItem.coverImage ?? caseItem.preview;

  if (previewSrc) {
    return (
      <div className="relative h-[260px] overflow-hidden rounded-2xl bg-zinc-100 sm:h-[300px]">
        <Image
          src={previewSrc}
          alt={caseItem.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent"
          aria-hidden
        />
        <div className="relative flex h-full flex-col justify-between p-5">
          <span className="font-mono text-[11px] text-white/70">{idx}</span>
          <span className="text-2xl font-extrabold text-white sm:text-[28px]">{caseItem.title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-[260px] flex-col justify-between rounded-2xl p-5 sm:h-[300px] ${palette.bg}`}>
      <div className={`flex items-center justify-between font-mono text-[11px] ${palette.muted}`}>
        <span>{idx}</span>
        <span className="tracking-wide">{t('page.coverPlaceholder')}</span>
      </div>
      <span className={`text-2xl font-extrabold sm:text-[28px] ${palette.text}`}>{caseItem.title}</span>
    </div>
  );
}

function CaseRow({ row, index }: { row: RowConfig; index: number }) {
  const t = useTranslations('cases');
  const locale = useLocale();
  const caseItem = cases.find((c) => c.id === row.id);
  if (!caseItem) return null;

  const idx = String(index + 1).padStart(2, '0');
  const industryLabel = t(`items.${row.id}.industryLabel`);
  const summary = t(`items.${row.id}.summary`);
  const imageFirst = index % 2 === 0;

  const cover = <CoverPanel row={row} caseItem={caseItem} idx={idx} />;

  const sameProblem = (
    <p className="text-sm text-black/50">
      {t('page.sameProblem')}{' '}
      <Link
        href={`/${locale}#contact`}
        className="font-medium text-black underline decoration-accent-dark decoration-2 underline-offset-2">
        {t('nicheCta.letsTalk')}
      </Link>
    </p>
  );

  const cta = caseItem.isNDA ? (
    <Link
      href={`/${locale}#contact`}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition hover:border-black/40">
      {t('ctaButton')}
      <IconArrowRight size={14} />
    </Link>
  ) : (
    <Link
      href={`/${locale}/cases/${caseItem.id}`}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition hover:border-black/40">
      {t('page.viewCase')}
      <IconArrowRight size={14} />
    </Link>
  );

  const content = (
    <div className="flex flex-col justify-center">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-black/40">
          {idx} · {industryLabel}
        </span>
        {row.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-black/15 px-2.5 py-1 text-xs font-medium text-black/70">
            {t(TAB_LABEL_KEY[tag])}
          </span>
        ))}
      </div>

      <h3 className="text-2xl font-extrabold leading-snug text-black sm:text-[28px]">{caseItem.title}</h3>
      <p className="mt-3 max-w-md text-body-sm leading-relaxed text-black/55">{summary}</p>

      {caseItem.isNDA ? (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          {cta}
          {sameProblem}
        </div>
      ) : (
        <>
          <div className="mt-5">{cta}</div>
          <div className="mt-3">{sameProblem}</div>
        </>
      )}
    </div>
  );

  return (
    <div className="grid gap-6 py-8 md:grid-cols-2 md:gap-10 lg:gap-16">
      {imageFirst ? (
        <>
          {cover}
          {content}
        </>
      ) : (
        <>
          {content}
          {cover}
        </>
      )}
    </div>
  );
}

export function CasesListingClient() {
  const t = useTranslations('cases');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<ServiceTag | 'all'>('all');

  const filteredRows = useMemo(() => {
    if (activeFilter === 'all') return ROWS;
    return ROWS.filter((row) => row.tags.includes(activeFilter));
  }, [activeFilter]);

  const counts = useMemo(() => {
    const map: Record<ServiceTag, number> = { website: 0, webService: 0, mobileApp: 0, design: 0 };
    ROWS.forEach((row) => row.tags.forEach((tag) => (map[tag] += 1)));
    return map;
  }, []);

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionReveal direction="left">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/40">{t('page.label')}</p>
              <h1 className="text-h1 font-extrabold leading-tight text-black">{t('page.title')}</h1>
            </div>
            <div className="max-w-sm lg:pt-2">
              <p className="text-body-sm leading-relaxed text-black/55">{t('page.subtitle')}</p>
              <p className="mt-3 text-body-sm leading-relaxed text-black/40">{t('ndaBanner')}</p>
            </div>
          </div>

          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {FILTER_KEYS.map((filter) => {
                const isActive = activeFilter === filter;
                const label = filter === 'all' ? t('page.filter.all') : t(TAB_LABEL_KEY[filter]);
                const count = filter === 'all' ? ROWS.length : counts[filter];

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`cursor-pointer select-none rounded-full border px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'border-black bg-black text-white'
                        : 'border-black/15 text-black/70 hover:border-black/40 hover:text-black'
                    }`}>
                    {label} <span className={isActive ? 'text-white/50' : 'text-black/35'}>{count}</span>
                  </button>
                );
              })}
            </div>
            <p className="font-mono text-xs text-black/40">
              {t('page.showing', { shown: filteredRows.length, total: ROWS.length })}
            </p>
          </div>

          <div className="divide-y divide-black/10 border-t border-black/10">
            {filteredRows.map((row) => (
              <CaseRow key={row.id} row={row} index={ROWS.indexOf(row)} />
            ))}
          </div>

          <Link
            href={`/${locale}#contact`}
            className="group mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-black px-6 py-7 sm:px-8">
            <div>
              <p className="font-mono text-xs text-accent">
                {ROWS.length + 1} / {t('page.yourProject')}
              </p>
              <p className="mt-3 text-lg font-bold text-white sm:text-xl">{t('page.cta.title')}</p>
              <p className="mt-1 text-sm text-white/50">{t('page.cta.sub')}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition group-hover:bg-accent-dark">
              {t('page.cta.secondary')}
              <IconArrowRight size={14} />
            </span>
          </Link>
        </SectionReveal>
      </Container>
    </section>
  );
}
