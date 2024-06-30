import React from 'react';

import Image from 'next/image';

import { DesingTechnologies } from '@shared/mocks/designTechnologies.mocks';

import { Technologies } from '@modules/Services/features/Technologies';
import { ToggleButton } from '@modules/Services/features/ToggleButton';
import DesignIcon from '@public/icons/DesignIcon.svg';

import styles from '@modules/Services/style.module.css';

export const Design = () => {
  return (
    <section className={styles.design}>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.subtitle}>
            <Image src={DesignIcon} alt="design-icon" />
            <h3>Design</h3>
          </div>
          <div className={styles.description}>
            <p className={styles.text}>A short description of the product, a few lines long, no more</p>
            <ToggleButton isDesign={true} isDevelopment={false} />
          </div>
        </div>
      </header>
      <Technologies technologies={DesingTechnologies} isDesign={true} isDevelopment={false} />
    </section>
  );
};
