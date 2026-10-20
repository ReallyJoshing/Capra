'use client';

import { usePathname } from 'next/navigation';
import { ViewTransition } from 'react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

/** The film owns its viewport; interior pages share the same visual language. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <ViewTransition
      key={isHome ? 'home' : 'interior'}
      default="none"
      exit={{ 'home-navigation': 'page-out', default: 'none' }}
      enter={{ 'home-navigation': 'page-in', default: 'none' }}
    >
      {isHome ? children : (
        <div className="interior-site">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      )}
    </ViewTransition>
  );
}
