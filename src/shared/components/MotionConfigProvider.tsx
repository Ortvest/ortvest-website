'use client';

import { MotionConfig, useReducedMotion } from 'framer-motion';

export function MotionConfigProvider({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? 'user' : 'never'}>
      {children}
    </MotionConfig>
  );
}
