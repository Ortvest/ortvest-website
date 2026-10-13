'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { Container, Divider } from '@shared/components';

import { CLUTCH_COMPACT_WIDGET_HEIGHT, CLUTCH_COMPACT_WIDGET_TYPE, CLUTCH_COMPANY_ID } from '@lib/clutch';
import { servicePagesForLocale, servicePath } from '@modules/Services/servicePages';
import AppLogo from '@public/icons/AppLogo.svg';

import { ClutchWidget } from '../../components/ClutchWidget';

/**
 * Visible NAP (name / address / phone). These strings must stay identical to
 * CONTACT in `@lib/schema` and to the Google Business Profile listing —
 * a formatting mismatch is a common reason Google fails to merge the entity.
 */
const CONTACT_PHONE = '+48 731 728 031';
const CONTACT_PHONE_HREF = 'tel:+48731728031';
const CONTACT_ADDRESS_LINE_1 = 'ul. Augustyna Szamarzewskiego 21/2,';
const CONTACT_ADDRESS_LINE_2 = '60-514 Poznań, Poland';

const NAV_COLUMN_1 = [
  { key: 'about', href: '#about' },
  { key: 'team', href: '#team' },
  { key: 'services', href: '#services' }, // replaced by /services where those pages exist
  { key: 'faq', href: '#faq' },
] as const;

const NAV_COLUMN_2 = [
  { key: 'cases', href: '#cases' },
  { key: 'blog', href: 'blog' as const },
  { key: 'partnership', href: 'partnership' as const },
  { key: 'contact', href: '#contact' },
] as const;

const SERVICE_LINK_KEYS = [
  'website',
  'webService',
  'mobileApp',
  'mvpDevelopment',
  'improvingExisting',
  'design',
] as const;

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
  { code: 'ua', label: 'UA' },
] as const;

function FooterLangSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('footer');

  const handleSelect = (newLocale: string) => {
    if (newLocale === locale) return;
    const base = pathname?.replace(/^\/(en|ua|pl)/, '') || '';
    const path = base && base !== '/' ? base : '';
    router.push(path ? `/${newLocale}${path}` : `/${newLocale}`);
  };

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-black/15 p-1"
      role="group"
      aria-label={t('language')}>
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => handleSelect(code)}
          aria-pressed={locale === code}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            locale === code ? 'bg-black text-white' : 'text-black/50 hover:text-black'
          }`}>
          {label}
        </button>
      ))}
    </div>
  );
}

function NavList({
  items,
  tNav,
  locale,
  hasServicePages,
}: {
  items: readonly { key: string; href: string }[];
  tNav: ReturnType<typeof useTranslations>;
  locale: string;
  hasServicePages: boolean;
}) {
  return (
    <ul className="space-y-2.5" role="list">
      {items.map(({ key, href }) => (
        <li key={key}>
          <Link
            href={
              href === 'blog' || href === 'partnership'
                ? `/${locale}/${href}`
                : key === 'services' && hasServicePages
                  ? `/${locale}${servicePath(locale)}`
                  : `/${locale}${href}`
            }
            className="text-body-sm text-black/70 transition hover:text-black">
            {tNav(key)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const hasServicePages = servicePagesForLocale(locale).length > 0;
  const servicesHref = hasServicePages ? `/${locale}${servicePath(locale)}` : `/${locale}#services`;

  return (
    <footer className="w-full bg-white" role="contentinfo" aria-label={t('siteLabel')}>
      <Container className="pb-10 pt-16 sm:pt-20">
        <p className="font-mono text-xs text-black/40">{t('hook')}</p>
        <div className="relative mt-3 inline-block max-w-full">
          <a
            href="mailto:contact@ortvest.com"
            className="relative z-10 block break-words text-[clamp(1.75rem,7vw,5.5rem)] font-black leading-[0.95] tracking-tight text-black transition hover:text-black/80">
            contact@ortvest.com
          </a>
          <span className="absolute inset-x-[-8px] bottom-[0.08em] -z-0 h-[0.12em] bg-accent" aria-hidden />
        </div>
      </Container>

      <Divider />

      <Container className="py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Logo + description + Clutch rating */}
          <div>
            <div className="flex items-center gap-2">
              <Image src={AppLogo} alt="" width={24} height={27} className="h-6 w-auto" aria-hidden />
              <span className="text-base font-extrabold tracking-tight text-black">ORTVEST</span>
            </div>
            <p className="mt-4 max-w-[230px] text-body-sm leading-relaxed text-black/50">{t('description')}</p>
            <div className="mt-4 inline-flex items-center">
              <ClutchWidget
                widgetType={CLUTCH_COMPACT_WIDGET_TYPE}
                height={CLUTCH_COMPACT_WIDGET_HEIGHT}
                companyId={CLUTCH_COMPANY_ID}
                className="max-w-full"
              />
            </div>
          </div>

          {/* Navigation — two sub-columns */}
          <div>
            <p className="text-xs uppercase tracking-widest text-black/40">{t('nav')}</p>
            <div className="mt-4 grid grid-cols-2 gap-x-8">
              <NavList items={NAV_COLUMN_1} tNav={tNav} locale={locale} hasServicePages={hasServicePages} />
              <NavList items={NAV_COLUMN_2} tNav={tNav} locale={locale} hasServicePages={hasServicePages} />
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs uppercase tracking-widest text-black/40">{t('services')}</p>
            <ul className="mt-4 space-y-2.5" role="list">
              {SERVICE_LINK_KEYS.map((key) => (
                <li key={key}>
                  <Link href={servicesHref} className="text-body-sm text-black/70 transition hover:text-black">
                    {t(`serviceLinks.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-black/40">{t('contact')}</p>
            <a
              href={CONTACT_PHONE_HREF}
              className="mt-4 block text-body-sm font-medium text-black transition hover:text-black/70">
              {CONTACT_PHONE}
            </a>
            <address className="mt-3 not-italic text-body-sm leading-relaxed text-black/50">
              {CONTACT_ADDRESS_LINE_1}
              <br />
              {CONTACT_ADDRESS_LINE_2}
            </address>
            <div className="mt-4 flex items-center gap-4 text-body-sm font-medium text-black">
              <a
                href="https://www.linkedin.com/company/ortvest/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-black/70">
                LinkedIn ↗
              </a>
              <a
                href="https://www.instagram.com/ortvest"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-black/70">
                Instagram ↗
              </a>
            </div>
            <div className="mt-5">
              <FooterLangSwitch />
            </div>
          </div>
        </div>
      </Container>

      <Divider />

      <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-body-sm text-black/50 sm:text-left">
          © {new Date().getFullYear()} Ortvest sp. z o.o. &nbsp;·&nbsp; NIP 7812111756 &nbsp;·&nbsp; KRS 0001244461
        </p>
        <div className="flex items-center justify-center gap-4 sm:justify-end">
          <Link href={`/${locale}/privacy-policy`} className="text-body-sm text-black/50 transition hover:text-black">
            {t('privacyPolicy')}
          </Link>
          <Link href={`/${locale}/terms-of-use`} className="text-body-sm text-black/50 transition hover:text-black">
            {t('termsOfUse')}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
