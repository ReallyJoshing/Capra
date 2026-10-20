'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SiteActions } from './site-actions';

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="sketch-link" href="/" aria-label="Capra home">
        <Image src="/images/brand/capra-sketch-transparent.png" alt="" width={1460} height={1078} sizes="(max-width: 639px) 72px, 92px" />
      </Link>
      <SiteActions />
    </header>
  );
}
