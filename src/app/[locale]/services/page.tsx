import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { buildBreadcrumbSchema, buildServiceListSchema } from '@lib/schema';
import { buildHreflangLanguages, SITE_URL } from '@lib/seo';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';
import { SERVICE_INDEX_LOCALES, servicePagesForLocale, servicePath } from '@modules/Services/servicePages';
import { IconArrowRight } from '@tabler/icons-react';

import { JsonLd } from '../../../components/JsonLd';

const baseUrl = SITE_URL;

type Props = { params: { locale: string } };

export function generateStaticParams() {
  return SERVICE_INDEX_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params: { locale } }: Props) {
  if (!SERVICE_INDEX_LOCALES.includes(locale)) return {};

  const t = await getTranslations({ locale, namespace: 'servicesIndex.meta' });
  const path = servicePath(locale);

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: buildHreflangLanguages(SERVICE_INDEX_LOCALES, (loc) => `${baseUrl}/${loc}${servicePath(loc)}`),
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${baseUrl}/${locale}${path}`,
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

export default async function ServicesIndexPage({ params: { locale } }: Props) {
  if (!SERVICE_INDEX_LOCALES.includes(locale)) {
    notFound();
  }
  unstable_setRequestLocale(locale);

  const pages = servicePagesForLocale(locale);
  const [t, tNav, tPages] = await Promise.all([
    getTranslations({ locale, namespace: 'servicesIndex' }),
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'servicePages' }),
  ]);

  const cards = pages.map((page) => ({
    slug: page.slug,
    path: servicePath(locale, page.slug),
    name: tPages(`${page.slug}.hero.title`),
    eyebrow: tPages(`${page.slug}.hero.eyebrow`),
    description: tPages(`${page.slug}.cardSummary`),
  }));

  return (
    <ReduxProvider>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(locale, tNav('home'), [{ name: tNav('services') }]),
          buildServiceListSchema(locale, t('meta.title'), servicePath(locale), cards),
        ]}
      />
      <Header />
      <main>
        <section className="bg-black py-20 sm:py-28" aria-labelledby="services-index-heading">
          <div className="container-main">
            <p className="mb-4 text-xs uppercase tracking-widest text-accent">{t('hero.eyebrow')}</p>
            <h1
              id="services-index-heading"
              className="mb-6 max-w-3xl text-[2.25rem] font-bold leading-[1.1] text-white sm:text-[3.25rem]">
              {t('hero.title')}
            </h1>
            <p className="max-w-2xl text-body leading-relaxed text-zinc-400">{t('hero.subtitle')}</p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-main">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {cards.map((card) => (
                <Link
                  key={card.slug}
                  href={`/${locale}${card.path}`}
                  className="group flex flex-col rounded-2xl border border-black/[0.08] bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                  <span className="mb-3 text-xs uppercase tracking-widest text-accent-dark">{card.eyebrow}</span>
                  <h2 className="mb-3 text-h3 font-bold text-black">{card.name}</h2>
                  <p className="flex-1 text-body-sm leading-relaxed text-black/60">{card.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-body-sm font-medium text-black transition-colors group-hover:text-accent-dark">
                    {card.eyebrow}
                    <IconArrowRight size={14} aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 py-20">
          <div className="container-main text-center">
            <h2 className="mb-4 text-h2 font-bold text-white">{t('cta.title')}</h2>
            <p className="mx-auto mb-8 max-w-xl text-body text-zinc-400">{t('cta.body')}</p>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition hover:opacity-85">
              {t('cta.button')}
              <IconArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
