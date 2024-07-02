import React from 'react';

import { BannerImage } from '@modules/Banner/layout/BannerImage';
import { Info } from '@modules/Banner/layout/Info';
import { Ticker } from '@modules/Banner/layout/Ticker';

import styles from './style.module.css';

export const Banner = () => {
  return (
    <section className={styles.banner} id="about-us">
      <div className="container">
        <Info />
      </div>
      <BannerImage />
      <Ticker />
    </section>
  );
};
