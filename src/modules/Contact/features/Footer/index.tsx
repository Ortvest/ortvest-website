import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import SendIcon from '@public/icons/SendIcon.svg';

import styles from './style.module.css';

export const Footer = () => {
  const t = useTranslations();
  return (
    <footer className={styles.footer}>
      <p className={styles.privacy}>
        {t('policy-text')}
        <Link href="/#">{t('policy-link')}</Link>
      </p>
      <button className={styles.send}>
        <Image src={SendIcon} alt="send icon" />
        {t('send')}
      </button>
    </footer>
  );
};
