'use client';

import { Provider } from 'react-redux';

import { setupStore } from '.';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
}
