'use client';

import React from 'react';

import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { ServicesSlice } from '@global/store/slices/ServicesSlice';
import ArrowIcon from '@public/icons/ArrowIcon.svg';

import styles from '@modules/Services/style.module.css';

interface ToggleButtonProps {
  isDesign: boolean;
  isDevelopment: boolean;
}

export const ToggleButton = ({ isDesign, isDevelopment }: ToggleButtonProps) => {
  const dispatch = useAppDispatch();

  const { setIsDesignClosed, setIsDevelopmentClosed } = ServicesSlice.actions;
  const { isDesignOpened, isDevelopmentOpened } = useAppSelector((state) => state.ServicesReducer);

  const condition = isDesign ? isDesign && isDesignOpened : isDevelopment && isDevelopmentOpened;

  const onToggleServicesHandler = () =>
    isDesign ? dispatch(setIsDesignClosed(!isDesignOpened)) : dispatch(setIsDevelopmentClosed(!isDevelopmentOpened));

  return (
    <button className={condition ? styles.opened : styles.closed} onClick={onToggleServicesHandler}>
      <Image src={ArrowIcon} alt="arrow-icon" width={14} height={10} />
    </button>
  );
};
