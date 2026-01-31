/**
 * Premium motion presets for consistent, smooth animations.
 * Use these across all components for unified feel.
 */

// Premium easing curve
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Durations
export const DURATION = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.85,
} as const;

// Reveal animations (for scroll-triggered content)
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.slow, ease: EASE },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.normal, ease: EASE },
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: DURATION.normal, ease: EASE },
};

// Stagger container for grids
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Stagger item (use with staggerContainer)
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE },
  },
};

// Hover effects for cards
export const hoverLift = {
  whileHover: {
    y: -4,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
    },
  },
};

export const hoverScale = {
  whileHover: {
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

// Viewport trigger options
export const viewport = {
  once: true,
  amount: 0.2,
  margin: '-50px',
};

export const viewportEager = {
  once: true,
  amount: 0.1,
};

// Accordion animation
export const accordionContent = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1, transition: { duration: 0.4, ease: EASE } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

// Button hover
export const buttonHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 25 },
};
