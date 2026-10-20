import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="commerce-page confirmation">
      <p className="eyebrow">Capra / 404</p>
      <h1>A little off trail.</h1>
      <p>This page isn’t here. There’s still plenty to explore.</p>
      <Link href="/clothing" className="primary-button">Find your way back <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
