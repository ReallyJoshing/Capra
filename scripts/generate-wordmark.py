"""Export Archivo outlines and centered inline paths. Requires fonttools.

The O/D inlines balance the distance to the inner and outer contours.
L/E use the midpoints of their straight stems and bars. No font is modified.
"""

import json
import math
from pathlib import Path

from fontTools.pens.basePen import BasePen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
FONT = TTFont(ROOT / 'src/app/fonts/Archivo-Variable.ttf')
GLYPHS = FONT.getGlyphSet(location={'wght': 460, 'wdth': 115})
CMAP = FONT.getBestCmap()
BASELINE = 720


class Contours(BasePen):
    def __init__(self):
        super().__init__(GLYPHS)
        self.contours = []

    def _moveTo(self, point):
        self.points = [point]

    def _lineTo(self, point):
        self.points.append(point)

    def _qCurveToOne(self, control, end):
        start = self._getCurrentPoint()
        for step in range(1, 25):
            t = step / 24
            self.points.append(tuple(
                (1-t)**2 * start[i] + 2*(1-t)*t * control[i] + t*t * end[i]
                for i in (0, 1)
            ))

    def _closePath(self):
        self.points.append(self.points[0])
        self.contours.append(self.points)


def cross(a, b):
    return a[0]*b[1] - a[1]*b[0]


def ray_hit(origin, direction, contour):
    hits = []
    for a, b in zip(contour, contour[1:]):
        edge = (b[0]-a[0], b[1]-a[1])
        denom = cross(direction, edge)
        if abs(denom) < 1e-10:
            continue
        delta = (a[0]-origin[0], a[1]-origin[1])
        distance = cross(delta, edge) / denom
        fraction = cross(delta, direction) / denom
        if distance > 0 and 0 <= fraction <= 1:
            hits.append(distance)
    assert hits, 'Contour must surround the ray origin'
    return min(hits)


def distance_to(point, contour):
    closest = float('inf')
    for a, b in zip(contour, contour[1:]):
        dx, dy = b[0]-a[0], b[1]-a[1]
        length = dx*dx + dy*dy
        t = max(0, min(1, ((point[0]-a[0])*dx + (point[1]-a[1])*dy)/length)) if length else 0
        closest = min(closest, (point[0]-a[0]-t*dx)**2 + (point[1]-a[1]-t*dy)**2)
    return math.sqrt(closest)


def centered_loop(contours, origin):
    outer, inner = contours
    points = []
    for step in range(240):
        angle = step * math.tau / 240
        direction = (math.cos(angle), math.sin(angle))
        lo = ray_hit(origin, direction, inner)
        hi = ray_hit(origin, direction, outer)
        assert lo < hi
        for _ in range(22):
            radius = (lo+hi)/2
            point = tuple(origin[i] + direction[i]*radius for i in (0, 1))
            if distance_to(point, inner) < distance_to(point, outer):
                lo = radius
            else:
                hi = radius
        # Verify the line is centered and well inside the off-white stroke.
        assert abs(distance_to(point, inner) - distance_to(point, outer)) < 0.01
        assert distance_to(point, inner) > 35
        points.append(point)
    return [points + [points[0]]]


def polyline(paths, offset):
    commands = []
    for points in paths:
        for index, (x, y) in enumerate(points):
            commands.append(f'{"M" if index == 0 else "L"}{x+offset:.2f},{BASELINE-y:.2f}')
        if points[0] == points[-1]:
            commands.append('Z')
    return ' '.join(commands)


def straight_inlines(letter):
    # Midpoints of Archivo's straight edges at weight 460 / width 115.
    stem = (96.05 + 210.63) / 2
    if letter == 'L':
        bar = 100.61 / 2
        return [[(stem, 686.4 - (210.63-96.05)/2), (stem, bar), (606.87-bar, bar)]]
    top, middle, bottom = (686.4+589.15)/2, (399.52+302.26)/2, 97.26/2
    return [
        [(717.16-(686.4-589.15)/2, top), (stem, top), (stem, bottom), (724.36-bottom, bottom)],
        [(stem, middle), (664.94-(399.52-302.26)/2, middle)],
    ]


result = []
offset = 0
for letter in 'ODLE':
    glyph = GLYPHS[CMAP[ord(letter)]]
    pen = SVGPathPen(GLYPHS, ntos=lambda value: f'{value:.2f}')
    glyph.draw(TransformPen(pen, (1, 0, 0, -1, offset, BASELINE)))
    if letter in 'OD':
        flat = Contours()
        glyph.draw(flat)
        lines = centered_loop(flat.contours, (464, 343) if letter == 'O' else (430, 343))
    else:
        lines = straight_inlines(letter)
    result.append({'letter': letter, 'outline': pen.getCommands(), 'inline': polyline(lines, offset)})
    offset += glyph.width - 35

output = {'viewBox': '40 0 3030 760', 'glyphs': result}
(ROOT / 'src/assets/odle-wordmark.json').write_text(json.dumps(output, indent=2) + '\n')
print('Generated four Archivo glyphs. O/D centerlines verified against both contours.')
