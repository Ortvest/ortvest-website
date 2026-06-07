'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { IconLock } from '@tabler/icons-react';

import type { CaseItem } from './data';

type CaseCardProps = {
  caseItem: CaseItem;
  compact?: boolean;
};

const NICHE_CTA_KEYS: Partial<Record<string, string>> = {
  p2p: 'p2p',
  community: 'community',
  logistics: 'logistics',
  agritech: 'agritech',
};

export function CaseCard({ caseItem, compact = false }: CaseCardProps) {
  const t = useTranslations('cases');
  const tHero = useTranslations('hero');

  const cover = caseItem.coverImage ?? caseItem.preview;
  const accent = caseItem.accentColor ?? '#1a1a1a';
  const summary = t(`items.${caseItem.id}.summary`);
  const showImage = cover && !caseItem.isNDA;

  const inner = (
    <>
      <div className="relative aspect-video w-full overflow-hidden" style={{ backgroundColor: accent }}>
        {showImage ? (
          <Image
            src={cover}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : caseItem.isNDA ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/50">
            <IconLock className="h-6 w-6" />
            <span className="text-[13px] font-medium">{t('ndaProtected')}</span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-white/20">{caseItem.title.charAt(0)}</span>
          </div>
        )}
        {caseItem.inProgress && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-black/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {t('inProgress')}
          </span>
        )}
      </div>

      <div className={`flex flex-col gap-2 ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
        {((caseItem.serviceTags && caseItem.serviceTags.length > 0) ||
          (caseItem.industries && caseItem.industries.length > 0)) && (
          <div className="flex flex-wrap gap-1.5">
            {caseItem.serviceTags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-black/55">
                {t(`categoryBadge.${tag}`)}
              </span>
            ))}
            {caseItem.industries?.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-black/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-black/55">
                {tHero(`nicheTags.${industry}`)}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg font-semibold leading-snug text-black">{caseItem.title}</h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-black/55">{summary}</p>

        {!caseItem.isNDA ? (
          <span className="mt-1 text-[13px] font-medium text-black opacity-0 transition-opacity group-hover:opacity-100">
            {t('viewCaseStudy')}
          </span>
        ) : (
          <span className="mt-1 text-xs italic text-black/40">{t('ndaNote')}</span>
        )}

        {(() => {
          const firstIndustry = caseItem.industries?.[0];
          const nicheKey = firstIndustry && NICHE_CTA_KEYS[firstIndustry];
          if (!nicheKey || caseItem.isNDA) return null;
          return (
            <p className="mt-3 border-t border-black/[0.06] pt-3 text-xs text-black/40">
              {t(`nicheCta.${nicheKey}`)}{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-medium text-black/60 underline-offset-2 transition hover:text-black hover:underline">
                {t('nicheCta.letsTalk')}
              </button>
            </p>
          );
        })()}
      </div>
    </>
  );

  if (caseItem.isNDA) {
    return (
      <div className="group block overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition hover:border-black/15 hover:shadow-card">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/cases/${caseItem.id}`}
      className="group block overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition hover:border-black/15 hover:shadow-card">
      {inner}
    </Link>
  );
}
