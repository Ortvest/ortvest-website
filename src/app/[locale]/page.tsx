import { Suspense } from 'react';

import { unstable_setRequestLocale } from 'next-intl/server';

// Revalidate every 5 minutes so blog posts appear without a redeploy.
export const revalidate = 300;

import { RouteIntlProvider } from '../../components/RouteIntlProvider';
import { HOME_CLIENT_NAMESPACES } from '../../i18n/client-messages';
import { ReduxProvider } from '@global/store/ReduxProvider';
import { About } from '@modules/About';
import { BlogSection } from '@modules/Blog/BlogSection';
import { BlogSectionSkeleton } from '@modules/Blog/BlogSectionSkeleton';
import { Cases } from '@modules/Cases';
import { Consultation } from '@modules/Consultation';
import { Contact } from '@modules/Contact';
import { FAQ } from '@modules/FAQ';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Hero } from '@modules/Hero';
import { Industries } from '@modules/Industries';
import { Modal } from '@modules/Modals';
import { Process } from '@modules/Process';
import { Reviews } from '@modules/Reviews';
import { ServicesSection } from '@modules/Services/ServicesSection';
import { Team } from '@modules/Team';
import { Technologies } from '@modules/Technologies';

import { SectionDivider } from '../../components/SectionDivider';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <ReduxProvider>
      <Header />
      <RouteIntlProvider locale={locale} namespaces={HOME_CLIENT_NAMESPACES}>
        <main>
          <Hero />
          <SectionDivider />
          <About />
          <Team />
          <Suspense fallback={<div className="section-padding bg-zinc-950" />}>
            <ServicesSection />
          </Suspense>
          {/* <Industries /> */}
          {/* <Process /> */}
          {/* <Technologies /> */}
          <Reviews />
          <Cases />

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
