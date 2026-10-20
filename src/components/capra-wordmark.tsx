import lettering from '@/assets/capra-wordmark.json';

export function CapraWordmark({ monogram = false, suffix = false }: { monogram?: boolean; suffix?: boolean }) {
  const glyphs = suffix ? lettering.glyphs.slice(1) : monogram ? lettering.glyphs.slice(0, 1) : lettering.glyphs;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={suffix ? '825.09 0 3126.63 760' : monogram ? '40 0 800 760' : lettering.viewBox}
      aria-hidden="true"
      focusable="false"
      className="wordmark-art"
    >
      <g className="wordmark-material">
        {glyphs.map((glyph, index) => <path key={index} d={glyph.outline} />)}
      </g>
      <g className="wordmark-inlines">
        {glyphs.map((glyph, index) => (
          <path key={index} d={glyph.inline} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      {!suffix && <g className="wordmark-stars" transform="translate(444 377)">
        <path className="wordmark-star-outer" d="M0-210C32.31-60.58 60.58-32.31 210 0C60.58 32.31 32.31 60.58 0 210C-32.31 60.58-60.58 32.31-210 0C-60.58-32.31-32.31-60.58 0-210Z" />
        <path className="wordmark-star-inner" d="M0-104C6.93-23.77 23.77-6.93 104 0C23.77 6.93 6.93 23.77 0 104C-6.93 23.77-23.77 6.93-104 0C-23.77-6.93-6.93-23.77 0-104Z" />
      </g>}
    </svg>
  );
}
