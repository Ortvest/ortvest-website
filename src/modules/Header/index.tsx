'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Burger } from '@modules/Header/features/Burger';
import { BurgerMenu } from '@modules/Header/features/BurgerMenu';
import { Navigation } from '@modules/Header/features/Navagation';
import AppIcon from '@public/icons/AppLogoHorizontal.svg';
import { ArrowRight } from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      id="header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-white'
      }`}>
      <div className="container-main flex h-14 items-center justify-between sm:h-16">
        {/* Logo */}
        <Link
          href="#hero"
          className="relative z-50 flex shrink-0 transition-opacity hover:opacity-80"
          aria-label="Home">
          <Image
            src={AppIcon}
            alt="Ortvest"
            width={150}
            height={40}
            className="h-9 w-auto max-w-[160px] object-contain object-left sm:max-w-none sm:h-10"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Navigation />
          <Link
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/90">
            {t('cta')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="#contact"
            className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1.5 text-sm font-semibold text-white">
            {t('cta')}
          </Link>
          <Burger />
        </div>
      </div>
      <BurgerMenu />
    </header>
  );
}
