'use client';

import { useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader } from '@shared/components';

import { staggerContainer, staggerItem, viewport } from '@lib/motion';
import { motion } from 'framer-motion';
import { CheckCircle, Code, PenTool, Rocket, Search, Workflow } from 'lucide-react';

const steps = [
  { key: 'step1', desc: 'step1Desc', icon: Search },
  { key: 'step2', desc: 'step2Desc', icon: PenTool },
  { key: 'step3', desc: 'step3Desc', icon: Code },
  { key: 'step4', desc: 'step4Desc', icon: CheckCircle },
  { key: 'step5', desc: 'step5Desc', icon: Rocket },
] as const;

export function Process() {
  const t = useTranslations('process');

  return (
    <section id="process" className="section-padding bg-white" aria-labelledby="process-heading">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
          icon={Workflow}
          className="mb-10"
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}>
          {steps.map(({ key, desc, icon: Icon }, i) => (
            <InteractiveCard key={key} icon={<Icon className="h-5 w-5" />}>
              <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-1 text-h4 text-black">{t(key)}</h3>
              <p className="mt-2 text-body-sm text-black/60">{t(desc)}</p>
            </InteractiveCard>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
