'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { sectionIds } from '@shared/enums/SectionID.enums';

import { LangSwitch } from '@modules/Header/features/LangSwitch';

const navOrder = ['about', 'services', 'process', 'technologies', 'blog', 'cases', 'faq', 'contact'] as const;

export function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();

  return (
    <nav className="flex items-center gap-5" aria-label="Main navigation">
      <ul className="flex items-center gap-5">
        {navOrder.map((key) => (
          <li key={key}>
            {key === 'blog' ? (
              <Link
                href={`/${locale}/blog`}
                className="text-body-sm font-medium text-black/70 transition hover:text-black">
                {t('blog')}
              </Link>
            ) : (
              <Link
                href={sectionIds[key as keyof typeof sectionIds]}
                className="text-body-sm font-medium text-black/70 transition hover:text-black">
                {t(key)}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <LangSwitch />
    </nav>
  );
}
