'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Container } from '@shared/components';
import type { CaseItem } from '@modules/Cases/data';

import { ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE } from '@lib/motion';

interface CaseDetailProps {
  caseItem: CaseItem;
}

export function CaseDetail({ caseItem }: CaseDetailProps) {
  const t = useTranslations('caseDetail');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const categoryLabel =
    caseItem.category === 'designAndDevelopment'
      ? `${t('category.design')} + ${t('category.development')}`
      : t(`category.${caseItem.category}`);

  const hasImages = caseItem.images && caseItem.images.length > 0;
  const displayImages = hasImages
    ? caseItem.images!
    : [caseItem.preview || '/images/cases/placeholder-dev.jpg'];
  const isLogoCase = caseItem.designSubcategory === 'logo';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/[0.08] py-6">
        <Container>
          <Link
            href="/#cases"
            className="inline-flex items-center gap-2 text-sm font-medium text-black/60 transition hover:text-black">
            <ArrowLeft className="h-4 w-4" />
            {t('backToCases')}
          </Link>
        </Container>
      </header>

      {/* Hero section */}
      <section className="section-padding">
        <Container>
          <div className="mb-6 flex items-center gap-2">
            {caseItem.isNDA && (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60">
                <Lock className="h-3 w-3" />
                NDA
              </span>
            )}
            {caseItem.inProgress && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-black/70">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                {t('inProgress')}
              </span>
            )}
            <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60">
              {categoryLabel}
            </span>
          </div>

          {caseItem.logo && (
            <div className="mb-6">
              <Image
                src={caseItem.logo}
                alt={caseItem.title}
                width={120}
                height={48}
                className="h-12 w-auto object-contain opacity-80"
              />
            </div>
          )}

          <h1 className="text-h1 mb-4 text-black">{caseItem.title}</h1>

          {caseItem.url && !caseItem.isNDA && (
            <a
              href={caseItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-black/60 transition hover:text-accent-dark">
              {t('visitWebsite')}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          {caseItem.designer && (
            <p className="mb-8 text-sm text-black/50">
              {t('designBy')}{' '}
              <a
                href={caseItem.designer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-black/70 transition hover:text-accent-dark">
                {caseItem.designer.name}
              </a>
            </p>
          )}
        </Container>
      </section>

      {/* Image gallery - Logo cases use grid, others use slider */}
      <section className="section-padding bg-black/[0.02] pt-0">
        <Container>
          {isLogoCase ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                  className="group relative overflow-hidden rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.25)] transition-all hover:shadow-[0_32px_80px_-40px_rgba(0,0,0,0.35)]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={img}
                      alt={`${caseItem.title} - ${index + 1}`}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      priority={index === 0}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <>
              <div className="relative overflow-hidden rounded-3xl border border-black/[0.08] bg-gradient-to-b from-white to-black/[0.02] p-2 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.45)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="relative aspect-video w-full overflow-hidden rounded-2xl">
                    <Image
                      src={displayImages[activeImageIndex]}
                      alt={`${caseItem.title} - ${activeImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority={activeImageIndex === 0}
                    />
                    {displayImages.length > 1 && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
                    )}
                  </motion.div>
                </AnimatePresence>

                {displayImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
                      }
                      className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:bg-white active:scale-95"
                      aria-label="Previous image">
                      <ArrowLeft className="h-5 w-5 text-black" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
                      }
                      className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:bg-white active:scale-95"
                      aria-label="Next image">
                      <ArrowLeft className="h-5 w-5 rotate-180 text-black" />
                    </button>

                    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 backdrop-blur-md">
                      {displayImages.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          className={`h-2.5 rounded-full transition-all ${
                            index === activeImageIndex
                              ? 'w-7 bg-white shadow-sm shadow-white/50'
                              : 'w-2.5 bg-white/45 hover:bg-white/70'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {hasImages && (
                <div className="mt-8 rounded-2xl bg-white/70 p-3 ring-1 ring-black/[0.06] backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
                    {caseItem.images!.map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`group relative aspect-[4/3] overflow-hidden rounded-xl border transition-all duration-200 ${
                          index === activeImageIndex
                            ? 'scale-[1.02] border-accent ring-2 ring-accent/40 shadow-lg opacity-100'
                            : 'border-black/10 opacity-70 hover:-translate-y-0.5 hover:opacity-100'
                        }`}>
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* Details */}
      <section className="section-padding">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-h3 mb-4 text-black">{t('overview')}</h2>
              <p className="text-body text-black/70">{caseItem.fullDescription}</p>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-h4 mb-2 text-black">{t('challenge')}</h3>
                  <p className="text-body text-black/70">{caseItem.challenge}</p>
                </div>

                <div>
                  <h3 className="text-h4 mb-2 text-black">{t('solution')}</h3>
                  <p className="text-body text-black/70">{caseItem.solution}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-card">
                <h3 className="text-h4 mb-4 text-black">{t('techStack')}</h3>
                <div className="flex flex-wrap gap-2">
                  {caseItem.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-black/[0.04] px-3 py-2 text-sm text-black/70">
                      {tech}
                    </span>
                  ))}
                </div>

                {caseItem.isNDA && (
                  <div className="mt-6 border-t border-black/[0.06] pt-6">
                    <p className="mb-3 text-sm text-black/60">{t('ndaText')}</p>
                    <a
                      href="/#contact"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
                      {t('bookCall')}
                    </a>
                  </div>
                )}

                {caseItem.url && !caseItem.isNDA && (
                  <div className="mt-6 border-t border-black/[0.06] pt-6">
                    <a
                      href={caseItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
                      {t('visitWebsite')}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black/[0.02]">
        <Container>
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center sm:p-12">
            <h2 className="text-h3 mb-3 text-black">{t('ctaTitle')}</h2>
            <p className="mb-6 text-body text-black/70">{t('ctaText')}</p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-black/90">
              {t('ctaButton')}
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
