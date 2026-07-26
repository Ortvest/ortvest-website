'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { IconChevronDown } from '@tabler/icons-react';

interface PartnershipSelectProps<T extends string> {
  id: string;
  label: React.ReactNode;
  value: T | '';
  placeholder: string;
  options: readonly T[];
  getOptionLabel: (value: T) => string;
  onChange: (value: T) => void;
}

export function PartnershipSelect<T extends string>({
  id,
  label,
  value,
  placeholder,
  options,
  getOptionLabel,
  onChange,
}: PartnershipSelectProps<T>) {
  const listboxId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selectedLabel = value ? getOptionLabel(value) : placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-200">
        {label}
      </label>

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((prev) => !prev)}
        className={
          'flex w-full items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white ' +
          'px-4 py-2.5 text-left text-sm transition focus:border-accent/60 focus:outline-none ' +
          'focus:ring-2 focus:ring-accent/20 ' +
          (value ? 'text-zinc-950' : 'text-zinc-500')
        }>
        <span className="truncate">{selectedLabel}</span>
        <IconChevronDown
          size={16}
          className={`shrink-0 text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className={
            'absolute left-0 right-0 top-full z-50 mt-1.5 max-h-60 overflow-auto ' +
            'rounded-xl border border-zinc-200 bg-white py-1 shadow-lg'
          }>
          {options.map((option) => {
            const isSelected = value === option;
            return (
              <li key={option} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={
                    'w-full px-4 py-2.5 text-left text-sm transition ' +
                    (isSelected
                      ? 'bg-accent/15 font-medium text-zinc-950'
                      : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950')
                  }>
                  {getOptionLabel(option)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
