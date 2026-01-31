'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Container, Divider } from '@shared/components';
import { sectionIds } from '@shared/enums/SectionID.enums';

import { LangSwitch } from '@modules/Header/features/LangSwitch';
import AppLogo from '@public/icons/AppLogoHorizontal.svg';
import { ArrowUpRight } from 'lucide-react';

const navKeys = ['about', 'services', 'process', 'technologies', 'faq', 'contact'] as const;

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-white" role="contentinfo" aria-label="Site footer">
      <Divider />
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + copyright */}
          <div>
            <Image src={AppLogo} alt="Ortvest" width={100} height={28} className="h-7 w-auto" />
            <p className="mt-3 text-body-sm text-black/50">© {new Date().getFullYear()} Ortvest</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-black/40">{t('nav')}</h3>
            <ul className="mt-3 space-y-2" role="list">
              {navKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={sectionIds[key as keyof typeof sectionIds]}
                    className="text-body-sm text-black/70 transition hover:text-black">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-black/40">{t('language')}</h3>
            <div className="mt-3">
              <LangSwitch />
            </div>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-black/40">{t('contact')}</h3>
            <Link
              href="#contact"
              className="mt-3 inline-flex items-center gap-1 text-body-sm font-medium text-black transition hover:text-accent-dark group">
              Get in touch
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
