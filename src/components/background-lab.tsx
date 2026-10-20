'use client';

import Link from 'next/link';
import { backgrounds } from '@/config/backgrounds';
import { useHomeBackground } from '@/components/home-background';
import { CapraLogo } from '@/components/capra-logo';

export function BackgroundLab() {
  const { selected, select } = useHomeBackground();
  return (
    <section className="background-lab" aria-labelledby="background-heading">
      <div className="catalog-heading">
        <p className="eyebrow">Experimental / Homepage background</p>
        <h2 id="background-heading">Set the scene.</h2>
        <p>Choose a background for your homepage. Saved in this browser and synced across its open tabs.</p>
      </div>
      <div className="background-preview" style={{ backgroundImage: selected.src ? `url("${selected.src}")` : 'none' }}>
        <div className="background-preview-wordmark"><CapraLogo /></div>
      </div>
      <div className="background-options" role="group" aria-label="Homepage backgrounds">
        {backgrounds.map(background => <button key={background.id} type="button" aria-pressed={selected.id === background.id} onClick={() => select(background.id)}>
          <span className="background-thumbnail" style={{ backgroundImage: background.src ? `url("${background.src}")` : 'none' }} />
          <span>{background.label}</span>
        </button>)}
      </div>
      <p className="background-selection" role="status">Selected: {selected.label}</p>
      <Link className="text-link" href="/">View homepage</Link>
    </section>
  );
}
