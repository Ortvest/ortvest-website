import { ReduxProvider } from '@global/store/ReduxProvider';
import { About } from '@modules/About';
import { Cases } from '@modules/Cases';
import { Contact } from '@modules/Contact';
import { FAQ } from '@modules/FAQ';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { Hero } from '@modules/Hero';
import { Modal } from '@modules/Modals';
import { Process } from '@modules/Process';
import { Services } from '@modules/Services';
import { Technologies } from '@modules/Technologies';

export default function Home() {
  return (
    <ReduxProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Technologies />
        <Cases />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Modal />
    </ReduxProvider>
  );
}
