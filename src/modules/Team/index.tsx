'use client';

import { useTranslations } from 'next-intl';

import { Container, SectionReveal } from '@shared/components';

import { IconCode, IconPalette, IconTrendingUp, IconUsers } from '@tabler/icons-react';

import { TeamCard } from './TeamCard';
import { TeamCarousel } from './TeamCarousel';

const disciplines = [
  {
    id: 'developers',
    Icon: IconCode,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 'designers',
    Icon: IconPalette,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    id: 'marketing',
    Icon: IconTrendingUp,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
] as const;

export function Team() {
  const t = useTranslations('team');

  return (
    <section id="team" className="relative overflow-hidden section-padding bg-white" aria-labelledby="team-heading">
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <defs>
          <pattern id="teamDotGrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="#a1a1aa" fillOpacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#teamDotGrid)" />
      </svg>
      <Container className="relative z-10">
        <SectionReveal direction="left">
          <header className="mb-10">
            <div className="mb-3 flex items-center gap-2">
              <IconUsers size={14} className="text-zinc-400" />
              <span className="text-xs uppercase tracking-widest text-zinc-400">{t('label')}</span>
            </div>
            <h2 id="team-heading" className="text-h1 font-bold text-zinc-950">
              {t('title')}
            </h2>
            <p className="mt-3 max-w-xl text-body text-zinc-400">{t('subtitle')}</p>
          </header>

          <div className="md:hidden">
            <TeamCarousel
              disciplines={disciplines}
              getTitle={(id) => t(`${id}.title`)}
              getDescription={(id) => t(`${id}.description`)}
              getYears={(id) => t(`${id}.years`)}
              getYearsLabel={(id) => t(`${id}.yearsLabel`)}
            />
          </div>

          <div className="hidden gap-4 md:grid md:grid-cols-3">
            {disciplines.map((discipline) => (
              <TeamCard
                key={discipline.id}
                discipline={discipline}
                title={t(`${discipline.id}.title`)}
                description={t(`${discipline.id}.description`)}
                years={t(`${discipline.id}.years`)}
                yearsLabel={t(`${discipline.id}.yearsLabel`)}
              />
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
