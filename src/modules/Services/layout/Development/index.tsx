import React from 'react';

import Image from 'next/image';

import { developmentTechnologies } from '@shared/mocks/developmentTechnologies.mocks';

import { Technologies } from '@modules/Services/features/Technologies';
import { ToggleButton } from '@modules/Services/features/ToggleButton';
import DevelopmentIcon from '@public/icons/DevelopmentIcon.svg';

import styles from '@modules/Services/style.module.css';

export const Development = () => {
  return (
    <section className={styles.development}>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.subtitle}>
            <Image src={DevelopmentIcon} alt="development-icon" />
            <h3>Development</h3>
          </div>
          <div className={styles.description}>
            <p className={styles.text}>A short description of the product, a few lines long, no more</p>
            <ToggleButton isDesign={false} isDevelopment={true} />
          </div>
        </div>
      </header>
      <Technologies technologies={developmentTechnologies} isDesign={false} isDevelopment={true} />
    </section>
  );
};
