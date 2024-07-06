import React from 'react';

import styles from './style.module.css';

export const Fields = () => {
  return (
    <section className={styles.fields}>
      <fieldset className={styles.wrapper}>
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Email" />
        <textarea placeholder="About Project" maxLength={200} />
      </fieldset>
    </section>
  );
};
