"""Export the CAPRA Archivo wordmark and its pale-sage center lines.

The outlines come from the bundled Archivo variable font at weight 460 and
width 115. Center lines were drawn for this lettering at that exact setting;
they intentionally follow the negative space through the C, A, P, and R.
The four-point star is part of the React component so it can share the site's
two-color styling. No font file is modified.
"""

import json
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
FONT = TTFont(ROOT / 'src/app/fonts/Archivo-Variable.ttf')
GLYPHS = FONT.getGlyphSet(location={'wght': 460, 'wdth': 115})
CMAP = FONT.getBestCmap()
BASELINE = 720
LETTERS = 'CAPRA'
TRACKING = 35


def inline_path(letter, x):
    """Return the center line for one capital in SVG page coordinates."""
    if letter == 'C':
        return (
            'M740.5 265C730 133 612 70 444 70C235 70 124 170 124 377'
            'C124 583 235 683.5 444.8 683.5C613 683.5 735 619 742.5 490'
        )
    if letter == 'A':
        return (
            f'M{x+85:.2f} 690 {x+403:.2f} 82 {x+727:.2f} 690'
            f'M{x+178:.2f} 515H{x+635:.2f}'
        )
    if letter == 'P':
        return (
            f'M{x+153.34:.2f} 685V82.22H{x+515.60:.2f}'
            f'Q{x+683.80:.2f} 82.22 {x+683.80:.2f} 249.3'
            f'Q{x+683.80:.2f} 417.05 {x+514.50:.2f} 417.05'
            f'H{x+153.34:.2f}'
        )
    if letter == 'R':
        return (
            f'M{x+153.34:.2f} 685V82.22H{x+543.70:.2f}'
            f'Q{x+707:.2f} 82.22 {x+707:.2f} 241.2'
            f'Q{x+707:.2f} 407.65 {x+543.70:.2f} 407.65'
            f'H{x+153.34:.2f}'
            f'M{x+574:.2f} 418 {x+721:.2f} 689'
        )
    raise ValueError(f'No center line for {letter}')


result = []
offset = 0
for letter in LETTERS:
    glyph = GLYPHS[CMAP[ord(letter)]]
    pen = SVGPathPen(GLYPHS, ntos=str)
    glyph.draw(TransformPen(pen, (1, 0, 0, -1, offset, BASELINE)))
    result.append({'letter': letter, 'outline': pen.getCommands(), 'inline': inline_path(letter, offset)})
    offset += glyph.width - TRACKING

output = {'viewBox': f'0 0 {offset + TRACKING:.2f} 760', 'glyphs': result}
(ROOT / 'src/assets/capra-wordmark.json').write_text(json.dumps(output, indent=2) + '\n')
print(f'Generated {LETTERS} Archivo outlines and center lines.')
