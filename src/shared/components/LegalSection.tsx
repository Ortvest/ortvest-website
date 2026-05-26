import { ReactNode } from 'react';

interface LegalSectionProps {
  number: string;
  title: string;
  children: ReactNode;
}

export function LegalSection({ number, title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="text-h3 font-semibold text-black border-b-2 border-black pb-1 mb-4">
        {number}. {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function LegalSubheading({ children }: { children: ReactNode }) {
  return <h3 className="text-body font-semibold text-black mb-2">{children}</h3>;
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className="text-body text-gray-700 leading-relaxed">{children}</p>;
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-body text-gray-700">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
