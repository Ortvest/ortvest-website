import React from 'react';

import { useTranslations } from 'next-intl';

import styles from './style.module.css';

export const Fields = () => {
  const t = useTranslations();
  return (
    <section className={styles.fields}>
      <fieldset className={styles.wrapper}>
        <input type="text" placeholder={t('full-name')} name="full-name" />
        <input type="text" placeholder={t('email')} name="email" />
        <textarea placeholder={t('about-project')} maxLength={200} name="about-project" />
      </fieldset>
    </section>
  );
};
