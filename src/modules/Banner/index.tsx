import React from 'react';

import { BannerImage } from '@modules/Banner/layout/BannerImage';
import { Info } from '@modules/Banner/layout/Info';
import { Ticker } from '@modules/Banner/layout/Ticker';

export const Banner = () => {
  return (
    <section>
      <div className="container">
        <Info />
      </div>
      <BannerImage />
      <Ticker />
    </section>
  );
};
