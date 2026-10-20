import lettering from '@/assets/odle-wordmark.json';

export function OdleWordmark({ monogram = false, suffix = false }: { monogram?: boolean; suffix?: boolean }) {
  const glyphs = suffix ? lettering.glyphs.slice(1) : monogram ? lettering.glyphs.slice(0, 1) : lettering.glyphs;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={suffix ? '970 0 2100 760' : monogram ? '40 0 850 760' : lettering.viewBox}
      aria-hidden="true"
      focusable="false"
      className="wordmark-art"
    >
      <g className="wordmark-material">
        {glyphs.map((glyph) => <path key={glyph.letter} d={glyph.outline} />)}
      </g>
      <g className="wordmark-inlines">
        {glyphs.map((glyph) => (
          <path key={glyph.letter} d={glyph.inline} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      {!suffix && <g className="wordmark-stars" transform="translate(464 377)">
        <path className="wordmark-star-outer" d="M0-210C32.31-60.58 60.58-32.31 210 0C60.58 32.31 32.31 60.58 0 210C-32.31 60.58-60.58 32.31-210 0C-60.58-32.31-32.31-60.58 0-210Z" />
        <path className="wordmark-star-inner" d="M0-104C6.93-23.77 23.77-6.93 104 0C23.77 6.93 6.93 23.77 0 104C-6.93 23.77-23.77 6.93-104 0C-23.77-6.93-6.93-23.77 0-104Z" />
      </g>}
    </svg>
  );
}
