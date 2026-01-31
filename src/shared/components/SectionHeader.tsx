'use client';

import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <header className={`max-w-2xl ${alignClass} ${className}`.trim()}>
      {(eyebrow || Icon) && (
        <div className={`flex items-center gap-2 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
          {Icon && (
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20">
              <Icon className="h-3.5 w-3.5 text-black" />
            </span>
          )}
          {eyebrow && <span className="text-xs font-semibold uppercase tracking-widest text-black/50">{eyebrow}</span>}
        </div>
      )}
      <h2 className="text-h2 text-black">{title}</h2>
      {description && <p className="mt-3 text-body-lg text-black/60">{description}</p>}
    </header>
  );
}
