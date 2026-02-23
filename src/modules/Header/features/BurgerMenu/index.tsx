'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { sectionIds } from '@shared/enums/SectionID.enums';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { UISlice } from '@global/store/slices/UISlice';
import { EASE } from '@lib/motion';
import { LangSwitch } from '@modules/Header/features/LangSwitch';
import AppIconHorizontal from '@public/icons/AppLogoHorizontal.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const navKeys = ['about', 'services', 'process', 'technologies', 'cases', 'faq', 'contact'] as const;

export function BurgerMenu() {
  const t = useTranslations('nav');
  const dispatch = useAppDispatch();
  const { isBurgerOpened } = useAppSelector((state) => state.UIReducer);
  const closeMenu = () => dispatch(UISlice.actions.setIsBurgerOpened(false));

  useEffect(() => {
    if (!isBurgerOpened) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, [isBurgerOpened]);

  const menu = (
    <AnimatePresence>
      {isBurgerOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-white md:hidden"
          style={{ top: 0, left: 0, right: 0, bottom: 0, minHeight: '100dvh' }}>
          {/* Close button - fixed top right */}
          <button
            type="button"
            onClick={closeMenu}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-black/5"
            aria-label="Close menu">
            <X className="h-5 w-5 text-black" strokeWidth={2} />
          </button>

          <nav className="container-main flex flex-1 flex-col gap-1 pb-6 pt-20" aria-label="Mobile navigation">
            {navKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3, ease: EASE }}>
                <Link
                  href={sectionIds[key as keyof typeof sectionIds]}
                  className="block rounded-lg px-3 py-3 text-lg font-medium text-black transition hover:bg-black/[0.04]"
                  onClick={closeMenu}>
                  {t(key)}
                </Link>
              </motion.div>
            ))}
            <div className="mt-4 border-t border-black/[0.06] pt-4 px-3">
              <LangSwitch />
            </div>

            {/* Logo + slogan at bottom */}
            <div className="mt-auto border-t border-black/[0.06] pt-6">
              <Link href="#hero" onClick={closeMenu} className="block">
                <Image
                  src={AppIconHorizontal}
                  alt="Ortvest"
                  width={150}
                  height={40}
                  className="h-10 w-auto object-contain opacity-90"
                />
              </Link>
              <p className="mt-2 text-sm font-medium tracking-wide text-black/50">{t('menuSlogan')}</p>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(menu, document.body);
}
