import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const buttonClassName = [
  'mt-6 inline-flex min-h-11 items-center justify-center rounded-full',
  'bg-accent px-5 text-sm font-semibold text-black transition hover:bg-accent-dark',
].join(' ');

export async function ArticleConversionCta({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'blogPage.articleCta' });

  return (
    <aside className="mt-14 rounded-2xl bg-black p-6 text-white sm:p-8" aria-labelledby="article-cta-title">
      <h2 id="article-cta-title" className="text-2xl font-bold leading-tight text-white">
        {t('title')}
      </h2>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-white/65">{t('body')}</p>
      <Link href={`/${locale}#contact`} className={buttonClassName}>
        {t('button')}
      </Link>
    </aside>
  );
}
