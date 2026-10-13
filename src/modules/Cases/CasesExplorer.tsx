'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { IconArrowRight, IconLock } from '@tabler/icons-react';

import type { CaseTabKey } from './explorer';

export type CaseExplorerItem = {
  id: string;
  title: string;
  tags: string;
  industryLabel: string;
  summary: string;
  coverImage?: string;
  accentColor: string;
  isNDA: boolean;
  tabKeys: CaseTabKey[];
  nicheLabel: string;
};

type TabKey = 'all' | CaseTabKey;

const TAB_ORDER: TabKey[] = ['all', 'websites', 'webServices', 'mobileApps', 'design'];

type CasesExplorerProps = {
  items: CaseExplorerItem[];
  tabLabels: Record<TabKey, string>;
  locale: string;
  ndaProtectedLabel: string;
  ctaLabel: string;
};

export function CasesExplorer({ items, tabLabels, locale, ndaProtectedLabel, ctaLabel }: CasesExplorerProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  const counts = useMemo(() => {
    const map = { all: items.length } as Record<TabKey, number>;
    for (const key of TAB_ORDER) {
      if (key === 'all') continue;
      map[key] = items.filter((item) => item.tabKeys.includes(key)).length;
    }
    return map;
  }, [items]);

  const filtered = useMemo(
    () => (activeTab === 'all' ? items : items.filter((item) => item.tabKeys.includes(activeTab))),
    [items, activeTab]
  );

  const activeIndex = Math.max(
    0,
    filtered.findIndex((item) => item.id === activeId)
  );
  const active = filtered[activeIndex] ?? filtered[0];

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {TAB_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeTab === key
                ? 'border-black bg-black text-white'
                : 'border-black/15 bg-white text-black hover:border-black/30'
            }`}>
            {tabLabels[key]}
            <span className={activeTab === key ? 'text-white/60' : 'text-black/40'}>{counts[key]}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-t border-black/[0.06]">
          {filtered.map((item, index) => {
            const isActive = item.id === active?.id;
            const content = (
              <div
                className={`flex items-center gap-4 border-b border-black/[0.06] px-4 py-5 transition-colors sm:px-5 ${
                  isActive ? 'lg:bg-zinc-50' : ''
                }`}>
                <span className="w-6 shrink-0 font-mono text-xs text-black/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-xl font-extrabold text-black transition-colors sm:text-2xl ${
                      isActive ? 'lg:text-black' : 'lg:text-black/25'
                    }`}>
                    {item.title}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[11px] text-black/40">{item.tags}</span>
                </span>
                <span className="hidden shrink-0 text-sm text-black/50 sm:block">{item.industryLabel}</span>
                {item.isNDA ? (
                  <IconLock size={16} className="shrink-0 text-black/25" aria-hidden />
                ) : (
                  <IconArrowRight size={16} className="shrink-0 text-black/30" aria-hidden />
                )}
              </div>
            );

            return (
              <div key={item.id} onMouseEnter={() => setActiveId(item.id)} onFocus={() => setActiveId(item.id)}>
                {item.isNDA ? (
                  <div className="cursor-default">{content}</div>
                ) : (
                  <Link href={`/${locale}/cases/${item.id}`}>{content}</Link>
                )}
              </div>
            );
          })}
        </div>

        {active && (
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
                style={{ backgroundColor: active.accentColor }}>
                {active.coverImage && !active.isNDA && (
                  <Image src={active.coverImage} alt={active.title} fill className="object-cover" sizes="480px" />
                )}
                {active.isNDA && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/50">
                    <IconLock className="h-6 w-6" />
                    <span className="text-[13px] font-medium">{ndaProtectedLabel}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 font-mono text-[11px] text-white/60">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                </span>
                <span className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-accent" aria-hidden />
                <span className="absolute bottom-4 left-4 text-2xl font-extrabold text-white">{active.title}</span>
              </div>

              <p className="mt-4 text-sm text-black/50">
                {active.industryLabel} · {active.tags}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-black/70">{active.summary}</p>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-5">
                <span className="text-sm text-black/50">{active.nicheLabel}</span>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm
                    font-semibold text-black transition hover:opacity-85">
                  {ctaLabel}
                  <IconArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
