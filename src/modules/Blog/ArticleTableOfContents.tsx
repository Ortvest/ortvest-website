import type { ArticleHeading } from '@lib/blog-content';

type Props = {
  headings: ArticleHeading[];
  title: string;
};

function HeadingLinks({ headings }: { headings: ArticleHeading[] }) {
  return (
    <ol className="space-y-2.5">
      {headings.map((heading, index) => (
        <li key={heading.id} className="flex gap-2 text-sm leading-snug">
          <span className="text-black/30" aria-hidden="true">
            {index + 1}.
          </span>
          <a className="text-black/60 transition hover:text-black" href={`#${heading.id}`}>
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function ArticleTableOfContents({ headings, title }: Props) {
  return (
    <>
      <details className="mb-8 rounded-xl border border-black/10 bg-black/[0.025] p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold text-black">{title}</summary>
        <nav className="mt-4 border-t border-black/10 pt-4" aria-label={title}>
          <HeadingLinks headings={headings} />
        </nav>
      </details>

      <aside className="absolute right-full top-0 hidden w-[220px] pr-12 lg:block">
        <nav className="sticky top-24 border-l border-black/10 pl-5" aria-label={title}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-black/40">{title}</p>
          <HeadingLinks headings={headings} />
        </nav>
      </aside>
    </>
  );
}
