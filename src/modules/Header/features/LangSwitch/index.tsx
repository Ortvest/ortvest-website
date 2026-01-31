'use client';

import { useEffect, useRef, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { ChevronDown } from 'lucide-react';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'ua', label: 'UA' },
  { code: 'pl', label: 'PL' },
] as const;

export function LangSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('footer');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  const handleSelect = (newLocale: string) => {
    setOpen(false);
    if (newLocale === locale) return;
    const base = pathname?.replace(/^\/(en|ua|pl)/, '') || '';
    const path = base && base !== '/' ? base : '';
    const newPath = path ? `/${newLocale}${path}` : `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 min-w-[72px] cursor-pointer items-center justify-between gap-1 rounded-xl border border-black/[0.08] bg-white pl-4 pr-3 text-body-sm font-medium text-black outline-none transition hover:border-black/15 focus:ring-2 focus:ring-accent/30 focus:ring-offset-1"
        aria-label={t('language')}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="lang-listbox">
        <span>{current.label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-black/50 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id="lang-listbox"
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1.5 min-w-full overflow-hidden rounded-xl border border-black/[0.08] bg-white py-1 shadow-lg">
          {locales.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={locale === code}>
              <button
                type="button"
                onClick={() => handleSelect(code)}
                className={`w-full px-4 py-2.5 text-left text-body-sm font-medium transition ${
                  locale === code ? 'bg-accent/15 text-black' : 'text-black/70 hover:bg-black/[0.04] hover:text-black'
                }`}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
