'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { sectionIds } from '@shared/enums/SectionID.enums';

import { LangSwitch } from '@modules/Header/features/LangSwitch';

const navKeys = ['about', 'services', 'process', 'technologies', 'cases', 'faq', 'contact'] as const;

export function Navigation() {
  const t = useTranslations('nav');

  return (
    <nav className="flex items-center gap-5" aria-label="Main navigation">
      <ul className="flex items-center gap-5">
        {navKeys.map((key) => (
          <li key={key}>
            <Link
              href={sectionIds[key as keyof typeof sectionIds]}
              className="text-body-sm font-medium text-black/70 transition hover:text-black">
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
      <LangSwitch />
    </nav>
  );
}
