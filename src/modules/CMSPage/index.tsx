'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Container, InteractiveCard, SectionHeader, SectionReveal } from '@shared/components';

import { EASE } from '@lib/motion';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart2,
  Check,
  CreditCard,
  FolderOpen,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  Link2,
  PenLine,
  Plus,
  Users,
  Zap,
} from 'lucide-react';

type BillingPeriod = 'monthly' | 'annually';
type ModuleKey = 'orders' | 'projects' | 'board' | 'transactions' | 'analytics' | 'blog' | 'team';

const MODULES: { key: ModuleKey; Icon: React.ComponentType<{ className?: string }>; addon: boolean }[] = [
  { key: 'orders', Icon: Inbox, addon: false },
  { key: 'projects', Icon: FolderOpen, addon: false },
  { key: 'board', Icon: LayoutGrid, addon: false },
  { key: 'transactions', Icon: CreditCard, addon: true },
  { key: 'analytics', Icon: BarChart2, addon: true },
  { key: 'blog', Icon: PenLine, addon: true },
  { key: 'team', Icon: Users, addon: false },
];

const HAS_DEPENDENCY = new Set<ModuleKey>(['orders', 'board', 'blog']);

const FEATURE_COUNT: Record<ModuleKey, number> = {
  orders: 3,
  projects: 3,
  board: 3,
  transactions: 3,
  analytics: 3,
  blog: 5,
  team: 3,
};

const INCLUDED_MODULES: ModuleKey[] = ['orders', 'projects', 'board', 'team'];

const ADDON_ITEMS: { key: string; label?: string; moduleKey?: ModuleKey; price: string }[] = [
  { key: 'analytics-finance', label: 'Analytics & Finance', price: '+€20/mo' },
  { key: 'blog', moduleKey: 'blog', price: '+€15/mo' },
];

const FINANCE_MODULES = new Set<ModuleKey>(['transactions', 'analytics']);

const pricing: Record<'standard' | 'partner', Record<BillingPeriod, string>> = {
  standard: { monthly: '€30', annually: '€25' },
  partner: { monthly: '€15', annually: '€12' },
};

const HERO_BG = '#0f1117';

