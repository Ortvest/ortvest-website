import { rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPosts } from '@lib/cms-api';

const baseUrl = 'https://www.ortvest.com';
const feedUrl = `${baseUrl}/blog/rss.xml`;

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<number, string> = {
      34: '&quot;',
      38: '&amp;',
      39: '&apos;',
      60: '&lt;',
      62: '&gt;',
    };
    return entities[character.charCodeAt(0)];
  });
}

export async function GET() {
  const rows = await fetchCmsBlogPosts('en');
  const posts = rowsToCardModels(rows).slice(0, 20);
  const lastBuildDate = posts[0]?.published_at || new Date().toISOString();
  const items = posts
    .map((post) => {
      const url = `${baseUrl}/en/blog/${post.slug}`;
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<description>${escapeXml(post.excerpt)}</description>`,
        `<pubDate>${new Date(post.published_at).toUTCString()}</pubDate>`,
        post.authorName ? `<dc:creator>${escapeXml(post.authorName)}</dc:creator>` : '',
        '</item>',
      ].join('');
    })
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" ',
    'xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '<channel>',
    '<title>Ortvest Field Notes</title>',
    `<link>${baseUrl}/en/blog</link>`,
    '<description>Cold starts, trust systems and practical marketplace building.</description>',
    '<language>en</language>',
    `<lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>`,
    `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
    items,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  });
}
