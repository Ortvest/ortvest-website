'use client';

import type { TablerIcon } from '@shared/types/icon.types';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: TablerIcon;
  align?: 'left' | 'center';
  className?: string;
  headingId?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  icon: IconComponent,
  align = 'center',
  className = '',
  headingId,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <header className={`max-w-2xl ${alignClass} ${className}`.trim()}>
      {(eyebrow || IconComponent) && (
        <div className={`flex items-center gap-2 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
          {IconComponent && (
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20">
              <IconComponent className="h-3.5 w-3.5 text-black" />
            </span>
          )}
          {eyebrow && <span className="text-xs font-semibold uppercase tracking-widest text-black/50">{eyebrow}</span>}
        </div>
      )}
      <h2 id={headingId} className="text-h2 text-black">
        {title}
      </h2>
      {description && <p className="mt-3 text-body-lg text-black/60">{description}</p>}
    </header>
  );
}
