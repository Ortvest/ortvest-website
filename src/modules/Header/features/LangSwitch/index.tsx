import React from 'react';

import styles from './style.module.css';

export const LangSwitch = () => {
  return (
    <select className={styles.select}>
      <option value="Eng">Eng</option>
      <option value="Ukr">Ukr</option>
      <option value="Pln">Pln</option>
    </select>
  );
};
