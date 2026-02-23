'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Container, SectionHeader, SectionReveal } from '@shared/components';
import { cases } from './data';

import { Briefcase, Lock, Palette, Code, Megaphone, ArrowRight } from 'lucide-react';

export function Cases() {
  const t = useTranslations('cases');
  const [activeFilter, setActiveFilter] = useState<'design' | 'development' | 'all'>('all');
  const [hideNDA, setHideNDA] = useState(false);
  const [designSubfilter, setDesignSubfilter] = useState<'all' | 'logo' | 'web' | 'brand'>('all');
  const [devSubfilter, setDevSubfilter] = useState<'all' | 'web' | 'mobile'>('all');
  const [allSubfilter, setAllSubfilter] = useState<'all' | 'logo' | 'web' | 'brand' | 'mobile'>(
    'all',
  );

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'design':
        return {
          label: t('categoryBadge.design'),
          icon: Palette,
          className: 'bg-accent text-black',
        };
      case 'development':
        return {
          label: t('categoryBadge.development'),
          icon: Code,
          className: 'bg-black text-white',
        };
      case 'designAndDevelopment':
        return {
          label: t('categoryBadge.designAndDevelopment'),
          icon: null,
          className: 'bg-accent text-black',
        };
      case 'marketing':
        return {
          label: t('categoryBadge.marketing'),
          icon: Megaphone,
          className: 'bg-accent text-black',
        };
      default:
        return null;
    }
  };

  let filteredCases =
    activeFilter === 'all'
      ? cases
      : cases.filter(
          (c) => c.category === activeFilter || c.category === 'designAndDevelopment',
        );

  if (hideNDA) {
    filteredCases = filteredCases.filter((c) => !c.isNDA);
  }

  if (activeFilter === 'all' && allSubfilter !== 'all') {
    if (allSubfilter === 'logo' || allSubfilter === 'brand') {
      filteredCases = filteredCases.filter((c) => c.designSubcategory === allSubfilter);
    } else if (allSubfilter === 'web') {
      filteredCases = filteredCases.filter(
        (c) => c.designSubcategory === 'web' || c.developmentSubcategory === 'web',
      );
    } else if (allSubfilter === 'mobile') {
      filteredCases = filteredCases.filter((c) => c.developmentSubcategory === 'mobile');
    }
  }

  if (activeFilter === 'design' && designSubfilter !== 'all') {
    filteredCases = filteredCases.filter((c) => c.designSubcategory === designSubfilter);
  }

  if (activeFilter === 'development' && devSubfilter !== 'all') {
    filteredCases = filteredCases.filter((c) => c.developmentSubcategory === devSubfilter);
  }

  return (
    <section id="cases" className="section-padding bg-white" aria-labelledby="cases-heading">
      <Container>
        <SectionReveal direction="left">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('subtitle')}
            icon={Briefcase}
            className="mb-8"
          />

          {/* NDA banner */}
          <div className="mb-10 rounded-2xl border border-accent/20 bg-accent/5 p-5 sm:p-6">
            <p className="text-body-sm text-black/70">{t('ndaBanner')}</p>
          </div>

          {/* Filter */}
          <div className="mb-8 space-y-3">
            {/* Main filters */}
            <div className="flex flex-wrap items-center gap-2">
              {(['all', 'design', 'development'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter);
                    setDesignSubfilter('all');
                    setDevSubfilter('all');
                    setAllSubfilter('all');
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? 'bg-black text-white'
                      : 'bg-black/5 text-black/70 hover:bg-black/10'
                  }`}>
                  {t(`filter.${filter}`)}
                </button>
              ))}
              
              {/* Divider */}
              <div className="h-6 w-px bg-black/10" />
              
              {/* Hide NDA toggle switch */}
              <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-black/5 px-4 py-2 transition hover:bg-black/10">
                <Lock className="h-3.5 w-3.5 text-black/70" />
                <span className="text-sm font-medium text-black/70">{t('hideNDA')}</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={hideNDA}
                    onChange={(e) => setHideNDA(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-5 w-9 rounded-full bg-black/10 transition peer-checked:bg-accent"></div>
                  <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-4"></div>
                </div>
              </label>
            </div>

            {/* All category subfilters */}
            {activeFilter === 'all' && (
              <div className="flex flex-wrap items-center gap-2 pl-4">
                <span className="text-xs font-medium text-black/50">{t('subfilterLabel')}:</span>
                <button
                  type="button"
                  onClick={() => setAllSubfilter('all')}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    allSubfilter === 'all'
                      ? 'bg-accent text-black'
                      : 'bg-black/5 text-black/60 hover:bg-black/10'
                  }`}>
                  {t('filter.all')}
                </button>
                <button
                  type="button"
                  onClick={() => setAllSubfilter('logo')}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    allSubfilter === 'logo'
                      ? 'bg-accent text-black'
                      : 'bg-black/5 text-black/60 hover:bg-black/10'
                  }`}>
                  {t('subcategory.design.logo')}
                </button>
                <button
                  type="button"
                  onClick={() => setAllSubfilter('web')}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    allSubfilter === 'web'
                      ? 'bg-accent text-black'
                      : 'bg-black/5 text-black/60 hover:bg-black/10'
                  }`}>
                  {t('subcategory.design.web')}
                </button>
                <button
                  type="button"
                  onClick={() => setAllSubfilter('brand')}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    allSubfilter === 'brand'
                      ? 'bg-accent text-black'
                      : 'bg-black/5 text-black/60 hover:bg-black/10'
                  }`}>
                  {t('subcategory.design.brand')}
                </button>
                <button
                  type="button"
                  onClick={() => setAllSubfilter('mobile')}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    allSubfilter === 'mobile'
                      ? 'bg-accent text-black'
                      : 'bg-black/5 text-black/60 hover:bg-black/10'
                  }`}>
                  {t('subcategory.development.mobile')}
                </button>
              </div>
            )}

            {/* Design subfilters */}
            {activeFilter === 'design' && (
              <div className="flex flex-wrap items-center gap-2 pl-4">
                <span className="text-xs font-medium text-black/50">{t('subfilterLabel')}:</span>
                {(['all', 'logo', 'web', 'brand'] as const).map((subfilter) => (
                  <button
                    key={subfilter}
                    type="button"
                    onClick={() => setDesignSubfilter(subfilter)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      designSubfilter === subfilter
                        ? 'bg-accent text-black'
                        : 'bg-black/5 text-black/60 hover:bg-black/10'
                    }`}>
                    {subfilter === 'all' ? t('filter.all') : t(`subcategory.design.${subfilter}`)}
                  </button>
                ))}
              </div>
            )}

            {/* Development subfilters */}
            {activeFilter === 'development' && (
              <div className="flex flex-wrap items-center gap-2 pl-4">
                <span className="text-xs font-medium text-black/50">{t('subfilterLabel')}:</span>
                {(['all', 'web', 'mobile'] as const).map((subfilter) => (
                  <button
                    key={subfilter}
                    type="button"
                    onClick={() => setDevSubfilter(subfilter)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      devSubfilter === subfilter
                        ? 'bg-accent text-black'
                        : 'bg-black/5 text-black/60 hover:bg-black/10'
                    }`}>
                    {subfilter === 'all' ? t('filter.all') : t(`subcategory.development.${subfilter}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cases grid */}
          {filteredCases.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  href={`/cases/${caseItem.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-card transition-shadow hover:shadow-card-hover">
                {/* Preview image */}
                {caseItem.preview && (
                  <div className="relative aspect-video w-full overflow-hidden bg-black/[0.02]">
                    <Image
                      src={caseItem.preview}
                      alt={caseItem.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Category badge */}
                    {(() => {
                      const badge = getCategoryBadge(caseItem.category);
                      if (!badge) return null;
                      const Icon = badge.icon;
                      return (
                        <div className="absolute left-3 top-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg ${badge.className}`}>
                            {Icon && <Icon className="h-3.5 w-3.5" />}
                            {badge.label}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  {/* Logo */}
                  {caseItem.logo && (
                    <div className="mb-3 h-8">
                      <Image
                        src={caseItem.logo}
                        alt={caseItem.title}
                        width={80}
                        height={32}
                        className="h-8 w-auto object-contain opacity-70"
                      />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="mb-3 flex items-center gap-2">
                    {caseItem.isNDA && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1 text-xs font-medium text-black/60">
                        <Lock className="h-3 w-3" />
                        NDA
                      </span>
                    )}
                    {caseItem.inProgress && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-1 text-xs font-medium text-black/70">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                        {t('inProgress')}
                      </span>
                    )}
                  </div>

                  {/* Title - only show if no logo */}
                  {!caseItem.logo && <h3 className="text-h4 text-black">{caseItem.title}</h3>}

                  <div className="mt-3 space-y-2 text-body-sm text-black/60">
                    <p>
                      <span className="font-semibold text-black/80">{t('challenge')}:</span> {caseItem.challenge}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {caseItem.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-md bg-black/[0.04] px-2 py-1 text-xs text-black/60">
                        {tech}
                      </span>
                    ))}
                    {caseItem.stack.length > 3 && (
                      <span className="rounded-md bg-black/[0.04] px-2 py-1 text-xs text-black/60">
                        +{caseItem.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="mb-6 max-w-lg text-body-lg text-black/70">{t('emptyState')}</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
                {t('beFirstButton')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="mb-4 text-body-sm text-black/60">{t('ctaText')}</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
              {t('ctaButton')}
            </a>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
