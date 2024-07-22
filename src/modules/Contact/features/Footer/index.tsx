'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ModalTypes } from '@shared/enums/ModalTypes.enums';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { contactApi } from '@global/api/contact.api';
import { ContactSlice } from '@global/store/slices/ContactSlice';
import { ModalSlice } from '@global/store/slices/ModalSlice';
import SendIcon from '@public/icons/SendIcon.svg';

import styles from './style.module.css';

export const Footer = () => {
  const t = useTranslations();
  const { orderData } = useAppSelector((state) => state.ContactReducer);
  const { setOrderData } = ContactSlice.actions;
  const { setIsModalOpened, setModalType } = ModalSlice.actions;
  const dispatch = useAppDispatch();
  const { clientEmail, clientName, productDescription, selectedServices } = orderData;

  const onSendOrderDataHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (clientEmail && clientName && productDescription && selectedServices) {
      contactApi
        .createOrder(orderData)
        .then(() => {
          dispatch(setIsModalOpened(true));
          dispatch(setModalType(ModalTypes.SECCESSFULLY_SENDED));
          dispatch(setOrderData({ clientEmail: '', clientName: '', productDescription: '', selectedServices: [] }));
        })
        .catch((error) => {
          if (error) {
            dispatch(setIsModalOpened(true));
            dispatch(setModalType(ModalTypes.SEND_FAILED));
          }
        });
    }
  };

  return (
    <footer className={styles.footer}>
      <p className={styles.privacy}>
        {t('policy-text')}
        <Link href="/#">{t('policy-link')}</Link>
      </p>
      <button className={styles.send} onClick={(e) => onSendOrderDataHandler(e)}>
        <Image src={SendIcon} alt="send icon" />
        {t('send')}
      </button>
    </footer>
  );
};
