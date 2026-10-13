import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@lib/schema';
import { buildHreflangLanguages, SITE_URL } from '@lib/seo';
import type { FaqItem } from '@modules/FAQ/FAQAccordion';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Modal } from '@modules/Modals';
import { ServicePage } from '@modules/Services/ServicePage';
import { findServicePage, SERVICE_PAGES, servicePath } from '@modules/Services/servicePages';

import { JsonLd } from '../../../../components/JsonLd';

// Related posts come from the CMS, so follow the same ISR window as the blog.
export const revalidate = 300;

const baseUrl = SITE_URL;

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return SERVICE_PAGES.flatMap((page) => page.locales.map((locale) => ({ locale, slug: page.slug })));
}

// Any locale/slug pair not listed above is a 404, never rendered on demand.
export const dynamicParams = false;

export async function generateMetadata({ params: { locale, slug } }: Props) {
  const definition = findServicePage(slug);
  if (!definition || !definition.locales.includes(locale)) return {};

  const t = await getTranslations({ locale, namespace: `servicePages.${slug}.meta` });
  const path = servicePath(locale, slug);

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: buildHreflangLanguages(definition.locales, (loc) => `${baseUrl}/${loc}${servicePath(loc, slug)}`),
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

export default async function ServiceDetailPage({ params: { locale, slug } }: Props) {
  const definition = findServicePage(slug);
  if (!definition || !definition.locales.includes(locale)) {
    notFound();
  }
  unstable_setRequestLocale(locale);

  const [t, tNav] = await Promise.all([
    getTranslations({ locale, namespace: `servicePages.${slug}` }),
    getTranslations({ locale, namespace: 'nav' }),
  ]);

  // The same questions rendered in the FAQ accordion below — Google requires
  // the marked-up Q&A to be visible on the page.
  const faqItems = t.raw('faq.items') as FaqItem[];

  return (
    <ReduxProvider>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(locale, tNav('home'), [
            { name: tNav('services'), path: servicePath(locale) },
            { name: t('hero.eyebrow') },
          ]),
          buildServiceSchema({
            locale,
            path: servicePath(locale, slug),
            name: t('hero.title'),
            description: t('meta.description'),
          }),
          buildFaqSchema(faqItems),
        ]}
      />
      <Header />
      <ServicePage locale={locale} definition={definition} />
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
