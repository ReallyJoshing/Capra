'use client';

import { useId } from 'react';

/** Displays the original artwork; the masks let its two parts share the color lab. */
export function CapraLogo({ monogram = false }: { monogram?: boolean }) {
  const id = useId().replace(/:/g, '');
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="270 230 720 770"
    aria-hidden="true" focusable="false" className="wordmark-art capra-logo">
    <defs>
      <filter id={`${id}-ink`} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -.4 -.4 -.4 0 1.14" />
      </filter>
      <mask id={`${id}-mark`} x="0" y="0" width="1254" height="1254" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
        <image href="/brand/capra-reference.png" width="1254" height="1254" filter={`url(#${id}-ink)`} />
      </mask>
      <clipPath id={`${id}-horn`}><path d="M0 0H1254V1254H0Z M430 548V735H990V548Z" clipRule="evenodd" /></clipPath>
      <clipPath id={`${id}-letters`}><rect x="430" y="548" width="560" height="187" /></clipPath>
    </defs>
    <g mask={`url(#${id}-mark)`}>
      <rect width="1254" height="1254" fill="var(--wordmark-color)" clipPath={`url(#${id}-horn)`} />
      {!monogram && <rect width="1254" height="1254" fill="var(--wordmark-inlay-color)" clipPath={`url(#${id}-letters)`} />}
    </g>
  </svg>;
}
