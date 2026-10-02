"""Extra files a real site needs. Run AFTER the kit build:
    python sites/_kit/build.py sites/self
    python sites/self/extras.py

Writes into dist/: 404.html, robots.txt, _headers (Netlify security + cache headers),
apple-touch-icon.png, og.png (share image, 1200x630).
When you own a domain: add it as SITE below, rerun, and the sitemap, canonical link and og:image URL are added.
"""
import base64, pathlib, re, sys

SITE = ""  # e.g. "https://lucaswooley.com"  (no trailing slash). Empty = no sitemap/canonical yet.
INDEXABLE = False  # keep False while the name/phone are placeholders. Set True when the site is final and live on your domain.

ROOT = pathlib.Path(__file__).resolve().parent
DIST = ROOT / "dist"
FONTS = ROOT.parent / "_fonts"


def face(family, file, weight):
    b = base64.b64encode((FONTS / file).read_bytes()).decode()
    return "@font-face{font-family:'%s';font-weight:%d;src:url(data:font/woff2;base64,%s) format('woff2')}" % (family, weight, b)


FONT = face("Fraunces", "fraunces-latin-600-normal.woff2", 600) + face("Work Sans", "work-sans-latin-600-normal.woff2", 600)
MARK = ('<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#e6b26a"/><path d="M7 9l4.5 14L16 13l4.5 10L25 9" '
        'fill="none" stroke="#15120e" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>')

# 404
(DIST / "404.html").write_text("""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page not found | Lucas Wooley</title><meta name="robots" content="noindex">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#15120e;color:#f4eee3;font:18px/1.6 system-ui,sans-serif;text-align:center;padding:24px}
h1{font:600 clamp(40px,9vw,80px)/1.05 Georgia,serif;margin:0 0 10px}p{color:#cfc5b2;margin:0 0 26px}
a{display:inline-flex;align-items:center;min-height:48px;padding:0 26px;border-radius:999px;background:#e6b26a;color:#15120e;font-weight:600;text-decoration:none}
a:focus-visible{outline:3px solid #f4eee3;outline-offset:3px}</style></head>
<body><main><h1>That page isn't here.</h1><p>The link may be old or mistyped.</p><a href="/">Back to the home page</a></main></body></html>
""", encoding="utf-8")

# robots + headers
robots = "User-agent: *\nAllow: /\n" if INDEXABLE else "User-agent: *\nDisallow: /\n"
if SITE:
    robots += "Sitemap: %s/sitemap.xml\n" % SITE
(DIST / "robots.txt").write_text(robots, encoding="utf-8")
(DIST / "_headers").write_text("""/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; frame-src https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'
/index.html
  Cache-Control: public, max-age=300
/*.png
  Cache-Control: public, max-age=31536000, immutable
""", encoding="utf-8")

if not INDEXABLE:
    hp = DIST / "_headers"
    hp.write_text(hp.read_text(encoding="utf-8").replace("/*\n  X-Content-Type-Options", "/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options", 1), encoding="utf-8")

# canonical + sitemap + og:image only when a domain is known
idx = DIST / "index.html"
html = idx.read_text(encoding="utf-8")
if SITE:
    (DIST / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>%s/</loc></url></urlset>\n' % SITE, encoding="utf-8")
    if 'rel="canonical"' not in html:
        html = html.replace("</head>", '<link rel="canonical" href="%s/">\n<meta property="og:url" content="%s/">\n<meta property="og:image" content="%s/og.png">\n</head>' % (SITE, SITE, SITE), 1)
        idx.write_text(html, encoding="utf-8")

# images via the browser we already have
from playwright.sync_api import sync_playwright

ICON = "<!doctype html><style>%s*{margin:0}body{width:180px;height:180px;background:#15120e;display:grid;place-items:center}svg{width:128px;height:128px}</style><body>%s" % (FONT, MARK)
OG = ("<!doctype html><style>%s*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#15120e;color:#f4eee3;padding:80px;display:flex;flex-direction:column;justify-content:space-between;font-family:'Work Sans',sans-serif}"
      ".l{display:flex;align-items:center;gap:20px;font:600 40px 'Fraunces',serif}.l svg{width:64px;height:64px}"
      "h1{font:600 84px/1.04 'Fraunces',serif;max-width:980px}h1 em{font-style:normal;color:#e6b26a}"
      "p{font:600 28px 'Work Sans',sans-serif;color:#cfc5b2;letter-spacing:.04em}"
      ".s{position:absolute;left:0;right:0;bottom:0;height:22px;background:repeating-linear-gradient(90deg,#e0793c 0 40px,#f4eee3 40px 80px)}</style>"
      "<body><div class='l'>%s<span>Lucas Wooley</span></div><h1>A website that makes your business look <em>as good as it is.</em></h1><p>Websites for local businesses &middot; Northern Nevada</p><div class='s'></div>") % (FONT, MARK)
with sync_playwright() as p:
    b = p.chromium.launch()
    for html_, size, name in ((ICON, (180, 180), "apple-touch-icon.png"), (OG, (1200, 630), "og.png")):
        pg = b.new_page(viewport={"width": size[0], "height": size[1]})
        pg.set_content(html_)
        pg.wait_for_timeout(250)
        pg.screenshot(path=str(DIST / name))
    b.close()
print("extras written:", *sorted(x.name for x in DIST.iterdir()))
