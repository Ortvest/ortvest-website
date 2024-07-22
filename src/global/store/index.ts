'use client';

import { ContactReducer } from '@global/store/slices/ContactSlice';
import { ModalReducer } from '@global/store/slices/ModalSlice';
import { ServicesReducer } from '@global/store/slices/ServicesSlice';
import { UIReducer } from '@global/store/slices/UISlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  ServicesReducer,
  ContactReducer,
  UIReducer,
  ModalReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
