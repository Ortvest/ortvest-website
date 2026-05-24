'use client';

import { useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader, SectionReveal } from '@shared/components';

import {
  IconChartBar,
  IconCircleCheck,
  IconCode,
  IconGitCommit,
  IconPencil,
  IconRocket,
  IconSearch,
} from '@tabler/icons-react';

const steps: Array<{
  key: string;
  desc: string;
  icon: typeof IconSearch;
  optional?: boolean;
}> = [
  { key: 'step1', desc: 'step1Desc', icon: IconSearch },
  { key: 'step2', desc: 'step2Desc', icon: IconPencil },
  { key: 'step3', desc: 'step3Desc', icon: IconCode },
  { key: 'step4Marketing', desc: 'step4MarketingDesc', icon: IconChartBar, optional: true },
  { key: 'step5', desc: 'step5Desc', icon: IconCircleCheck },
  { key: 'step6', desc: 'step6Desc', icon: IconRocket },
];

export function Process() {
  const t = useTranslations('process');

  return (
    <section id="process" className="section-padding bg-white" aria-labelledby="process-heading">
      <Container>
        <SectionReveal direction="left">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('subtitle')}
            icon={IconGitCommit}
            className="mb-10"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(({ key, desc, icon: Icon, optional }, i) => (
              <InteractiveCard key={key} icon={<Icon className="h-5 w-5" />}>
                <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1 text-h4 text-black">
                  {t(key)}
                  {optional && (
                    <span className="ml-1.5 text-body-sm font-normal text-black/50">({t('stepOptional')})</span>
                  )}
                </h3>
                <p className="mt-2 text-body-sm text-black/60">{t(desc)}</p>
              </InteractiveCard>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
