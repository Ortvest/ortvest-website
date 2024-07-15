import React from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import FastReactionIcon from '@public/icons/FastReactionIcon.svg';
import SecretsIcon from '@public/icons/SecretsIcon.svg';

import styles from '../style.module.css';

export const Description = () => {
  const t = useTranslations();
  return (
    <article className={styles.description}>
      <h5 className={styles.subtitle}>{t('contact-subtitle')}</h5>
      <h2 className={styles.title}>{t('contact-title')}</h2>
      <div className={styles.aboutwrap}>
        <p className={styles.about}>
          <Image src={FastReactionIcon} alt="fast-reaction-icon" />
          {t('contact-first-quote')}
        </p>
        <p className={styles.about}>
          <Image src={SecretsIcon} alt="secrets-icon" />
          {t('contact-second-quote')}
        </p>
      </div>
    </article>
  );
};
