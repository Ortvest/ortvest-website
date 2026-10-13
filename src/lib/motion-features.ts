/**
 * Framer Motion feature bundle, kept in its own module so `LazyMotion` can
 * import it asynchronously. Nothing here is on the critical path: the page
 * renders with `m` components (a few kB), and the animation features arrive in
 * a separate chunk after hydration.
 *
 * `domMax` rather than `domAnimation` because the team and review carousels
 * use drag gestures.
 */
export { domMax as default } from 'framer-motion';
