import { Suspense } from 'react';

import { unstable_setRequestLocale } from 'next-intl/server';

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
import { Services } from '@modules/Services';
import { Technologies } from '@modules/Technologies';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <ReduxProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <Process />
        <Technologies />
        <Cases />
        <FAQ />
        <Consultation />
        <Suspense fallback={<BlogSectionSkeleton />}>
          <BlogSection locale={locale} />
        </Suspense>
        <Contact />
      </main>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
