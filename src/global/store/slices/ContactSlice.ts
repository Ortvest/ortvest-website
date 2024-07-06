'use client';

import { Services } from '@shared/interfaces/Services.interfaces';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContactState {
  services: Services[];
}

const initialState: ContactState = {
  services: [
    {
      title: 'Consultation',
      value: 'consultation',
      isSelected: false,
    },
    {
      title: 'Logo',
      value: 'logo',
      isSelected: false,
    },
    {
      title: 'Branding',
      value: 'branding',
      isSelected: false,
    },
    {
      title: 'UI/UX Design',
      value: 'ui-ux-design',
      isSelected: true,
    },
    {
      title: 'Web Design',
      value: 'web-design',
      isSelected: false,
    },
    {
      title: 'Mobile Design',
      value: 'mobile-design',
      isSelected: false,
    },
    {
      title: 'Web Development',
      value: 'web-development',
      isSelected: true,
    },

    {
      title: 'Mobile development',
      value: 'mobile-development',
      isSelected: true,
    },
    {
      title: 'QA',
      value: 'qa',
      isSelected: true,
    },
  ],
};

export const ContactSlice = createSlice({
  name: 'Contact',
  initialState,
  reducers: {
    setSelectedServices(state, action: PayloadAction<string>) {
      const service = state.services.find((service) => service.value === action.payload);
      if (service) {
        service.isSelected = !service.isSelected;
      }
    },
  },
});

export const { setSelectedServices } = ContactSlice.actions;

export const ContactReducer = ContactSlice.reducer;
