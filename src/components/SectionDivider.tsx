import { getTranslations } from 'next-intl/server';

export async function SectionDivider() {
  const t = await getTranslations('divider');

  return (
    <div className="bg-black">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:items-center sm:gap-6">
          <div className="hidden h-px w-full flex-1 bg-zinc-900 sm:block" />

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-center sm:gap-4 md:gap-8">
              <div className="flex flex-col items-center sm:min-w-0">
                <p className="text-center text-[15px] font-bold text-accent sm:text-[24px] sm:font-extrabold sm:tracking-tight sm:text-white">
                  5
                </p>
                <p className="mt-0.5 text-center text-[12px] leading-tight text-zinc-400 sm:mt-0.5 sm:whitespace-nowrap sm:text-[11px]">
                  {t('platforms')}
                </p>
              </div>

              <span className="hidden flex-shrink-0 text-zinc-500 sm:inline">·</span>

              <div className="flex flex-col items-center sm:min-w-0">
                <p className="text-center text-[15px] font-bold text-accent sm:text-[24px] sm:font-extrabold sm:tracking-tight sm:text-white">
                  15
                </p>
                <p className="mt-0.5 text-center text-[12px] leading-tight text-zinc-400 sm:mt-0.5 sm:whitespace-nowrap sm:text-[11px]">
                  {t('people')}
                </p>
              </div>

              <span className="hidden flex-shrink-0 text-zinc-500 sm:inline">·</span>

              <div className="flex flex-col items-center sm:min-w-0">
                <p className="text-center text-[15px] font-bold text-accent sm:text-[24px] sm:font-extrabold sm:tracking-tight sm:text-white">
                  3
                </p>
                <p className="mt-0.5 text-center text-[12px] leading-tight text-zinc-400 sm:mt-0.5 sm:whitespace-nowrap sm:text-[11px]">
                  {t('industries')}
                </p>
              </div>
            </div>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-500">{t('industryList')}</p>
          </div>

          <div className="hidden h-px w-full flex-1 bg-zinc-900 sm:block" />
        </div>
      </div>
    </div>
  );
}
