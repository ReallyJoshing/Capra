'use client';

import { useId } from 'react';

/** Combines the supplied horn and lettering without redrawing either shape. */
export function CapraLogo({ monogram = false }: { monogram?: boolean }) {
  const id = useId().replace(/:/g, '');
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={monogram ? '141 60 440 440' : '160 60 810 440'}
    aria-hidden="true" focusable="false" className="wordmark-art capra-logo">
    <defs>
      <filter id={`${id}-ink`} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -.4 -.4 -.4 0 1.14" />
      </filter>
      <mask id={`${id}-horn-mask`} x="0" y="0" width="1089" height="541" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
        <image href="/brand/capra-horn-source.png" width="1089" height="541" filter={`url(#${id}-ink)`} />
      </mask>
      <mask id={`${id}-letters-mask`} x="0" y="0" width="1983" height="793" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
        <image href="/brand/capra-lettering-source.png" width="1983" height="793" />
      </mask>
      <clipPath id={`${id}-horn`}><path d="M0 0H1089V541H0Z M385 245H970V400H690V440H515V400H385Z" clipRule="evenodd" /></clipPath>
      <clipPath id={`${id}-letters`}><path d="M650 350H1850V650H1295V745H960V650H650Z" /></clipPath>
    </defs>
    <rect width="1089" height="541" fill="var(--wordmark-color)" mask={`url(#${id}-horn-mask)`} clipPath={`url(#${id}-horn)`} />
    {!monogram && <g transform="translate(77.6 85.05) scale(.475)">
      <rect width="1983" height="793" fill="var(--wordmark-inlay-color)" mask={`url(#${id}-letters-mask)`} clipPath={`url(#${id}-letters)`} />
    </g>}
  </svg>;
}
