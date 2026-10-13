import { serializeJsonLd } from '@lib/seo';

/**
 * Renders one or more JSON-LD documents. Nullish entries are skipped so callers
 * can pass conditional schemas (e.g. an FAQ that may be empty) without guards.
 */
export function JsonLd({ schema }: { schema: unknown | unknown[] }) {
  const items = (Array.isArray(schema) ? schema : [schema]).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <>
      {items.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }} />
      ))}
    </>
  );
}
