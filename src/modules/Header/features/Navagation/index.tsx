'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { LangSwitch } from '@modules/Header/features/LangSwitch';
import { serviceIcon } from '@modules/Services/serviceIcons';
import { servicePagesForLocale, servicePath } from '@modules/Services/servicePages';
import { IconChevronDown, type IconProps } from '@tabler/icons-react';

type DropdownIcon = React.ComponentType<IconProps>;

export type ServicesDropdownItem = {
  key: string;
  Icon: DropdownIcon;
  /** Resolved against the `nav` namespace. */
  labelKey: string;
  sublabelKey: string;
  /** Appended to `/{locale}`. */
  href: string;
};

/**
 * Real /services/<slug> pages where they exist. Locales without translated
 * service copy get no dropdown at all — the nav entry links to the home-page
 * section instead.
 */
export function getServicesDropdownItems(locale: string): ServicesDropdownItem[] {
  return servicePagesForLocale(locale).map((page) => ({
    key: page.slug,
    Icon: serviceIcon(page.slug),
    labelKey: `servicePages.${page.slug}.label`,
    sublabelKey: `servicePages.${page.slug}.sublabel`,
    href: servicePath(locale, page.slug),
  }));
}

export function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const dropdownItems = getServicesDropdownItems(locale);
  const hasServicePages = servicePagesForLocale(locale).length > 0;

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
    <nav className="flex items-center gap-5" aria-label={t('mainNavigation')}>
      <ul className="flex items-center gap-5">
        {/* About */}
        <li>
          <Link
            href={`/${locale}#about`}
            className="text-body-sm font-medium text-black/70 transition hover:text-black">
            {t('about')}
          </Link>
        </li>

        {/* Team */}
        <li>
          <Link href={`/${locale}#team`} className="text-body-sm font-medium text-black/70 transition hover:text-black">
            {t('team')}
          </Link>
        </li>

        {/* Services – link to the index, with a dropdown for the individual pages */}
        <li ref={containerRef} className="relative">
          <div className="flex items-center gap-1">
            <Link
              href={hasServicePages ? `/${locale}${servicePath(locale)}` : `/${locale}#services`}
              className="text-body-sm font-medium text-black/70 transition hover:text-black">
              {t('services')}
            </Link>
            {hasServicePages && (
              <button
                type="button"
                aria-expanded={isServicesOpen}
                aria-haspopup="menu"
                aria-label={t('services')}
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className="flex items-center text-black/70 transition hover:text-black">
                <IconChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>

          {isServicesOpen && hasServicePages && (
            <div
              role="menu"
              className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-2xl border border-zinc-800 bg-zinc-900 p-2 shadow-xl">
              {dropdownItems.map(({ key, Icon, labelKey, sublabelKey, href }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  role="menuitem"
                  onClick={() => setIsServicesOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-zinc-800">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                    <Icon size={18} className="text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t(labelKey)}</p>
                    <p className="mt-0.5 text-xs text-zinc-400">{t(sublabelKey)}</p>
                  </div>
                </Link>
              ))}
              {hasServicePages && (
                <Link
                  href={`/${locale}${servicePath(locale)}`}
                  role="menuitem"
                  onClick={() => setIsServicesOpen(false)}
                  className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-medium text-accent transition hover:bg-zinc-800">
                  {t('servicesAll')}
                </Link>
              )}
            </div>
          )}
        </li>

        {/* Cases */}
        <li>
          <Link
            href={`/${locale}/cases`}
            className="text-body-sm font-medium text-black/70 transition hover:text-black">
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
          <Link href={`/${locale}#faq`} className="text-body-sm font-medium text-black/70 transition hover:text-black">
            {t('faq')}
          </Link>
        </li>
      </ul>
      <LangSwitch />
    </nav>
  );
}
