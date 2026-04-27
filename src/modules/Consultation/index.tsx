'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Container, SectionReveal } from '@shared/components';

import { ArrowRight, BadgeCheck, CalendarClock } from 'lucide-react';

const consultationCards = [
  {
    key: 'discovery',
    items: ['projectOverview', 'feasibility', 'timelineBudget', 'qa'],
    cta: 'bookCall',
    icon: CalendarClock,
  },
  {
    key: 'strategy',
    items: [
      'goalsAudience',
      'competitiveAnalysis',
      'techStack',
      'roadmap',
      'risk',
      'recording',
      'credit',
    ],
    cta: 'bookSession',
    icon: BadgeCheck,
  },
] as const;

export function Consultation() {
  const t = useTranslations('consultation');

  return (
    <section id="consultation" className="section-padding bg-black" aria-labelledby="consultation-heading">
      <Container>
        <SectionReveal direction="left">
          <header className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{t('eyebrow')}</p>
            <h2 id="consultation-heading" className="mt-3 text-h2 text-white">
              {t('title')}
            </h2>
            <p className="mt-3 text-body-lg text-white/65">{t('subtitle')}</p>
          </header>

          <div className="grid gap-5 sm:grid-cols-2">
            {consultationCards.map(({ key, items, cta, icon: Icon }) => (
              <article
                key={key}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card">
                {key === 'strategy' ? (
                  <span className="mb-4 inline-flex rounded-full border border-accent/60 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {t('strategyBadge')}
                  </span>
                ) : (
                  <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                    {t('discoveryBadge')}
                  </span>
                )}

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-h4 text-white">{t(`${key}.title`)}</h3>
                <p className="mt-2 text-body-sm text-white/60">{t(`${key}.subtitle`)}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-lg font-semibold text-accent">{t(`${key}.price`)}</span>
                  <span className="text-sm text-white/60">{t(`${key}.duration`)}</span>
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-white/50">
                  {t('whatsIncluded')}
                </p>
                <ul className="mt-3 space-y-2" role="list">
                  {items.map((itemKey) => (
                    <li key={itemKey} className="flex items-center gap-2 text-body-sm text-white/75">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {t(`${key}.items.${itemKey}`)}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className="group mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white transition hover:text-accent">
                  {t(cta)}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
