'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { IconArrowRight, IconChevronDown, IconHelpCircle } from '@tabler/icons-react';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = FAQ_KEYS.map((key) => ({
    q: t(key),
    a: t(key.replace('q', 'a') as 'a1'),
  }));

  return (
    <section id="faq" className="bg-black px-6 py-20" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[1160px]">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <IconHelpCircle size={13} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-accent">FAQ</span>
          </div>
          <h2 id="faq-heading" className="mb-3 text-h1 font-bold text-white">
            {t('title')}
          </h2>
          <p className="text-body text-zinc-600">{t('subtitle')}</p>
        </div>

        {/* FAQ list */}
        <div className="mx-auto flex max-w-[680px] flex-col">
          {items.map(({ q, a }, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={FAQ_KEYS[i]}
                className={`border-b border-zinc-900 ${i === 0 ? 'border-t border-zinc-900' : ''}`}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full cursor-pointer items-center gap-4 py-5"
                  aria-expanded={isOpen}>
                  <span className="min-w-[20px] text-xs tabular-nums text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`flex-1 text-left text-[15px] font-medium leading-snug transition-colors duration-200 ${
                      isOpen ? 'text-white' : 'text-zinc-400'
                    }`}>
                    {q}
                  </span>
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                      isOpen ? 'border-accent/30' : 'border-zinc-800'
                    }`}>
                    <IconChevronDown
                      size={13}
                      className={`text-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease ${
                    isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <p className="pb-5 pl-[34px] text-body-sm leading-relaxed text-zinc-500">{a}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="mb-4 text-sm text-zinc-600">
            {t('cta.text')} {t('cta.sub')}
          </p>
          <Link
            href="#contact"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border-none bg-accent px-[22px] py-[11px] text-sm font-bold text-black transition hover:opacity-85">
            {t('cta.btn')}
            <IconArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
