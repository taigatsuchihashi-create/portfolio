# フォントから「遊」の形を SVG のパスとして取り出す（ブラウザで比べる用）
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
import sys
ch = sys.argv[1] if len(sys.argv) > 1 else '遊'
cells = []
for n in ['kaisho', 'gyousho', 'kouzanT', 'sousho', 'geki']:
    f = TTFont(f'fonts/{n}.ttf'); gs = f.getGlyphSet(); g = f.getBestCmap()[ord(ch)]
    pen = SVGPathPen(gs); gs[g].draw(pen); bp = BoundsPen(gs); gs[g].draw(bp)
    x0, y0, x1, y1 = bp.bounds; upm = f['head'].unitsPerEm
    d = pen.getCommands()
    open(f'yu_{n}.path', 'w').write(f'{x0} {y0} {x1} {y1}\n{d}')
    cells.append(f'<figure><svg viewBox="{x0-20} {-y1-20} {x1-x0+40} {y1-y0+40}" width="190" height="190"><path transform="scale(1,-1)" d="{d}"/></svg><figcaption>{n}</figcaption></figure>')
open('yu_compare.html', 'w', encoding='utf-8').write('<!doctype html><meta charset=utf-8><body style="display:flex;flex-wrap:wrap;gap:4px;background:#fff;margin:0">' + ''.join(cells))
print('ok')
