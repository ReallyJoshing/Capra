import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-invitation">
        <p>The next step<br />is out there.</p>
        <Link href="/" className="outline-button">Home <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="footer-bottom">
        <span>Capra © {new Date().getFullYear()}</span>
        <nav aria-label="Store information">
          <Link href="/experimental">Studio</Link>
          <Link href="/policies/contact">Contact</Link>
          <Link href="/policies/shipping-returns">Shipping & returns</Link>
          <Link href="/policies/privacy">Privacy</Link>
          <Link href="/policies/terms">Terms</Link>
          <Link href="/cart">Bag</Link>
        </nav>
        <p>Collection in development. Prototype checkout only.</p>
      </div>
    </footer>
  );
}
