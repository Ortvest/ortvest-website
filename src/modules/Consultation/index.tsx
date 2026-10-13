import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container, SectionReveal } from '@shared/components';

import { IconArrowRight } from '@tabler/icons-react';

type CardVariant = 'ghost' | 'solid';

type CardConfig = {
  key: 'discovery' | 'strategy';
  items: string[];
  cta: 'bookCall' | 'bookSession';
  badgeKey: 'discoveryBadge' | 'strategyBadge';
  variant: CardVariant;
};

const CARDS: CardConfig[] = [
  {
    key: 'discovery',
    items: ['projectOverview', 'feasibility', 'timelineBudget', 'qa'],
    cta: 'bookCall',
    badgeKey: 'discoveryBadge',
    variant: 'ghost',
  },
  {
    key: 'strategy',
    items: ['goalsAudience', 'competitiveAnalysis', 'techStack', 'roadmap', 'risk', 'recording'],
    cta: 'bookSession',
    badgeKey: 'strategyBadge',
    variant: 'solid',
  },
];

function BookButton({ label, variant }: { label: string; variant: CardVariant }) {
  const isSolid = variant === 'solid';

  return (
    <Link
      href="#contact"
      className={`group inline-flex w-fit items-center justify-between gap-8 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-semibold transition ${
        isSolid
          ? 'bg-accent text-black hover:bg-accent-dark'
          : 'border border-white/25 text-white hover:border-white/50'
      }`}>
      {label}
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
          isSolid ? 'bg-black text-accent' : 'border border-white/25 text-white group-hover:border-white/50'
        }`}>
        <IconArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function BulletList({
  items,
  prefix,
  t,
}: {
  items: string[];
  prefix: CardConfig['key'];
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  return (
    <ul className="space-y-3" role="list">
      {items.map((itemKey) => (
        <li key={itemKey} className="flex items-start gap-2.5 text-body-sm leading-relaxed text-white/75">
          <span className="mt-0.5 text-accent-dark" aria-hidden>
            +
          </span>
          {t(`${prefix}.items.${itemKey}`)}
        </li>
      ))}
    </ul>
  );
}

export async function Consultation() {
  const t = await getTranslations('consultation');

  return (
    <section id="consultation" className="section-padding bg-black" aria-labelledby="consultation-heading">
      <Container>
        <SectionReveal direction="left">
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">{t('eyebrow')}</p>
              <h2 id="consultation-heading" className="text-h1 font-extrabold leading-tight text-white">
                {t('titleMain')} <span className="text-white/25 line-through">{t('titleStrike')}</span>
              </h2>
            </div>
            <p className="max-w-xs text-body-sm leading-relaxed text-white/50 lg:pt-2">{t('subtitle')}</p>
          </div>

          {/* Mobile / tablet: two independent stacked cards */}
          <div className="grid gap-6 lg:hidden">
            {CARDS.map((card) => (
              <article
                key={card.key}
                className={`rounded-2xl border p-6 ${
                  card.variant === 'solid' ? 'border-accent/50 bg-white/[0.02]' : 'border-white/10'
                }`}>
                <p className={`font-mono text-xs ${card.variant === 'solid' ? 'text-accent' : 'text-white/40'}`}>
                  {t(card.badgeKey)}
                </p>
                <h3 className="mt-2 text-h3 font-bold text-white">{t(`${card.key}.title`)}</h3>

                <div className="mt-6 flex items-baseline gap-3 border-t border-white/10 pt-6">
                  <span className="text-3xl font-extrabold text-accent">{t(`${card.key}.price`)}</span>
                  <span className="text-sm text-white/50">{t(`${card.key}.duration`)}</span>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-widest text-white/40">{t('inShortLabel')}</p>
                  <p className="mt-3 text-body-sm leading-relaxed text-white/75">{t(`${card.key}.subtitle`)}</p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-widest text-white/40">{t('whatsIncluded')}</p>
                  <div className="mt-3">
                    <BulletList items={card.items} prefix={card.key} t={t} />
                  </div>
                </div>

                <div className="mt-8">
                  <BookButton label={t(card.cta)} variant={card.variant} />
                </div>
              </article>
            ))}
          </div>

          {/* Desktop: shared comparison table — one label gutter, two card columns */}
          <div className="relative hidden lg:grid lg:grid-cols-[160px_1fr_1fr] lg:gap-x-10">
            <div
              aria-hidden
              className="absolute inset-0 col-start-3 col-end-4 row-start-1 row-end-6 rounded-2xl border border-accent/50 bg-white/[0.02]"
            />

            {/* Row 1 — header */}
            <div aria-hidden />
            <div>
              <p className="font-mono text-xs text-white/40">{t('discoveryBadge')}</p>
              <h3 className="mt-2 text-h3 font-bold text-white">{t('discovery.title')}</h3>
            </div>
            <div className="relative px-8 pt-8">
              <p className="font-mono text-xs text-accent">{t('strategyBadge')}</p>
              <h3 className="mt-2 text-h3 font-bold text-white">{t('strategy.title')}</h3>
            </div>

            {/* Row 2 — price · time */}
            <div className="flex items-center border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-widest text-white/40">{t('priceTimeLabel')}</p>
            </div>
            <div className="flex items-baseline gap-3 border-t border-white/10 pt-6">
              <span className="text-4xl font-extrabold text-accent">{t('discovery.price')}</span>
              <span className="text-sm text-white/50">{t('discovery.duration')}</span>
            </div>
            <div className="relative flex items-baseline gap-3 border-t border-white/10 px-8 pt-6">
              <span className="text-4xl font-extrabold text-accent">{t('strategy.price')}</span>
              <span className="text-sm text-white/50">{t('strategy.duration')}</span>
            </div>

            {/* Row 3 — in short */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-widest text-white/40">{t('inShortLabel')}</p>
            </div>
            <p className="max-w-md border-t border-white/10 pt-6 text-body-sm leading-relaxed text-white/75">
              {t('discovery.subtitle')}
            </p>
            <p className="relative max-w-md border-t border-white/10 px-8 pt-6 text-body-sm leading-relaxed text-white/75">
              {t('strategy.subtitle')}
            </p>

            {/* Row 4 — what's included */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-widest text-white/40">{t('whatsIncluded')}</p>
            </div>
            <div className="border-t border-white/10 pt-6">
              <BulletList items={CARDS[0].items} prefix="discovery" t={t} />
            </div>
            <div className="relative border-t border-white/10 px-8 pt-6">
              <BulletList items={CARDS[1].items} prefix="strategy" t={t} />
            </div>

            {/* Row 5 — CTA */}
            <div aria-hidden />
            <div className="pt-10">
              <BookButton label={t('bookCall')} variant="ghost" />
            </div>
            <div className="relative px-8 pb-8 pt-10">
              <BookButton label={t('bookSession')} variant="solid" />
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
