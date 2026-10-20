import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Studio — Capra' };

export default function ExperimentalPage() {
  return (
    <main className="catalog-page experimental-page" id="main-content">
      <div className="catalog-heading">
        <p className="eyebrow">Capra / Studio</p>
        <h1>A mark made by hand.</h1>
        <p>A mountain goat in motion. The sketch that leads the Capra site.</p>
      </div>
      <img
        src="/images/brand/capra-sketch.png"
        alt="Hand-drawn mountain goat above the Capra name"
        width="1459"
        height="1078"
        style={{ display: 'block', width: 'min(100%, 700px)', height: 'auto', margin: '3rem auto' }}
      />
    </main>
  );
}
