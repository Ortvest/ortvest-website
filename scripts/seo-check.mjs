#!/usr/bin/env node
/**
 * SEO regression check.
 *
 * Crawls every URL in the sitemap and asserts the invariants this site relies
 * on. Run it against a local production build before deploying, or against
 * production to confirm what is actually live:
 *
 *   node scripts/seo-check.mjs                      # http://localhost:5199
 *   node scripts/seo-check.mjs https://www.ortvest.com
 *
 * Exit code 1 when any error-level check fails, so it can gate a deploy.
 */

const base = (process.argv[2] ?? 'http://localhost:5199').replace(/\/$/, '');
const CANONICAL_ORIGIN = 'https://www.ortvest.com';

const errors = [];
const warnings = [];

const fail = (url, message) => errors.push({ url, message });
const warn = (url, message) => warnings.push({ url, message });

/** The live origin in canonical/hreflang values, mapped onto whatever we crawl. */
const toCrawlUrl = (canonicalUrl) => canonicalUrl.replace(CANONICAL_ORIGIN, base);
const toCanonicalUrl = (crawlUrl) => crawlUrl.replace(base, CANONICAL_ORIGIN);

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'ortvest-seo-check' } });
  const body = res.status >= 200 && res.status < 300 ? await res.text() : '';
  return { status: res.status, location: res.headers.get('location'), body };
}

const matchAll = (html, re) => [...html.matchAll(re)];
const attr = (html, re) => html.match(re)?.[1] ?? null;

function parseHead(html) {
  return {
    title: attr(html, /<title>([\s\S]*?)<\/title>/i),
    description: attr(html, /<meta name="description" content="([^"]*)"/i),
    canonical: attr(html, /<link rel="canonical" href="([^"]*)"/i),
    robots: attr(html, /<meta name="robots" content="([^"]*)"/i),
    ogImage: attr(html, /<meta property="og:image" content="([^"]*)"/i),
    // Next renders the attribute as hrefLang; HTML attributes are case-insensitive.
    hreflang: matchAll(html, /<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/gi).map((m) => [m[1], m[2]]),
    h1: matchAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map((m) => m[1].replace(/<[^>]+>/g, '').trim()),
    jsonLd: matchAll(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi).map((m) => m[1]),
  };
}

/** Visible text, so structured data can be compared against what the page shows. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

function checkJsonLd(url, head, text) {
  const docs = [];
  for (const raw of head.jsonLd) {
    try {
      docs.push(JSON.parse(raw));
    } catch {
      fail(url, 'JSON-LD block does not parse');
    }
  }

  for (const doc of docs) {
    // FAQ markup must match questions that are actually on the page.
    if (doc['@type'] === 'FAQPage') {
      for (const entry of doc.mainEntity ?? []) {
        const question = String(entry.name ?? '')
          .replace(/\s+/g, ' ')
          .slice(0, 40);
        if (question && !text.includes(question)) {
          fail(url, `FAQPage question is not visible on the page: "${question}…"`);
        }
      }
    }

    if (doc['@type'] === 'BreadcrumbList') {
      const positions = (doc.itemListElement ?? []).map((item) => item.position);
      const expected = positions.map((_, index) => index + 1);
      if (positions.join() !== expected.join()) fail(url, 'BreadcrumbList positions are not sequential from 1');
    }
  }

  return docs;
}

async function checkPage(url, sitemapUrls) {
  const { status, location, body } = await fetchText(url);
  if (status !== 200) {
    fail(url, `expected 200, got ${status}${location ? ` → ${location}` : ''}`);
    return;
  }

  const head = parseHead(body);
  const text = visibleText(body);

  if (!head.title) fail(url, 'missing <title>');
  else if (head.title.length > 65) warn(url, `title is ${head.title.length} chars (over 65)`);

  if (!head.description) fail(url, 'missing meta description');
  else if (head.description.length < 70 || head.description.length > 175) {
    warn(url, `meta description is ${head.description.length} chars (outside 70–175)`);
  }

  if (!head.canonical) fail(url, 'missing canonical');
  else if (head.canonical !== toCanonicalUrl(url)) fail(url, `canonical points elsewhere: ${head.canonical}`);

  if (!head.ogImage) fail(url, 'missing og:image');

  if (head.h1.length === 0) fail(url, 'no <h1>');
  else if (head.h1.length > 1) fail(url, `${head.h1.length} <h1> elements`);

  if (head.robots?.includes('noindex')) fail(url, 'page is in the sitemap but marked noindex');

  // hreflang must be self-referencing when present.
  if (head.hreflang.length > 0) {
    const self = head.hreflang.some(([, href]) => href === toCanonicalUrl(url));
    if (!self) fail(url, 'hreflang set does not include this URL');
    for (const [lang, href] of head.hreflang) {
      if (lang !== 'x-default' && !href.startsWith(CANONICAL_ORIGIN)) {
        fail(url, `hreflang ${lang} points outside the canonical origin: ${href}`);
      }
    }
  }

  checkJsonLd(url, head, text);

  return { url, head };
}

/** Every hreflang target must point back at the page that references it. */
function checkReciprocity(pages) {
  const byUrl = new Map(pages.map((page) => [page.head.canonical, page.head.hreflang]));
  for (const [canonical, alternates] of byUrl) {
    for (const [lang, href] of alternates) {
      if (lang === 'x-default' || href === canonical) continue;
      const back = byUrl.get(href);
      if (!back) {
        warn(canonical, `hreflang ${lang} → ${href} was not in the sitemap, reciprocity unverified`);
        continue;
      }
      if (!back.some(([, h]) => h === canonical)) {
        fail(canonical, `hreflang ${lang} → ${href} does not link back`);
      }
    }
  }
}

async function main() {
  const sitemapRes = await fetch(`${base}/sitemap.xml`);
  if (!sitemapRes.ok) {
    console.error(`Could not read ${base}/sitemap.xml (HTTP ${sitemapRes.status})`);
    process.exit(1);
  }
  const sitemap = await sitemapRes.text();
  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  const duplicates = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
  if (duplicates.length > 0) fail(`${base}/sitemap.xml`, `duplicate URLs: ${[...new Set(duplicates)].join(', ')}`);

  console.log(`Checking ${sitemapUrls.length} URLs from the sitemap against ${base}\n`);

  const pages = [];
  for (const canonicalUrl of sitemapUrls) {
    const result = await checkPage(toCrawlUrl(canonicalUrl), sitemapUrls);
    if (result) pages.push(result);
  }

  checkReciprocity(pages);

  // robots.txt must not block the site and must name the sitemap.
  const robots = await fetchText(`${base}/robots.txt`);
  if (robots.status !== 200) fail(`${base}/robots.txt`, `HTTP ${robots.status}`);
  else {
    if (/^\s*Disallow:\s*\/\s*$/im.test(robots.body)) fail(`${base}/robots.txt`, 'blocks the whole site');
    if (!robots.body.includes('sitemap')) warn(`${base}/robots.txt`, 'does not reference the sitemap');
  }

  for (const { url, message } of warnings) console.log(`  warn   ${url}\n         ${message}`);
  for (const { url, message } of errors) console.log(`  ERROR  ${url}\n         ${message}`);

  console.log(`\n${pages.length} pages checked — ${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
