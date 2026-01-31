'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Container, SectionHeader } from '@shared/components';

import { EASE, fadeUp, viewport } from '@lib/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqItems = [
  { q: 'q1', a: 'a1' },
  { q: 'q2', a: 'a2' },
  { q: 'q3', a: 'a3' },
  { q: 'q4', a: 'a4' },
  { q: 'q5', a: 'a5' },
  { q: 'q6', a: 'a6' },
  { q: 'q7', a: 'a7' },
  { q: 'q8', a: 'a8' },
] as const;

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-white" aria-labelledby="faq-heading">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
          icon={HelpCircle}
          className="mb-10"
        />

        <motion.div
          className="mx-auto max-w-2xl space-y-3"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewport}
          transition={fadeUp.transition}>
          {faqItems.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={q}
                className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-card transition-all hover:border-black/15 hover:shadow-card-hover focus-within:ring-2 focus-within:ring-black/10 focus-within:ring-offset-2">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-black/[0.02] focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                    <HelpCircle className="h-4 w-4 text-black" aria-hidden />
                  </span>
                  <span className="text-body font-semibold text-black">{t(q)}</span>
                  <motion.span
                    className="ml-auto shrink-0 rounded-lg bg-black/[0.04] p-1.5"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}>
                    <ChevronDown className="h-4 w-4 text-black/60" aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}>
                      <p className="border-t border-black/[0.06] px-5 py-4 text-body-sm text-black/60">{t(a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
