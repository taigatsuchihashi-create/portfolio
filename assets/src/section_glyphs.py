# 各節の扉に薄く敷く大字（衡山毛筆フォント行書・草書）をベクターで取り出す → assets/section_glyphs.json
import json, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
HERE = os.path.dirname(os.path.abspath(__file__))
S = 1000
WANT = {'about': ('人', 'gyousho'), 'works': ('企', 'gyousho'), 'tools': ('器', 'gyousho'), 'analysis': ('析', 'gyousho'),
        'approach': ('道', 'gyousho'), 'contact': ('縁', 'gyousho'), 'yu': ('遊', 'sousho')}
fonts = {}
out = {}
for key, (ch, fn) in WANT.items():
    f = fonts.setdefault(fn, TTFont(os.path.join(HERE, 'fonts', fn + '.ttf')))
    gs = f.getGlyphSet(); g = f.getBestCmap()[ord(ch)]
    bp = BoundsPen(gs); gs[g].draw(bp); x0, y0, x1, y1 = bp.bounds
    s = S * 0.9 / max(x1 - x0, y1 - y0)
    ox = (S - (x1 - x0) * s) / 2 - x0 * s; oy = (S - (y1 - y0) * s) / 2 + y1 * s
    pen = SVGPathPen(gs, ntos=lambda v: f'{v:.0f}')
    gs[g].draw(TransformPen(pen, (s, 0, 0, -s, ox, oy)))
    out[key] = pen.getCommands()
json.dump(out, open(os.path.join(HERE, '..', 'section_glyphs.json'), 'w', encoding='utf-8'))
print({k: len(v) // 1024 for k, v in out.items()}, 'KB')
