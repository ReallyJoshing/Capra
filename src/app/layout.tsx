import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';

const navigationFont = localFont({
  src: './fonts/Archivo-Variable.ttf',
  variable: '--font-navigation',
  display: 'swap',
  weight: '100 900',
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'Capra',
  description: 'Born in the Washington backcountry. A vision for capable layers, freedom of movement, and a lifetime of shared adventure.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={navigationFont.variable}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
