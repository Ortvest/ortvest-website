import React from 'react';

import Link from 'next/link';

import { SectionID } from '@shared/enums/SectionID.enums';

import { LangSwitch } from '@modules/Header/features/LangSwitch';

import styles from './style.module.css';

export const Navagation = () => {
  const onScrollHandler = (selectedValue: string) => {
    const section = document.querySelector(`#${selectedValue.toLowerCase()}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <Link href={SectionID.ABOUT_US} className={styles.link}>
          <li className={styles.item}>About us</li>
        </Link>
      </ul>
      <select
        className={styles.select}
        defaultValue={'Services'}
        onChange={(e) => onScrollHandler(e.currentTarget.value)}>
        <option value="Services" disabled>
          Services
        </option>
        <option value="Design">Design</option>
        <option value="Development">Development</option>
      </select>
      <LangSwitch />
    </nav>
  );
};
