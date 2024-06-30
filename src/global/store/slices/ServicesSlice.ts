'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServicesState {
  isDesignOpened: boolean;
  isDevelopmentOpened: boolean;
  selectedCategory: string;
}

const initialState: ServicesState = {
  isDesignOpened: false,
  isDevelopmentOpened: false,
  selectedCategory: 'frontend',
};

export const ServicesSlice = createSlice({
  name: 'Services',
  initialState,
  reducers: {
    setIsDesignClosed: (state, action: PayloadAction<boolean>) => {
      state.isDesignOpened = action.payload;
    },
    setIsDevelopmentClosed: (state, action: PayloadAction<boolean>) => {
      state.isDevelopmentOpened = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setIsDesignClosed, setIsDevelopmentClosed, setSelectedCategory } = ServicesSlice.actions;

export const ServicesReducer = ServicesSlice.reducer;
