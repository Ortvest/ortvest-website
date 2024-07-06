import React from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { DesingTechnologies } from '@shared/mocks/designTechnologies.mocks';

import { Technologies } from '@modules/Services/features/Technologies';
import { ToggleButton } from '@modules/Services/features/ToggleButton';
import DesignIcon from '@public/icons/DesignIcon.svg';

import styles from '@modules/Services/style.module.css';

export const Design = () => {
  const t = useTranslations();
  return (
    <section className={styles.design} id="design">
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <article className={styles.subtitle}>
            <Image src={DesignIcon} alt="design-icon" />
            <h3>{t('design')}</h3>
          </article>
          <article className={styles.description}>
            <p className={styles.text}>{t('services-description')}</p>
            <ToggleButton isDesign={true} isDevelopment={false} />
          </article>
        </div>
      </header>
      <Technologies technologies={DesingTechnologies} isDesign={true} isDevelopment={false} />
    </section>
  );
};
