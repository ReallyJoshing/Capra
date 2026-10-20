'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BagLink } from './bag-link';
import { navigation } from '@/config/navigation';

export function SiteActions() {
  const pathname = usePathname();
  return (
    <nav className="site-actions" aria-label="Main navigation">
      {navigation.map(page => (
        <Link
          key={page.href}
          href={page.href}
          transitionTypes={pathname === '/' ? ['home-navigation'] : undefined}
          aria-current={pathname === page.href ? 'page' : undefined}
        >
          {page.label}
        </Link>
      ))}
      <BagLink />
    </nav>
  );
}
