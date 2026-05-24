'use client';

import { useTranslations } from 'next-intl';

import { ContactForm } from '@modules/Contact/layout/Form';
import { IconClock, IconMail, IconPhone, IconShieldCheck } from '@tabler/icons-react';

const STEP_KEYS = ['1', '2', '3', '4'] as const;

const TRUST_BADGES = [
  { key: 'reply', Icon: IconClock },
  { key: 'nospam', Icon: IconShieldCheck },
  { key: 'call', Icon: IconPhone },
] as const;

export function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="bg-white py-20" aria-labelledby="contact-heading">
      <div className="container-main">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <IconMail size={13} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-zinc-400">{t('label')}</span>
          </div>
          <h2 id="contact-heading" className="mb-3 text-h1 font-bold text-zinc-950">
            {t('title')}
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-body leading-relaxed text-zinc-400">{t('subtitle')}</p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {TRUST_BADGES.map(({ key, Icon }) => (
              <div key={key} className="flex items-center gap-1.5 text-sm text-zinc-400">
                <Icon size={13} className="text-zinc-400" />
                <span>{t(`trust.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — steps */}
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-widest text-zinc-500">{t('steps.label')}</p>
            <div>
              {STEP_KEYS.map((key) => (
                <div
                  key={key}
                  className="flex items-start gap-4 border-b border-l-2 border-l-transparent border-zinc-100 py-5 pl-1 transition-all duration-200 last:border-b-0 hover:border-l-accent hover:pl-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-zinc-200 text-xs text-zinc-400 transition-colors hover:border-accent/50">
                    {key}
                  </div>
                  <div>
                    <p className="mb-1 text-[15px] font-semibold text-zinc-950">{t(`steps.${key}.title`)}</p>
                    <p className="text-body-sm leading-relaxed text-zinc-400">{t(`steps.${key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
