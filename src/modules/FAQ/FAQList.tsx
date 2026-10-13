'use client';

import { useState } from 'react';

import { IconMinus, IconPlus } from '@tabler/icons-react';

import type { FaqItem } from './FAQAccordion';

export function FAQList({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t-2 border-black">
      <div className="divide-y divide-black/10">
        {items.map(({ q, a }, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={q}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}>
                <div className="flex items-start gap-4">
                  <span
                    className={`mt-0.5 shrink-0 font-mono text-xs font-bold ${
                      isOpen ? 'rounded bg-accent px-2 py-1 text-black' : 'py-1 text-black/30'
                    }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[17px] font-bold leading-snug text-black">{q}</span>
                </div>

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                    isOpen ? 'border-black bg-black text-white' : 'border-black/15 text-black'
                  }`}>
                  {isOpen ? <IconMinus size={15} /> : <IconPlus size={15} />}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease ${
                  isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <p className="max-w-xl pb-5 pl-[52px] text-body-sm leading-relaxed text-black/60">{a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
