'use client';

import dynamic from 'next/dynamic';

const SuccessfullySentModal = dynamic(
  () => import('@modules/Modals/features/SuccessfullySentModal').then((mod) => mod.SuccessfullySentModal),
  { ssr: false }
);

const SendFailedModal = dynamic(
  () => import('@modules/Modals/features/SendFailedModal').then((mod) => mod.SendFailedModal),
  { ssr: false }
);

export function Modal() {
  return (
    <>
      <SuccessfullySentModal />
      <SendFailedModal />
    </>
  );
}
