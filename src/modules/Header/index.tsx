'use client';

import React from 'react';

import Link from 'next/link';

import { SectionID } from '@shared/enums/SectionID.enums';

import { Navagation } from '@modules/Header/features/Navagation';

import styles from './style.module.css';

export const Header = () => {
  return (
    <header className={styles.header} id="header">
      <div className="container">
        <div className={styles.wrapper}>
          <h2 className={styles.title}>
            <Link href={SectionID.HEADER}>Ortvest</Link>
          </h2>
          <Navagation />
          <button className={styles.contact}>Contact Us</button>
        </div>
      </div>
    </header>
  );
};
