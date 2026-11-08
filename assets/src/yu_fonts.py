from PIL import Image, ImageDraw, ImageFont
import os
names = [n for n in ['kaisho', 'gyousho', 'kouzanT', 'sousho', 'geki'] if os.path.exists(f'fonts/{n}.ttf')]
im = Image.new('RGB', (400 * len(names), 440), 'white'); d = ImageDraw.Draw(im)
for i, n in enumerate(names):
    ft = ImageFont.truetype(f'fonts/{n}.ttf', 340, layout_engine=ImageFont.Layout.BASIC)
    d.text((i * 400 + 30, 20), '遊', font=ft, fill='black'); d.text((i * 400 + 10, 415), n, fill='red')
im.save('yu_fonts.png'); print(names)
