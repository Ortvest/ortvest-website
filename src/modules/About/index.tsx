import { getTranslations } from 'next-intl/server';

import {
  IconBrain,
  IconEye,
  IconFocus,
  IconHeartHandshake,
  IconShieldCheck,
  IconSparkles,
  IconWorld,
} from '@tabler/icons-react';

const howWeWork = [
  { id: 'business', Icon: IconBrain, index: '1' as const },
  { id: 'limited', Icon: IconFocus, index: '2' as const },
  { id: 'global', Icon: IconWorld, index: '3' as const },
] as const;

const whatDrivesUs = [
  { id: 'quality', Icon: IconShieldCheck, index: '1' as const },
  { id: 'transparency', Icon: IconEye, index: '2' as const },
  { id: 'partnership', Icon: IconHeartHandshake, index: '3' as const },
] as const;

export async function About() {
  const t = await getTranslations('approach');

  return (
    <section id="about" className="bg-black py-20">
      <div className="container-main">
        {/* Section header */}
        <div className="mb-14 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <IconSparkles size={13} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-accent">{t('label')}</span>
          </div>
          <h2 className="mx-auto mb-4 max-w-2xl text-h1 font-bold leading-tight text-white">{t('title')}</h2>
          <p className="mx-auto max-w-xl text-body leading-relaxed text-zinc-500">{t('subtitle')}</p>
        </div>

        {/* Block 1 — Quote card */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
          <span
            className="absolute left-8 top-5 select-none font-serif text-[80px] leading-none text-zinc-800"
            aria-hidden>
            &ldquo;
          </span>
          <p className="relative z-10 mb-5 text-[22px] font-bold leading-relaxed text-white">
            {t('quote.text')}
            <span className="text-accent">{t('quote.em')}</span>
          </p>
          <p className="max-w-2xl text-body-sm leading-relaxed text-zinc-500">{t('quote.body')}</p>
        </div>

        {/* Block 2 — How we work */}
        <p className="mb-4 text-[10px] uppercase tracking-widest text-zinc-600">{t('how.label')}</p>
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {howWeWork.map(({ id, Icon, index }) => (
            <div
              key={id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-colors duration-200 hover:border-zinc-700">
              <Icon size={18} className="mb-3 text-zinc-500" />
              <p className="mb-1 text-[15px] font-semibold text-white">{t(`how.${index}.title`)}</p>
              <p className="text-body-sm leading-relaxed text-zinc-500">{t(`how.${index}.desc`)}</p>
            </div>
          ))}
        </div>

        {/* Block 3 — What drives us */}
        <p className="mb-4 text-[10px] uppercase tracking-widest text-zinc-600">{t('values.label')}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {whatDrivesUs.map(({ id, Icon, index }) => (
            <div
              key={id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors duration-200 hover:border-accent/30">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Icon size={18} className="text-accent" />
              </div>
              <p className="mb-2 text-[16px] font-semibold text-white">{t(`values.${index}.title`)}</p>
              <p className="text-body-sm leading-relaxed text-zinc-500">{t(`values.${index}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
