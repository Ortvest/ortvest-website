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
import { Reviews } from '@modules/Reviews';
import { ServicesSection } from '@modules/Services/ServicesSection';
import { Team } from '@modules/Team';
import { Technologies } from '@modules/Technologies';

import { SectionDivider } from '../../components/SectionDivider';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <ReduxProvider>
      <Header />
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
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
