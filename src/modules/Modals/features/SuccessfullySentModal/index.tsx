'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { ModalTypes } from '@shared/enums/ModalTypes.enums';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { ModalSlice } from '@global/store/slices/ModalSlice';
import { DURATION, EASE } from '@lib/motion';
import CloseIcon from '@public/icons/CloseIcon.svg';
import { AnimatePresence, motion } from 'framer-motion';

const SALAD = '#cdff4e';

const CONFETTI_COUNT = 12;
const CONFETTI_DELAY = 0.65;

function SuccessIllustration() {
  return (
    <svg
      width="88"
      height="88"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto block"
      aria-hidden>
      <circle cx="60" cy="60" r="52" fill={SALAD} fillOpacity="0.15" />
      <circle cx="60" cy="60" r="44" fill={SALAD} />
      <path
        d="M42 60l12 12 24-24"
        stroke="#000"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="28" cy="45" r="4" fill={SALAD} fillOpacity="0.5" />
      <circle cx="92" cy="52" r="3" fill={SALAD} fillOpacity="0.4" />
      <circle cx="88" cy="88" r="3.5" fill={SALAD} fillOpacity="0.35" />
      <circle cx="32" cy="82" r="3" fill={SALAD} fillOpacity="0.4" />
      <path d="M75 38c8 0 14 6 14 14" stroke={SALAD} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

function ConfettiBurst() {
  const particles = Array.from({ length: CONFETTI_COUNT }, (_, i) => {
    const angle = (i / CONFETTI_COUNT) * 360 * (Math.PI / 180);
    const distance = 32 + (i % 3) * 6;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 4 + (i % 2) * 2,
      color: i % 3 === 0 ? '#000' : SALAD,
    };
  });

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2"
      aria-hidden>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute left-0 top-0 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1.3, 0.6],
            opacity: [0, 0.85, 0],
            x: [0, p.x],
            y: [0, p.y],
          }}
          transition={{
            delay: CONFETTI_DELAY + i * 0.02,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}

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

export function SuccessfullySentModal() {
  const t = useTranslations('modals');
  const { modalType, isModalOpened } = useAppSelector((state) => state.ModalReducer);
  const dispatch = useAppDispatch();
  const { setIsModalOpened, setModalType } = ModalSlice.actions;

  const onClose = () => {
    dispatch(setIsModalOpened(false));
    dispatch(setModalType(ModalTypes.CLOSED_MODAL));
  };

  const isOpen = modalType === ModalTypes.SECCESSFULLY_SENDED && isModalOpened;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
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
              className="relative flex justify-center"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              custom={0}>
              <motion.div
                className="relative"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  delay: CONFETTI_DELAY - 0.05,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}>
                <SuccessIllustration />
              </motion.div>
              <ConfettiBurst />
            </motion.div>
            <motion.h2
              id="success-modal-title"
              className="mt-6 text-center text-xl font-semibold text-black"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              custom={1}>
              {t('successTitle')}
            </motion.h2>
            <motion.p
              className="mt-2 text-center text-black/70"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              custom={2}>
              {t('successText')}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
