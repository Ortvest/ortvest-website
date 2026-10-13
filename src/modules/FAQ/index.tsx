import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container, SectionReveal } from '@shared/components';

import { IconArrowRight } from '@tabler/icons-react';

import { FAQList } from './FAQList';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

/**
 * Single source of truth for the home-page FAQ, shared by this section and the
 * FAQPage JSON-LD on the home page. Keep them in sync: Google requires the
 * marked-up Q&A to be visible on the same page.
 */
export async function getHomeFaqItems(locale?: string) {
  const t = locale ? await getTranslations({ locale, namespace: 'faq' }) : await getTranslations('faq');

  return FAQ_KEYS.map((key) => ({
    q: t(key),
    a: t(key.replace('q', 'a') as 'a1'),
  }));
}

export async function FAQ() {
  const t = await getTranslations('faq');
  const items = await getHomeFaqItems();

  return (
    <section id="faq" className="section-padding bg-white" aria-labelledby="faq-heading">
      <Container>
        <SectionReveal direction="left">
          <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/40">{t('eyebrow')}</p>
              <h2 id="faq-heading" className="text-h1 font-extrabold leading-tight text-black">
                {t('title')}
              </h2>
              <p className="mt-4 text-body-sm leading-relaxed text-black/55">{t('subtitle')}</p>

              <div className="mt-8 border-t border-black/10 pt-6">
                <p className="text-[15px] font-semibold text-black">{t('cta.text')}</p>
                <Link
                  href="#contact"
                  className="group mt-4 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/85">
                  {t('cta.btn')}
                  <IconArrowRight size={14} className="text-accent transition-transform group-hover:translate-x-0.5" />
                </Link>
                <p className="mt-4 font-mono text-xs text-black/40">{t('cta.trust')}</p>
              </div>
            </div>

            <FAQList items={items} />
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
