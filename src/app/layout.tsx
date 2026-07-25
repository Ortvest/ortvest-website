import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import Script from 'next/script';

import '@shared/styles/global.css';

const GA_MEASUREMENT_ID = process.env.GOOGLE_ANALYTICS_ID?.trim();
const LINKEDIN_PARTNER_ID = process.env.LINKEDIN_PARTNER_ID?.trim();
const COOKIEYES_SITE_ID = process.env.COOKIEYES_SITE_ID?.trim();

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = headers().get('X-NEXT-INTL-LOCALE');
  const language = locale === 'ua' ? 'uk' : locale === 'pl' ? 'pl' : 'en';

  return (
    <html lang={language} className={inter.variable} suppressHydrationWarning>
      <head>
        {COOKIEYES_SITE_ID && (
          <Script
            id="cookieyes"
            src={`https://cdn-cookieyes.com/client_data/${encodeURIComponent(COOKIEYES_SITE_ID)}/script.js`}
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body suppressHydrationWarning>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});
          `}
            </Script>
          </>
        )}
        {LINKEDIN_PARTNER_ID && (
          <>
            <Script id="linkedin-insight-init" strategy="afterInteractive">
              {`
            _linkedin_partner_id = ${JSON.stringify(LINKEDIN_PARTNER_ID)};
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://px.ads.linkedin.com/collect/?pid=${encodeURIComponent(LINKEDIN_PARTNER_ID)}&fmt=gif`}
              />
            </noscript>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
