import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface AnnouncementBarProps {
  locale: string;
}

export async function AnnouncementBar({ locale }: AnnouncementBarProps) {
  const t = await getTranslations({ locale, namespace: 'partnership.bar' });

  return (
    <div className="w-full border-b-2 border-accent/40 bg-white py-2.5 sm:py-3">
      <div className="container-main flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs text-zinc-700 sm:text-sm">
        <span className="hidden sm:inline">{t('text')}</span>
        <span className="sm:hidden">{t('textMobile')}</span>
        <Link
          href={`/${locale}/partnership`}
          className={
            'whitespace-nowrap rounded-full px-2.5 py-0.5 font-semibold ' +
            'text-black underline-offset-2 transition hover:underline'
          }>
          {t('link')}
        </Link>
      </div>
    </div>
  );
}
