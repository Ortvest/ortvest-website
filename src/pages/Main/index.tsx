import React from 'react';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { Banner } from '@modules/Banner';
import { Header } from '@modules/Header';
import { Services } from '@modules/Services';

export default function Main() {
  return (
    <ReduxProvider>
      <Header />
      <Banner />
      <Services />
    </ReduxProvider>
  );
}
