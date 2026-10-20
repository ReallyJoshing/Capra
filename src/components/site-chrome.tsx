'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

/** The film owns its viewport; interior pages share the same visual language. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/') return children;

  return (
    <div className="interior-site">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
