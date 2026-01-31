'use client';

import { useTranslations } from 'next-intl';

import { Container, SectionHeader } from '@shared/components';

import { fadeUp, staggerContainer, staggerItem, viewport } from '@lib/motion';
import { Form } from '@modules/Contact/layout/Form';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Mail } from 'lucide-react';

const benefits = [
  { key: 'Free consultation', icon: CheckCircle },
  { key: 'Reply within 24h', icon: Clock },
  { key: 'No spam, ever', icon: Mail },
];

export function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="section-padding bg-white" aria-labelledby="contact-heading">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
          icon={Mail}
          className="mb-10"
        />

        <div className="mx-auto max-w-xl">
          {/* Benefits strip */}
          <motion.div
            className="mb-8 flex flex-wrap justify-center gap-4 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}>
            {benefits.map(({ key, icon: Icon }) => (
              <motion.div key={key} className="flex items-center gap-2" variants={staggerItem}>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15">
                  <Icon className="h-3.5 w-3.5 text-black" />
                </span>
                <span className="text-body-sm text-black/60">{key}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={viewport}
            transition={fadeUp.transition}>
            <Form />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
