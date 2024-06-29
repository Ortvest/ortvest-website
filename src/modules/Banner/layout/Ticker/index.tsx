import React from 'react';
import Marquee from 'react-fast-marquee';

import styles from './style.module.css';

export const Ticker = () => {
  const tickerText = ['222 Completed Projects', '222ml users use our products every day', '222 Happy Clients'];

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
