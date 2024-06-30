import { fontConfig } from '@shared/config/fontConfig';

import '@shared/styles/global.css';

export const metadata = {
  title: 'Ortvest',
  description: `We create top-quality web and mobile apps, modern designs,
	 and smart bots for leading companies and new businesses.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fontConfig.className}>{children}</body>
    </html>
  );
}
