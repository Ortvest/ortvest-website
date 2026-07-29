import type { ReactNode } from 'react';

// Root layout is required for app/not-found.tsx to work,
// but <html> and <body> live in app/[locale]/layout.tsx where
// the locale param is statically available (no headers() needed).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
