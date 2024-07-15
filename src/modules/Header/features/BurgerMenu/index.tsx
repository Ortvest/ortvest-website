import React, { Fragment } from 'react';

import { useTranslations } from 'next-intl';

import { useAppSelector } from '@shared/hooks/redux.hooks';

import { Navagation } from '@modules/Header/features/Navagation';

import styles from './style.module.css';

interface BurgerMenuProps {
  scrollPosition: number;
}

const onContactClickHandler = () => {
  const contactSection = document.querySelector('#contact');

  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export const BurgerMenu = ({ scrollPosition }: BurgerMenuProps) => {
  const t = useTranslations();
  const { isBurgerOpened } = useAppSelector((state) => state.UIReducer);
  return (
    <section className={isBurgerOpened ? `${styles.menu} ${styles.opened}` : styles.menu}>
      {isBurgerOpened ? (
        <Fragment>
          <Navagation scrollPosition={scrollPosition} />
          <button className={styles.contact} onClick={onContactClickHandler}>
            {t('contact')}
          </button>
        </Fragment>
      ) : null}
    </section>
  );
};
