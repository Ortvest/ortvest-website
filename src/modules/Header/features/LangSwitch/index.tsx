import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import styles from './style.module.css';

export const LangSwitch = () => {
  const router = useRouter();
  const slicedPathname = usePathname().slice(1, 3);

  const selectedLanguage = slicedPathname || localStorage.getItem('selectedLanguage');

  const onLanguageSelectHandler = (selectedLanguage: string) => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
    router.push(`/${selectedLanguage}`);
  };

  return (
    <select
      className={styles.select}
      onChange={(e) => onLanguageSelectHandler(e.target.value)}
      value={selectedLanguage ? selectedLanguage : slicedPathname}>
      <option value="en">ENG</option>
      <option value="pl">PL</option>
      <option value="ua">UA</option>
    </select>
  );
};
