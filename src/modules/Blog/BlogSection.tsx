import { rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPostsResult } from '@lib/cms-api';
import { BlogSectionClient } from '@modules/Blog/BlogSectionClient';

export async function BlogSection({ locale }: { locale: string }) {
  const result = await fetchCmsBlogPostsResult(locale);
  const posts = rowsToCardModels(result.rows);
  if (posts.length === 0) return null;

  return <BlogSectionClient posts={posts} locale={locale} />;
}
