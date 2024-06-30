import React from 'react';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { Banner } from '@modules/Banner';
import { Services } from '@modules/Services';

export default function Main() {
  return (
    <ReduxProvider>
      <Banner />
      <Services />
    </ReduxProvider>
  );
}
