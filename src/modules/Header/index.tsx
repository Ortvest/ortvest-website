'use client';

import React, { Fragment, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Burger } from '@modules/Header/features/Burger';
import { BurgerMenu } from '@modules/Header/features/BurgerMenu';
import { Navagation } from '@modules/Header/features/Navagation';

import styles from './style.module.css';

export const Header = () => {
  const t = useTranslations();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onHeaderClickHandler = () => {
    scrollTo({ behavior: 'smooth', top: 0 });
  };

  const onContactClickHandler = () => {
    const contactSection = document.querySelector('#contact');

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={scrollPosition >= 300 ? `${styles.header} ${styles.white}` : styles.header} id="header">
      <div className="container">
        <div className={styles.wrapper}>
          <h2 className={styles.title} onClick={onHeaderClickHandler}>
            Ortvest
          </h2>
          {windowWidth <= 820 ? null : (
            <Fragment>
              <Navagation scrollPosition={scrollPosition} />
              <button className={styles.contact} onClick={onContactClickHandler}>
                {t('contact')}
              </button>
            </Fragment>
          )}
          <Burger />
          <BurgerMenu scrollPosition={scrollPosition} />
        </div>
      </div>
    </header>
  );
};
