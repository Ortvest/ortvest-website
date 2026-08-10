'use client';

import { useEffect, useRef, useState } from 'react';

import { useIsMobile } from '@shared/hooks/useIsMobile';

type Direction = 'left' | 'right';

interface SectionRevealProps {
  direction: Direction;
  children: React.ReactNode;
  className?: string;
}

type RevealState = 'idle' | 'pending' | 'visible';

export function SectionReveal({ direction, children, className = '' }: SectionRevealProps) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>('idle');

  useEffect(() => {
    if (isMobile) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    setState('pending');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '-60px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  const directionClass = direction === 'left' ? 'section-reveal--from-left' : 'section-reveal--from-right';

  return (
    <div
      ref={ref}
      className={[
        'section-reveal',
        directionClass,
        state === 'pending' ? 'section-reveal--pending' : '',
        state === 'visible' ? 'section-reveal--visible' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}>
      {children}
    </div>
  );
}
