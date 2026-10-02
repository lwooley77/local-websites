"""Assemble every finished demo into one deployable folder.

Usage:  python sites/_kit/portfolio.py
Output: deploy/portfolio/index.html          hub page listing every demo
        deploy/portfolio/<slug>/index.html   each demo at its own path

Drag deploy/portfolio onto Netlify once; every demo then has its own link,
e.g. https://<site>.netlify.app/cutz-unlimited/
"""
import html, json, re, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # Websites/
SITES = ROOT / "sites"
OUT = ROOT / "deploy" / "portfolio"

# Demos built before the kit existed: (slug, file, name, place, kind)
LEGACY = [
    ("quilas-cosmo-corner", ROOT / "quilas-v3.html", "Quilas Cosmo Corner", "Carson City", "Cosmetology"),
    ("jessies-salon", ROOT / "jessies-salon-layout-options.html", "Jessie's Salon", "Reno", "Hair salon"),
    ("nail-bar", ROOT / "nail-bar-reno-demo.html", "Nail Bar", "Reno", "Nail salon"),
    ("cutting-edge", ROOT / "cutting-edge-hair-salon-demo.html", "Cutting Edge", "Carson City", "Hair salon"),
    ("hispana-barber-shop", ROOT / "hispana-barber-shop-demo.html", "Hispana Barber Shop", "Reno", "Barbershop"),
]


def title_of(text):
    m = re.search(r"<title>(.*?)</title>", text, re.S | re.I)
    return html.unescape(m.group(1).strip()) if m else ""


def collect():
    items = []
    for slug, f, name, place, kind in LEGACY:
        if f.exists():
            items.append(dict(slug=slug, src=f, name=name, place=place, kind=kind))
    for d in sorted(SITES.iterdir()):
        dist = d / "dist" / "index.html"
        if d.name.startswith("_") or (d / "SKIP.md").exists() or not dist.exists():
            continue
        rep = d / "qa" / "report.json"
        if not (d / "STATUS.md").exists() or not rep.exists() or json.loads(rep.read_text(encoding="utf-8")).get("fails"):
            print("skip (unfinished or failing QA):", d.name)
            continue
        v = {}
        if (d / "site.json").exists():
            v = json.loads((d / "site.json").read_text(encoding="utf-8")).get("vars", {})
        t = title_of(dist.read_text(encoding="utf-8", errors="ignore"))
        name = v.get("NAME") or t.split("|")[0].split("·")[0].strip() or d.name
        place = v.get("CITY", "")
        kind = v.get("TYPE", "")
        raw = d / "assets" / "raw"
        if raw.exists() and any(raw.iterdir()):
            print("NOTE %s uses the business's own photos: get the owner's OK before publishing this hub" % d.name)
        items.append(dict(slug=d.name, src=dist, name=name, place=place, kind=kind))
    return items


