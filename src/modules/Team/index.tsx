import { getTranslations } from 'next-intl/server';

import { Container, SectionReveal } from '@shared/components';

const GROUPS = [
  { id: 'developers', count: 9, dotClass: 'bg-zinc-950' },
  { id: 'designers', count: 4, dotClass: 'bg-accent' },
] as const;

/** Splits off the final word so the headline can strike through the reference's "20%." close. */
function splitLastWord(text: string) {
  const words = text.trim().split(' ');
  const last = words.pop() ?? '';
  return { rest: words.join(' '), last };
}

export async function Team() {
  const t = await getTranslations('team');

  const { rest: titleRest, last: titleLast } = splitLastWord(t('title'));

  return (
    <section id="team" className="relative overflow-hidden section-padding bg-white" aria-labelledby="team-heading">
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <defs>
          <pattern id="teamDotGrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="#a1a1aa" fillOpacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#teamDotGrid)" />
      </svg>

      <Container className="relative z-10">
        <SectionReveal direction="left">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs uppercase tracking-widest text-zinc-400">{t('label')}</p>
              <h2 id="team-heading" className="text-h1 font-bold leading-tight text-zinc-950">
                {titleRest} <span className="bg-accent px-1 text-black line-through">{titleLast}</span>
              </h2>
            </div>
            <p className="max-w-sm text-body-sm leading-relaxed text-zinc-400 lg:pt-10">{t('subtitle')}</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] uppercase tracking-widest text-zinc-400">{t('wholeStudioLabel')}</p>
              <p className="font-mono text-[11px] text-zinc-400">{t('location')}</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-[2fr_1fr] sm:gap-16">
              {GROUPS.map(({ id, count, dotClass }) => (
                <div key={id} className="flex flex-wrap content-start gap-3">
                  {Array.from({ length: count }).map((_, dotIndex) => (
                    <span key={dotIndex} className={`h-10 w-10 shrink-0 rounded-full ${dotClass}`} aria-hidden />
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-8 border-t border-zinc-200 pt-5 sm:grid-cols-[2fr_1fr] sm:gap-16">
              {GROUPS.map(({ id, count }) => (
                <div key={id} className="flex items-baseline justify-between">
                  <h3 className="text-h3 font-bold text-zinc-950">{t(`${id}.name`)}</h3>
                  <span className="text-body-sm text-zinc-400">{count}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-8 border-t border-zinc-200 pt-6 sm:grid-cols-[2fr_1fr] sm:gap-16">
              {GROUPS.map(({ id }, index) => (
                <div key={id} className={index === 1 ? 'sm:border-l sm:border-zinc-200 sm:pl-16' : undefined}>
                  <p className="mb-2 text-[11px] uppercase tracking-widest text-zinc-400">{t(`${id}.name`)}</p>
                  <p className="text-body-sm leading-relaxed text-zinc-500">{t(`${id}.description`)}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
