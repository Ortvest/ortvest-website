'use client';

import React, { useState } from 'react';

import { useAppDispatch } from '@shared/hooks/redux.hooks';

import { ServicesSlice } from '@global/store/slices/ServicesSlice';

import styles from './style.module.css';

export const Filter = () => {
  const categories = ['backend', 'frontend', 'database', 'cms'];

  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const dispatch = useAppDispatch();

  const { setSelectedCategory } = ServicesSlice.actions;

  const onSelectCategoryHander = (textContent: string, index: number) => {
    dispatch(setSelectedCategory(textContent));
    setSelectedIndex(index);
  };

  return (
    <section className={styles.wrapper}>
      {categories
        ? categories.map((categary: string, index: number) => (
            <button
              className={selectedIndex === index ? styles.selected : styles.category}
              key={index}
              onClick={(e) => onSelectCategoryHander(e.currentTarget.textContent as string, index)}>
              {categary}
            </button>
          ))
        : null}
    </section>
  );
};