export function CMSPage() {
  const t = useTranslations('cmsPage');
  const locale = useLocale();
  const [activeModule, setActiveModule] = useState<ModuleKey>('orders');
  const [billing, setBilling] = useState<BillingPeriod>('annually');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const activeModuleData = MODULES.find((m) => m.key === activeModule)!;

  async function startStandardCheckout() {
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/cms-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: billing === 'monthly' ? 'monthly' : 'annually',
          locale,
          cancel_path: 'cms',
        }),
      });
      let data: { url?: string; error?: string } = {};
      try {
        data = (await res.json()) as { url?: string; error?: string };
      } catch {
        setCheckoutError(t('pricing.checkoutNetwork'));
        return;
      }
      if (!res.ok || !data.url) {
        setCheckoutError(data.error ?? t('pricing.checkoutFailed'));
        return;
      }
      window.location.assign(data.url);
    } catch {
      setCheckoutError(t('pricing.checkoutNetwork'));
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        id="cms-hero"
        className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
        style={{ backgroundColor: HERO_BG }}
        aria-labelledby="cms-hero-heading">
        {/* Radial accent glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(205,255,78,0.08) 0%, transparent 70%)',
          }}
          aria-hidden
        />

        <Container>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                <LayoutDashboard className="h-3.5 w-3.5" />
                {t('hero.eyebrow')}
              </span>

              <h1 id="cms-hero-heading" className="mt-4 text-display-sm font-bold text-white sm:text-display">
                {t('hero.headline')}
              </h1>

              <p className="mt-5 text-body-lg text-white/60">{t('hero.subheadline')}</p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="#contact"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-accent-dark">
                  {t('hero.ctaPrimary')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#cms-pricing"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10">
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── MODULE SHOWCASE ───────────────────────────────────── */}
      <section id="cms-showcase" className="section-padding bg-white" aria-labelledby="showcase-heading">
        <Container>
          <SectionReveal direction="right">
            <SectionHeader
              eyebrow={t('showcase.eyebrow')}
              title={t('showcase.title')}
              description={t('showcase.subtitle')}
              icon={LayoutGrid}
              className="mb-10"
            />

            <div className="overflow-hidden rounded-2xl border border-black/[0.08] shadow-card">
              <div className="flex flex-col lg:flex-row">
                {/* Sidebar — horizontal scroll on mobile, vertical on desktop */}
                <nav
                  className="flex shrink-0 overflow-x-auto p-3 lg:w-60 lg:flex-col"
                  style={{ backgroundColor: HERO_BG }}
                  aria-label="CMS modules">
                  <div className="mb-3 hidden px-3 py-1 lg:block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Ortvest CMS</span>
                  </div>

                  {MODULES.map(({ key, Icon, addon }) => (
                    <div key={key} className="contents">
                      {key === 'transactions' && (
                        <div className="mr-2 mt-4 flex shrink-0 items-center justify-between gap-2 px-3 py-1 lg:mr-0 lg:w-full">
                          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            Analytics & Finance
                          </span>
                          <span className="hidden whitespace-nowrap rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent lg:inline">
                            Add-on
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveModule(key)}
                        aria-current={activeModule === key ? 'page' : undefined}
                        className={`mr-2 flex shrink-0 items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors lg:mb-0.5 lg:mr-0 lg:w-full ${
                          activeModule === key
                            ? 'bg-accent/15 text-accent'
                            : 'text-white/50 hover:bg-white/[0.06] hover:text-white'
                        } ${FINANCE_MODULES.has(key) ? 'lg:pl-6' : ''}`}>
                        <span className="flex min-w-0 items-center gap-2">
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="whitespace-nowrap">{t(`showcase.modules.${key}.name`)}</span>
                        </span>
                        {addon && !FINANCE_MODULES.has(key) && (
                          <span className="ml-auto hidden whitespace-nowrap rounded bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent lg:inline">
                            Add-on
                          </span>
                        )}
                      </button>
                    </div>
                  ))}
                </nav>

                {/* Content area */}
                <div className="flex-1 overflow-hidden bg-white p-5 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeModule}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, ease: EASE }}>
                      {/* Add-on badge */}
                      {activeModuleData.addon && !FINANCE_MODULES.has(activeModule) && (
                        <span className="mb-3 inline-flex rounded-full border border-accent/60 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                          {t(`showcase.modules.${activeModule}.addonBadge`)}
                        </span>
                      )}

                      <h3 id="showcase-heading" className="text-h3 text-black">
                        {t(`showcase.modules.${activeModule}.name`)}
                      </h3>
                      <p className="mt-1 text-body-sm text-black/55">
                        {t(`showcase.modules.${activeModule}.subtitle`)}
                      </p>

                      {/* Feature bullets */}
                      <ul className="mt-4 space-y-2" role="list">
                        {Array.from({ length: FEATURE_COUNT[activeModule] }, (_, i) => i + 1).map((i) => (
                          <li key={i} className="flex items-start gap-2 text-body-sm text-black/70">
                            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                            {t(`showcase.modules.${activeModule}.feature${i}`)}
                          </li>
                        ))}
                      </ul>

                      {FINANCE_MODULES.has(activeModule) && (
                        <div className="mt-4 space-y-3">
                          <p className="text-xs leading-relaxed text-black/50">{t('showcase.financeNote')}</p>
                          <span className="inline-flex rounded-full border border-accent/60 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                            {t('showcase.financeBadge')}
                          </span>
                        </div>
                      )}

                      {/* Dependency notice */}
                      {HAS_DEPENDENCY.has(activeModule) && (
                        <div className="mt-4 rounded-xl border border-black/[0.07] bg-black/[0.025] px-4 py-3">
                          <p className="text-xs leading-relaxed text-black/50">
                            <span className="font-semibold text-black/60">{t('showcase.dependsLabel')} </span>
                            {t(`showcase.modules.${activeModule}.dependency`)}
                          </p>
                        </div>
                      )}

                      {/* API integration block — Orders only */}
                      {activeModule === 'orders' && (
                        <div className="mt-5 rounded-xl border border-accent/25 bg-accent/[0.06] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                                <Link2 className="h-3.5 w-3.5 text-black" />
                              </span>
                              <p className="text-sm font-semibold text-black">{t('showcase.apiBlock.title')}</p>
                            </div>
                            <span className="shrink-0 rounded-full bg-accent/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black/70">
                              {t('showcase.apiBlock.badge')}
                            </span>
                          </div>

                          <p className="mt-2 text-xs leading-relaxed text-black/55">
                            {t('showcase.apiBlock.description')}
                          </p>

                          {/* Visual flow */}
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {(
                              [
                                t('showcase.apiBlock.step1'),
                                t('showcase.apiBlock.step2'),
                                t('showcase.apiBlock.step3'),
                              ] as string[]
                            ).map((label, idx, arr) => (
                              <div key={label} className="flex items-center gap-2">
                                <span className="rounded-lg border border-black/[0.10] bg-white px-3 py-1.5 text-xs font-medium text-black/70 shadow-sm">
                                  {label}
                                </span>
                                {idx < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-black/30" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Screenshot placeholder */}
                      <div className="mt-5 flex aspect-video max-h-[340px] w-full items-center justify-center rounded-xl border-2 border-dashed border-black/[0.09] bg-black/[0.02]">
                        <p className="text-sm text-black/30">
                          {t(`showcase.modules.${activeModule}.name`)} {t('showcase.placeholderAlt')}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section id="cms-pricing" className="section-padding bg-black" aria-labelledby="cms-pricing-heading">
        <Container>
          <SectionReveal direction="left">
            <header className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{t('pricing.eyebrow')}</p>
              <h2 id="cms-pricing-heading" className="mt-3 text-h2 text-white">
                {t('pricing.title')}
              </h2>
              <p className="mt-3 text-body-lg text-white/60">{t('pricing.subtitle')}</p>
            </header>

            {/* Billing toggle */}
            <div className="mb-8 flex items-center justify-center">
              <div
                className="inline-flex rounded-full border border-white/10 bg-white/[0.05] p-1"
                role="group"
                aria-label={t('pricing.billingLabel')}>
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  aria-pressed={billing === 'monthly'}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    billing === 'monthly' ? 'bg-white text-black shadow-sm' : 'text-white/55 hover:text-white'
                  }`}>
                  {t('pricing.monthly')}
                </button>
                <button
                  type="button"
                  onClick={() => setBilling('annually')}
                  aria-pressed={billing === 'annually'}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    billing === 'annually' ? 'bg-white text-black shadow-sm' : 'text-white/55 hover:text-white'
                  }`}>
                  {t('pricing.annually')}
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold leading-none text-black">
                    {t('pricing.save')}
                  </span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Standard */}
              <article className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                  {t('pricing.standard.name')}
                </span>

                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-[2rem] font-bold leading-none text-white">{pricing.standard[billing]}</span>
                  <span className="text-body-sm text-white/45">/mo</span>
                </div>
                {billing === 'annually' && <p className="mt-1 text-xs text-white/35">{t('pricing.billedAnnually')}</p>}

                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-white/45">
                  {t('pricing.whatsIncluded')}
                </p>
                <ul className="mt-3 flex-1 space-y-2" role="list">
                  {INCLUDED_MODULES.map((mod) => (
                    <li key={mod} className="flex items-center gap-2 text-body-sm text-white/70">
                      <Check className="h-3.5 w-3.5 shrink-0 text-white/40" />
                      {t(`showcase.modules.${mod}.name`)}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-body-sm text-white/70">
                    <Zap className="h-3.5 w-3.5 shrink-0 text-accent/70" />
                    {t('pricing.apiFeature')}
                  </li>
                </ul>

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    disabled={checkoutLoading}
                    onClick={startStandardCheckout}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60">
                    {checkoutLoading ? t('pricing.subscribeLoading') : t('pricing.subscribe')}
                  </button>
                  <p className="text-[11px] leading-snug text-white/40">{t('pricing.subscribeNote')}</p>
                  {checkoutError && (
                    <p className="rounded-lg border border-red-400/40 bg-red-950/50 px-3 py-2 text-xs text-red-200 whitespace-pre-wrap">
                      {checkoutError}
                    </p>
                  )}
                  <Link
                    href="#contact"
                    className="text-center text-xs font-medium text-white/50 underline-offset-2 hover:text-white/70 hover:underline">
                    {t('pricing.contactInstead')}
                  </Link>
                </div>
              </article>

              {/* Partner rate */}
              <article className="relative flex flex-col overflow-hidden rounded-2xl bg-accent p-6 shadow-glow">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black/10 text-black">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <span className="mb-3 inline-flex rounded-full border border-black/20 bg-black/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black/70">
                  {t('pricing.partner.badge')}
                </span>

                <h3 className="text-h4 text-black">{t('pricing.partner.name')}</h3>
                <p className="mt-1 text-body-sm text-black/60">{t('pricing.partner.subtitle')}</p>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[2rem] font-bold leading-none text-black">{pricing.partner[billing]}</span>
                  <span className="text-body-sm text-black/50">/mo</span>
                </div>
                {billing === 'annually' && <p className="mt-1 text-xs text-black/50">{t('pricing.billedAnnually')}</p>}

                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-black/50">
                  {t('pricing.whatsIncluded')}
                </p>
                <ul className="mt-3 flex-1 space-y-2" role="list">
                  {INCLUDED_MODULES.map((mod) => (
                    <li key={mod} className="flex items-center gap-2 text-body-sm text-black/80">
                      <Check className="h-3.5 w-3.5 shrink-0 text-black/50" />
                      {t(`showcase.modules.${mod}.name`)}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-body-sm text-black/80">
                    <Zap className="h-3.5 w-3.5 shrink-0 text-black/50" />
                    {t('pricing.apiFeature')}
                  </li>
                </ul>

                <div className="mt-5">
                  <Link
                    href="#contact"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black/85">
                    {t('pricing.partner.cta')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </div>

            {/* Add-on pills */}
            <div className="mt-8 text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/45">
                {t('pricing.addonLabel')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {ADDON_ITEMS.map(({ key, label, moduleKey, price }) => (
                  <div
                    key={key}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm">
                    <Plus className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span className="font-medium text-white">{label ?? t(`showcase.modules.${moduleKey}.name`)}</span>
                    <span className="text-white/45">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: HERO_BG }} aria-labelledby="cms-cta-heading">
        <Container>
          <SectionReveal direction="right">
            <div className="mx-auto max-w-2xl text-center">
              <h2 id="cms-cta-heading" className="text-h2 text-white">
                {t('cta.headline')}
              </h2>
              <p className="mt-4 text-body-lg text-white/60">{t('cta.subheadline')}</p>
              <div className="mt-8">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-accent-dark">
                  {t('cta.button')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </>
  );
}
