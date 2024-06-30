import React from 'react';

import { Design } from '@modules/Services/layout/Design';
import { Development } from '@modules/Services/layout/Development';

import styles from './style.module.css';

export const Services = () => {
  return (
    <section className={styles.services}>
      <div className="container">
        <div className={styles.flex}>
          <h2 className={styles.title}>Our services, skills and stacks</h2>
          <Design />
          <Development />
        </div>
      </div>
    </section>
  );
};
