'use client';

import { useEffect, useState } from 'react';

import { useAppSelector } from '@shared/hooks/redux.hooks';

export function BurgerMenuLazy() {
  const isBurgerOpened = useAppSelector((state) => state.UIReducer.isBurgerOpened);
  const [BurgerMenu, setBurgerMenu] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (isBurgerOpened && !BurgerMenu) {
      void import('@modules/Header/features/BurgerMenu').then((mod) => setBurgerMenu(() => mod.BurgerMenu));
    }
  }, [isBurgerOpened, BurgerMenu]);

  if (!BurgerMenu) return null;

  return <BurgerMenu />;
}
