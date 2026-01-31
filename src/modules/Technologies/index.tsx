'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader } from '@shared/components';

import { EASE, hoverScale, staggerContainer, staggerItem, viewport } from '@lib/motion';
import { motion } from 'framer-motion';
import { Cpu, Database, Monitor, Server, Smartphone } from 'lucide-react';

// "Industry leaders" - generalized by category (React, Node, MongoDB, etc.)
const leaderLogos: { name: string; path?: string }[] = [
  { name: 'React', path: '/icons/ReactIcon.svg' },
  { name: 'Node.js', path: '/icons/NodeIcon.svg' },
  { name: 'Python' },
  { name: 'Go', path: '/icons/GoIcon.svg' },
  { name: 'MongoDB', path: '/icons/MongoIcon.svg' },
];

type TechItem = { name: string; iconPath?: string };

const techCategories: { key: string; icon: typeof Monitor; items: TechItem[] }[] = [
  {
    key: 'frontend',
    icon: Monitor,
    items: [
      { name: 'Next.js', iconPath: '/icons/NextIcon.svg' },
      { name: 'React', iconPath: '/icons/ReactIcon.svg' },
      { name: 'Vue.js' },
      { name: 'TypeScript', iconPath: '/icons/TSIcon.svg' },
    ],
  },
  {
    key: 'backend',
    icon: Server,
    items: [
      { name: 'NestJS', iconPath: '/icons/NestIcon.svg' },
      { name: 'Python' },
      { name: 'Go', iconPath: '/icons/GoIcon.svg' },
    ],
  },
  {
    key: 'databases',
    icon: Database,
    items: [
      { name: 'MongoDB', iconPath: '/icons/MongoIcon.svg' },
      { name: 'PostgreSQL', iconPath: '/icons/PostgreIcon.svg' },
      { name: 'Redis' },
    ],
  },
  {
    key: 'mobile',
    icon: Smartphone,
    items: [{ name: 'React Native' }, { name: 'Expo' }],
  },
];

export function Technologies() {
  const t = useTranslations('technologies');

  return (
    <section id="technologies" className="section-padding bg-white" aria-labelledby="technologies-heading">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
          icon={Cpu}
          className="mb-10"
        />

        {/* Industry leaders strip */}
        <motion.div
          className="mb-10 rounded-2xl border border-black/[0.06] bg-black/[0.02] p-5 sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: EASE }}>
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-black/40">
            {t('leadersStrip')}
          </p>
          <p className="mb-4 text-center text-body-sm text-black/50">{t('leadersTrust')}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {leaderLogos.map((logo) => (
              <motion.div
                key={logo.name}
                className="flex items-center gap-2 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                {...hoverScale}>
                {logo.path ? (
                  <Image src={logo.path} alt={logo.name} width={24} height={24} className="h-6 w-6" />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black/10 text-xs font-semibold text-black/60">
                    {logo.name.charAt(0)}
                  </span>
                )}
                <span className="text-sm font-medium text-black/60">{logo.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech category cards */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}>
          {techCategories.map((category) => {
            const Icon = category.icon;
            const items = category.items;
            return (
              <InteractiveCard key={category.key} icon={<Icon className="h-5 w-5" />}>
                <h3 className="text-h4 text-black">{t(category.key)}</h3>
                <ul className="mt-4 flex flex-wrap gap-2" role="list">
                  {items.map((item) => (
                    <li key={item.name}>
                      <motion.span
                        className="inline-flex items-center gap-1.5 rounded-lg bg-black/[0.04] px-2.5 py-1.5 text-body-sm text-black/70 transition hover:bg-accent/15"
                        variants={staggerItem}
                        whileHover={{ scale: 1.02 }}>
                        {item.iconPath ? (
                          <Image
                            src={item.iconPath}
                            alt=""
                            width={16}
                            height={16}
                            className="h-4 w-4 shrink-0 opacity-70"
                            aria-hidden
                          />
                        ) : (
                          <span
                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-black/10 text-[10px] font-semibold text-black/60"
                            aria-hidden>
                            {item.name.charAt(0)}
                          </span>
                        )}
                        {item.name}
                      </motion.span>
                    </li>
                  ))}
                </ul>
              </InteractiveCard>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
