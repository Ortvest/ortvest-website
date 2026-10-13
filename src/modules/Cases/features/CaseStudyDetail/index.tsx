'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Container, SectionReveal } from '@shared/components';

import {
  CASE_SERVICE_TAGS,
  type CaseServiceTagKey,
  SECTION_SHORT_LABEL,
  getCaseStudyConfig,
  getNextCaseSlug,
} from '@modules/Cases/caseStudyConfig';
import type { CaseItem } from '@modules/Cases/data';
import { cases } from '@modules/Cases/data';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

const PROCESS_GRID_COLS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

const SERVICE_TAG_LABEL_KEY: Record<CaseServiceTagKey, string> = {
  website: 'tabs.websites',
  webService: 'tabs.webServices',
  mobileApp: 'tabs.mobileApps',
  design: 'tabs.design',
};

type CaseStudyDetailProps = {
  caseItem: CaseItem;
};

function buildFallbackStackLine(caseItem: CaseItem): string {
  const sectionWords = (caseItem.sections ?? [])
    .map((s) => SECTION_SHORT_LABEL[s.id])
    .filter((label): label is string => Boolean(label));
  const techWords = caseItem.stack.slice(0, 2).join(' + ');
  return [...sectionWords, techWords].filter(Boolean).join(' · ');
}

