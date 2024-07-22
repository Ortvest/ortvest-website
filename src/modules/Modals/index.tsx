'use client';

import React, { Fragment } from 'react';

import { SendFailedModal } from '@modules/Modals/features/SendFailedModal';
import { SuccessfullySentModal } from '@modules/Modals/features/SuccessfullySentModal';

export const Modal = () => {
  return (
    <Fragment>
      <SuccessfullySentModal />
      <SendFailedModal />
    </Fragment>
  );
};
