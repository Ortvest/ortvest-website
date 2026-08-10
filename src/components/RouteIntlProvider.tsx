import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { pickClientMessages } from '../i18n/client-messages';

type RouteIntlProviderProps = {
  locale: string;
  namespaces: readonly string[];
  caseStudyId?: string;
  children: React.ReactNode;
};

export async function RouteIntlProvider({ locale, namespaces, caseStudyId, children }: RouteIntlProviderProps) {
  const allMessages = await getMessages({ locale });
  const messages = pickClientMessages(allMessages, namespaces, { caseStudyId });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
