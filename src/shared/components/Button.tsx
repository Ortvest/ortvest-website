'use client';

import { ReactNode } from 'react';

import Link from 'next/link';

import { buttonHover } from '@lib/motion';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
  iconRight?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white hover:bg-black/90 shadow-sm',
  secondary: 'border-2 border-black bg-white text-black hover:bg-black hover:text-white',
  ghost: 'bg-transparent text-black hover:bg-black/5',
  accent: 'bg-accent text-black hover:bg-accent-dark shadow-sm',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

export function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconRight = false,
}: ButtonProps) {
  const baseClass =
    `inline-flex items-center justify-center font-semibold rounded-full transition-colors ${variants[variant]} ${sizes[size]} ${className}`.trim();

  const content = (
    <>
      {icon && !iconRight && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconRight && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.span {...buttonHover}>
        <Link href={href} className={baseClass}>
          {content}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={baseClass} {...buttonHover}>
      {content}
    </motion.button>
  );
}
