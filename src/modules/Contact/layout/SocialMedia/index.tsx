import React from 'react';

import { Description } from '@modules/Contact/layout/SocialMedia/Description';
import { Links } from '@modules/Contact/layout/SocialMedia/Links';

import styles from './style.module.css';

export const SocialMedia = () => {
  return (
    <section className={styles.wrapper}>
      <Description />
      <Links />
    </section>
  );
};
