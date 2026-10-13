import { Suspense } from 'react';

import { unstable_setRequestLocale } from 'next-intl/server';

// Revalidate every 5 minutes so blog posts appear without a redeploy.
export const revalidate = 300;

import { ReduxProvider } from '@global/store/ReduxProvider';
import { buildFaqSchema } from '@lib/schema';
import { About } from '@modules/About';
import { BlogSection } from '@modules/Blog/BlogSection';
import { BlogSectionSkeleton } from '@modules/Blog/BlogSectionSkeleton';
import { Cases } from '@modules/Cases';
import { Consultation } from '@modules/Consultation';
import { Contact } from '@modules/Contact';
import { FAQ, getHomeFaqItems } from '@modules/FAQ';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Hero } from '@modules/Hero';
import { Industries } from '@modules/Industries';
import { Modal } from '@modules/Modals';
import { Process } from '@modules/Process';
import { Reviews } from '@modules/Reviews';
import { ServiceLinksStrip } from '@modules/Services/ServiceLinksStrip';
import { WhatWeBuild } from '@modules/Services/WhatWeBuild';
import { Team } from '@modules/Team';
import { Technologies } from '@modules/Technologies';

import { JsonLd } from '../../components/JsonLd';
import { RouteIntlProvider } from '../../components/RouteIntlProvider';
import { SectionDivider } from '../../components/SectionDivider';
import { HOME_CLIENT_NAMESPACES } from '../../i18n/client-messages';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  // FAQPage markup lives here because this is where the questions are
  // actually rendered — not in the layout.
  const faqItems = await getHomeFaqItems(locale);

  return (
    <ReduxProvider>
      <JsonLd schema={buildFaqSchema(faqItems)} />
      <Header />
      <RouteIntlProvider locale={locale} namespaces={HOME_CLIENT_NAMESPACES}>
        <main>
          <Hero />
          <SectionDivider />
          {/* Proof before self-description: the work comes straight after the hero. */}
          <Cases />
          <WhatWeBuild locale={locale} />
          <ServiceLinksStrip locale={locale} />
          {/* <Industries /> */}
          {/* <Process /> */}
          {/* <Technologies /> */}
          <About />
          <Team />
          <Reviews />
          <Consultation />
          <Suspense fallback={<BlogSectionSkeleton />}>
            <BlogSection locale={locale} />
          </Suspense>

          <FAQ />
          <Contact />
        </main>
      </RouteIntlProvider>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
