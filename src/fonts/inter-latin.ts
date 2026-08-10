import { Inter } from 'next/font/google';

/**
 * Primary Inter for all locales — Latin subset only.
 * Kept as a single static next/font instance so /en gets one preload (~40–50 KiB)
 * and it appears early in <head>, not after CSS discovery.
 */
export const interLatin = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
