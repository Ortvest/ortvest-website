'use client';

import { useIsMobile } from '@shared/hooks/useIsMobile';

import { motion } from 'framer-motion';

type Direction = 'left' | 'right';

interface SectionRevealProps {
  direction: Direction;
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ direction, children, className = '' }: SectionRevealProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  const x = direction === 'left' ? -20 : 20;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}