PAGE = """<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Websites for local shops · Reno, Sparks, Carson City</title>
<meta name="description" content="Custom websites built for barbers, salons and local businesses in Northern Nevada.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2314120f'/%3E%3Cpath d='M9 22V10l7 8 7-8v12' fill='none' stroke='%23e9c46a' stroke-width='2.4' stroke-linejoin='round'/%3E%3C/svg%3E">
<style>
:root{--bg:#f4efe6;--ink:#17140f;--muted:#5d554a;--line:#d9cfbf;--card:#fffaf2;--accent:#b5541c}
@media (prefers-color-scheme:dark){:root{--bg:#14120f;--ink:#f1e9dc;--muted:#b3a894;--line:#2f2a23;--card:#1c1915;--accent:#e9a15f}}
*{box-sizing:border-box;margin:0}
body{background:var(--bg);color:var(--ink);font:17px/1.6 Georgia,'Iowan Old Style',serif;padding:0 16px 64px}
.wrap{max-width:1180px;margin:0 auto}
header{padding:56px 0 36px;border-bottom:1px solid var(--line);display:grid;gap:14px}
.k{font:600 12px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
h1{font-size:clamp(34px,6vw,64px);line-height:1.02;font-weight:400;letter-spacing:-.01em;max-width:14ch}
header p{color:var(--muted);max-width:52ch}
.grid{display:grid;gap:28px;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));padding-top:36px}
a.card{display:block;color:inherit;text-decoration:none;background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:hidden;transition:transform .2s cubic-bezier(.23,1,.32,1)}
a.card:hover{transform:translateY(-3px)}
a.card:active{transform:scale(.97)}
a.card:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.shot{position:relative;height:300px;overflow:hidden;border-bottom:1px solid var(--line);background:var(--bg)}
.shot iframe{position:absolute;top:0;left:0;width:390px;height:844px;border:0;transform:scale(.769);transform-origin:0 0;pointer-events:none}
.shot{width:100%}
.meta{padding:16px 18px 18px;display:flex;justify-content:space-between;gap:12px;align-items:baseline}
.meta b{font-weight:400;font-size:20px;line-height:1.2}
.meta span{font:500 12px/1.3 ui-monospace,Menlo,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-align:right}
footer{margin-top:56px;color:var(--muted);font-size:15px}
@media (prefers-reduced-motion:reduce){a.card{transition:none}}
</style></head>
<body><div class="wrap">
<header>
<div class="k">Northern Nevada · Websites</div>
<h1>Websites built for the shop, not from a template.</h1>
<p>Every site here was designed for one local business: their services, their prices, their hours, one tap to call or book. Tap any of them to see it full size.</p>
</header>
<main class="grid">
%s
</main>
<footer>Reno · Sparks · Carson City · Fernley · Minden · © <span id="yr"></span><br>
<small id="privacy">Privacy: this site uses no cookies, no tracking and no forms. Each preview shows public information about that business.</small></footer>
</div>
<script>
function fit(){document.querySelectorAll('.shot').forEach(function(s){var f=s.querySelector('iframe');f.style.transform='scale('+(s.clientWidth/390)+')'})}
fit();addEventListener('resize',fit);
document.getElementById('yr').textContent=new Date().getFullYear();
</script>
</body></html>
"""

NOT_FOUND = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page not found</title><meta name="robots" content="noindex">
<style>
:root{--bg:#f4efe6;--ink:#17140f;--muted:#5d554a;--accent:#b5541c}
@media (prefers-color-scheme:dark){:root{--bg:#14120f;--ink:#f1e9dc;--muted:#b3a894;--accent:#e9a15f}}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--ink);font:18px/1.6 Georgia,serif;padding:16px;text-align:center}
h1{font-weight:400;font-size:clamp(32px,7vw,56px);margin:0 0 8px}
p{color:var(--muted);margin:0 0 28px}
a{display:inline-block;padding:14px 26px;border-radius:999px;background:var(--ink);color:var(--bg);text-decoration:none}
a:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
</style></head><body><main>
<h1>That page isn't here.</h1>
<p>The link may be old or mistyped.</p>
<a href="/">See all the websites</a>
</main></body></html>
"""

CARD = """<a class="card" href="%(slug)s/">
<div class="shot"><iframe src="%(slug)s/" loading="lazy" tabindex="-1" aria-hidden="true" title=""></iframe></div>
<div class="meta"><b>%(name)s</b><span>%(sub)s</span></div>
</a>"""


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    cards = []
    for it in collect():
        (OUT / it["slug"]).mkdir()
        shutil.copyfile(it["src"], OUT / it["slug"] / "index.html")
        sub = " · ".join(x for x in (it["kind"], it["place"]) if x)
        cards.append(CARD % dict(slug=it["slug"], name=html.escape(it["name"]), sub=html.escape(sub)))
    (OUT / "404.html").write_text(NOT_FOUND, encoding="utf-8")
    (OUT / "index.html").write_text(PAGE.replace("<main class=\"grid\">\n%s\n", "<main class=\"grid\">\n" + "\n".join(cards) + "\n"), encoding="utf-8")
    print("portfolio: %d demos -> %s" % (len(cards), OUT))


if __name__ == "__main__":
    main()
