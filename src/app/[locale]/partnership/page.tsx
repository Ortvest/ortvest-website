import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { RouteIntlProvider } from '../../../components/RouteIntlProvider';
import { PARTNERSHIP_CLIENT_NAMESPACES } from '../../../i18n/client-messages';
import { ReduxProvider } from '@global/store/ReduxProvider';
import { buildLocaleAlternates, SITE_URL } from '@lib/seo';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';
import { PartnershipForm } from '@modules/Partnership/PartnershipForm';
import {
  IconAnchor,
  IconBuildingSkyscraper,
  IconCode,
  IconHeartHandshake,
  IconMessageQuestion,
  IconSparkles,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';

const PROOF_CARDS = [
  { key: '1' as const, Icon: IconUsersGroup },
  { key: '2' as const, Icon: IconAnchor },
  { key: '3' as const, Icon: IconMessageQuestion },
];

const baseUrl = SITE_URL;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'partnership.meta' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
    alternates: buildLocaleAlternates(locale, '/partnership'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${baseUrl}/${locale}/partnership`,
      siteName: 'Ortvest',
      locale: locale === 'ua' ? 'uk_UA' : locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
  };
}

const MODEL_ICONS = {
  embedded: IconUsers,
  equity: IconBuildingSkyscraper,
  cto: IconCode,
} as const;

type ModelKey = keyof typeof MODEL_ICONS;

export default async function PartnershipPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'partnership' });

  const contrastItems = t.raw('contrast.items') as Array<{ vendor: string; partner: string }>;
  const notForItems = t.raw('notFor.items') as string[];
  const modelKeys: ModelKey[] = ['embedded', 'equity', 'cto'];

  return (
    <ReduxProvider>
      <Header />

      <RouteIntlProvider locale={locale} namespaces={PARTNERSHIP_CLIENT_NAMESPACES}>
        <main>
        {/* ── 1. HERO ──────────────────────────────────────────── */}
        <section className="bg-black py-24 sm:py-32">
          <div className="container-main">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <IconSparkles size={13} className="text-accent" />
                <span className="text-xs uppercase tracking-widest text-accent">{t('hero.eyebrow')}</span>
              </div>
              <h1 className="mb-6 text-[2.5rem] font-bold leading-[1.1] text-white sm:text-[3.25rem]">
                {t('hero.title')}
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-body leading-relaxed text-zinc-400">{t('hero.subtitle')}</p>
              <a
                href="#models"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-accent hover:text-accent">
                {t('hero.cta')} ↓
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. VENDOR VS PARTNER ─────────────────────────────── */}
        <section className="bg-zinc-950 py-20">
          <div className="container-main">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-400">{t('contrast.label')}</span>
            </div>
            <h2 className="mb-12 text-center text-h2 font-bold text-white">{t('contrast.title')}</h2>

            <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-zinc-800">
              {/* Header row */}
              <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-900">
                <div className="px-6 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {t('contrast.vendorHeading')}
                </div>
                <div className="border-l border-zinc-800 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-accent">
                  {t('contrast.partnerHeading')}
                </div>
              </div>
              {/* Rows */}
              {contrastItems.map((item, i) => (
                <div key={i} className="grid grid-cols-2 border-b border-zinc-800 last:border-0">
                  <div className="px-6 py-4 text-sm text-zinc-400">{item.vendor}</div>
                  <div className="border-l border-zinc-800 px-6 py-4 text-sm font-medium text-white">
                    {item.partner}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. ENGAGEMENT MODELS ─────────────────────────────── */}
        <section id="models" className="bg-black py-20">
          <div className="container-main">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-400">{t('models.label')}</span>
            </div>
            <h2 className="mb-12 text-center text-h2 font-bold text-white">{t('models.title')}</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {modelKeys.map((key) => {
                const Icon = MODEL_ICONS[key];
                return (
                  <div
                    key={key}
                    className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700">
                    <span className="mb-4 text-xs font-semibold tabular-nums text-zinc-600">
                      {t(`models.${key}.number`)}
                    </span>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <h3 className="mb-4 text-lg font-semibold text-white">{t(`models.${key}.title`)}</h3>

                    <div className="mb-3">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                        {t('models.whoLabel')}
                      </p>
                      <p className="text-sm leading-relaxed text-zinc-400">{t(`models.${key}.who`)}</p>
                    </div>

                    <div className="mb-3">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                        {t('models.whatLabel')}
                      </p>
                      <p className="text-sm leading-relaxed text-zinc-400">{t(`models.${key}.what`)}</p>
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
                        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                          {t('models.termsLabel')}
                        </p>
                        <p className="text-xs text-zinc-400">{t(`models.${key}.terms`)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. WHO THIS IS NOT FOR ───────────────────────────── */}
        <section className="bg-zinc-950 py-20">
          <div className="container-main">
            <div className="mx-auto max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-400">{t('notFor.label')}</span>
              </div>
              <h2 className="mb-8 text-h2 font-bold text-white">{t('notFor.title')}</h2>
              <ul className="space-y-3">
                {notForItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span className="text-sm leading-relaxed text-zinc-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 5. PROOF ─────────────────────────────────────────── */}
        <section className="bg-black py-20">
          <div className="container-main">
            <div className="mb-3 flex items-center justify-center gap-2">
              <IconHeartHandshake size={13} className="text-accent" />
              <span className="text-xs uppercase tracking-widest text-accent">{t('proof.label')}</span>
            </div>
            <h2 className="mx-auto mb-4 max-w-2xl text-center text-h2 font-bold text-white">{t('proof.title')}</h2>
            <p className="mx-auto mb-12 max-w-xl text-center text-body leading-relaxed text-zinc-400">
              {t('proof.subtitle')}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-stretch">
              {PROOF_CARDS.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-700">
                  <Icon size={18} className="mb-3 shrink-0 text-zinc-400" stroke={1.75} />
                  <p className="mb-2 min-h-0 text-[13px] font-semibold leading-snug text-white sm:min-h-[2.75rem] sm:text-[15px]">
                    {t(`proof.cards.${key}.title`)}
                  </p>
                  <p className="flex-1 text-body-sm leading-relaxed text-zinc-400">{t(`proof.cards.${key}.body`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. APPLICATION FORM ──────────────────────────────── */}
        <section id="apply" className="bg-zinc-950 py-20">
          <div className="container-main">
            <div className="mx-auto max-w-xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-400">{t('form.eyebrow')}</span>
              </div>
              <h2 className="mb-2 text-h2 font-bold text-white">{t('form.title')}</h2>
              <p className="mb-8 text-sm leading-relaxed text-zinc-300">{t('form.subtitle')}</p>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
                <PartnershipForm />
              </div>
            </div>
          </div>
        </section>
        </main>
      </RouteIntlProvider>

      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
