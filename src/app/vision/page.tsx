import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our vision | Capra',
  description: 'Born in the Washington backcountry. Our vision for capable layers, freedom of movement, and trust earned over a lifetime of shared adventure.',
};

export default function VisionPage() {
  return (
    <main className="vision-page" id="main-content">
      <header className="vision-intro">
        <p className="vision-label">Our vision</p>
        <h1>At home out there.</h1>
        <p className="vision-deck">Born in the Washington backcountry. A vision for capable layers and a lifetime of shared adventure.</p>
      </header>

      <figure className="vision-landscape">
        <Image src="/images/vision/winchester-ridge.jpg" alt="Two hikers following a rocky trail through autumn color beneath the peaks of Winchester Mountain." width={960} height={540} sizes="(max-width: 639px) 100vw, 92vw" preload />
        <figcaption>Winchester Mountain, Washington</figcaption>
      </figure>

      <section className="vision-opening" aria-labelledby="vision-heart">
        <h2 id="vision-heart">The feeling we keep coming back for.</h2>
        <div>
          <p>You have worked hard to get here. The pack comes off. Your friends settle in beside you. You have enough comfort left to linger, look around, and enjoy where you are.</p>
          <p>That moment is the heart of Capra. The deep satisfaction of knowing the gear you spent your hard-earned money on helped make the whole experience feel this good.</p>
          <p>We want to make clothes that earn a place in those days. Clothes that move naturally with you, hold up to repeated use, and become familiar companions on the way to somewhere new.</p>
        </div>
      </section>

      <section className="vision-conditions" aria-labelledby="vision-conditions-title">
        <h2 id="vision-conditions-title">The conditions shape the clothes.</h2>
        <div className="vision-condition-grid">
          <article>
            <figure>
              <Image src="/images/vision/park-butte-snow.jpg" alt="A backpacker crossing a rocky creek as snow falls through the trees at Park Butte." width={960} height={540} sizes="(max-width: 767px) 92vw, 45vw" />
              <figcaption>Snow and moving water at Park Butte, Washington</figcaption>
            </figure>
            <h3>When the weather comes with you.</h3>
            <p>Falling snow. Water across the trail. A climb followed by a long pause. These are the conditions behind our ambition for thoughtful layers: comfort in motion and when you stop.</p>
            <blockquote><p>“warm nights in cold weather”</p><cite>From the founder’s vision</cite></blockquote>
          </article>
          <article>
            <figure>
              <Image src="/images/vision/thousand-island-rock.jpg" alt="A hiker stepping across loose angular rock on the approach to Thousand Island Lake." width={960} height={540} sizes="(max-width: 767px) 92vw, 45vw" />
              <figcaption>Loose rock on the approach to Thousand Island Lake, California</figcaption>
            </figure>
            <h3>Room to move. Reason to last.</h3>
            <p>A high step over rock. A deep bend at the knee. The repeated contact of a long descent. Fit, fabric, and construction have to be considered together for the life we want these clothes to have.</p>
            <blockquote><p>“Unrestricted mobility and a second skin”</p><cite>From the founder’s vision</cite></blockquote>
          </article>
        </div>
      </section>

      <section className="vision-arrival" aria-labelledby="vision-arrival-title">
        <figure className="vision-landscape">
          <Image src="/images/vision/thousand-island-lake.jpg" alt="A person fishing from the shore of Thousand Island Lake beneath mountains reflected in calm water." width={960} height={540} sizes="(max-width: 639px) 100vw, 92vw" />
          <figcaption>A pause beside Thousand Island Lake, California</figcaption>
        </figure>
        <div className="vision-arrival-copy">
          <h2 id="vision-arrival-title">Stay for a while.</h2>
          <p>The destination deserves your attention. So do the people you came with. We want the care put into a garment to come back to you as ease: freedom to move, settle in, and feel at home in the landscape.</p>
          <blockquote><p>“truly rewarding and relaxing when you reach your destination”</p><cite>From the founder’s vision</cite></blockquote>
        </div>
      </section>

      <section className="vision-company" aria-labelledby="vision-company-title">
        <figure>
          <Image src="/images/vision/thousand-island-camp.jpg" alt="Two friends setting up a tent in a meadow beneath a cloud-filled sky on the Thousand Island Lake trip." width={960} height={540} sizes="(max-width: 767px) 92vw, 52vw" />
          <figcaption>Making camp on the Thousand Island Lake trip, California</figcaption>
        </figure>
        <div>
          <h2 id="vision-company-title">A lifetime of going together.</h2>
          <p>There is warmth in the effort. In pushing yourself with heart in hand. In making camp with the people you hope to keep adventuring with for years.</p>
          <p>Capra is for people who feel that pull toward nature. Experience grows with time; the desire to be out there is where it begins.</p>
        </div>
      </section>

      <section className="vision-trust" aria-labelledby="vision-trust-title">
        <p className="vision-label">Our standard</p>
        <h2 id="vision-trust-title">Every piece has to earn your trust.</h2>
        <p>Every fabric, color, fit, and form deserves a reason. Our love of fashion lives in those decisions: considered proportions, restraint, and close attention to how something feels on the body.</p>
        <p>We want that care to hold up through years of use. It asks us to develop patiently, test thoroughly, be clear about a garment’s limits, and take responsibility for what we make.</p>
        <p>Our ambition is a devoted community whose confidence grows with every piece they choose. The feeling that their money was respected, and that they would choose Capra again.</p>
        <Link className="vision-collection-link" href="/clothing">Explore the collection <span aria-hidden="true">↗</span></Link>
      </section>

      <p className="vision-source-note">Photographs from the JN trip archive. They show the experiences behind our vision and the clothing worn on those original trips.</p>
    </main>
  );
}
