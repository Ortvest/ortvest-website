import { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  meta: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, meta, children }: LegalPageLayoutProps) {
  return (
    <main className="max-w-container mx-auto px-6 py-section">
      <h1 className="text-h1 font-bold text-black mb-2">{title}</h1>
      <div className="h-1 w-full bg-black mb-3" />
      <p className="text-body-sm text-gray-500 mb-12">{meta}</p>
      <div className="space-y-10">{children}</div>
    </main>
  );
}
