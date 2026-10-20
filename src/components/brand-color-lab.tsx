'use client';

import { useId, type KeyboardEvent } from 'react';
import { useBrandColors } from '@/components/brand-theme';
import { CapraWordmark } from '@/components/capra-wordmark';
import { brandPalette, defaultBrandColors } from '@/config/brand-palettes';

function ColorTiles({ label, description, value, onChange }: {
  label: string;
  description: string;
  value: string;
  onChange: (color: string) => void;
}) {
  const id = useId();

  function moveSelection(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % brandPalette.length; break;
      case 'ArrowLeft': next = (index - 1 + brandPalette.length) % brandPalette.length; break;
      case 'ArrowDown': next = (index + 10) % brandPalette.length; break;
      case 'ArrowUp': next = (index - 10 + brandPalette.length) % brandPalette.length; break;
      case 'Home': next = 0; break;
      case 'End': next = brandPalette.length - 1; break;
      default: return;
    }
    event.preventDefault();
    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button');
    onChange(brandPalette[next].hex);
    buttons?.[next].focus();
  }

  return (
    <fieldset className="color-tile-panel" role="radiogroup" aria-labelledby={`${id}-label`} aria-describedby={`${id}-description`}>
      <legend id={`${id}-label`}>{label}</legend>
      <p id={`${id}-description`} className="color-tile-description">{description}</p>
      <div className="color-tile-grid">
        {brandPalette.map((color, index) => (
          <button
            key={color.hex}
            type="button"
            role="radio"
            aria-checked={value === color.hex}
            aria-label={`${color.name}, ${color.hex}`}
            title={`${color.name} · ${color.hex.toUpperCase()}`}
            tabIndex={value === color.hex ? 0 : -1}
            style={{ backgroundColor: color.hex }}
            onClick={() => onChange(color.hex)}
            onKeyDown={event => moveSelection(event, index)}
          />
        ))}
      </div>
      <div className="selected-color">
        <span className="selected-color-chip" style={{ backgroundColor: value }} aria-hidden="true" />
        <output aria-live="polite">{value.toUpperCase()}</output>
      </div>
    </fieldset>
  );
}

export function BrandColorLab() {
  const { colors, setColors } = useBrandColors();
  const { primary, secondary } = colors;
  const setPrimary = (primary: string) => setColors({ ...colors, primary });
  const setSecondary = (secondary: string) => setColors({ ...colors, secondary });

  return (
    <div className="brand-color-lab">
      <section className="brand-preview" aria-label="Live brand previews">
        <figure className="brand-preview-title">
          <figcaption>CAPRA title</figcaption>
          <div className="brand-preview-art" role="img" aria-label={`CAPRA wordmark in ${primary} with ${secondary} inlays`}>
            <CapraWordmark />
          </div>
        </figure>
        <figure className="brand-preview-logo">
          <figcaption>Header logo</figcaption>
          <div className="brand-preview-art" role="img" aria-label={`C logo in ${primary} with ${secondary} inlays`}>
            <CapraWordmark monogram />
          </div>
        </figure>
      </section>
      <div className="color-tile-panels">
        <ColorTiles label="Primary color" description="Lettering and the outer star." value={primary} onChange={setPrimary} />
        <ColorTiles label="Secondary color" description="Inset lines and the inner star." value={secondary} onChange={setSecondary} />
      </div>
      <button
        className="text-link lab-reset"
        type="button"
        onClick={() => setColors(defaultBrandColors)}
      >
        Reset to brand colors
      </button>
    </div>
  );
}
