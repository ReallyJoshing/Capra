import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { BrandTheme } from '@/components/brand-theme';
import { SiteHeader } from '@/components/site-header';
import { CapraLogo } from '@/components/capra-logo';
import './globals.css';
import './capra.css';
import { SiteFooter } from '@/components/site-footer';

const navigationFont = localFont({
  src: './fonts/Fraunces-Variable.ttf',
  variable: '--font-navigation',
  display: 'swap',
  weight: '100 900',
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'Capra',
  metadataBase: new URL(process.env.APP_URL || 'https://odle-storefront.vercel.app'),
  description: 'Born in the Washington backcountry. A vision for capable layers, freedom of movement, and a lifetime of shared adventure.',
  applicationName: 'Capra',
  icons: { icon: '/brand/capra-icon.svg?v=2' },
  openGraph: { title: 'Capra', description: 'Born in the Washington backcountry. Capable layers and a lifetime of shared adventure.', images: [{ url: '/brand/capra-reference.png', width: 1254, height: 1254, alt: 'Capra' }] },
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={navigationFont.variable}>
      <body>
        <BrandTheme />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteHeader logo={<CapraLogo />} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
