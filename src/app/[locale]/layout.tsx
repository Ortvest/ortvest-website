import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { fontConfig } from '@shared/config/fontConfig';

import '@shared/styles/global.css';

export const metadata = {
  title: 'Ortvest',
  description: `We create top-quality web and mobile apps, modern designs,
	 and smart bots for leading companies and new businesses.`,
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={fontConfig.className}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
