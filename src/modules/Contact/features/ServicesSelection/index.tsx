'use client';

import React from 'react';

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';
import { Services } from '@shared/interfaces/Services.interfaces';

import { ContactSlice } from '@global/store/slices/ContactSlice';

import styles from './style.module.css';

export const ServicesSelection = () => {
  const { services } = useAppSelector((state) => state.ContactReducer);
  const { setSelectedServices } = ContactSlice.actions;

  const dispatch = useAppDispatch();

  const onSelectServiceHandler = (value: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(setSelectedServices(value));
  };

  return (
    <section className={styles.services}>
      <h3 className={styles.title}>I`m interested in...</h3>
      <article className={styles.wrapper}>
        {services
          ? services.map((service: Services, index: number) => (
              <button
                className={service.isSelected ? `${styles.button} ${styles.selected}` : styles.button}
                onClick={(event) => onSelectServiceHandler(service.value, event)}
                key={index}>
                {service.title}
              </button>
            ))
          : null}
      </article>
    </section>
  );
};
