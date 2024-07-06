import React from 'react';

import { Form } from '@modules/Contact/layout/Form';
import { SocialMedia } from '@modules/Contact/layout/SocialMedia';

import styles from './style.module.css';

export const Contact = () => {
  return (
    <section className={styles.contact}>
      <div className="container">
        <div className={styles.wrapper}>
          <SocialMedia />
          <Form />
        </div>
      </div>
    </section>
  );
};
