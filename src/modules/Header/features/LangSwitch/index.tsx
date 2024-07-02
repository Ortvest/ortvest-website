import React from 'react';

import styles from './style.module.css';

export const LangSwitch = () => {
  return (
    <select className={styles.select}>
      <option value="en-US">Eng</option>
      <option value="pl-PL">Ukr</option>
      <option value="uk-UK">Pl</option>
    </select>
  );
};
