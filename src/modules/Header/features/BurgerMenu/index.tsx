'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { sectionIds } from '@shared/enums/SectionID.enums';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { UISlice } from '@global/store/slices/UISlice';
import { EASE } from '@lib/motion';
import { LangSwitch } from '@modules/Header/features/LangSwitch';
import { AnimatePresence, motion } from 'framer-motion';

const navKeys = ['about', 'services', 'process', 'technologies', 'faq', 'contact'] as const;

export function BurgerMenu() {
  const t = useTranslations('nav');
  const dispatch = useAppDispatch();
  const { isBurgerOpened } = useAppSelector((state) => state.UIReducer);
  const closeMenu = () => dispatch(UISlice.actions.setIsBurgerOpened(false));

  return (
    <AnimatePresence>
      {isBurgerOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-40 overflow-y-auto bg-white pt-20 pb-6 md:hidden">
          <nav className="container-main flex flex-col gap-1" aria-label="Mobile navigation">
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
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
