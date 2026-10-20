import type { Metadata } from 'next';
import { BackgroundLab } from '@/components/background-lab';
import { BrandColorLab } from '@/components/brand-color-lab';

export const metadata: Metadata = { title: 'Experimental | Capra' };

export default function ExperimentalPage() {
  return (
    <main className="catalog-page experimental-page" id="main-content">
      <div className="catalog-heading">
        <p className="eyebrow">Experimental / Color study</p>
        <h1>Find the right pairing.</h1>
        <p>Select colors to update the Capra horn and lettering across the app. Saved in this browser.</p>
      </div>
      <BrandColorLab />
      <BackgroundLab />
    </main>
  );
}
