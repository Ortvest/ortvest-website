'use client';

import { LazyMotion } from 'framer-motion';

/**
 * Loads Framer Motion's DOM features in a separate chunk after hydration.
 *
 * Every animated component uses `m` instead of `motion`, which keeps the
 * feature bundle out of the initial JS. Animations start once the chunk
 * arrives; until then elements render in their initial style, which is the
 * right trade for Core Web Vitals.
 */
const loadFeatures = () => import('@lib/motion-features').then((mod) => mod.default);

export function MotionConfigProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
