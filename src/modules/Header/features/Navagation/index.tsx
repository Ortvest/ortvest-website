'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { SectionID } from '@shared/enums/SectionID.enums';

import { LangSwitch } from '@modules/Header/features/LangSwitch';

import styles from './style.module.css';

interface NavagationProps {
  scrollPosition: number;
}

export const Navagation = ({ scrollPosition }: NavagationProps) => {
  const [selectedValue, setSelectedValue] = useState('services');

  const onScrollHandler = (selectedValue: string) => {
    const section = document.querySelector(`#${selectedValue}`);
    setSelectedValue(selectedValue);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={scrollPosition >= 300 ? `${styles.navigation} ${styles.gray}` : styles.navigation}>
      <ul className={styles.list}>
        <Link href={SectionID.ABOUT_US} className={styles.link}>
          <li className={styles.item}>About us</li>
        </Link>
      </ul>
      <select
        className={scrollPosition >= 300 ? `${styles.select} ${styles.white}` : styles.select}
        value={selectedValue}
        onChange={(e) => onScrollHandler(e.currentTarget.value)}>
        <option value="services" disabled>
          Services
        </option>
        <option value="design">Design</option>
        <option value="development">Development</option>
      </select>
      <LangSwitch />
    </nav>
  );
};
