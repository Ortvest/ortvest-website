'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Divider } from '@shared/components';

import { LangSwitch } from '@modules/Header/features/LangSwitch';
import AppLogo from '@public/icons/AppLogoHorizontal.svg';

const footerNavItems = [
  { key: 'about', href: '#about' },
  { key: 'team', href: '#team' },
  { key: 'services', href: '#services' },
  { key: 'cases', href: '#cases' },
  { key: 'blog', href: 'blog' as const },
  { key: 'faq', href: '#faq' },
] as const;

const mobileNavOrder: Record<(typeof footerNavItems)[number]['key'], string> = {
  about: 'order-1',
  cases: 'order-2',
  team: 'order-3',
  blog: 'order-4',
  services: 'order-5',
  faq: 'order-6',
};

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer className="w-full bg-white" role="contentinfo" aria-label="Site footer">
      <Divider />

      <div className="w-full px-5 py-10 sm:px-6 sm:py-12 md:px-0">
        <div className="grid w-full gap-8 sm:grid-cols-2 md:container-main md:mx-auto lg:grid-cols-4">
          {/* Logo + copyright */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex w-full justify-center sm:justify-start">
              <Image src={AppLogo} alt="Ortvest" width={150} height={40} className="h-10 w-auto" />
            </div>
            <p className="mt-3 text-center text-body-sm text-black/50 sm:text-left">
              © {new Date().getFullYear()} Ortvest
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
              <Link
                href={`/${locale}/privacy-policy`}
                className="text-body-sm text-gray-400 hover:text-black transition-colors">
                {t('privacyPolicy')}
              </Link>
              <Link
                href={`/${locale}/terms-of-use`}
                className="text-body-sm text-gray-400 hover:text-black transition-colors">
                {t('termsOfUse')}
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center sm:block">
            <h3 className="hidden text-xs font-semibold uppercase tracking-widest text-black/40 sm:block">
              {t('nav')}
            </h3>
            <ul
              className="grid w-fit grid-cols-2 gap-x-10 gap-y-1 sm:mt-3 sm:w-full sm:flex sm:flex-col sm:space-y-2"
              role="list">
              {footerNavItems.map(({ key, href }) => (
                <li key={key} className={`${mobileNavOrder[key]} sm:order-none`}>
                  <Link
                    href={href === 'blog' ? `/${locale}/blog` : href}
                    className="block py-1.5 text-[14px] text-zinc-950 sm:py-0 sm:text-body-sm sm:text-black/70 sm:transition sm:hover:text-black">
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: language + contact row */}
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-100 pt-4 sm:hidden">
            <div className="[&_button]:flex [&_button]:h-auto [&_button]:min-h-0 [&_button]:min-w-0 [&_button]:cursor-pointer [&_button]:items-center [&_button]:gap-1.5 [&_button]:rounded-lg [&_button]:border-zinc-200 [&_button]:px-2.5 [&_button]:py-1.5 [&_button]:text-[13px] [&_button]:text-zinc-950 [&_button]:focus:ring-0 [&_button]:focus:ring-offset-0">
              <LangSwitch />
            </div>
            <div className="h-5 w-px shrink-0 bg-zinc-200" aria-hidden />
            <Link
              href="mailto:contact@ortvest.com"
              className="flex shrink-0 items-center text-[13px] font-medium text-zinc-950">
              contact@ortvest.com
            </Link>
          </div>

          {/* Language */}
          <div className="hidden sm:block">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-black/40">{t('language')}</h3>
            <div className="mt-3">
              <LangSwitch />
            </div>
          </div>

          {/* Contact CTA */}
          <div className="hidden sm:block">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-black/40">{t('contact')}</h3>
            <a
              href="mailto:contact@ortvest.com"
              className="group mt-3 inline-flex text-body-sm font-medium text-black transition hover:text-black/70">
              contact@ortvest.com
            </a>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/ortvest/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-black/40 transition-colors hover:text-black">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ortvest"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-black/40 transition-colors hover:text-black">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-100 pt-6 md:container-main md:mx-auto">
          <p className="text-center text-body-sm text-black/50">
            Ortvest sp. z o.o. &nbsp;|&nbsp; NIP: 7812111756 &nbsp;|&nbsp; KRS: 0001244461
          </p>
          <p className="mt-1 text-center text-body-sm text-black/50">ul. Szamarzewskiego 21/2, Poznan, Poland</p>
        </div>
      </div>
    </footer>
  );
}
