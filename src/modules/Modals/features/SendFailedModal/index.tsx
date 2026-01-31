'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { ModalTypes } from '@shared/enums/ModalTypes.enums';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { ModalSlice } from '@global/store/slices/ModalSlice';
import { DURATION, EASE } from '@lib/motion';
import CloseIcon from '@public/icons/CloseIcon.svg';
import ErrorIcon from '@public/icons/ErrorIcon.svg';
import { AnimatePresence, motion } from 'framer-motion';

const backdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: EASE },
};

const panel = {
  initial: { opacity: 0, scale: 0.92, y: 12 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.3, ease: EASE },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 12 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, delay: 0.08 * i },
  }),
};

export function SendFailedModal() {
  const t = useTranslations('modals');
  const { modalType, isModalOpened } = useAppSelector((state) => state.ModalReducer);
  const dispatch = useAppDispatch();
  const { setIsModalOpened, setModalType } = ModalSlice.actions;

  const onClose = () => {
    dispatch(setIsModalOpened(false));
    dispatch(setModalType(ModalTypes.CLOSED_MODAL));
  };

  const isOpen = modalType === ModalTypes.SEND_FAILED && isModalOpened;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="error-modal-title"
          initial={backdrop.initial}
          animate={backdrop.animate}
          exit={backdrop.exit}
          transition={backdrop.transition}
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={onClose}>
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10"
            initial={panel.initial}
            animate={panel.animate}
            exit={panel.exit}
            onClick={(e) => e.stopPropagation()}>
            <motion.button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 transition hover:bg-black/5"
              aria-label="Close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: DURATION.normal }}>
              <Image src={CloseIcon} alt="" width={24} height={24} />
            </motion.button>

            <motion.div
              className="flex justify-center"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              custom={0}>
              <Image src={ErrorIcon} alt="" width={56} height={56} aria-hidden />
            </motion.div>
            <motion.h2
              id="error-modal-title"
              className="mt-6 text-center text-xl font-semibold text-black"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              custom={1}>
              {t('errorTitle')}
            </motion.h2>
            <motion.p
              className="mt-2 text-center text-black/70"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              custom={2}>
              {t('errorText')}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
