import Image from 'next/image';
import Link from 'next/link';
import { CapraHero } from '@/components/capra-hero';

export default function Page() {
  return (
    <main className="capra-home" id="main-content">
      <section className="capra-hero-stage" aria-labelledby="capra-opening-title">
        <div className="capra-hero-sticky">
          <div className="capra-opening">
            <div className="capra-opening-index" aria-hidden="true">
              <span>Capra / Washington backcountry</span>
              <span>Made for the feeling</span>
            </div>

            <h1 className="capra-opening-mark" id="capra-opening-title">
              <Image
                src="/images/brand/capra-sketch.png"
                alt="Capra"
                width={1459}
                height={1078}
                sizes="(max-width: 639px) 82vw, (max-width: 1023px) 68vw, 470px"
                preload
              />
            </h1>

            <div className="capra-opening-bottom">
              <p className="capra-opening-kicker">The good kind of out of breath.</p>
              <div className="capra-opening-statement">
                <h2>Make the day<br />you imagined real.</h2>
                <div>
                  <p>For the early start, the shared effort, and the feeling that stays long after you arrive.</p>
                  <a href="#capra-outro" className="capra-scroll-link">Follow the feeling <span aria-hidden="true">↓</span></a>
                </div>
              </div>
            </div>
          </div>
          <CapraHero />
        </div>
      </section>

      <section className="capra-outro" id="capra-outro" aria-labelledby="capra-outro-title">
        <p className="capra-outro-index">Capra / The way out</p>
        <h2 id="capra-outro-title">Every hard-earned mile brings us here.</h2>
        <div className="capra-outro-bottom">
          <p>Capra began in the Washington backcountry: moving with friends, meeting the weather, and staying long enough to feel at home. We are building a vision for the clothes that belong on those days.</p>
          <div className="capra-outro-links">
            <Link href="/vision">Explore our vision <span aria-hidden="true">↗</span></Link>
            <Link href="/clothing">See the collection <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <p className="capra-film-note">Film scenes are illustrative; they do not show Capra products or product testing.</p>
      </section>
    </main>
  );
}
