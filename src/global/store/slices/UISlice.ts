'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isBurgerOpened: boolean;
}

const initialState: UIState = {
  isBurgerOpened: false,
};

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setIsBurgerOpened: (state, action: PayloadAction<boolean>) => {
      state.isBurgerOpened = action.payload;
    },
  },
});

export const { setIsBurgerOpened } = UISlice.actions;

export const UIReducer = UISlice.reducer;
