import { getTranslations } from 'next-intl/server';

export async function SectionDivider() {
  const t = await getTranslations('divider');

  return (
    <div className="bg-black">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:items-center sm:gap-6">
          <div className="hidden h-px w-full flex-1 bg-zinc-900 sm:block" />

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-center sm:gap-8">
            <div className="flex flex-col items-center sm:min-w-0">
              <p className="text-center text-[15px] font-bold text-accent sm:text-[24px] sm:font-extrabold sm:tracking-tight sm:text-white">
                15<span className="sm:text-accent">+</span>
              </p>
              <p className="mt-0.5 text-center text-[12px] leading-tight text-zinc-400 sm:mt-0.5 sm:text-[11px]">
                {t('years')}
              </p>
            </div>

            <span className="hidden flex-shrink-0 text-zinc-500 sm:inline">·</span>

            <div className="flex flex-col items-center sm:min-w-0">
              <p className="text-center text-[15px] font-bold text-accent sm:text-[24px] sm:font-extrabold sm:tracking-tight sm:text-white">
                10<span className="sm:text-accent">+</span>
              </p>
              <p className="mt-0.5 text-center text-[12px] leading-tight text-zinc-400 sm:mt-0.5 sm:text-[11px]">
                {t('products')}
              </p>
            </div>

            <span className="hidden flex-shrink-0 text-zinc-500 sm:inline">·</span>

            <div className="flex flex-col items-center sm:min-w-0">
              <p className="text-center text-[15px] font-bold text-accent sm:text-[24px] sm:font-extrabold sm:tracking-tight sm:text-white">
                7
              </p>
              <p className="mt-0.5 text-center text-[12px] leading-tight text-zinc-400 sm:mt-0.5 sm:text-[11px]">
                {t('niches')}
              </p>
            </div>
          </div>

          <div className="hidden h-px w-full flex-1 bg-zinc-900 sm:block" />
        </div>
      </div>
    </div>
  );
}
