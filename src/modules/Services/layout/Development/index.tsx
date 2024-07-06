import React from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { developmentTechnologies } from '@shared/mocks/developmentTechnologies.mocks';

import { Technologies } from '@modules/Services/features/Technologies';
import { ToggleButton } from '@modules/Services/features/ToggleButton';
import DevelopmentIcon from '@public/icons/DevelopmentIcon.svg';

import styles from '@modules/Services/style.module.css';

export const Development = () => {
  const t = useTranslations();
  return (
    <section className={styles.development} id="development">
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <article className={styles.subtitle}>
            <Image src={DevelopmentIcon} alt="development-icon" />
            <h3>{t('development')}</h3>
          </article>
          <article className={styles.description}>
            <p className={styles.text}>{t('services-description')}</p>
            <ToggleButton isDesign={false} isDevelopment={true} />
          </article>
        </div>
      </header>
      <Technologies technologies={developmentTechnologies} isDesign={false} isDevelopment={true} />
    </section>
  );
};
