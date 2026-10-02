"""Business card generator.   python sites/self/card/card.py

The idea: the front is a search result for a business whose website says "Page not found".
Every owner recognizes that problem on sight. Flip it: "Let's fix that."

Edit the CONFIG block, run, and it writes to sites/self/card/out/:
  card-print-shop.pdf   front + back, 3.75 x 2.25 in with 0.125 in bleed (send to a print shop)
  card-home-sheet.pdf   10 cards per page (2 x 5, Avery 5371 layout), fronts page then backs page
  card-preview.png      what it looks like
If SITE is set and the 'qrcode' package is installed (pip install qrcode), a QR code to it is added to the back.
"""
import base64, io
from pathlib import Path

# ---------------- CONFIG ----------------
NAME = "Lucas Wooley"
TITLE = "Websites for local businesses"
EMAIL = "lucas77wooley@gmail.com"
PHONE = ""        # e.g. "(775) 555-0123". Empty = not printed.
SITE = ""         # e.g. "lucaswooley.com". Empty = not printed (and no QR). Add once you own a domain.
AREA = "Northern Nevada"
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

qr_html = ""
if SITE:
    try:
        import qrcode, qrcode.image.svg
        img = qrcode.make("https://" + SITE.replace("https://", "").replace("http://", ""), image_factory=qrcode.image.svg.SvgPathImage, box_size=10, border=0)
        buf = io.BytesIO(); img.save(buf)
        svg = buf.getvalue().decode()
        qr_html = '<div class="qr">%s</div>' % svg[svg.index("<svg"):]
    except Exception:
        qr_html = ""

contact_lines = [EMAIL] + ([PHONE] if PHONE else []) + ([SITE] if SITE else [])
contact_html = "".join("<div>%s</div>" % c for c in contact_lines)

SEARCH = ('<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="#5f6368" stroke-width="2.4"/>'
          '<path d="M15 15l6 6" stroke="#5f6368" stroke-width="2.6" stroke-linecap="round"/></svg>')

# your mark: a gold tile with a "W". Swap this SVG for your real logo when you have one.
LOGO = ('<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#15120e"/>'
        '<path d="M7 9l4.5 14L16 13l4.5 10L25 9" fill="none" stroke="#e6b26a" stroke-width="2.6" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg>')

CSS = FONT_CSS + """
*{box-sizing:border-box;margin:0}
body{font-family:'Work Sans',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.card{width:3.5in;height:2in;position:relative;overflow:hidden}
.card.bleed{width:3.75in;height:2.25in}
.in{position:absolute;inset:.125in;padding:.17in .2in;display:flex;flex-direction:column;justify-content:center;gap:.1in}
/* FRONT: a search result with a broken website */
.front{background:#f1ede4;color:#1e1b16}
.bar{display:flex;align-items:center;gap:.07in;background:#fff;border-radius:.2in;padding:.055in .11in;box-shadow:0 .01in .04in rgba(0,0,0,.25);font:400 .115in/1 'Work Sans',sans-serif;color:#3c4043}
.bar svg{width:.13in;height:.13in;flex:none}
.res{background:#fff;border-radius:.09in;padding:.1in .13in;box-shadow:0 .01in .04in rgba(0,0,0,.2)}
.res .t{font:600 .15in/1.1 'Work Sans',sans-serif;color:#1a0dab}
.res .s{margin-top:.03in;font:400 .1in/1.2 'Work Sans',sans-serif;color:#3c4043}
.res .s b{color:#e7a100;letter-spacing:.01in;font-weight:400}
.res .w{margin-top:.06in;display:flex;align-items:center;gap:.06in;font:600 .1in/1 'Work Sans',sans-serif;color:#3c4043}
.res .w i{font-style:normal;background:#c5221f;color:#fff;border-radius:.05in;padding:.03in .07in;letter-spacing:.01in}
.foot{display:flex;justify-content:space-between;align-items:center;margin-top:.02in}
.logo{display:flex;align-items:center;gap:.07in}
.logo svg{width:.26in;height:.26in;flex:none}
.logo span{font:600 .125in/1 Fraunces,serif;color:#15120e}
.sound{font:600 .085in/1 'Work Sans',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#93441a;text-align:right}
/* BACK */
.back{background:#15120e;color:#f4eee3}
.back .in{justify-content:space-between}
.back .big{font:600 .28in/1 Fraunces,serif;color:#e6b26a}
.back .sub{margin-top:.07in;font:400 .115in/1.4 'Work Sans',sans-serif;max-width:2.35in;color:#e8dfce}
.back .pts{margin-top:.07in;display:flex;flex-wrap:nowrap;gap:.03in .07in;font:600 .068in/1.2 'Work Sans',sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#e6b26a;white-space:nowrap}
.back .pts span::before{content:"";display:inline-block;width:.05in;height:.05in;border-radius:50%;background:#e0793c;margin-right:.05in;vertical-align:.005in}
.back .me{display:flex;justify-content:space-between;align-items:flex-end;gap:.1in;border-top:.01in solid #4a4030;padding-top:.08in}
.back .nm{font:600 .14in/1.2 Fraunces,serif}
.back .ask{margin-top:.03in;font:600 .088in/1.2 'Work Sans',sans-serif;color:#e6b26a}
.back .ct{font:400 .105in/1.5 'Work Sans',sans-serif;color:#e8dfce}
.back .ct div:first-child{color:#fff;font-weight:600}
.back .area{font:600 .07in/1 'Work Sans',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#e6b26a;margin-top:.04in}
.back .qr{width:.62in;height:.62in;background:#fff;padding:.04in;border-radius:.04in;flex:none}
.back .qr svg{width:100%;height:100%;display:block}
.back .stripes{position:absolute;left:0;right:0;bottom:0;height:.08in;background:repeating-linear-gradient(90deg,#e0793c 0 .14in,#f4eee3 .14in .28in)}
"""


def card(side, bleed=False):
    cls = "card %s%s" % (side, " bleed" if bleed else "")
    if side == "front":
        inner = ('<div class="in"><div class="bar">%s<span>your business name</span></div>'
                 '<div class="res"><div class="t">Your Business | Your Town, NV</div>'
                 '<div class="s"><b>&#9733;&#9733;&#9733;&#9733;&#9733;</b> &middot; Open now &middot; Closes 6 PM</div>'
                 '<div class="w">Website: <i>404 Page not found</i></div></div>'
                 '<div class="foot"><div class="logo">%s<span>%s</span></div><div class="sound">Sound familiar?</div></div></div>') % (SEARCH, LOGO, NAME)
    else:
        inner = ('<div class="in"><div><div class="big">Let\'s fix that.</div>'
                 '<div class="sub">I build websites for local businesses in Northern Nevada. Free sample first.</div>'
                 '<div class="pts"><span>Found on Google</span><span>Calls &amp; texts</span><span>Booking</span><span>Follow-ups</span></div></div>'
                 '<div class="me"><div><div class="nm">%s</div><div class="ask">Email me for your free sample:</div><div class="ct">%s</div></div>%s</div></div>'
                 '<div class="stripes"></div>') % (NAME, contact_html, qr_html)
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
        import time
        alt = path.with_name(path.stem + "-" + time.strftime("%H%M%S") + path.suffix)
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
