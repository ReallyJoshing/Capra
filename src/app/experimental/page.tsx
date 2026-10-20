import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'The studio — Capra' };

export default function StudioPage() {
  return (
    <main className="studio-page" id="main-content">
      <header className="studio-heading">
        <p className="eyebrow">Capra / The studio</p>
        <h1>An idea in motion.</h1>
      </header>
      <div className="studio-layout">
        <figure className="studio-mark">
          <svg viewBox="190 0 1060 790" role="img" aria-label="The hand-drawn Capra goat in motion">
            <defs>
              <clipPath id="studio-goat">
                <path d="M200 0H1250V745H620V778H300V745H200Z" />
              </clipPath>
            </defs>
            <image
              href="/images/brand/capra-sketch-transparent.png"
              width="1460"
              height="1078"
              clipPath="url(#studio-goat)"
            />
          </svg>
        </figure>
        <section className="studio-copy">
          <p className="eyebrow">It starts with a mark.</p>
          <h2>Free-spirited<br />by nature.</h2>
          <p>Capra means goat. Sure-footed. Curious. A mind of its own.</p>
          <p>To us, the goat stands for a life beyond the fence. Following your curiosity instead of the crowd. Wandering off the expected path. Finding your own way.</p>
          <p>Our identity began with this sketch. We kept the movement of the hand, the uneven lines, and the sense that the next step is already happening.</p>
          <Link href="/vision" className="outline-button">Our story <span aria-hidden="true">↗</span></Link>
        </section>
      </div>
      <section className="studio-notes" aria-label="The spirit behind Capra">
        <div><span>01 / Independence</span><h2>Find your own way.</h2><p>Follow curiosity beyond the familiar path. Leave room for a detour, a different view, a direction that feels like yours.</p></div>
        <div><span>02 / Resolve</span><h2>One foothold at a time.</h2><p>Meet difficult ground with patience and precision. Keep going toward the thing that once looked out of reach.</p></div>
        <div><span>03 / Resourcefulness</span><h2>At home on hard ground.</h2><p>Make the most of what is there. Adapt to the terrain and the unexpected. This is the spirit we bring to developing Capra.</p><Link href="/clothing" className="text-link">Explore the study ↗</Link></div>
      </section>
    </main>
  );
}
