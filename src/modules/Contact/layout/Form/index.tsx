import React from 'react';

import { Fields } from '@modules/Contact/features/Fields';
import { Footer } from '@modules/Contact/features/Footer';
import { ServicesSelection } from '@modules/Contact/features/ServicesSelection';

import styles from './style.module.css';

export const Form = () => {
  return (
    <form className={styles.form}>
      <ServicesSelection />
      <Fields />
      <Footer />
    </form>
  );
};
