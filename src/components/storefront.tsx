import { storefront } from '@/config/storefront';
import { SectionNote } from './section-note';
import { Hero } from './hero';
import { Collection } from './collection';
import { Story } from './story';
import { CapraLogo } from './capra-logo';

export function Storefront() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="framework-bar"><span>Storefront foundation</span><span>v0 / release</span></div>
      <div className="page-shell">
        <header className="site-header">
          <SectionNote section="header" />
          <div className="header-row"><a href="#" className="wordmark" aria-label={`${storefront.name} home`}><CapraLogo /></a><nav aria-label="Main navigation"><a href="#collection">Collection</a><a href="#story">Our story</a></nav></div>
        </header>
        <main id="main"><Hero /><Collection /><Story /></main>
        <footer className="site-footer">
          <SectionNote section="footer" />
          <div className="footer-row"><span className="wordmark" role="img" aria-label={storefront.name}><CapraLogo /></span><span>{storefront.footer.note}</span></div>
        </footer>
      </div>
    </>
  );
}
