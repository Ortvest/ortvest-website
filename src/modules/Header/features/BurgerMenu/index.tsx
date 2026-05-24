'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { UISlice } from '@global/store/slices/UISlice';
import { EASE } from '@lib/motion';
import { LangSwitch } from '@modules/Header/features/LangSwitch';
import { servicesDropdownItems } from '@modules/Header/features/Navagation';
import AppIconHorizontal from '@public/icons/AppLogoHorizontal.svg';
import { IconChevronDown, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

// Top-level nav items — contact removed (it's the CTA button), industries/process/technologies moved under Services
const navOrder = ['about', 'team', 'services', 'cases', 'blog', 'faq'] as const;
type NavKey = (typeof navOrder)[number];

export function BurgerMenu() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { isBurgerOpened } = useAppSelector((state) => state.UIReducer);
  const closeMenu = () => dispatch(UISlice.actions.setIsBurgerOpened(false));

  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Reset services accordion whenever the menu closes
  useEffect(() => {
    if (!isBurgerOpened) setIsServicesOpen(false);
  }, [isBurgerOpened]);

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
          {/* Close button */}
          <button
            type="button"
            onClick={closeMenu}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-black/5"
            aria-label="Close menu">
            <IconX className="h-5 w-5 text-black" />
          </button>

          <nav className="container-main flex flex-1 flex-col gap-1 pb-6 pt-20" aria-label="Mobile navigation">
            {navOrder.map((key: NavKey, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3, ease: EASE }}>
                {/* Services: inline accordion */}
                {key === 'services' ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-lg font-medium text-black transition hover:bg-black/[0.04]">
                      {t('services')}
                      <IconChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1, transition: { duration: 0.25, ease: EASE } }}
                          exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: EASE } }}
                          className="overflow-hidden">
                          <div className="pb-1 pl-2">
                            {servicesDropdownItems.map(({ key: itemKey, Icon, sublabel, href }) => (
                              <Link
                                key={itemKey}
                                href={href}
                                onClick={closeMenu}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-black/[0.04]">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-black/[0.06]">
                                  <Icon size={18} className="text-black/50" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-black">{t(itemKey)}</p>
                                  <p className="mt-0.5 text-xs text-black/50">{sublabel}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : key === 'blog' ? (
                  <Link
                    href={`/${locale}/blog`}
                    className="block rounded-lg px-3 py-3 text-lg font-medium text-black transition hover:bg-black/[0.04]"
                    onClick={closeMenu}>
                    {t('blog')}
                  </Link>
                ) : (
                  <Link
                    href={`#${key}`}
                    className="block rounded-lg px-3 py-3 text-lg font-medium text-black transition hover:bg-black/[0.04]"
                    onClick={closeMenu}>
                    {t(key)}
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Language switcher */}
            <div className="mt-4 border-t border-black/[0.06] px-3 pt-4">
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
