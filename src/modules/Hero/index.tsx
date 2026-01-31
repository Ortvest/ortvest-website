'use client';

import { useTranslations } from 'next-intl';

import { Button, Container } from '@shared/components';

import { ArrowRight, Handshake, Headphones, Layers } from 'lucide-react';

const trustBullets = [
  { key: 'trust1', icon: Layers },
  { key: 'trust2', icon: Handshake },
  { key: 'trust3', icon: Headphones },
] as const;

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20"
      aria-labelledby="hero-heading">
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-black/70">{t('eyebrow')}</span>
            </div>

            <h1
              id="hero-heading"
              className="mt-5 text-display-sm font-bold leading-[1.1] tracking-tight text-black sm:text-display">
              {t('headline')}
            </h1>

            <p className="mt-5 text-body-lg text-black/60 sm:text-xl">{t('subheadline')}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#contact" variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />} iconRight>
                {t('ctaPrimary')}
              </Button>
              <Button href="#services" variant="ghost" size="lg">
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-end" aria-hidden>
            <div className="relative h-80 w-80 xl:h-96 xl:w-96">
              <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
                <circle cx="200" cy="200" r="180" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                <circle cx="200" cy="200" r="140" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                <circle cx="200" cy="200" r="100" fill="url(#heroGrad)" />
                <circle cx="200" cy="200" r="60" fill="rgba(205, 255, 78, 0.3)" />
                <circle cx="200" cy="200" r="30" fill="rgba(205, 255, 78, 0.5)" />
                <circle cx="200" cy="60" r="4" fill="rgba(0,0,0,0.15)" />
                <circle cx="340" cy="200" r="4" fill="rgba(0,0,0,0.15)" />
                <circle cx="200" cy="340" r="4" fill="rgba(0,0,0,0.15)" />
                <circle cx="60" cy="200" r="4" fill="rgba(0,0,0,0.15)" />
                <defs>
                  <radialGradient id="heroGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(205, 255, 78, 0.35)" />
                    <stop offset="100%" stopColor="rgba(205, 255, 78, 0)" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-black/[0.06] pt-8 sm:mt-14 sm:pt-10">
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:justify-start" role="list">
            {trustBullets.map(({ key, icon: Icon }) => (
              <li key={key} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                  <Icon className="h-4 w-4 text-black" />
                </span>
                <span className="text-sm font-medium text-black/70">{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
