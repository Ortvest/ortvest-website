import React, { Fragment } from 'react';

import styles from './style.module.css';

export const Info = () => {
  return (
    <Fragment>
      <article className={styles.wrapper}>
        <h1 className={styles.title}>Creation of digital products of a full cycle</h1>
        <p className={styles.circle}>Our services</p>
      </article>
      <article className={styles.wrapperend}>
        <p className={styles.description}>
          Creation and development of projects of any complexity for existing companies and start-ups
        </p>
      </article>
    </Fragment>
  );
};
