import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteChrome } from '@/components/site-chrome';
import './globals.css';

const navigationFont = localFont({
  src: './fonts/Archivo-Variable.ttf',
  variable: '--font-navigation',
  display: 'swap',
  weight: '100 900',
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'Capra',
  description: 'For the ones who dream it. And then go out and do it. Capra.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={navigationFont.variable}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
