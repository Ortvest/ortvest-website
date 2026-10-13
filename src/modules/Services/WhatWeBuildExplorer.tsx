'use client';

import { useState } from 'react';

import Link from 'next/link';

import { DURATION, EASE } from '@lib/motion';
import { IconArrowRight, IconLock } from '@tabler/icons-react';
import { AnimatePresence, m } from 'framer-motion';

export type BuildRow = {
  key: string;
  title: string;
  desc: string;
  items: string[];
  caseId?: string;
  caseTitle?: string;
  caseIsNDA?: boolean;
};

function ExampleCard({
  caseId,
  caseTitle,
  caseIsNDA,
  locale,
  forExampleLabel,
}: {
  caseId: string;
  caseTitle: string;
  caseIsNDA?: boolean;
  locale: string;
  forExampleLabel: string;
}) {
  const content = (
    <>
      <span>
        <span className="block text-[11px] uppercase tracking-widest text-black/40">{forExampleLabel}</span>
        <span className="block text-lg font-extrabold text-black">{caseTitle}</span>
      </span>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-black
          transition ${caseIsNDA ? '' : 'group-hover:scale-105'}`}>
        {caseIsNDA ? <IconLock size={16} /> : <IconArrowRight size={16} />}
      </span>
    </>
  );

  if (caseIsNDA) {
    return (
      <div className="mt-6 flex cursor-default items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/${locale}/cases/${caseId}`}
      className="group mt-6 flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4">
      {content}
    </Link>
  );
}

export function WhatWeBuildExplorer({
  rows,
  locale,
  forExampleLabel,
}: {
  rows: BuildRow[];
  locale: string;
  forExampleLabel: string;
}) {
  const [activeKey, setActiveKey] = useState(rows[0]?.key);
  const activeIndex = Math.max(
    0,
    rows.findIndex((row) => row.key === activeKey)
  );
  const active = rows[activeIndex] ?? rows[0];

  return (
    <div>
      {/* Desktop: interactive list + sticky detail panel */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[3fr_2fr]">
        <div className="border-t border-zinc-900">
          {rows.map((row, index) => {
            const isActive = row.key === active?.key;
            return (
              <button
                key={row.key}
                type="button"
                onMouseEnter={() => setActiveKey(row.key)}
                onFocus={() => setActiveKey(row.key)}
                className="flex w-full items-center gap-6 border-b border-zinc-900 py-6 text-left">
                <span className="w-6 shrink-0 font-mono text-xs text-zinc-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`flex-1 text-5xl font-extrabold transition-all duration-300 ease-out ${
                    isActive ? 'text-white' : 'text-zinc-700'
                  }`}>
                  {row.title}
                </span>
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-all duration-300 ease-out ${
                    isActive ? 'scale-110 border-accent bg-accent' : 'border-zinc-700 bg-transparent'
                  }`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        <div className="sticky top-24 self-start overflow-hidden">
          <AnimatePresence mode="wait">
            {active && (
              <m.div
                key={active.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: DURATION.normal, ease: EASE }}>
                <p className="font-mono text-xs text-zinc-500">
                  <span className="text-accent">{String(activeIndex + 1).padStart(2, '0')}</span> /{' '}
                  {String(rows.length).padStart(2, '0')}
                </p>
                <p className="mt-4 text-[26px] font-bold leading-snug text-white">{active.desc}</p>
                <ul className="mt-6 space-y-3 border-t border-zinc-900 pt-5">
                  {active.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[15px] text-zinc-300">
                      <span className="text-accent">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {active.caseId && active.caseTitle && (
                  <ExampleCard
                    caseId={active.caseId}
                    caseTitle={active.caseTitle}
                    caseIsNDA={active.caseIsNDA}
                    locale={locale}
                    forExampleLabel={forExampleLabel}
                  />
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile/tablet: static stacked list, no hover interaction */}
      <div className="space-y-8 lg:hidden">
        {rows.map((row, index) => (
          <div key={row.key} className="border-t border-zinc-900 pt-6">
            <p className="font-mono text-xs text-zinc-500">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-1 text-2xl font-extrabold text-white">{row.title}</h3>
            <p className="mt-3 text-body-sm leading-relaxed text-zinc-400">{row.desc}</p>
            <ul className="mt-4 space-y-2">
              {row.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <span className="text-accent">+</span>
                  {item}
                </li>
              ))}
            </ul>
            {row.caseId && row.caseTitle && (
              <ExampleCard
                caseId={row.caseId}
                caseTitle={row.caseTitle}
                caseIsNDA={row.caseIsNDA}
                locale={locale}
                forExampleLabel={forExampleLabel}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
