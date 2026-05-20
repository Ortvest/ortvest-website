'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Container, SectionReveal } from '@shared/components';

import type { CaseItem } from '@modules/Cases/data';
import { cases } from '@modules/Cases/data';
import { getCaseStudyConfig, getNextCaseSlug } from '@modules/Cases/caseStudyConfig';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const STAT_KEYS = ['projectType', 'deliverables', 'platform'] as const;
const MAX_THUMBS = 3;

type CaseStudyDetailProps = {
  caseItem: CaseItem;
};

export function CaseStudyDetail({ caseItem }: CaseStudyDetailProps) {
  const locale = useLocale();
  const studyId = caseItem.id;
  const config = getCaseStudyConfig(studyId);

  const t = useTranslations(`caseStudies.${studyId}`);
  const tShared = useTranslations('caseStudies.shared');
  const tDetail = useTranslations('caseDetail');
  const tHero = useTranslations('hero');
  const tCases = useTranslations('cases');

  const [activeThumb, setActiveThumb] = useState<number | null>(null);

  const mainImage = caseItem.coverImage ?? caseItem.preview ?? '';
  const thumbImages = caseItem.images ?? [];
  const heroImage = activeThumb !== null ? (thumbImages[activeThumb] ?? mainImage) : mainImage;

  const nextSlug = getNextCaseSlug(studyId);
  const nextCaseItem = cases.find((c) => c.id === nextSlug);

  const hasSections = (caseItem.sections?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/[0.08] py-6">
        <Container>
          <Link
            href={`/${locale}/#cases`}
            className="inline-flex items-center gap-2 text-sm font-medium text-black/60 transition hover:text-black">
            <ArrowLeft className="h-4 w-4" />
            {tDetail('backToCases')}
          </Link>
        </Container>
      </header>

      {/* Hero */}
      <section className="section-padding pb-8">
        <Container>
          <SectionReveal direction="right">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {caseItem.serviceTags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-black/55">
                  {tCases(`categoryBadge.${tag}`)}
                </span>
              ))}
              {caseItem.industries?.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-black/55">
                  {tHero(`nicheTags.${industry}`)}
                </span>
              ))}
              {caseItem.isNDA && (
                <span className="rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-xs font-medium text-black/55">
                  {tCases('ndaProtected')}
                </span>
              )}
            </div>

            <h1 className="text-display-sm font-bold text-black sm:text-display">{caseItem.title}</h1>
            <p className="mt-4 max-w-3xl text-body-lg text-black/60">{t('hero.subtitle')}</p>

            {mainImage && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-black/[0.08] shadow-card">
                <div className="relative aspect-video w-full bg-black/[0.04]">
                  <Image
                    src={heroImage}
                    alt={caseItem.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1280px) 100vw, 1200px"
                  />
                </div>
              </div>
            )}

            {thumbImages.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {thumbImages.slice(0, MAX_THUMBS).map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveThumb(index)}
                    className={`relative aspect-video overflow-hidden rounded-xl border transition ${
                      activeThumb === index
                        ? 'border-accent ring-2 ring-accent/30'
                        : 'border-black/10 opacity-80 hover:opacity-100'
                    }`}>
                    <Image src={img} alt="" fill className="object-cover" sizes="33vw" />
                  </button>
                ))}
              </div>
            )}
          </SectionReveal>
        </Container>
      </section>

      {/* Stats bar */}
      <section className="border-y border-black/[0.06] bg-black/[0.02] py-10">
        <Container>
          <SectionReveal direction="left">
            <div className="grid gap-4 sm:grid-cols-3">
              {STAT_KEYS.map((key) => (
                <div
                  key={key}
                  className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-black/45">
                    {t(`stats.${key}.label`)}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-black">{t(`stats.${key}.value`)}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Challenge + Solution */}
      <section className="section-padding">
        <Container>
          <SectionReveal direction="right">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-h3 text-black">{tDetail('challenge')}</h2>
                <p className="mt-4 text-body leading-relaxed text-black/70">{t('challenge')}</p>
              </div>
              <div>
                <h2 className="text-h3 text-black">{tDetail('solution')}</h2>
                <p className="mt-4 text-body leading-relaxed text-black/70">{t('solution')}</p>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Project sections */}
      {hasSections && !caseItem.isNDA && (
        <section className="section-padding border-t border-black/[0.06]">
          <Container>
            {caseItem.sections!.map((section, index) => (
              <SectionReveal key={section.id} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div>
                  <div className="flex items-baseline gap-4 pt-16">
                    <span className="text-xs font-bold tracking-widest text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-h2 text-black">{t(`sections.${section.id}.title`)}</h2>
                  </div>
                  <p className="mt-6 max-w-3xl text-body leading-relaxed text-black/70">
                    {t(`sections.${section.id}.description`)}
                  </p>
                  {section.images && section.images.length > 0 && (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {section.images.map((img, i) => (
                        <div
                          key={`${img}-${i}`}
                          className="relative aspect-video overflow-hidden rounded-2xl border border-black/[0.08]">
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {index < caseItem.sections!.length - 1 && (
                  <div
                    style={{ position: 'relative', textAlign: 'center', margin: '48px 0' }}>
                    <hr style={{ border: 'none', borderTop: '0.5px solid var(--color-border-tertiary)' }} />
                    <span
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'var(--color-background-primary)',
                        padding: '0 12px',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        color: 'var(--color-text-tertiary)',
                      }}>
                      {String(index + 2).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </SectionReveal>
            ))}
          </Container>
        </section>
      )}

      {/* Result */}
      {!caseItem.isNDA && (
        <section className="border-t border-black/[0.06] py-12">
          <Container>
            <SectionReveal direction="left">
              <blockquote className="border-l-2 border-accent pl-6">
                <p className="text-body-lg font-medium leading-relaxed text-black/80">
                  {tCases(`items.${studyId}.result`)}
                </p>
              </blockquote>
            </SectionReveal>
          </Container>
        </section>
      )}

      {/* NDA block */}
      {caseItem.isNDA && (
        <section className="section-padding border-t border-black/[0.06]">
          <Container>
            <SectionReveal direction="left">
              <div className="rounded-2xl border border-black/10 bg-black/[0.02] px-6 py-8 text-center">
                <p className="text-body text-black/65">{tDetail('ndaText')}</p>
                <Link
                  href={`/${locale}/#contact`}
                  className="mt-5 inline-flex rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-black/85">
                  {tDetail('bookCall')}
                </Link>
              </div>
            </SectionReveal>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding border-t border-black/[0.06]">
        <Container>
          <SectionReveal direction="left">
            <div className="rounded-2xl bg-black px-8 py-12 text-center sm:px-12 sm:py-14">
              <h2 className="text-h2 text-white">{tShared(`cta.${config.ctaTemplate}.title`)}</h2>
              <p className="mx-auto mt-3 max-w-lg text-body text-white/65">
                {tShared(`cta.${config.ctaTemplate}.subtitle`)}
              </p>
              <Link
                href={`/${locale}/#contact`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-accent-dark">
                {tShared(`cta.${config.ctaTemplate}.button`)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Next case */}
      {nextCaseItem && !nextCaseItem.isNDA && (
        <section className="border-t border-black/[0.08] py-12">
          <Container>
            <Link
              href={`/${locale}/cases/${nextSlug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-black/[0.08] p-6 transition hover:border-black/20 hover:shadow-card sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-black/45">
                  {tShared('nextCase.label')}
                </p>
                <p className="mt-2 text-h3 text-black group-hover:text-black/80">{nextCaseItem.title}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {nextCaseItem.industries?.map((industry) => (
                    <span
                      key={industry}
                      className="rounded-full border border-black/10 px-2.5 py-0.5 text-xs text-black/55">
                      {tHero(`nicheTags.${industry}`)}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-black/40 transition group-hover:translate-x-1 group-hover:text-black" />
            </Link>
          </Container>
        </section>
      )}
    </div>
  );
}
