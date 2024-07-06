import React from 'react';

import { useTranslations } from 'next-intl';

import { Design } from '@modules/Services/layout/Design';
import { Development } from '@modules/Services/layout/Development';

import styles from './style.module.css';

export const Services = () => {
  const t = useTranslations();
  return (
    <section className={styles.services}>
      <div className="container">
        <article className={styles.flex}>
          <h2 className={styles.title}>{t('services-title')}</h2>
          <Design />
          <Development />
        </article>
      </div>
    </section>
  );
};
