import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from '../style.module.css';

export const Links = () => {
  const t = useTranslations();
  return (
    <section className={styles.social}>
      <article className={styles.mail}>
        <p className={styles.wrap}>
          <label>{t('email-label')}</label>
          <Link href="mailto:ortvest@gmail.com">ortvest@gmail.com</Link>
        </p>
        <p className={styles.wrap}>
          <label>{t('messagers-label')}</label>
          <Link href="/#">WhatsApp</Link>
        </p>
      </article>
      <article className={styles.mail}>
        <div className={styles.wrap}>
          <label>{t('social-label')}</label>
          <div className={styles.links}>
            <Link href="/#">Linkedin</Link>
            <Link href="/#">Instagram</Link>
            <Link href="/#">Twitter</Link>
            <Link href="/#">GitHub</Link>
          </div>
        </div>
      </article>
    </section>
  );
};
