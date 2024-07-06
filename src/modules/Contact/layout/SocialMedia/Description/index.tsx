import React from 'react';

import Image from 'next/image';

import FastReactionIcon from '@public/icons/FastReactionIcon.svg';
import SecretsIcon from '@public/icons/SecretsIcon.svg';

import styles from '../style.module.css';

export const Description = () => {
  return (
    <article className={styles.description}>
      <h5 className={styles.subtitle}>Do you have an idea?</h5>
      <h2 className={styles.title}>Let`s make it happen!</h2>
      <p className={styles.about}>
        <Image src={FastReactionIcon} alt="fast-reaction-icon" />
        Fast reaction
      </p>
      <p className={styles.about}>
        <Image src={SecretsIcon} alt="secrets-icon" />
        We know how to keep secrets
      </p>
    </article>
  );
};
