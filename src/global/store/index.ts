'use client';

import { ContactReducer } from '@global/store/slices/ContactSlice';
import { ServicesReducer } from '@global/store/slices/ServicesSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  ServicesReducer,
  ContactReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
