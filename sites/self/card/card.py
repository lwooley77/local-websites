"""Business card generator.   python sites/self/card/card.py

Edit the CONFIG block, run it, and it writes to sites/self/card/out/:
  card-print-shop.pdf   front + back, 3.75 x 2.25 in with 0.125 in bleed (send to a print shop)
  card-home-sheet.pdf   10 cards per page (2 x 5, Avery 5371 layout), front page then back page
  card-preview.png      what it looks like
"""
import base64
from pathlib import Path

# ---------------- CONFIG ----------------
NAME = "Lucas Wooley"
TITLE = "Websites for local shops"
EMAIL = "lucas77wooley@gmail.com"
PHONE = ""        # e.g. "(775) 555-0123". Left empty = not printed.
SITE = ""         # e.g. "lucaswooley.com". Left empty = not printed. Add once you own a domain.
AREA = "Northern Nevada"
TAGLINE = "I build your shop a free preview first."
# ----------------------------------------

HERE = Path(__file__).resolve().parent
FONTS = HERE.parents[1] / "_fonts"
OUT = HERE / "out"
OUT.mkdir(exist_ok=True)


def face(family, file, weight):
    b = base64.b64encode((FONTS / file).read_bytes()).decode()
    return "@font-face{font-family:'%s';font-weight:%d;src:url(data:font/woff2;base64,%s) format('woff2')}" % (family, weight, b)


FONT_CSS = "".join([
    face("Fraunces", "fraunces-latin-600-normal.woff2", 600),
    face("Work Sans", "work-sans-latin-400-normal.woff2", 400),
    face("Work Sans", "work-sans-latin-600-normal.woff2", 600),
])

MARK = ('<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#e6b26a"/>'
        '<path d="M7 9l4.5 14L16 13l4.5 10L25 9" fill="none" stroke="#1e1b16" stroke-width="2.4" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg>')

contact_lines = [EMAIL] + ([PHONE] if PHONE else []) + ([SITE] if SITE else [])
contact_html = "".join("<div>%s</div>" % c for c in contact_lines)

CSS = FONT_CSS + """
*{box-sizing:border-box;margin:0}
body{font-family:'Work Sans',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.card{width:3.5in;height:2in;position:relative;overflow:hidden}
.card.bleed{width:3.75in;height:2.25in}
.front{background:#1e1b16;color:#f4eee3}
.front .in{position:absolute;inset:.125in;display:flex;flex-direction:column;justify-content:space-between;padding:.2in}
.bleed.front .in{inset:.125in}
.front svg{width:.42in;height:.42in}
.front .name{font:600 .34in/1 Fraunces,serif;letter-spacing:-.005in}
.front .title{margin-top:.07in;font:400 .13in/1.2 'Work Sans',sans-serif;color:#e6b26a;letter-spacing:.012in}
.awn{position:absolute;left:0;right:0;bottom:0;height:.1in;background:repeating-linear-gradient(90deg,#93441a 0 .15in,#f4eee3 .15in .3in)}
.back{background:#f4eee3;color:#1e1b16}
.back .in{position:absolute;inset:.125in;padding:.2in;display:flex;flex-direction:column;justify-content:space-between}
.back .tag{font:600 .17in/1.2 Fraunces,serif;max-width:2.4in}
.back .ct{font:400 .125in/1.5 'Work Sans',sans-serif}
.back .ct div:first-child{font-weight:600}
.back .area{font:600 .085in/1 'Work Sans',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#93441a;margin-top:.06in}
"""


def card(side, bleed=False):
    cls = "card %s%s" % (side, " bleed" if bleed else "")
    if side == "front":
        inner = '<div class="in">%s<div><div class="name">%s</div><div class="title">%s</div></div></div><div class="awn"></div>' % (MARK, NAME, TITLE)
    else:
        inner = '<div class="in"><div class="tag">%s</div><div><div class="ct">%s</div><div class="area">%s</div></div></div>' % (TAGLINE, contact_html, AREA)
    return '<div class="%s">%s</div>' % (cls, inner)


def page(body, css_extra=""):
    return "<!doctype html><meta charset=utf-8><style>%s%s</style><body>%s</body>" % (CSS, css_extra, body)


def write(name, html):
    p = HERE / name
    p.write_text(html, encoding="utf-8")
    return p


# print-shop: two pages (front, back), 3.75 x 2.25 with bleed
shop = page(
    '<div style="page-break-after:always">%s</div><div>%s</div>' % (card("front", True), card("back", True)),
    "@page{size:3.75in 2.25in;margin:0}",
)
# home sheet: Letter, 2 cols x 5 rows, Avery 5371 margins (0.75in left, 0.5in top)
fronts = "".join(card("front") for _ in range(10))
backs = "".join(card("back") for _ in range(10))
grid = ".sheet{width:8.5in;height:11in;padding:.5in 0 0 .75in;display:grid;grid-template-columns:3.5in 3.5in;grid-auto-rows:2in;page-break-after:always}"
sheet = page('<div class="sheet">%s</div><div class="sheet">%s</div>' % (fronts, backs), grid + "@page{size:8.5in 11in;margin:0}")
prev = page(
    '<div style="display:flex;gap:24px;padding:24px;background:#cfc6b4">%s%s</div>' % (card("front"), card("back")),
    ".card{flex:none;zoom:1.9}",
)

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    for html, name, kw in (
        (shop, "card-print-shop.pdf", dict(width="3.75in", height="2.25in", print_background=True)),
        (sheet, "card-home-sheet.pdf", dict(width="8.5in", height="11in", print_background=True)),
    ):
        f = write("_tmp.html", html)
        pg.goto(f.as_uri())
        pg.pdf(path=str(OUT / name), **kw)
    pg2 = b.new_page(viewport={"width": 1500, "height": 520}, device_scale_factor=1)
    f = write("_tmp.html", prev)
    pg2.goto(f.as_uri())
    pg2.locator("div").first.screenshot(path=str(OUT / "card-preview.png"))
    b.close()
(HERE / "_tmp.html").unlink()
print("wrote", *[x.name for x in sorted(OUT.iterdir())])
