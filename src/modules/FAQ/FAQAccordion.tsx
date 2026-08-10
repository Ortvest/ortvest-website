'use client';

import { useState } from 'react';

import Link from 'next/link';

import { IconArrowRight, IconChevronDown } from '@tabler/icons-react';

export type FaqItem = {
  q: string;
  a: string;
};

type FAQAccordionProps = {
  items: FaqItem[];
  ctaText: string;
  ctaSub: string;
  ctaBtn: string;
};

export function FAQAccordion({ items, ctaText, ctaSub, ctaBtn }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mx-auto flex max-w-[680px] flex-col">
        {items.map(({ q, a }, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={q} className={`border-b border-zinc-900 ${i === 0 ? 'border-t border-zinc-900' : ''}`}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full cursor-pointer items-center gap-4 py-5"
                aria-expanded={isOpen}>
                <span className="min-w-[20px] text-xs tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</span>
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
                <p className="pb-5 pl-[34px] text-body-sm leading-relaxed text-zinc-400">{a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <p className="mb-4 text-sm text-zinc-400">
          {ctaText} {ctaSub}
        </p>
        <Link
          href="#contact"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border-none bg-accent px-[22px] py-[11px] text-sm font-bold text-black transition hover:opacity-85">
          {ctaBtn}
          <IconArrowRight size={13} />
        </Link>
      </div>
    </>
  );
}
