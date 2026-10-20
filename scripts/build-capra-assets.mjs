import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Export the same two-source SVG composition used by CapraLogo.
// The source images stay unchanged; only their visible regions and placement differ.
const directory = new URL('../public/brand/', import.meta.url);
const horn = (await readFile(new URL('capra-horn-source.png', directory))).toString('base64');
const letters = (await readFile(new URL('capra-lettering-source.png', directory))).toString('base64');
const ink = '0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -.4 -.4 -.4 0 1.14';
const hornClip = 'M0 0H1089V541H0Z M385 245H970V400H690V440H515V400H385Z';
const lettersClip = 'M650 350H1850V650H1295V745H960V650H650Z';

function svg({ monogram = false, share = false } = {}) {
  const viewBox = monogram ? '141 60 440 440' : share ? '0 0 1089 541' : '160 60 810 440';
  const size = monogram ? 'width="440" height="440"' : share ? 'width="1089" height="541"' : 'width="810" height="440"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" ${size}>
  <style>.mark{fill:#20201e}${monogram ? '@media(prefers-color-scheme:dark){.mark{fill:#f5f5f2}}' : ''}</style>
  <defs>
    <filter id="ink" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${ink}"/></filter>
    <mask id="horn-mask" x="0" y="0" width="1089" height="541" maskUnits="userSpaceOnUse" style="mask-type:alpha">
      <image href="data:image/png;base64,${horn}" width="1089" height="541" filter="url(#ink)"/>
    </mask>
    <clipPath id="horn"><path d="${hornClip}" clip-rule="evenodd"/></clipPath>
    ${monogram ? '' : `<mask id="letters-mask" x="0" y="0" width="1983" height="793" maskUnits="userSpaceOnUse" style="mask-type:alpha">
      <image href="data:image/png;base64,${letters}" width="1983" height="793"/>
    </mask>
    <clipPath id="letters"><path d="${lettersClip}"/></clipPath>`}
  </defs>
  <rect class="mark" width="1089" height="541" mask="url(#horn-mask)" clip-path="url(#horn)"/>
  ${monogram ? '' : `<g transform="translate(77.6 85.05) scale(.475)">
    <rect class="mark" width="1983" height="793" mask="url(#letters-mask)" clip-path="url(#letters)"/>
  </g>`}
</svg>\n`.replace(/[ \t]+$/gm, '');
}

await writeFile(new URL('capra-logo.svg', directory), svg());
await writeFile(new URL('capra-icon.svg', directory), svg({ monogram: true }));
await sharp(Buffer.from(svg({ share: true }))).png().toFile(new URL('capra-reference.png', directory).pathname);
console.log('Exported the combined logo, transparent C icon and share image from the supplied artwork.');
