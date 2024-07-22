'use client';

import React from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { ModalTypes } from '@shared/enums/ModalTypes.enums';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { ModalSlice } from '@global/store/slices/ModalSlice';
import CloseIcon from '@public/icons/CloseIcon.svg';
import ErrorIcon from '@public/icons/ErrorIcon.svg';

import styles from '../../style.module.css';

export const SendFailedModal = () => {
  const t = useTranslations();
  const { modalType, isModalOpened } = useAppSelector((state) => state.ModalReducer);
  const dispatch = useAppDispatch();
  const { setIsModalOpened, setModalType } = ModalSlice.actions;

  const onCloseModalHandler = () => {
    dispatch(setIsModalOpened(false));
    dispatch(setModalType(ModalTypes.CLOSED_MODAL));
  };

  return modalType === ModalTypes.SEND_FAILED && isModalOpened ? (
    <section className={styles.wrapper}>
      <div className={styles.modal}>
        <Image className={styles.check} src={ErrorIcon} alt="error-icon" height={56} width={56} />
        <Image className={styles.close} src={CloseIcon} alt="close-icon" onClick={onCloseModalHandler} />
        <h2 className={styles.title}>{t('error-occured')}</h2>
        <p className={styles.subtitle}>{t('error-subtitle')}</p>
      </div>
    </section>
  ) : null;
};
