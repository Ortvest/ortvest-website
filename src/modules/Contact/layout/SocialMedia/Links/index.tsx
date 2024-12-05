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
          <Link href="https://wa.me/+48731728031">WhatsApp</Link>
        </p>
      </article>
      <article className={styles.mail}>
        <div className={styles.wrap}>
          <label>{t('social-label')}</label>
          <div className={styles.links}>
            <Link href="https://www.linkedin.com/company/ortvest">Linkedin</Link>
            <Link href="https://x.com/ortvest">Twitter</Link>
            <Link href="https://github.com/Ortvest">GitHub</Link>
          </div>
        </div>
      </article>
    </section>
  );
};
