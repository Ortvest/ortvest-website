import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { BackgroundEffects } from '@shared/components';

import '@shared/styles/global.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ortvest.com';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });
  const title = t('metadata.title');
  const description = t('metadata.description');
  const ogTitle = t('metadata.ogTitle');
  const ogDescription = t('metadata.ogDescription');

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ua: '/ua',
        pl: '/pl',
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `/${locale}`,
      siteName: 'Ortvest',
      locale: locale === 'ua' ? 'uk_UA' : locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

function SchemaOrgScript() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ortvest',
    url: baseUrl,
    description: 'IT studio. Web and mobile development, UI/UX design, and marketing that converts.',
    sameAs: [],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ortvest',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  const services = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ortvest Services',
    itemListElement: [
      { '@type': 'Service', name: 'UI/UX Design' },
      { '@type': 'Service', name: 'Web Design' },
      { '@type': 'Service', name: 'App Design' },
      { '@type': 'Service', name: 'Web Development' },
      { '@type': 'Service', name: 'Mobile Development' },
      { '@type': 'Service', name: 'SEO & Marketing' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(services),
        }}
      />
    </>
  );
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="icon" href="/icons/AppLogo.svg" type="image/svg+xml" />
        <SchemaOrgScript />
      </head>
      <body className="relative min-h-screen bg-white font-sans antialiased text-black">
        <BackgroundEffects />
        <div className="relative z-10 min-h-screen w-full">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
