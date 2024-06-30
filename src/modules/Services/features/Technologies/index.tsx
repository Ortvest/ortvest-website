'use client';

import React from 'react';

import Image from 'next/image';

import { useAppSelector } from '@shared/hooks/redux.hooks';
import { TechnologiesData } from '@shared/interfaces/TechnologiesData.interfaces';

import { Filter } from '@modules/Services/features/Filter';

import styles from './style.module.css';

interface ServiceProps {
  technologies: TechnologiesData[];
  isDesign: boolean;
  isDevelopment: boolean;
}

export const Technologies = ({ technologies, isDesign, isDevelopment }: ServiceProps) => {
  const { isDesignOpened, isDevelopmentOpened, selectedCategory } = useAppSelector((state) => state.ServicesReducer);
  const filteredTechnologies = isDevelopment
    ? technologies.filter((technology) => technology.fieldOfUsage === selectedCategory)
    : technologies;

  const condition = isDesign ? isDesign && isDesignOpened : isDevelopment && isDevelopmentOpened;

  return (
    <section className={condition ? styles.hidden : styles.visible}>
      {isDevelopment ? <Filter /> : null}
      <div className={styles.wrapper}>
        {filteredTechnologies
          ? filteredTechnologies.map((technology: TechnologiesData, index: number) => (
              <div className={styles.service} key={index}>
                <article className={styles.title}>
                  <Image src={technology.icon} alt="service-icon" />
                  <p>{technology.title}</p>
                </article>
                <Image src={technology.levelIcon} alt="levelIcon" />
              </div>
            ))
          : null}
      </div>
    </section>
  );
};
