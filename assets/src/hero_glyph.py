# ヒーローの大字「遊」を作る：衡山毛筆フォント草書の形（ベクター）と、その上を筆が走る道（芯の線）。
# 墨合戦の kanji_sousho.py の骨組み取り出しをそのまま使う。出力は assets/hero_glyph.json（座標は 0〜1000 の正方形）
#   python -I hero_glyph.py [字]
import json, os, sys
import numpy as np
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, 'C:/Users/taiga/sumi-gassen/tools')
import kanji_sousho as ks

ch = sys.argv[1] if len(sys.argv) > 1 else '遊'
S = 1000

# 1) 筆の道（kanji_sousho と同じ手順。座標は glyph() の枠＝長い辺 0.8 で中央）
B = ks.glyph(ch) > 0.5
D = ks.inside_distance(B)
sk = ks.thin(B)
keep = []
for p in ks.trace(sk, min_len=14):
    wmean = sum(D[y, x] for y, x in p) / len(p)
    if len(p) < 30 and wmean < 4.5: continue
    keep.append(p)
paths = [ks.smooth_path(ks.orient(p), 4) for p in keep]
paths.sort(key=lambda p: (p[0][0] * 1.0 + p[0][1] * 0.35))
strokes = []
for p in paths:
    q = p[::3] if len(p) > 6 else p
    pts = [(round(float(x) / ks.N * S, 1), round(float(y) / ks.N * S, 1)) for y, x in q]
    w = max(float(D[int(y), int(x)]) for y, x in p) / ks.N * S * 2.1   # 画の太さより少し太く覆う
    d = 'M' + ' L'.join(f'{x} {y}' for x, y in pts)
    strokes.append({'d': d, 'w': round(w, 1), 'len': len(q)})

# 2) 字の形（ベクター）。ラスターと同じ枠（長い辺 0.8・中央）に置く
f = TTFont(os.path.join(HERE, 'fonts', 'sousho.ttf'))
gs = f.getGlyphSet(); g = f.getBestCmap()[ord(ch)]
bp = BoundsPen(gs); gs[g].draw(bp)
x0, y0, x1, y1 = bp.bounds
s = S * 0.8 / max(x1 - x0, y1 - y0)
ox = (S - (x1 - x0) * s) / 2 - x0 * s
oy = (S - (y1 - y0) * s) / 2 + y1 * s          # フォントは上が +y なので反転
pen = SVGPathPen(gs, ntos=lambda v: f'{v:.1f}')
gs[g].draw(TransformPen(pen, (s, 0, 0, -s, ox, oy)))
out = {'ch': ch, 'size': S, 'glyph': pen.getCommands(), 'strokes': strokes}
json.dump(out, open(os.path.join(HERE, '..', 'hero_glyph.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(ch, len(strokes), 'strokes', len(out['glyph']) // 1024, 'KB glyph')
