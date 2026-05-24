'use client';

import { useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader, SectionReveal } from '@shared/components';

import {
  SiExpo,
  SiGo,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTypescript,
  SiVuedotjs,
} from '@icons-pack/react-simple-icons';
import { IconCpu, IconDatabase, IconDeviceDesktop, IconDeviceMobile } from '@tabler/icons-react';

type SimpleIcon = typeof SiReact;

type TechItem = { name: string; simpleIcon: SimpleIcon };

const leaderLogos: { name: string; simpleIcon: SimpleIcon }[] = [
  { name: 'React', simpleIcon: SiReact },
  { name: 'Node.js', simpleIcon: SiNodedotjs },
  { name: 'Python', simpleIcon: SiPython },
  { name: 'Go', simpleIcon: SiGo },
  { name: 'MongoDB', simpleIcon: SiMongodb },
];

const techCategories: { key: string; icon: typeof IconDeviceDesktop; items: TechItem[] }[] = [
  {
    key: 'frontend',
    icon: IconDeviceDesktop,
    items: [
      { name: 'Next.js', simpleIcon: SiNextdotjs },
      { name: 'React', simpleIcon: SiReact },
      { name: 'Vue.js', simpleIcon: SiVuedotjs },
      { name: 'TypeScript', simpleIcon: SiTypescript },
    ],
  },
  {
    key: 'backend',
    icon: IconCpu,
    items: [
      { name: 'NestJS', simpleIcon: SiNestjs },
      { name: 'Python', simpleIcon: SiPython },
      { name: 'Go', simpleIcon: SiGo },
    ],
  },
  {
    key: 'databases',
    icon: IconDatabase,
    items: [
      { name: 'MongoDB', simpleIcon: SiMongodb },
      { name: 'PostgreSQL', simpleIcon: SiPostgresql },
      { name: 'Redis', simpleIcon: SiRedis },
    ],
  },
  {
    key: 'mobile',
    icon: IconDeviceMobile,
    items: [
      { name: 'React Native', simpleIcon: SiReact },
      { name: 'Expo', simpleIcon: SiExpo },
    ],
  },
];

export function Technologies() {
  const t = useTranslations('technologies');

  return (
    <section id="technologies" className="section-padding bg-white" aria-labelledby="technologies-heading">
      <Container>
        <SectionReveal direction="right">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('subtitle')}
            icon={IconCpu}
            className="mb-10"
          />

          <div className="mb-10 rounded-2xl border border-black/[0.06] bg-black/[0.02] p-5 sm:p-6">
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-black/40">
              {t('leadersStrip')}
            </p>
            <p className="mb-4 text-center text-body-sm text-black/50">{t('leadersTrust')}</p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {leaderLogos.map(({ name, simpleIcon: LogoIcon }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0">
                  <LogoIcon size={24} className="h-6 w-6" aria-hidden />
                  <span className="text-sm font-medium text-black/60">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {techCategories.map((category) => {
              const Icon = category.icon;
              const items = category.items;
              return (
                <InteractiveCard key={category.key} icon={<Icon className="h-5 w-5" />}>
                  <h3 className="text-h4 text-black">{t(category.key)}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2" role="list">
                    {items.map(({ name, simpleIcon: TechIcon }) => (
                      <li key={name}>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/[0.04] px-2.5 py-1.5 text-body-sm text-black/70">
                          <TechIcon size={16} className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </InteractiveCard>
              );
            })}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
