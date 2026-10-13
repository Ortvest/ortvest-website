import { getTranslations } from 'next-intl/server';

import { cases } from '@modules/Cases/data';
import { IconArrowRight } from '@tabler/icons-react';

import { type BuildRow, WhatWeBuildExplorer } from './WhatWeBuildExplorer';

const ROWS = [
  { key: 'websites', caseId: 'skisailclub' },
  { key: 'webServices', caseId: 'navexa' },
  { key: 'mobileApps', caseId: 'pachaca' },
  { key: 'platforms', caseId: 'sharingground' },
] as const;

export async function WhatWeBuild({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'servicesSection' });

  const rows: BuildRow[] = ROWS.map(({ key, caseId }) => {
    const caseItem = cases.find((item) => item.id === caseId);
    return {
      key,
      title: t(`build.${key}.title`),
      desc: t(`build.${key}.desc`),
      items: t.raw(`build.${key}.items`) as string[],
      caseId: caseItem?.id,
      caseTitle: caseItem?.title,
      caseIsNDA: caseItem?.isNDA,
    };
  });

  const startAs = [
    { key: 'mvp', title: t('startAs.mvp.title'), desc: t('startAs.mvp.desc') },
    { key: 'upgrade', title: t('startAs.upgrade.title'), desc: t('startAs.upgrade.desc') },
    { key: 'designOnly', title: t('startAs.designOnly.title'), desc: t('startAs.designOnly.desc') },
  ];

  return (
    <section id="services" className="bg-zinc-950 py-20" aria-labelledby="what-we-build-heading">
      <div className="container-main">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-widest text-accent">{t('label')}</p>
            <h2 id="what-we-build-heading" className="text-h1 font-bold leading-tight text-white">
              {t('title')}
            </h2>
          </div>
          <p className="max-w-sm text-body-sm leading-relaxed text-zinc-400 lg:pt-10">{t('subtitle')}</p>
        </div>

        <WhatWeBuildExplorer rows={rows} locale={locale} forExampleLabel={t('proof')} />

        <div className="mt-14 border-b border-t border-zinc-900 py-8">
          <p className="mb-6 text-sm text-zinc-500">{t('startAs.label')}</p>
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-zinc-900">
            {startAs.map(({ key, title, desc }) => (
              <div key={key} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <IconArrowRight size={16} className="shrink-0 text-accent" aria-hidden />
                </div>
                <p className="text-body-sm leading-relaxed text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
