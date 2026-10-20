'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

/** Each homepage direction owns its composition; collection routes keep theirs. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/') return children;

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
