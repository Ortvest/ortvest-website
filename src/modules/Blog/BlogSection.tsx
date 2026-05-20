import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container, SectionReveal } from '@shared/components';

import { rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPosts } from '@lib/cms-api';
import { BlogPostCard } from '@modules/Blog/BlogPostCard';
import { Newspaper } from 'lucide-react';

export async function BlogSection({ locale }: { locale: string }) {
  const rows = await fetchCmsBlogPosts(locale);
  const models = rowsToCardModels(rows).slice(0, 3);
  if (models.length === 0) return null;

  const t = await getTranslations({ locale, namespace: 'blogSection' });

  return (
    <section id="blog" className="section-padding bg-white" aria-labelledby="blog-heading">
      <Container>
        <SectionReveal direction="left">
          <div className="animate-fade-in opacity-0">
            <header className="mx-auto mb-10 max-w-2xl text-center">
              <div className="mb-3 flex items-center justify-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20">
                  <Newspaper className="h-3.5 w-3.5 text-black" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-black/50">Blog</span>
              </div>
              <h2 id="blog-heading" className="text-h2 text-black">
                {t('title')}
              </h2>
              <p className="mt-3 text-body-lg text-black/60">{t('subtitle')}</p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {models.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href={`/${locale}/blog`}
                className="text-body-lg font-semibold text-black underline decoration-transparent underline-offset-4 transition hover:decoration-accent">
                {t('viewAll')}
              </Link>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
