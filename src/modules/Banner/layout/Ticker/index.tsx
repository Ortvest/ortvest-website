import React from 'react';
import Marquee from 'react-fast-marquee';

import { useTranslations } from 'next-intl';

import styles from './style.module.css';

export const Ticker = () => {
  const t = useTranslations();
  const tickerText = [t('ticker-first'), t('ticker-second'), t('ticker-third')];

  return (
    <section className={styles.ticker}>
      <div className={styles.wrapper}>
        <Marquee>
          {tickerText.concat(tickerText).map((text: string, index: number) => (
            <p className={styles.item} key={index}>
              {text}
            </p>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
