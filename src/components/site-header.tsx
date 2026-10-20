'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BagLink } from '@/components/bag-link';
import { navigation } from '@/config/navigation';

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpenMenu(null), [pathname]);

  useEffect(() => {
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, []);

  return (
    <header
      className="site-header"
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && openMenu) {
          event.preventDefault();
          document.getElementById(`nav-trigger-${openMenu}`)?.focus();
          setOpenMenu(null);
        }
      }}
    >
      <Link className="header-brand" href="/" aria-label="Capra home" onClick={() => setOpenMenu(null)}>
        <Image className="header-sketch" src="/images/brand/capra-sketch.png" alt="" width={1459} height={1078} sizes="(max-width: 639px) 76px, 100px" />
      </Link>
      <nav className="header-nav" aria-label="Main navigation">
        <ul className="nav-list">
          {navigation.map((menu) => (
            <li
              className="nav-group"
              key={menu.id}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setOpenMenu(menu.items.length ? menu.id : null);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) {
                  setOpenMenu((current) => current === menu.id ? null : current);
                }
              }}
            >
              <Link
                className="nav-trigger"
                href={menu.href}
                id={`nav-trigger-${menu.id}`}
                aria-current={pathname === menu.href ? 'page' : undefined}
                aria-expanded={menu.items.length ? openMenu === menu.id : undefined}
                aria-controls={menu.items.length ? `nav-panel-${menu.id}` : undefined}
                onClick={() => setOpenMenu(null)}
                onFocus={() => setOpenMenu((current) => current === menu.id ? current : null)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown' && menu.items.length) {
                    event.preventDefault();
                    setOpenMenu(menu.id);
                    requestAnimationFrame(() => document.getElementById(`nav-panel-${menu.id}`)?.querySelector('a')?.focus());
                  }
                }}
              >
                {menu.label}
              </Link>
              {menu.items.length > 0 && <div className="nav-dropdown" hidden={openMenu !== menu.id}>
                <div
                  className="nav-panel"
                  id={`nav-panel-${menu.id}`}
                  aria-labelledby={`nav-trigger-${menu.id}`}
                  tabIndex={-1}
                >
                  <ul className="nav-items">
                    {menu.items.map((item) => (
                      <li key={item.label}>
                        <Link className="nav-link" href={item.href} onClick={() => setOpenMenu(null)}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>}
            </li>
          ))}
        </ul>
      </nav>
      <BagLink />
    </header>
  );
}
