'use client';

import React from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { ModalTypes } from '@shared/enums/ModalTypes.enums';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { ModalSlice } from '@global/store/slices/ModalSlice';
import CheckIcon from '@public/icons/CheckIcon.svg';
import CloseIcon from '@public/icons/CloseIcon.svg';

import styles from '../../style.module.css';

export const SuccessfullySentModal = () => {
  const t = useTranslations();
  const { modalType, isModalOpened } = useAppSelector((state) => state.ModalReducer);
  const dispatch = useAppDispatch();
  const { setIsModalOpened, setModalType } = ModalSlice.actions;

  const onCloseModalHandler = () => {
    dispatch(setIsModalOpened(false));
    dispatch(setModalType(ModalTypes.CLOSED_MODAL));
  };

  return modalType === ModalTypes.SECCESSFULLY_SENDED && isModalOpened ? (
    <section className={styles.wrapper}>
      <div className={styles.modal}>
        <Image className={styles.check} src={CheckIcon} alt="check-icon" />
        <Image className={styles.close} src={CloseIcon} alt="close-icon" onClick={onCloseModalHandler} />
        <h2 className={styles.title}>{t('work-finished')}</h2>
        <p className={styles.subtitle}>{t('successfully-sended')}</p>
      </div>
    </section>
  ) : null;
};
