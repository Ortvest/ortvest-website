'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { sectionIds } from '@shared/enums/SectionID.enums';

const navKeys = ['about', 'services', 'process', 'technologies', 'faq', 'contact'] as const;

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('notFound');
  const tNav = useTranslations('nav');

  const base = `/${locale}`;

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-16">
      <div className="container-main max-w-xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">404</p>
        <h1 className="text-h1 mb-4 text-black">{t('title')}</h1>
        <p className="mb-10 text-body text-black/60">{t('description')}</p>

        <Link
          href={base}
          className="mb-14 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
          {t('backHome')}
        </Link>

        <nav aria-label={t('nav')} className="border-t border-black/10 pt-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-black/40">{t('nav')}</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navKeys.map((key) => (
              <li key={key}>
                <Link
                  href={`${base}${sectionIds[key as keyof typeof sectionIds]}`}
                  className="text-body-sm font-medium text-black/70 transition hover:text-black">
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
