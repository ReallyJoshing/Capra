import type { Metadata } from 'next';
import { SiteChrome } from '@/components/site-chrome';
import './globals.css';

export const metadata: Metadata = {
  title: 'Capra',
  description: 'For the ones who dream it. And then go out and do it. Capra.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
