'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Container, InteractiveCard, SectionHeader, SectionReveal } from '@shared/components';

import { ArrowRight, Check, LayoutDashboard, Plus } from 'lucide-react';

type BillingPeriod = 'monthly' | 'annually';

const includedModules = ['Orders', 'Team', 'Board', 'Projects'];

const addOns = [
  { name: 'Transactions', price: '+€10/mo' },
  { name: 'Analytics', price: '+€10/mo' },
  { name: 'Blog', price: '+€15/mo' },
];

const pricing: Record<'standard' | 'partner', Record<BillingPeriod, string>> = {
  standard: { monthly: '€30', annually: '€25' },
  partner: { monthly: '€15', annually: '€12' },
};

export function OrtvestCMS() {
  const [billing, setBilling] = useState<BillingPeriod>('annually');

  return (
    <section id="cms" className="section-padding bg-white" aria-labelledby="cms-heading">
      <Container>
        <SectionReveal direction="right">
          <SectionHeader
            eyebrow="Business Management"
            title="Ortvest CMS"
            description="Our own business management system — included with every partnership contract at a special rate."
            icon={LayoutDashboard}
            className="mb-10"
          />

          {/* Billing period toggle */}
          <div className="mb-8 flex items-center justify-center">
            <div
              className="inline-flex rounded-full border border-black/[0.08] bg-black/[0.03] p-1"
              role="group"
              aria-label="Billing period">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                aria-pressed={billing === 'monthly'}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  billing === 'monthly' ? 'bg-black text-white shadow-sm' : 'text-black/55 hover:text-black'
                }`}>
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annually')}
                aria-pressed={billing === 'annually'}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  billing === 'annually' ? 'bg-black text-white shadow-sm' : 'text-black/55 hover:text-black'
                }`}>
                Annually
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-black leading-none">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Standard */}
            <InteractiveCard icon={<LayoutDashboard className="h-5 w-5" />}>
              <span className="mb-3 inline-flex rounded-full border border-black/[0.12] bg-black/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black/55">
                Standard
              </span>

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[2rem] font-bold leading-none text-black">
                  {pricing.standard[billing]}
                </span>
                <span className="text-body-sm text-black/45">/mo</span>
              </div>
              {billing === 'annually' && (
                <p className="mt-1 text-xs text-black/40">Billed annually</p>
              )}

              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-black/45">
                What&apos;s included
              </p>
              <ul className="mt-3 space-y-2" role="list">
                {includedModules.map((mod) => (
                  <li key={mod} className="flex items-center gap-2 text-body-sm text-black/70">
                    <Check className="h-3.5 w-3.5 shrink-0 text-black/40" />
                    {mod}
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <Link
                  href="#contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border-2 border-black bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white">
                  Get started
                </Link>
              </div>
            </InteractiveCard>

            {/* Partner rate — dark exclusive card */}
            <article className="relative flex flex-col overflow-hidden rounded-2xl bg-black p-6 shadow-card">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>

              <span className="mb-3 inline-flex rounded-full border border-accent/60 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                For our clients
              </span>

              <h3 className="text-h4 text-white">Partner rate</h3>
              <p className="mt-1 text-body-sm text-white/55">For clients with an active contract.</p>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-[2rem] font-bold leading-none text-accent">
                  {pricing.partner[billing]}
                </span>
                <span className="text-body-sm text-white/45">/mo</span>
              </div>
              {billing === 'annually' && (
                <p className="mt-1 text-xs text-white/35">Billed annually</p>
              )}

              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-white/45">
                What&apos;s included
              </p>
              <ul className="mt-3 space-y-2" role="list">
                {includedModules.map((mod) => (
                  <li key={mod} className="flex items-center gap-2 text-body-sm text-white/75">
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent/80" />
                    {mod}
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-accent-dark">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          </div>

          {/* Add-on modules */}
          <div className="mt-10 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-black/45">
              Expand your CMS with add-on modules
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {addOns.map(({ name, price }) => (
                <div
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-black/[0.03] px-4 py-2 text-sm">
                  <Plus className="h-3.5 w-3.5 shrink-0 text-black/35" />
                  <span className="font-medium text-black/75">{name}</span>
                  <span className="text-black/45">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CMS overview CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-black/[0.07] bg-black/[0.02] px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-h4 text-black">Want to see Ortvest CMS in action?</p>
              <p className="mt-1 text-body-sm text-black/55">
                Explore the full overview — screenshots, modules, and how it works.
              </p>
            </div>
            <Link
              href="/cms"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black/85">
              Explore Ortvest CMS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
