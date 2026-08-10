import { getTranslations } from 'next-intl/server';

import { IconHelpCircle } from '@tabler/icons-react';

import { FAQAccordion } from './FAQAccordion';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

export async function FAQ() {
  const t = await getTranslations('faq');

  const items = FAQ_KEYS.map((key) => ({
    q: t(key),
    a: t(key.replace('q', 'a') as 'a1'),
  }));

  return (
    <section id="faq" className="bg-black px-6 py-20" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <IconHelpCircle size={13} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-accent">{t('eyebrow')}</span>
          </div>
          <h2 id="faq-heading" className="mb-3 text-h1 font-bold text-white">
            {t('title')}
          </h2>
          <p className="text-body text-zinc-400">{t('subtitle')}</p>
        </div>

        <FAQAccordion items={items} ctaText={t('cta.text')} ctaSub={t('cta.sub')} ctaBtn={t('cta.btn')} />
      </div>
    </section>
  );
}
