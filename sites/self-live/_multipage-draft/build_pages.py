"""Multi-page builder for the personal site.   python sites/self/build_pages.py

Reads   src/layout.html          shared header, menu, footer, scripts
        src/pages/*.html         one file per page. First lines are "key: value", then a line "---", then the content
        src/head.html            (its <style> block is the base CSS)
        src/extra.css            extra CSS for the multi-page layout
        src/site.js              behaviour (menu, helper, intro, contact options)
        assets/raw/*.jpg         screenshots
Writes  dist/<page>.html, dist/assets/{styles.css,site.js,fonts/*,img/*}, dist/404.html

Page front matter:  page: id used for the nav highlight | title: | desc:
Placeholders: %%NAME%% %%EMAIL%% %%AREA%% %%PHONE%% %%BOOKING%% (from site.json) and %%CONTENT%%
Open dist/index.html directly from disk, or drag dist onto app.netlify.com/drop.
"""
import json, re, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
DIST = ROOT / "dist"
FONTS = ROOT.parent / "_fonts"

cfg = json.loads((ROOT / "site.json").read_text(encoding="utf-8-sig"))
V = cfg["vars"]

# fresh dist (only this site's own folder)
if DIST.exists():
    shutil.rmtree(DIST)
(DIST / "assets" / "fonts").mkdir(parents=True)
(DIST / "assets" / "img").mkdir(parents=True)

# fonts
face = []
for f in cfg["fonts"]:
    shutil.copy(FONTS / f["file"], DIST / "assets" / "fonts" / f["file"])
    face.append("@font-face{font-family:'%s';font-weight:%s;font-display:swap;src:url(fonts/%s) format('woff2')}" % (f["family"], f.get("weight", 400), f["file"]))

# css = base style block + extra
base = (SRC / "head.html").read_text(encoding="utf-8")
m = re.search(r"<style>(.*?)</style>", base, re.S)
css = m.group(1).replace("%%FONTS%%", "\n".join(face))
css += "\n" + (SRC / "extra.css").read_text(encoding="utf-8")
(DIST / "assets" / "styles.css").write_text(css, encoding="utf-8", newline="\n")

# images
for p in sorted((ROOT / "assets" / "raw").glob("*.jpg")):
    shutil.copy(p, DIST / "assets" / "img" / p.name)

# js
js = (SRC / "site.js").read_text(encoding="utf-8")
(DIST / "assets" / "site.js").write_text(js, encoding="utf-8", newline="\n")

layout = (SRC / "layout.html").read_text(encoding="utf-8")


def sub(t, extra=None):
    for k, v in V.items():
        t = t.replace("%%" + k + "%%", str(v))
    for k, v in (extra or {}).items():
        t = t.replace("%%" + k + "%%", v)
    return t


pages = []
for f in sorted((SRC / "pages").glob("*.html")):
    raw = f.read_text(encoding="utf-8")
    head, content = raw.split("\n---\n", 1)
    meta = dict(line.split(": ", 1) for line in head.strip().splitlines())
    pages.append((f.stem, meta, content))

for stem, meta, content in pages:
    html = layout
    nav_cur = meta.get("page", stem)
    html = html.replace("%%CONTENT%%", content)
    html = html.replace("%%PAGE%%", nav_cur)
    html = html.replace("%%TITLE%%", meta["title"]).replace("%%DESC%%", meta["desc"])
    html = html.replace("%%FILE%%", stem + ".html")
    # mark the current page in the nav
    html = re.sub(r'(<a href="[^"]*" data-nav="%s")' % re.escape(nav_cur), r'\1 aria-current="page"', html)
    html = sub(html)
    left = sorted(set(re.findall(r"%%[A-Z0-9_]+%%", html)))
    if left:
        raise SystemExit("unfilled placeholders in %s: %s" % (stem, left))
    (DIST / (stem + ".html")).write_text(html, encoding="utf-8", newline="\n")

print("built %d pages -> %s" % (len(pages), DIST), *[s + ".html" for s, _, _ in pages])
