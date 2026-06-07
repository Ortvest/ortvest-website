'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { LangSwitch } from '@modules/Header/features/LangSwitch';
import { IconBuildingSkyscraper, IconChevronDown, IconCpu, IconRoute, IconStack2 } from '@tabler/icons-react';

export const servicesDropdownItems = [
  {
    key: 'what' as const,
    Icon: IconStack2,
    sublabel: 'Design, Dev & Marketing',
    href: '?tab=what#services',
  },
  {
    key: 'industries' as const,
    Icon: IconBuildingSkyscraper,
    sublabel: 'P2P, Community, Logistics…',
    href: '?tab=industries#services',
  },
  {
    key: 'process' as const,
    Icon: IconRoute,
    sublabel: 'How we work, step by step',
    href: '?tab=process#services',
  },
  {
    key: 'technologies' as const,
    Icon: IconCpu,
    sublabel: 'Our tech stack',
    href: '?tab=technologies#services',
  },
] as const;

export function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isServicesOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isServicesOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isServicesOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsServicesOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isServicesOpen]);

  return (
    <nav className="flex items-center gap-5" aria-label="Main navigation">
      <ul className="flex items-center gap-5">
        {/* About */}
        <li>
          <Link href="#about" className="text-body-sm font-medium text-black/70 transition hover:text-black">
            {t('about')}
          </Link>
        </li>

        {/* Team */}
        <li>
          <Link href="#team" className="text-body-sm font-medium text-black/70 transition hover:text-black">
            {t('team')}
          </Link>
        </li>

        {/* Services — dropdown trigger */}
        <li ref={containerRef} className="relative">
          <button
            type="button"
            aria-expanded={isServicesOpen}
            aria-haspopup="menu"
            onClick={() => setIsServicesOpen((prev) => !prev)}
            className="flex items-center gap-1 text-body-sm font-medium text-black/70 transition hover:text-black">
            {t('services')}
            <IconChevronDown
              size={14}
              className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isServicesOpen && (
            <div
              role="menu"
              className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-2xl border border-zinc-800 bg-zinc-900 p-2 shadow-xl">
              {servicesDropdownItems.map(({ key, Icon, sublabel, href }) => (
                <Link
                  key={key}
                  href={href}
                  role="menuitem"
                  onClick={() => setIsServicesOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-zinc-800">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                    <Icon size={18} className="text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t(key)}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{sublabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </li>

        {/* Cases */}
        <li>
          <Link href="#cases" className="text-body-sm font-medium text-black/70 transition hover:text-black">
            {t('cases')}
          </Link>
        </li>

        {/* Blog */}
        <li>
          <Link href={`/${locale}/blog`} className="text-body-sm font-medium text-black/70 transition hover:text-black">
            {t('blog')}
          </Link>
        </li>

        {/* FAQ */}
        <li>
          <Link href="#faq" className="text-body-sm font-medium text-black/70 transition hover:text-black">
            {t('faq')}
          </Link>
        </li>
      </ul>
      <LangSwitch />
    </nav>
  );
}
