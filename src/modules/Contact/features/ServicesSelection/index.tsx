'use client';

import React, { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';
import { Services } from '@shared/interfaces/Services.interfaces';

import { ContactSlice } from '@global/store/slices/ContactSlice';

import styles from './style.module.css';

export const ServicesSelection = () => {
  const t = useTranslations();
  const { services, orderData } = useAppSelector((state) => state.ContactReducer);
  const { setSelectedServices, setOrderData } = ContactSlice.actions;

  const dispatch = useAppDispatch();

  const onSelectServiceHandler = (value: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(setSelectedServices(value));
  };

  useEffect(() => {
    const selectedServices = services.filter((service) => service.isSelected).map((service) => service.title);
    dispatch(setOrderData({ ...orderData, selectedServices }));
  }, [services]);

  return (
    <section className={styles.services}>
      <h3 className={styles.title}>{t('interested')}</h3>
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
