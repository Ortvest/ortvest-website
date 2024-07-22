'use client';

import React, { useEffect, useRef } from 'react';

import { useTranslations } from 'next-intl';

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { ContactSlice } from '@global/store/slices/ContactSlice';

import styles from './style.module.css';

export const Fields = () => {
  const t = useTranslations();

  const dispatch = useAppDispatch();
  const { orderData } = useAppSelector((state) => state.ContactReducer);
  const { setOrderData } = ContactSlice.actions;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '45px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [orderData.productDescription]);

  const onFieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setOrderData({ ...orderData, [e.target.name]: e.target.value }));
  };
  return (
    <section className={styles.fields}>
      <fieldset className={styles.wrapper}>
        <input
          type="text"
          required={true}
          placeholder={t('full-name')}
          name="clientName"
          value={orderData.clientName}
          onChange={(e) => onFieldChangeHandler(e)}
        />
        <input
          type="text"
          required={true}
          placeholder={t('email')}
          name="clientEmail"
          value={orderData.clientEmail}
          onChange={(e) => onFieldChangeHandler(e)}
        />
        <textarea
          ref={textareaRef}
          required={true}
          value={orderData.productDescription}
          onChange={(e) => onFieldChangeHandler(e)}
          placeholder={t('about-project')}
          maxLength={200}
          name="productDescription"
        />
      </fieldset>
    </section>
  );
};
