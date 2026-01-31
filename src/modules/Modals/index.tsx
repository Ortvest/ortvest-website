'use client';

import { SendFailedModal } from '@modules/Modals/features/SendFailedModal';
import { SuccessfullySentModal } from '@modules/Modals/features/SuccessfullySentModal';

export function Modal() {
  return (
    <>
      <SuccessfullySentModal />
      <SendFailedModal />
    </>
  );
}
