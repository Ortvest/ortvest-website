'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Container, SectionHeader, SectionReveal } from '@shared/components';

import { IconArrowRight, IconBriefcase } from '@tabler/icons-react';

import { CaseCard } from './CaseCard';
import { featuredHomeCases } from './data';

export function Cases() {
  const t = useTranslations('cases');
  const locale = useLocale();

  return (
    <section id="cases" className="section-padding bg-white" aria-labelledby="cases-heading">
      <Container>
        <SectionReveal direction="left">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('subtitle')}
            icon={IconBriefcase}
            className="mb-8"
          />

          <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:p-6">
            <p className="text-body-sm text-black/70">{t('ndaBanner')}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredHomeCases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/cases`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-950 transition hover:border-zinc-400">
              {t('section.viewAll')}
              <IconArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-8">
            <p className="text-[15px] text-black/70">{t('bottomCtaText')}</p>
            <a href="#contact" className="text-sm font-medium text-black transition hover:underline">
              {t('bottomCtaLink')}
            </a>
          </div>

          <div className="mt-12 text-center">
            <p className="mx-auto mb-6 max-w-xl text-body-sm text-black/60">{t('ctaText')}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#consultation"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
                {t('ctaButton')}
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black/80 transition hover:border-black/30 hover:text-black">
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
