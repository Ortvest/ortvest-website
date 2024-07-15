import React from 'react';

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { UISlice } from '@global/store/slices/UISlice';

import styles from './style.module.css';

export const Burger = () => {
  const dispatch = useAppDispatch();
  const { setIsBurgerOpened } = UISlice.actions;
  const { isBurgerOpened } = useAppSelector((state) => state.UIReducer);

  const onOpenBurgerMenuHandler = () => {
    dispatch(setIsBurgerOpened(!isBurgerOpened));
  };

  return (
    <div
      className={isBurgerOpened ? `${styles.burger} ${styles.opened}` : styles.burger}
      onClick={onOpenBurgerMenuHandler}>
      <span></span>
    </div>
  );
};
