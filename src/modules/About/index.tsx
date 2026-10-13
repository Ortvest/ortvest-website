import { getTranslations } from 'next-intl/server';

import {
  IconArrowRight,
  IconBan,
  IconBolt,
  type IconProps,
  IconShieldCheck,
  IconSparkles,
  IconTool,
  IconWorld,
  IconX,
} from '@tabler/icons-react';

const FAILURE_MODES = ['marketingSite', 'fieldApp', 'bookingFlow'] as const;

const PRINCIPLES: Array<{ namespace: 'how' | 'values'; index: string; Icon: React.ComponentType<IconProps> }> = [
  { namespace: 'how', index: '1', Icon: IconSparkles },
  { namespace: 'how', index: '2', Icon: IconBan },
  { namespace: 'how', index: '3', Icon: IconWorld },
  { namespace: 'values', index: '1', Icon: IconBolt },
  { namespace: 'values', index: '2', Icon: IconShieldCheck },
  { namespace: 'values', index: '3', Icon: IconTool },
];

/** Splits off the final word so the headline can echo the reference's accent-colored close. */
function splitLastWord(text: string) {
  const words = text.trim().split(' ');
  const last = words.pop() ?? '';
  return { rest: words.join(' '), last };
}

export async function About() {
  const t = await getTranslations('approach');

  const { rest: titleRest, last: titleLast } = splitLastWord(t('title'));

  const principles = PRINCIPLES.map(({ namespace, index, Icon }) => ({
    key: `${namespace}-${index}`,
    Icon,
    title: t(`${namespace}.${index}.title`),
    description: t(`${namespace}.${index}.desc`),
  }));

  const columns = [
    { key: 'how', label: t('how.label'), items: principles.slice(0, 3) },
    { key: 'values', label: t('values.label'), items: principles.slice(3, 6) },
  ];

  return (
    <section id="about" className="bg-black py-20">
      <div className="container-main">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-widest text-accent">{t('label')}</p>
            <h2 className="text-h1 font-bold leading-tight text-white">
              {titleRest} <span className="text-accent">{titleLast}</span>
            </h2>
          </div>
          <p className="max-w-sm text-body-sm leading-relaxed text-zinc-400 lg:pt-10">{t('subtitle')}</p>
        </div>

        {/* Same brief, three ways to fail */}
        <div className="mb-16">
          <div className="mb-7 flex items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">{t('failureModes.label')}</p>
            <a
              href="#contact"
              className="group hidden items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500
                transition hover:text-accent sm:flex">
              {t('failureModes.cta')}
              <IconArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
          <div className="grid gap-8 border-t border-zinc-800 sm:grid-cols-3 sm:divide-x sm:divide-zinc-800">
            {FAILURE_MODES.map((key) => (
              <div key={key} className="pt-7 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <p className="text-[11px] uppercase tracking-widest text-zinc-500">
                  {t(`failureModes.items.${key}.label`)}
                </p>
                <p className="mt-3 text-[22px] font-bold leading-snug text-white">
                  {t(`failureModes.items.${key}.textBefore`)}
                  <span className="bg-accent px-1 text-black">{t(`failureModes.items.${key}.highlight`)}</span>
                </p>
                <p className="mt-4 flex items-center gap-1.5 text-body-sm text-zinc-500">
                  <IconX size={13} className="shrink-0" aria-hidden />
                  {t(`failureModes.items.${key}.fails`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How we work / What the product needs */}
        <div className="grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {columns.map(({ key, label, items }) => (
            <div key={key}>
              <p className="mb-2 text-[10px] uppercase tracking-widest text-zinc-500">{label}</p>
              <div>
                {items.map(({ key: itemKey, Icon, title, description }, position) => (
                  <div key={itemKey} className="flex gap-4 border-t border-zinc-900 py-6">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border
                        border-zinc-800">
                      <Icon size={16} className="text-accent" aria-hidden />
                    </span>
                    <div>
                      <span className="font-mono text-xs text-accent">
                        {String(key === 'how' ? position + 1 : position + 4).padStart(2, '0')}
                      </span>
                      <h3 className="mt-1 text-[17px] font-semibold leading-snug text-white">{title}</h3>
                      <p className="mt-2 text-body-sm leading-relaxed text-zinc-400">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
