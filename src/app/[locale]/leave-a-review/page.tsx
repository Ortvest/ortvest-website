import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { LeaveReviewForm } from '@modules/Reviews/LeaveReviewForm';

export const metadata: Metadata = {
  title: 'Leave a Review | Ortvest',
  description: 'Share your experience working with Ortvest.',
  robots: { index: false, follow: false },
};

export default function LeaveReviewPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <ReduxProvider>
      <Header />
      <main>
        <LeaveReviewForm />
      </main>
      <Footer />
    </ReduxProvider>
  );
}
