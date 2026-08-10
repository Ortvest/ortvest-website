import '@shared/styles/global.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Script from 'next/script';

import { AnnouncementBar, BackgroundEffects, MotionConfigProvider } from '@shared/components';
import { LocaleFontFaces } from '../../components/LocaleFontFaces';
import { interLatin } from '../../fonts/inter-latin';
import { LAYOUT_CLIENT_NAMESPACES, pickClientMessages } from '../../i18n/client-messages';
import { locales } from '../../i18n/routing';
import { buildLocaleAlternates, SITE_URL } from '@lib/seo';

const baseUrl = SITE_URL;

const GA_MEASUREMENT_ID = process.env.GOOGLE_ANALYTICS_ID?.trim();
const LINKEDIN_PARTNER_ID = process.env.LINKEDIN_PARTNER_ID?.trim();
const COOKIEYES_SITE_ID = process.env.COOKIEYES_SITE_ID?.trim();

// Pre-generate all locale segments statically — no headers() needed.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const title = t('metadata.title');
  const description = t('metadata.description');
  const ogTitle = t('metadata.ogTitle');
  const ogDescription = t('metadata.ogDescription');

  const verification = process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined;

  return {
    title,
    description,
    verification,
    icons: {
      icon: [
        { url: '/icon', type: 'image/png', sizes: '32x32' },
        { url: '/icons/AppLogo.svg', type: 'image/svg+xml', sizes: 'any' },
      ],
      apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
    },
    metadataBase: new URL(baseUrl),
    alternates: buildLocaleAlternates(locale),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${baseUrl}/${locale}`,
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

type FaqItem = { q: string; a: string };

function SchemaOrgScript({ faq }: { faq?: FaqItem[] }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ortvest',
    url: baseUrl,
    description:
      'Ortvest builds marketplaces, P2P products and member networks where participants need to find and trust each other.',
    sameAs: ['https://www.linkedin.com/company/ortvest/', 'https://www.instagram.com/ortvest'],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ortvest',
    url: baseUrl,
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

  const faqSchema =
    faq && faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }
      : null;

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const allMessages = await getMessages({ locale });
  const layoutMessages = pickClientMessages(allMessages, LAYOUT_CLIENT_NAMESPACES);

  const language = locale === 'ua' ? 'uk' : locale === 'pl' ? 'pl' : 'en';

  const faqMessages = (allMessages?.faq ?? {}) as Record<string, string>;
  const faqItems: FaqItem[] = [1, 2, 3, 4, 5, 6, 7, 8].flatMap((i) => {
    const q = faqMessages[`q${i}`];
    const a = faqMessages[`a${i}`];
    return q && a ? [{ q, a }] : [];
  });

  return (
    <html lang={language} className={interLatin.variable} suppressHydrationWarning>
      <head>
        <LocaleFontFaces fontFamily={interLatin.style.fontFamily} locale={locale} />
        {(GA_MEASUREMENT_ID || COOKIEYES_SITE_ID) && (
          <Script id="consent-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
            `}
          </Script>
        )}
        {COOKIEYES_SITE_ID && (
          <Script
            id="cookieyes"
            src={`https://cdn-cookieyes.com/client_data/${encodeURIComponent(COOKIEYES_SITE_ID)}/script.js`}
            strategy="lazyOnload"
          />
        )}
      </head>
      <body suppressHydrationWarning>
        {GA_MEASUREMENT_ID && COOKIEYES_SITE_ID && (
          <Script id="google-analytics-consent" strategy="lazyOnload">
            {`
              (function(measurementId) {
                var loaded = false;

                function getCookieValue(name) {
                  var prefix = name + '=';
                  var parts = document.cookie.split(';');
                  for (var i = 0; i < parts.length; i++) {
                    var part = parts[i].trim();
                    if (part.indexOf(prefix) === 0) {
                      return decodeURIComponent(part.substring(prefix.length));
                    }
                  }
                  return null;
                }

                function isAnalyticsAcceptedFromCookie() {
                  var raw = getCookieValue('cookieyes-consent');
                  if (!raw) return false;
                  var pairs = raw.split(',');
                  for (var i = 0; i < pairs.length; i++) {
                    var parts = pairs[i].split(':');
                    if (parts.length === 2 && parts[0] === 'analytics' && parts[1] === 'yes') {
                      return true;
                    }
                  }
                  return false;
                }

                function isAnalyticsAcceptedFromApi() {
                  if (typeof window.getCkyConsent !== 'function') return false;
                  try {
                    var consent = window.getCkyConsent();
                    return !!(consent && consent.categories && consent.categories.analytics);
                  } catch (e) {
                    return false;
                  }
                }

                function hasStoredAnalyticsConsent() {
                  return isAnalyticsAcceptedFromCookie() || isAnalyticsAcceptedFromApi();
                }

                function isAnalyticsAcceptedFromEvent(data) {
                  if (!data) return false;
                  if (data.accepted && data.accepted.indexOf('analytics') !== -1) return true;
                  if (data.categories && data.categories.analytics === true) return true;
                  return false;
                }

                function updateConsentFromCookie() {
                  if (typeof gtag !== 'function') return;
                  var raw = getCookieValue('cookieyes-consent');
                  if (!raw) return;
                  var parsed = {};
                  var pairs = raw.split(',');
                  for (var i = 0; i < pairs.length; i++) {
                    var parts = pairs[i].split(':');
                    if (parts.length === 2) parsed[parts[0]] = parts[1];
                  }
                  gtag('consent', 'update', {
                    analytics_storage: parsed.analytics === 'yes' ? 'granted' : 'denied',
                    ad_storage: parsed.advertisement === 'yes' ? 'granted' : 'denied',
                    ad_user_data: parsed.advertisement === 'yes' ? 'granted' : 'denied',
                    ad_personalization: parsed.advertisement === 'yes' ? 'granted' : 'denied',
                  });
                }

                function loadGoogleAnalytics() {
                  if (loaded) return;
                  loaded = true;
                  updateConsentFromCookie();

                  var script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
                  script.onload = function() {
                    gtag('js', new Date());
                    gtag('config', measurementId);
                  };
                  document.head.appendChild(script);
                }

                if (hasStoredAnalyticsConsent()) {
                  loadGoogleAnalytics();
                }

                document.addEventListener('cookieyes_consent_update', function(eventData) {
                  if (isAnalyticsAcceptedFromEvent(eventData.detail)) {
                    loadGoogleAnalytics();
                  }
                });
              })(${JSON.stringify(GA_MEASUREMENT_ID)});
            `}
          </Script>
        )}
        {LINKEDIN_PARTNER_ID && COOKIEYES_SITE_ID && (
          <Script id="linkedin-insight-consent" strategy="lazyOnload">
            {`
              (function(partnerId) {
                var loaded = false;

                function getCookieValue(name) {
                  var prefix = name + '=';
                  var parts = document.cookie.split(';');
                  for (var i = 0; i < parts.length; i++) {
                    var part = parts[i].trim();
                    if (part.indexOf(prefix) === 0) {
                      return decodeURIComponent(part.substring(prefix.length));
                    }
                  }
                  return null;
                }

                function isAdvertisementAcceptedFromCookie() {
                  var raw = getCookieValue('cookieyes-consent');
                  if (!raw) return false;
                  var pairs = raw.split(',');
                  for (var i = 0; i < pairs.length; i++) {
                    var parts = pairs[i].split(':');
                    if (parts.length === 2 && parts[0] === 'advertisement' && parts[1] === 'yes') {
                      return true;
                    }
                  }
                  return false;
                }

                function isAdvertisementAcceptedFromApi() {
                  if (typeof window.getCkyConsent !== 'function') return false;
                  try {
                    var consent = window.getCkyConsent();
                    return !!(consent && consent.categories && consent.categories.advertisement);
                  } catch (e) {
                    return false;
                  }
                }

                function hasStoredAdvertisementConsent() {
                  return isAdvertisementAcceptedFromCookie() || isAdvertisementAcceptedFromApi();
                }

                function isAdvertisementAcceptedFromEvent(data) {
                  if (!data) return false;
                  if (data.accepted && data.accepted.indexOf('advertisement') !== -1) return true;
                  if (data.categories && data.categories.advertisement === true) return true;
                  return false;
                }

                function loadLinkedInInsight() {
                  if (loaded) return;
                  loaded = true;
                  window._linkedin_partner_id = partnerId;
                  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                  window._linkedin_data_partner_ids.push(partnerId);
                  (function(l) {
                    if (!l) {
                      window.lintrk = function(a, b) { window.lintrk.q.push([a, b]); };
                      window.lintrk.q = [];
                    }
                    var s = document.getElementsByTagName("script")[0];
                    var b = document.createElement("script");
                    b.type = "text/javascript";
                    b.async = true;
                    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                    s.parentNode.insertBefore(b, s);
                  })(window.lintrk);
                }

                if (hasStoredAdvertisementConsent()) {
                  loadLinkedInInsight();
                }

                document.addEventListener("cookieyes_consent_update", function(eventData) {
                  if (isAdvertisementAcceptedFromEvent(eventData.detail)) {
                    loadLinkedInInsight();
                  }
                });
              })(${JSON.stringify(LINKEDIN_PARTNER_ID)});
            `}
          </Script>
        )}
        <div className="relative min-h-screen bg-white font-sans antialiased text-black">
          <SchemaOrgScript faq={faqItems} />
          <BackgroundEffects />
          <div className="relative z-10 min-h-screen w-full">
            <AnnouncementBar locale={locale} />
            <NextIntlClientProvider locale={locale} messages={layoutMessages}>
              <MotionConfigProvider>{children}</MotionConfigProvider>
            </NextIntlClientProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
