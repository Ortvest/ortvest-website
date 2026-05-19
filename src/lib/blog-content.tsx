/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

function isRecord(v: unknown): v is Record<string, unknown> {
  return Boolean(v && typeof v === 'object' && !Array.isArray(v));
}

function codeBlockPlainText(node: Record<string, unknown>): string {
  const parts: string[] = [];
  const walk = (n: unknown) => {
    if (!isRecord(n)) return;
    if (n.type === 'text' && typeof n.text === 'string') {
      parts.push(n.text);
      return;
    }
    const c = n.content;
    if (Array.isArray(c)) c.forEach(walk);
  };
  walk(node);
  return parts.join('');
}

/** Recursively collect plain text from a TipTap / ProseMirror JSON doc. */
export function plainTextFromTiptap(content: unknown): string {
  if (content == null) return '';
  if (typeof content === 'string') {
    const s = content.trim();
    if (!s) return '';
    if (s.startsWith('<')) {
      return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    return s;
  }
  if (!isRecord(content)) return '';

  const t = content.type;
  if (t === 'text' && typeof content.text === 'string') return content.text;

  const children = content.content;
  if (!Array.isArray(children)) {
    if (t === 'hardBreak') return '\n';
    return '';
  }

  let out = '';
  for (const child of children) {
    out += plainTextFromTiptap(child);
    if (t === 'paragraph' || t === 'heading' || t === 'blockquote') out += ' ';
  }
  return out;
}

export function wordCountFromContent(content: unknown): number {
  const text = plainTextFromTiptap(content).trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

export function readMinutesFromContent(content: unknown): number {
  const words = wordCountFromContent(content);
  return Math.max(1, Math.ceil(words / 200));
}

export function excerptFromContent(content: unknown, maxLen = 160): string {
  const text = plainTextFromTiptap(content).replace(/\s+/g, ' ').trim();
  if (!text) return '';
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1).trim()}…`;
}

export function metaDescriptionFromPost(content: unknown, title: string): string {
  const ex = excerptFromContent(content, 160);
  if (ex) return ex;
  return title.slice(0, 160);
}

/** True if value looks like TipTap JSON doc. */
export function isTiptapDoc(content: unknown): boolean {
  return isRecord(content) && content.type === 'doc' && Array.isArray(content.content);
}

/** True if string looks like HTML. */
export function isHtmlString(content: unknown): content is string {
  return typeof content === 'string' && /<\s*[a-z][\s\S]*>/i.test(content.trim());
}

type TiptapMark = { type: string; attrs?: Record<string, unknown> };

function renderMarks(text: string, marks: TiptapMark[] | undefined, keyPrefix: string): React.ReactNode {
  if (!marks?.length) return text;
  let node: React.ReactNode = text;
  let i = 0;
  for (const mark of marks) {
    const k = `${keyPrefix}-m${i++}`;
    switch (mark.type) {
      case 'bold':
        node = <strong key={k}>{node}</strong>;
        break;
      case 'italic':
        node = <em key={k}>{node}</em>;
        break;
      case 'strike':
        node = <s key={k}>{node}</s>;
        break;
      case 'underline':
        node = (
          <span key={k} className="underline">
            {node}
          </span>
        );
        break;
      case 'code':
        node = (
          <code
            key={k}
            className="rounded px-1.5 py-0.5 font-mono text-sm bg-black/[0.06] text-black/90">
            {node}
          </code>
        );
        break;
      case 'link': {
        const href = String(mark.attrs?.href ?? '#');
        node = (
          <a
            key={k}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline decoration-transparent underline-offset-2 transition hover:underline hover:decoration-accent">
            {node}
          </a>
        );
        break;
      }
      default:
        break;
    }
  }
  return node;
}

function renderDocContent(nodes: unknown[] | undefined, keyPrefix: string): React.ReactNode[] {
  if (!nodes?.length) return [];
  return nodes.map((n, i) => renderNode(n, `${keyPrefix}-${i}`));
}

function renderTextChildren(nodes: unknown[] | undefined, keyPrefix: string): React.ReactNode[] {
  if (!nodes?.length) return [];
  const out: React.ReactNode[] = [];
  nodes.forEach((n, i) => {
    if (!isRecord(n)) return;
    if (n.type === 'text' && typeof n.text === 'string') {
      out.push(renderMarks(n.text, n.marks as TiptapMark[] | undefined, `${keyPrefix}-t${i}`));
    } else if (n.type === 'hardBreak') {
      out.push(<br key={`${keyPrefix}-br${i}`} />);
    }
  });
  return out;
}

function renderNode(node: unknown, key: string): React.ReactNode {
  if (!isRecord(node)) return null;
  const type = node.type as string;
  const content = node.content as unknown[] | undefined;

  switch (type) {
    case 'doc':
      return (
        <div key={key} className="blog-article-body">
          {renderDocContent(content, key)}
        </div>
      );
    case 'paragraph':
      return (
        <p key={key} className="mb-4">
          {renderTextChildren(content, key)}
        </p>
      );
    case 'heading': {
      const level = Number((node.attrs as any)?.level ?? 2);
      const className = 'mt-8 mb-2 font-bold text-black';
      const kids = renderTextChildren(content, key);
      if (level <= 1)
        return (
          <h2 key={key} className={`${className} text-h3`}>
            {kids}
          </h2>
        );
      if (level === 2)
        return (
          <h3 key={key} className={`${className} text-h4`}>
            {kids}
          </h3>
        );
      return (
        <h4 key={key} className={`${className} text-body-lg`}>
          {kids}
        </h4>
      );
    }
    case 'bulletList':
      return (
        <ul key={key} className="mb-4 list-disc space-y-1 pl-6 leading-[1.8]">
          {renderDocContent(content, key)}
        </ul>
      );
    case 'orderedList':
      return (
        <ol key={key} className="mb-4 list-decimal space-y-1 pl-6 leading-[1.8]">
          {renderDocContent(content, key)}
        </ol>
      );
    case 'listItem':
      return (
        <li key={key} className="leading-[1.8]">
          {renderDocContent(content, key)}
        </li>
      );
    case 'blockquote':
      return (
        <blockquote
          key={key}
          className="my-4 border-l-[3px] border-accent py-1 pl-4 italic text-black/60">
          {renderDocContent(content, key)}
        </blockquote>
      );
    case 'codeBlock': {
      const text = codeBlockPlainText(node);
      return (
        <pre
          key={key}
          className="my-4 overflow-x-auto rounded-lg bg-black p-4 text-sm text-white/90">
          <code>{text}</code>
        </pre>
      );
    }
    case 'horizontalRule':
      return <hr key={key} className="my-8 border-black/10" />;
    case 'image': {
      const src = String((node.attrs as any)?.src ?? '');
      const alt = String((node.attrs as any)?.alt ?? '');
      if (!src) return null;
      return (
        <img
          key={key}
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto my-6 max-h-[560px] w-full rounded-lg object-contain"
        />
      );
    }
    default:
      return null;
  }
}

/** Render CMS `content` (TipTap JSON or HTML string) for article body. */
export function BlogArticleContent({ content }: { content: unknown }) {
  if (content == null) return null;
  if (isHtmlString(content)) {
    return (
      <div
        className="blog-article-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
  if (isTiptapDoc(content)) {
    return <>{renderNode(content, 'root')}</>;
  }
  if (typeof content === 'string' && content.trim()) {
    return <div className="blog-article-body whitespace-pre-wrap">{content}</div>;
  }
  return null;
}
