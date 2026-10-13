'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { DURATION, EASE } from '@lib/motion';
import { findServicePage, servicePath } from '@modules/Services/servicePages';
import { IconArrowRight } from '@tabler/icons-react';
import { AnimatePresence, m } from 'framer-motion';

type TabKey = 'design' | 'web' | 'mobile' | 'mvp' | 'fix';

const TAB_ORDER: TabKey[] = ['design', 'web', 'mobile', 'mvp', 'fix'];

/** Only tabs with a real, locale-available /services/[slug] page link there; the rest fall back to #contact. */
const TAB_SLUGS: Partial<Record<TabKey, string>> = {
  mobile: 'mobile-app-development',
  mvp: 'mvp-development',
};

function tabHref(locale: string, key: TabKey): string {
  const slug = TAB_SLUGS[key];
  if (slug) {
    const page = findServicePage(slug);
    if (page?.locales.includes(locale)) {
      return `/${locale}${servicePath(locale, slug)}`;
    }
  }
  return '#contact';
}

export function ServiceLinksStrip({ locale }: { locale: string }) {
  const t = useTranslations('servicesStrip');
  const [activeTab, setActiveTab] = useState<TabKey>('design');
  const activeIndex = TAB_ORDER.indexOf(activeTab);

  const renderWord = (key: TabKey) => (chunks: ReactNode) => (
    <button
      type="button"
      onClick={() => setActiveTab(key)}
      className={`mx-0.5 inline-block px-2 font-extrabold transition-colors duration-300 ${
        activeTab === key
          ? 'rounded-md bg-accent text-black'
          : 'border-b-[3px] border-black/15 text-black hover:border-black/40'
      }`}>
      {chunks}
    </button>
  );

  const title = t(`tabs.${activeTab}.title`);
  const items = t.raw(`tabs.${activeTab}.items`) as string[];
  const seenIn = t.raw(`tabs.${activeTab}.seenIn`) as string[];

  return (
    <section className="border-t border-black/[0.08] bg-white py-16" aria-labelledby="services-strip-heading">
      <div className="container-main">
        <div className="mb-8 flex items-start justify-between gap-6">
          <p className="text-[10px] uppercase tracking-widest text-black/40">{t('eyebrow')}</p>
          <p className="hidden font-mono text-xs text-black/35 sm:block">{t('hint')}</p>
        </div>

        <h2 id="services-strip-heading" className="text-h1 font-extrabold leading-[1.2] text-black">
          {t.rich('headline', {
            design: renderWord('design'),
            web: renderWord('web'),
            mobile: renderWord('mobile'),
            mvp: renderWord('mvp'),
            fix: renderWord('fix'),
          })}
        </h2>

        <div className="mt-10 overflow-hidden border-t border-black/[0.08] pt-8">
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: DURATION.normal, ease: EASE }}
              className="grid gap-8 lg:grid-cols-[160px_1fr_220px] lg:gap-16">
              <div>
                <p className="font-mono text-xs text-black/40">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(TAB_ORDER.length).padStart(2, '0')}
                </p>
                <h3 className="mt-2 text-h3 text-black">{title}</h3>
              </div>

              <div>
                <p className="max-w-md text-body-sm leading-relaxed text-black/60">{t(`tabs.${activeTab}.desc`)}</p>
                <ul className="mt-5 divide-y divide-black/[0.06] border-t border-black/[0.06]">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 py-3 text-body-sm text-black/70">
                      <span className="text-accent-dark">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-black/40">{t('seenInLabel')}</p>
                <p className="mt-2 text-body-sm text-black/70">{seenIn.join(', ')}</p>

                <a
                  href={tabHref(locale, activeTab)}
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3
                    text-body-sm font-semibold text-white transition hover:bg-black/85">
                  {title} {t('ctaSuffix')}
                  <IconArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        <p className="mt-10 text-body-sm text-black/45">{t('mostlyFor')}</p>
      </div>
    </section>
  );
}
