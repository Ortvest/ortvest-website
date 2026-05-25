import { getTranslations } from 'next-intl/server';

export async function SectionDivider() {
  const t = await getTranslations('divider');

  return (
    <div className="bg-black">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="flex items-center gap-6 py-6">
          <div className="h-px flex-1 bg-zinc-900" />

          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-[24px] font-extrabold tracking-tight text-white">
                15<span className="text-accent">+</span>
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-400">{t('years')}</p>
            </div>

            <span className="text-zinc-500">·</span>

            <div className="text-center">
              <p className="text-[24px] font-extrabold tracking-tight text-white">
                10<span className="text-accent">+</span>
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-400">{t('products')}</p>
            </div>

            <span className="text-zinc-500">·</span>

            <div className="text-center">
              <p className="text-[24px] font-extrabold tracking-tight text-white">7</p>
              <p className="mt-0.5 text-[11px] text-zinc-400">{t('niches')}</p>
            </div>
          </div>

          <div className="h-px flex-1 bg-zinc-900" />
        </div>
      </div>
    </div>
  );
}
