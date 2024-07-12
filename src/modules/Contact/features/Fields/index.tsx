'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import styles from './style.module.css';

export const Fields = () => {
  const t = useTranslations();
  // I'll change this state to object according to postman example, when start working with connecting to API
  const [aboutProjectValue, setAboutProjectValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '45px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [aboutProjectValue]);

  const onTextAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAboutProjectValue(e.target.value);
  };
  return (
    <section className={styles.fields}>
      <fieldset className={styles.wrapper}>
        <input type="text" placeholder={t('full-name')} name="full-name" />
        <input type="text" placeholder={t('email')} name="email" />
        <textarea
          ref={textareaRef}
          value={aboutProjectValue}
          onChange={onTextAreaChangeHandler}
          placeholder={t('about-project')}
          maxLength={200}
          name="about-project"
        />
      </fieldset>
    </section>
  );
};
