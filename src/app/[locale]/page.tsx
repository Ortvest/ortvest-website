import React from 'react';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { Banner } from '@modules/Banner';
import { Contact } from '@modules/Contact';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';
import { Services } from '@modules/Services';

export default function Home() {
  return (
    <ReduxProvider>
      <Header />
      <Banner />
      <Services />
      <Contact />
      <Modal />
    </ReduxProvider>
  );
}
