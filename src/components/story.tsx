import { storefront } from '@/config/storefront';
import { SectionNote } from './section-note';

export function Story() {
  return (
    <section id="story" className="story section" aria-labelledby="story-heading">
      <SectionNote section="story" />
      <div className="story-grid"><h2 id="story-heading">{storefront.story.title}</h2><p>{storefront.story.body}</p></div>
    </section>
  );
}
