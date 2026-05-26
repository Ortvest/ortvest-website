'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { IconArrowRight, IconLock } from '@tabler/icons-react';

import type { CaseItem } from './data';

type CasesMasonryCardProps = {
  caseItem: CaseItem;
  imageTall: boolean;
};

export function CasesMasonryCard({ caseItem, imageTall }: CasesMasonryCardProps) {
  const t = useTranslations('cases');
  const tHero = useTranslations('hero');
  const locale = useLocale();

  const cover = caseItem.coverImage ?? caseItem.preview;
  const accent = caseItem.accentColor ?? '#18181b';
  const summary = t(`items.${caseItem.id}.summary`);
  const imageHeight = imageTall ? 'h-[220px]' : 'h-[160px]';
  const showImage = Boolean(cover && !caseItem.isNDA);

  const imageArea = (
    <div className={`relative overflow-hidden bg-zinc-950 ${imageHeight}`} style={{ backgroundColor: accent }}>
      {showImage ? (
        <Image
          src={cover!}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/40">
          <IconLock size={24} className="text-white/50" />
          <span className="text-xs font-medium">{t('ndaProtected')}</span>
        </div>
      )}
    </div>
  );

  const body = (
    <div className="p-4">
      {caseItem.industries && caseItem.industries.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {caseItem.industries.map((industry) => (
            <span key={industry} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-400">
              {tHero(`nicheTags.${industry}`)}
            </span>
          ))}
        </div>
      )}
      <h3 className="mb-1.5 text-[15px] font-bold leading-snug text-zinc-950">{caseItem.title}</h3>
      <p className="mb-3 text-[12px] leading-relaxed text-zinc-400">{summary}</p>
      <div className="flex items-center justify-between border-t border-zinc-100 pt-2.5">
        {caseItem.isNDA ? (
          <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
            <IconLock size={13} />
            {t('page.nda')}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[12px] font-medium text-zinc-950">
            {t('page.viewCase')}
            <IconArrowRight size={13} />
          </span>
        )}
      </div>
    </div>
  );

  const cardClass = [
    'block overflow-hidden rounded-2xl bg-white transition-all duration-200',
    caseItem.isNDA
      ? 'cursor-default border border-dashed border-zinc-300 hover:border-zinc-400 hover:-translate-y-0.5'
      : 'cursor-pointer border border-zinc-200 hover:-translate-y-0.5 hover:border-zinc-400',
  ].join(' ');

  if (caseItem.isNDA) {
    return (
      <article className={cardClass}>
        {imageArea}
        {body}
      </article>
    );
  }

  return (
    <Link href={`/${locale}/cases/${caseItem.id}`} className={cardClass}>
      {imageArea}
      {body}
    </Link>
  );
}
