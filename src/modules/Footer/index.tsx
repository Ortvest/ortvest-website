'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Divider } from '@shared/components';

import { LangSwitch } from '@modules/Header/features/LangSwitch';
import AppLogo from '@public/icons/AppLogoHorizontal.svg';
import { IconArrowUpRight } from '@tabler/icons-react';

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
            <Link href="#contact" className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-zinc-950">
              {t('getInTouch')}
              <IconArrowUpRight size={14} stroke={1.75} aria-hidden />
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
            <Link
              href="#contact"
              className="group mt-3 inline-flex items-center gap-1 text-body-sm font-medium text-black transition hover:text-accent-dark">
              {t('getInTouch')}
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-100 pt-6 md:container-main md:mx-auto">
          <p className="text-center text-body-sm text-black/50">
            Ortvest sp. z o.o. &nbsp;|&nbsp; NIP: 7812111756 &nbsp;|&nbsp; KRS: 0001244461
          </p>
          <p className="mt-1 text-center text-body-sm text-black/50">
            ul. Szamarzewskiego 21/2, Poznan, Poland
          </p>
        </div>
      </div>
    </footer>
  );
}
