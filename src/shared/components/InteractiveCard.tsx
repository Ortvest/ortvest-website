'use client';

import { ReactNode } from 'react';

import { hoverLift } from '@lib/motion';
import { motion } from 'framer-motion';

interface InteractiveCardProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'li';
  href?: string;
}

export function InteractiveCard({ children, icon, className = '' }: InteractiveCardProps) {
  return (
    <motion.div
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl
        border border-black/[0.08] bg-white p-5
        shadow-card transition-shadow duration-300
        hover:shadow-card-hover hover:border-accent/20
        ${className}
      `
        .replace(/\s+/g, ' ')
        .trim()}
      {...hoverLift}>
      {/* Subtle shine on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
        }}
        aria-hidden
      />

      {icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-black transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
      )}
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </motion.div>
  );
}
