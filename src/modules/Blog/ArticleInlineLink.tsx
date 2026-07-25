import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href: string;
};

const linkClassName = [
  'mx-0.5 inline-flex items-baseline gap-1 border-b-2 border-accent',
  'font-semibold text-black no-underline transition hover:bg-accent/20',
].join(' ');

export function ArticleInlineLink({ children, href }: Props) {
  return (
    <a href={href} className={linkClassName}>
      <span>{children}</span>
      <span className="text-xs" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
