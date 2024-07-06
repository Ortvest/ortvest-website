import React from 'react';

import Link from 'next/link';

import styles from '../style.module.css';

export const Links = () => {
  return (
    <section className={styles.social}>
      <article className={styles.mail}>
        <p className={styles.wrap}>
          <label>You can also email us:</label>
          <Link href="mailto:ortvest@gmail.com">ortvest@gmail.com</Link>
        </p>
        <p className={styles.wrap}>
          <label>Or our messengers:</label>
          <Link href="/#">WhatsApp</Link>
        </p>
      </article>
      <article className={styles.mail}>
        <div className={styles.wrap}>
          <label>Or write to our social networks:</label>
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