export function CaseStudyDetail({ caseItem }: CaseStudyDetailProps) {
  const locale = useLocale();
  const studyId = caseItem.id;
  const config = getCaseStudyConfig(studyId);

  const t = useTranslations(`caseStudies.${studyId}`);
  const tShared = useTranslations('caseStudies.shared');
  const tDetail = useTranslations('caseDetail');
  const tHero = useTranslations('hero');
  const tCases = useTranslations('cases');

  const serviceTags = CASE_SERVICE_TAGS[studyId] ?? [];
  const images = caseItem.images ?? [];
  const mainImage = caseItem.coverImage ?? caseItem.preview ?? images[0] ?? '';
  const secondaryImage = images.find((img) => img !== mainImage);
  const featuresImage =
    images.find((img) => img !== mainImage && img !== secondaryImage) ?? secondaryImage ?? mainImage;

  const stackLine = t.has('stackLine') ? t('stackLine') : buildFallbackStackLine(caseItem);
  const problemStatement = t.has('problemStatement') ? t('problemStatement') : t('challenge');
  const approachStatement = t.has('approachStatement') ? t('approachStatement') : t('solution');
  const featuresEyebrow = t.has('features.eyebrow') ? t('features.eyebrow') : tShared('features.eyebrow');
  const featuresTitle = t.has('features.title') ? t('features.title') : tShared('features.title');
  const processTitle = t.has('processTitle') ? t('processTitle') : tShared('process.title');

  const availableFeatureKeys = config.featureKeys.filter((f) => t.has(`features.items.${f.key}.title`));

  const nextSlug = getNextCaseSlug(studyId);
  const nextCaseItem = cases.find((c) => c.id === nextSlug);
  const relatedCaseItem = caseItem.relatedCaseId ? cases.find((c) => c.id === caseItem.relatedCaseId) : undefined;

  const sections = caseItem.sections ?? [];
  const processGridClass = PROCESS_GRID_COLS[Math.min(sections.length, 4)] ?? 'lg:grid-cols-3';

  return (
    <div className="min-h-screen bg-white">
      <header className="py-6">
        <Container>
          <Link
            href={`/${locale}/cases`}
            className="inline-flex items-center gap-2 text-sm font-medium text-black/50 transition hover:text-black">
            <IconArrowLeft className="h-4 w-4" />
            {tDetail('backToCases')}
          </Link>
        </Container>
      </header>

      {/* Hero */}
      <section className="pb-16 pt-4 sm:pt-6">
        <Container>
          <SectionReveal direction="right">
            <div className="grid gap-10 lg:grid-cols-[1fr_440px] lg:items-start lg:gap-16">
              <div>
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  {caseItem.industries?.map((industry, i) => (
                    <span
                      key={industry}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        i === 0 ? 'bg-black text-white' : 'border border-black/15 text-black/70'
                      }`}>
                      {tHero(`nicheTags.${industry}`)}
                    </span>
                  ))}
                  {serviceTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/15 px-3 py-1 text-xs font-semibold text-black/70">
                      {tCases(SERVICE_TAG_LABEL_KEY[tag])}
                    </span>
                  ))}
                </div>

                <h1 className="text-display-sm font-extrabold leading-[1.05] text-black sm:text-display">
                  {caseItem.title}
                </h1>

                <p className="mt-5 max-w-xl text-body-lg leading-relaxed text-black/60">{t('hero.subtitle')}</p>

                <p className="mt-5 font-mono text-xs text-black/40">{stackLine}</p>

                {relatedCaseItem && (
                  <p className="mt-5 text-sm text-black/55">
                    {tShared('relatedProduct.label')}{' '}
                    <Link
                      href={`/${locale}/cases/${relatedCaseItem.id}`}
                      className="font-medium text-black underline-offset-2 hover:text-accent-dark hover:underline">
                      {relatedCaseItem.title}
                    </Link>
                  </p>
                )}
              </div>

              {mainImage && (
                <div className="relative mt-4 lg:mt-2">
                  <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent sm:-inset-6" aria-hidden />
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={mainImage}
                        alt={caseItem.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 440px"
                      />
                    </div>
                  </div>

                  {secondaryImage && (
                    <div className="absolute -bottom-6 -left-5 w-[42%] overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl sm:-bottom-8 sm:-left-7">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={secondaryImage}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 40vw, 180px"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Problem / approach */}
      <section className="border-t border-black/10">
        <Container>
          <SectionReveal direction="left">
            <div className="grid gap-10 py-10 sm:grid-cols-2 sm:gap-16">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-black/40">
                  {tDetail('theProblem')}
                </p>
                <p className="text-xl font-bold leading-snug text-black sm:text-2xl">{problemStatement}</p>
              </div>
              <div className="sm:border-l sm:border-black/10 sm:pl-16">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-black/40">
                  {tDetail('whatItHadToDo')}
                </p>
                <p className="text-xl font-bold leading-snug text-black sm:text-2xl">{approachStatement}</p>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Features */}
      {availableFeatureKeys.length > 0 && (
        <section className="bg-[#eef1ea] py-16 sm:py-20">
          <Container>
            <SectionReveal direction="left">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-black/40">{featuresEyebrow}</p>
              <h2 className="text-h1 font-extrabold leading-tight text-black">{featuresTitle}</h2>

              <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
                <div className="divide-y divide-black/10 border-t border-black/10">
                  {availableFeatureKeys.map((feature, index) => (
                    <div key={feature.key} className="flex items-start gap-4 py-5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black font-mono text-xs font-bold text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-bold text-black">{t(`features.items.${feature.key}.title`)}</p>
                        <p className="mt-1 text-body-sm leading-relaxed text-black/55">
                          {t(`features.items.${feature.key}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {featuresImage && (
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={featuresImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 480px"
                      />
                    </div>
                  </div>
                )}
              </div>
            </SectionReveal>
          </Container>
        </section>
      )}

      {/* Process */}
      {sections.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionReveal direction="right">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-black/40">
                {tDetail('howWeGotThere')}
              </p>
              <h2 className="text-h1 font-extrabold leading-tight text-black">{processTitle}</h2>

              <div className={`mt-10 grid gap-10 border-t border-black/10 pt-10 sm:grid-cols-2 ${processGridClass}`}>
                {sections.map((section, index) => (
                  <div key={section.id}>
                    <p className="font-mono text-xs text-black/40">{String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-h4 font-bold text-black">{t(`sections.${section.id}.title`)}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-black/55">
                      {t(`sections.${section.id}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </Container>
        </section>
      )}

      {/* CTA + next case */}
      <section className="pb-20">
        <Container>
          <SectionReveal direction="left">
            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
              <div className="flex flex-col justify-center rounded-2xl bg-black px-8 py-10 sm:px-10">
                <h2 className="text-h3 font-bold text-white">{tShared(`cta.${config.ctaTemplate}.title`)}</h2>
                <Link
                  href={`/${locale}/#contact`}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent-dark">
                  {tDetail('ctaButton')}
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {nextCaseItem && (
                <Link
                  href={`/${locale}/cases/${nextSlug}`}
                  className="group flex flex-col justify-center rounded-2xl bg-[#eef1ea] px-8 py-10 transition hover:bg-[#e7ebe0]">
                  <p className="font-mono text-xs uppercase tracking-widest text-black/40">
                    {tShared('nextCase.label')}
                    {nextCaseItem.industries?.[0] && ` · ${tHero(`nicheTags.${nextCaseItem.industries[0]}`)}`}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-h3 font-bold text-black">
                    {nextCaseItem.title}
                    <IconArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
                  </p>
                </Link>
              )}
            </div>
          </SectionReveal>
        </Container>
      </section>
    </div>
  );
}
