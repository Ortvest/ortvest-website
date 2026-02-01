'use client';

import { useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader, SectionReveal } from '@shared/components';

import { Award, Eye, Handshake, MessageSquare, Target, Users, Zap } from 'lucide-react';

const whyPoints = [
  { key: 'why1', icon: Target },
  { key: 'why2', icon: Zap },
  { key: 'why3', icon: MessageSquare },
] as const;

const values = [
  { key: 'value1', icon: Award },
  { key: 'value2', icon: Eye },
  { key: 'value3', icon: Handshake },
] as const;

export function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="section-padding bg-white" aria-labelledby="about-heading">
      <Container>
        <SectionReveal direction="left">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('subtitle')}
            icon={Users}
            className="mb-10"
          />

          <div className="mb-10">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-black/50">{t('whyTitle')}</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {whyPoints.map(({ key, icon: Icon }) => (
                <div key={key} className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-white p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                    <Icon className="h-4 w-4 text-black" />
                  </span>
                  <p className="text-body-sm text-black/70">{t(key)}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-black/50">{t('valuesTitle')}</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {values.map(({ key, icon: Icon }) => (
                <InteractiveCard key={key} icon={<Icon className="h-5 w-5" />}>
                  <p className="text-h4 text-black">{t(key)}</p>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
