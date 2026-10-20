import Link from 'next/link';
import { CapraLogo } from '@/components/capra-logo';
export function SiteFooter() {
  return <footer className="site-footer">
    <Link className="footer-brand" href="/" aria-label="Capra home"><CapraLogo /></Link>
    <div className="footer-information"><nav aria-label="Store information">
      <Link href="/policies/shipping-returns">Shipping & returns</Link><Link href="/policies/privacy">Privacy</Link><Link href="/policies/terms">Terms</Link><Link href="/policies/contact">Contact</Link>
    </nav><p>Capra · Born in the Washington backcountry.</p><p>Prototype · Test payments only. No physical orders.</p></div>
  </footer>;
}
