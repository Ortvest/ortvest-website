/**
 * Extends the next/font Inter family with extra unicode-range files.
 * These are NOT preloaded on /en — the browser fetches them only when glyphs
 * in that range appear (or when we explicitly preload on /ua).
 *
 * Must use the same font-family name as next/font's hashed Inter instance.
 */
export function LocaleFontFaces({
  fontFamily,
  locale,
}: {
  fontFamily: string;
  locale: string;
}) {
  if (locale === 'en') return null;

  const family = fontFamily.split(',')[0]?.trim().replace(/['"]/g, '') ?? '';
  if (!family) return null;

  const faces: string[] = [];

  // Polish diacritics (also useful for mixed Latin on /ua)
  if (locale === 'pl' || locale === 'ua') {
    faces.push(`
@font-face {
  font-family: '${family}';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}`);
  }

  if (locale === 'ua') {
    faces.push(`
@font-face {
  font-family: '${family}';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-cyrillic.woff2') format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}`);
  }

  return (
    <>
      {locale === 'ua' && (
        <link rel="preload" href="/fonts/inter-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      )}
      {locale === 'pl' && (
        <link rel="preload" href="/fonts/inter-latin-ext.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      )}
      <style dangerouslySetInnerHTML={{ __html: faces.join('\n') }} />
    </>
  );
}
