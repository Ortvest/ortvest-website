'use client';

import { useRef } from 'react';

import { Provider } from 'react-redux';

import { setupStore, type AppStore } from '.';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
