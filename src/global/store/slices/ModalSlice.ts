'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isModalOpened: boolean;
  modalType: string;
}

const initialState: ModalState = {
  isModalOpened: false,
  modalType: '',
};

export const ModalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    setIsModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isModalOpened = action.payload;
    },
    setModalType: (state, action: PayloadAction<string>) => {
      state.modalType = action.payload;
    },
  },
});

export const { setIsModalOpened, setModalType } = ModalSlice.actions;

export const ModalReducer = ModalSlice.reducer;
