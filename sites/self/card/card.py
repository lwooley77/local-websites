"""Business card generator.   python sites/self/card/card.py

Edit the CONFIG block, run it, and it writes to sites/self/card/out/:
  card-print-shop.pdf   front + back, 3.75 x 2.25 in with 0.125 in bleed (send to a print shop)
  card-home-sheet.pdf   10 cards per page (2 x 5, Avery 5371 layout), fronts page then backs page
  card-preview.png      what it looks like
"""
import base64
from pathlib import Path

# ---------------- CONFIG ----------------
NAME = "Lucas Wooley"
TITLE = "Websites for local businesses"
EMAIL = "lucas77wooley@gmail.com"
PHONE = ""        # e.g. "(775) 555-0123". Empty = not printed.
SITE = ""         # e.g. "lucaswooley.com". Empty = not printed. Add once you own a domain.
AREA = "Northern Nevada"
POINTS = ["Free sample site first", "Custom design, no templates", "Works on every screen"]
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

MARK = ('<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#15120e"/>'
        '<path d="M7 9l4.5 14L16 13l4.5 10L25 9" fill="none" stroke="#e6b26a" stroke-width="2.4" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg>')

contact_lines = [EMAIL] + ([PHONE] if PHONE else []) + ([SITE] if SITE else [])
contact_html = "".join("<div>%s</div>" % c for c in contact_lines)
points_html = "".join("<li>%s</li>" % p for p in POINTS)

CSS = FONT_CSS + """
*{box-sizing:border-box;margin:0}
body{font-family:'Work Sans',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.card{width:3.5in;height:2in;position:relative;overflow:hidden}
.card.bleed{width:3.75in;height:2.25in}
.in{position:absolute;inset:.125in;padding:.2in;display:flex;flex-direction:column;justify-content:space-between}
.front{background:#e6b26a;color:#15120e}
.front svg{width:.4in;height:.4in}
.front .name{font:600 .36in/.98 Fraunces,serif;letter-spacing:-.006in}
.front .title{margin-top:.08in;font:600 .115in/1.2 'Work Sans',sans-serif;letter-spacing:.07em;text-transform:uppercase}
.front .stripes{position:absolute;right:0;top:0;bottom:0;width:.14in;background:repeating-linear-gradient(180deg,#15120e 0 .12in,transparent .12in .24in)}
.back{background:#15120e;color:#f4eee3}
.back .hd{font:600 .165in/1.15 Fraunces,serif;color:#e6b26a;max-width:2.5in}
.back ul{list-style:none;padding:0;font:400 .115in/1.55 'Work Sans',sans-serif}
.back li::before{content:"";display:inline-block;width:.06in;height:.06in;border-radius:50%;background:#e6b26a;margin-right:.08in;vertical-align:.01in}
.back .ct{font:400 .115in/1.5 'Work Sans',sans-serif;border-top:.01in solid #4a4030;padding-top:.07in}
.back .ct div:first-child{font-weight:600;color:#fff}
.back .area{font:600 .075in/1 'Work Sans',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#e6b26a;margin-top:.05in}
"""


def card(side, bleed=False):
    cls = "card %s%s" % (side, " bleed" if bleed else "")
    if side == "front":
        inner = '<div class="in">%s<div><div class="name">%s</div><div class="title">%s</div></div></div><div class="stripes"></div>' % (MARK, NAME, TITLE)
    else:
        inner = ('<div class="in"><div class="hd">A website that makes your business look as good as it is.</div>'
                 '<ul>%s</ul><div><div class="ct">%s</div><div class="area">%s</div></div></div>') % (points_html, contact_html, AREA)
    return '<div class="%s">%s</div>' % (cls, inner)


def page(body, css_extra=""):
    return "<!doctype html><meta charset=utf-8><style>%s%s</style><body>%s</body>" % (CSS, css_extra, body)


def write(name, html):
    p = HERE / name
    p.write_text(html, encoding="utf-8")
    return p


shop = page('<div style="page-break-after:always">%s</div><div>%s</div>' % (card("front", True), card("back", True)), "@page{size:3.75in 2.25in;margin:0}")
fronts = "".join(card("front") for _ in range(10))
backs = "".join(card("back") for _ in range(10))
grid = ".sheet{width:8.5in;height:11in;padding:.5in 0 0 .75in;display:grid;grid-template-columns:3.5in 3.5in;grid-auto-rows:2in;page-break-after:always}"
sheet = page('<div class="sheet">%s</div><div class="sheet">%s</div>' % (fronts, backs), grid + "@page{size:8.5in 11in;margin:0}")
prev = page('<div style="display:flex;gap:24px;padding:24px;background:#cfc6b4">%s%s</div>' % (card("front"), card("back")), ".card{flex:none;zoom:1.9}")

from playwright.sync_api import sync_playwright


def save(path, fn):
    """Write to path; if a viewer has it locked, save next to it with a -new suffix."""
    try:
        fn(str(path))
        return path
    except Exception:
        alt = path.with_name(path.stem + "-new" + path.suffix)
        fn(str(alt))
        return alt


with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    done = []
    for html, name, kw in (
        (shop, "card-print-shop.pdf", dict(width="3.75in", height="2.25in", print_background=True)),
        (sheet, "card-home-sheet.pdf", dict(width="8.5in", height="11in", print_background=True)),
    ):
        pg.goto(write("_tmp.html", html).as_uri())
        done.append(save(OUT / name, lambda s, kw=kw: pg.pdf(path=s, **kw)))
    pg2 = b.new_page(viewport={"width": 1500, "height": 520}, device_scale_factor=1)
    pg2.goto(write("_tmp.html", prev).as_uri())
    done.append(save(OUT / "card-preview.png", lambda s: pg2.locator("div").first.screenshot(path=s)))
    b.close()
(HERE / "_tmp.html").unlink()
print("wrote", *[d.name for d in done])
