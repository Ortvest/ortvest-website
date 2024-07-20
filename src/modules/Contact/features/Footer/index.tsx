'use client';

import React, { Fragment, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useAppSelector } from '@shared/hooks/redux.hooks';

import { contactApi } from '@global/api/contact.api';
import SendIcon from '@public/icons/SendIcon.svg';

import styles from './style.module.css';

export const Footer = () => {
  const t = useTranslations();
  const { orderData } = useAppSelector((state) => state.ContactReducer);
  const [isSended, setIsSended] = useState(false);

  const onSendOrderDataHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await contactApi.addOrder(orderData);
    setIsSended(true);
  };

  useEffect(() => {
    if (isSended) {
      setTimeout(() => {
        setIsSended(false);
      }, 5000);
    }
  }, [isSended]);

  return (
    <footer className={styles.footer}>
      {isSended ? (
        <p className={styles.sended}>{t('successfully-shipped')}</p>
      ) : (
        <Fragment>
          <p className={styles.privacy}>
            {t('policy-text')}
            <Link href="/#">{t('policy-link')}</Link>
          </p>
          <button className={styles.send} onClick={(e) => onSendOrderDataHandler(e)}>
            <Image src={SendIcon} alt="send icon" />
            {t('send')}
          </button>
        </Fragment>
      )}
    </footer>
  );
};
