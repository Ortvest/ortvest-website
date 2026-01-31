'use client';

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { UISlice } from '@global/store/slices/UISlice';

export function Burger() {
  const dispatch = useAppDispatch();
  const { setIsBurgerOpened } = UISlice.actions;
  const { isBurgerOpened } = useAppSelector((state) => state.UIReducer);

  const toggle = () => dispatch(setIsBurgerOpened(!isBurgerOpened));

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md transition hover:bg-black/5 md:hidden"
      aria-expanded={isBurgerOpened}
      aria-label={isBurgerOpened ? 'Close menu' : 'Open menu'}>
      <span
        className={`block h-0.5 w-5 bg-black transition-transform ${isBurgerOpened ? 'translate-y-2 rotate-45' : ''}`}
      />
      <span className={`block h-0.5 w-5 bg-black transition-opacity ${isBurgerOpened ? 'opacity-0' : ''}`} />
      <span
        className={`block h-0.5 w-5 bg-black transition-transform ${isBurgerOpened ? '-translate-y-2 -rotate-45' : ''}`}
      />
    </button>
  );
}
