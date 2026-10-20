'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './cart-store';
export function BagLink() { const { count } = useCart(); const pathname = usePathname(); return <Link href="/cart" className="bag-link" aria-current={pathname === "/cart" ? "page" : undefined} aria-label={`Shopping bag, ${count} items`}>Bag <span>({count})</span></Link>; }
