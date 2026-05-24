import { rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPosts } from '@lib/cms-api';
import { BlogSectionClient } from '@modules/Blog/BlogSectionClient';

export async function BlogSection({ locale }: { locale: string }) {
  const rows = await fetchCmsBlogPosts(locale);
  const posts = rowsToCardModels(rows);
  if (posts.length === 0) return null;

  return <BlogSectionClient posts={posts} locale={locale} />;
}
