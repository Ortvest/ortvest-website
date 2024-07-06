import React, { Fragment } from 'react';

import { useTranslations } from 'next-intl';

import styles from './style.module.css';

export const Info = () => {
  const t = useTranslations();
  return (
    <Fragment>
      <article className={styles.wrapper}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.circle}>{t('circle')}</p>
      </article>
      <article className={styles.wrapperend}>
        <p className={styles.description}>{t('subtitle')}</p>
      </article>
    </Fragment>
  );
};
