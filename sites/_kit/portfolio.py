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



# ---- v2 hub: real screenshots, filters, same look as the sales site ----
SALES = "https://euphonious-yeot-fce456.netlify.app/#contact"
META = {  # slug: (kind, filter group, city)
    "quilas-cosmo-corner": ("Cosmetology", "beauty", "Carson City"),
    "jessies-salon": ("Hair salon", "hair", "Reno"),
    "nail-bar": ("Nail salon", "nails", "Reno"),
    "cutting-edge": ("Hair salon", "hair", "Carson City"),
    "hispana-barber-shop": ("Barber shop", "barber", "Reno"),
    "cutz-unlimited": ("Barber shop", "barber", "Reno"),
    "electric-sun-spa": ("Day spa and tanning", "beauty", "Fernley"),
    "jack-of-all-fades": ("Barber shop", "barber", "Reno"),
    "lv-nails": ("Nail salon", "nails", "Reno"),
    "la-belle-nails": ("Nail salon", "nails", "Reno"),
    "hollywood-nails": ("Nail salon", "nails", "Reno"),
    "main-street-barber": ("Barber shop", "barber", "Gardnerville"),
    "mavrks-fade-shop": ("Barber shop", "barber", "Carson City"),
    "mj-beauty-salon": ("Beauty salon", "beauty", "Carson City"),
    "saint-patrick-yard": ("Yard care", "other", "Reno"),
    "salon-2000": ("Hair salon", "hair", "Sparks"),
    "slice-reno": ("Hair salon", "hair", "Reno"),
    "the-dream-barbershop": ("Barber shop", "barber", "Reno"),
    "d-and-d": ("Barber shop", "barber", "Reno"),
}
GROUPS = [("all", "All"), ("barber", "Barbers"), ("hair", "Hair"), ("nails", "Nails"), ("beauty", "Beauty and spa"), ("other", "Other")]


def _font(fam, f, w):
    import base64
    b = base64.b64encode((SITES / "_fonts" / f).read_bytes()).decode()
    return "@font-face{font-family:'%s';font-weight:%d;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2')}" % (fam, w, b)


def _shots(slugs):
    """Phone + desktop screenshot of every demo, saved as small JPEGs next to the hub."""
    from playwright.sync_api import sync_playwright
    from PIL import Image
    (OUT / "shots").mkdir()
    with sync_playwright() as p:
        b = p.chromium.launch()
        for w, h, tag, tw in ((1280, 800, "d", 720), (390, 844, "m", 300)):
            pg = b.new_page(viewport={"width": w, "height": h})
            for s in slugs:
                f = OUT / "shots" / ("%s-%s.png" % (s, tag))
                pg.goto((OUT / s / "index.html").resolve().as_uri()); pg.wait_for_timeout(1800)
                pg.screenshot(path=str(f))
                im = Image.open(f).convert("RGB"); im = im.resize((tw, round(im.height * tw / im.width)))
                im.save(f.with_suffix(".jpg"), "JPEG", quality=72, optimize=True, progressive=True); f.unlink()
        b.close()


PAGE2 = """<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Website samples | Lucas Wooley</title>
<meta name="description" content="Websites built for barbers, salons and local businesses in Reno, Sparks and Carson City. Tap any one to try it.">
<meta name="robots" content="noindex">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23ff5a1f'/%3E%3Cpath d='M7 9l4.5 14L16 13l4.5 10L25 9' fill='none' stroke='%23000' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<style>
%FONTS%
:root{--bg:#000;--ink:#fafafa;--muted:#a1a1aa;--line:#27272a;--card:#0f0f10;--o:#ff5a1f}
*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:17px/1.55 'Space Grotesk',system-ui,sans-serif;padding:0 16px 120px}
.wrap{max-width:1200px;margin:0 auto}
.top{display:flex;align-items:center;justify-content:space-between;padding:18px 0}
.brand{display:flex;align-items:center;gap:10px;color:inherit;text-decoration:none;font:800 19px 'Archivo',sans-serif}
.brand svg{width:30px;height:30px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 24px;border-radius:999px;background:var(--o);color:#000;font:600 16px 'Space Grotesk',sans-serif;text-decoration:none;white-space:nowrap;transition:transform .16s cubic-bezier(.23,1,.32,1)}
.btn:active{transform:scale(.96)}
.btn.ghost{background:transparent;color:var(--ink);border:1.5px solid var(--line)}
.btn:focus-visible,.chip:focus-visible,.brand:focus-visible{outline:3px solid var(--o);outline-offset:3px}
header{padding:44px 0 26px}
h1{font:800 clamp(44px,9vw,112px)/.92 'Archivo',sans-serif;letter-spacing:-.035em;max-width:11ch}
header p{margin-top:18px;color:var(--muted);font-size:clamp(17px,2vw,20px);max-width:40ch}
.chips{display:flex;gap:8px;overflow-x:auto;padding:8px 0 18px;scrollbar-width:none;position:sticky;top:0;background:linear-gradient(#000 78%,transparent);z-index:5}
.chips::-webkit-scrollbar{display:none}
.chip{flex:none;min-height:44px;padding:0 18px;border-radius:999px;border:1.5px solid var(--line);background:transparent;color:var(--ink);font:500 15px 'Space Grotesk',sans-serif;cursor:pointer;transition:background .15s,border-color .15s,transform .16s cubic-bezier(.23,1,.32,1)}
.chip:active{transform:scale(.95)}
.chip[aria-pressed=true]{background:var(--ink);color:#000;border-color:var(--ink)}
.chip i{font-style:normal;opacity:.55;margin-left:6px}
.grid{display:grid;gap:22px;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));padding-top:8px}
@media (max-width:420px){.grid{grid-template-columns:1fr}}
a.card{position:relative;display:block;color:inherit;text-decoration:none;background:var(--card);border:1px solid var(--line);border-radius:18px;overflow:hidden;transition:border-color .2s,transform .25s cubic-bezier(.23,1,.32,1)}
a.card:focus-visible{outline:3px solid var(--o);outline-offset:3px}
@media (hover:hover){a.card:hover{border-color:#52525b;transform:translateY(-4px)}a.card:hover .ph{transform:translateY(-8px) rotate(-2deg)}a.card:hover .go{background:var(--o);color:#000}}
a.card:active{transform:scale(.98)}
.stage{position:relative;aspect-ratio:16/11;background:#18181b;overflow:hidden}
.dk{position:absolute;left:5%;top:8%;width:84%;border-radius:8px;overflow:hidden;background:#fff;box-shadow:0 20px 40px rgba(0,0,0,.5)}
.dk::before{content:"";display:block;height:12px;background:#e4e4e7}
.dk img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:top}
.ph{position:absolute;right:5%;bottom:-16%;width:27%;border-radius:16px;border:3px solid #3f3f46;overflow:hidden;background:#000;box-shadow:0 18px 40px rgba(0,0,0,.6);transition:transform .35s cubic-bezier(.23,1,.32,1)}
.ph img{display:block;width:100%;height:auto;aspect-ratio:390/844;object-fit:cover;object-position:top}
.meta{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px}
.meta b{display:block;font:800 21px/1.15 'Archivo',sans-serif;letter-spacing:-.01em}
.meta span{color:var(--muted);font-size:15px}
.go{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:#18181b;border:1px solid var(--line);transition:background .2s,color .2s}
.go svg{width:18px;height:18px}
.cta{position:fixed;left:16px;right:16px;bottom:16px;z-index:9;max-width:620px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:8px 8px 8px 22px;border-radius:999px;background:rgba(24,24,27,.94);border:1px solid var(--line);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.cta p{font-weight:600;line-height:1.25}
@media (max-width:480px){.cta p{font-size:15px}.cta .btn{padding:0 18px}}
footer{margin-top:56px;color:var(--muted);font-size:14px;max-width:60ch}
[hidden]{display:none!important}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
</style></head>
<body><div class="wrap">
<div class="top"><a class="brand" href="%SALES_HOME%"><svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#ff5a1f"/><path d="M7 9l4.5 14L16 13l4.5 10L25 9" fill="none" stroke="#000" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Lucas Wooley</a><a class="btn ghost" href="%SALES%">Get yours free</a></div>
<header><h1>%COUNT% sites. Zero templates.</h1><p>Each one built for one local business. Tap any of them to try it.</p></header>
<nav class="chips" aria-label="Filter by type">%CHIPS%</nav>
<main class="grid">
%CARDS%
</main>
<footer>These are free samples built from public listings. Most aren't live sites yet, and the businesses haven't hired me. If one is yours and you'd like it taken down, just ask.</footer>
</div>
<div class="cta"><p>Want one for your business?</p><a class="btn" href="%SALES%">Get a free sample</a></div>
<script>
var chips=[].slice.call(document.querySelectorAll('.chip')),cards=[].slice.call(document.querySelectorAll('a.card'));
chips.forEach(function(c){c.addEventListener('click',function(){var g=c.dataset.g;chips.forEach(function(x){x.setAttribute('aria-pressed',x===c)});cards.forEach(function(k){k.hidden=!(g==='all'||k.dataset.g===g)})})});
</script>
</body></html>
"""

CARD2 = """<a class="card" href="%(slug)s/" data-g="%(g)s"><div class="stage"><div class="dk"><img src="shots/%(slug)s-d.jpg" alt="" width="720" height="450" loading="lazy" decoding="async"></div><div class="ph"><img src="shots/%(slug)s-m.jpg" alt="" width="300" height="649" loading="lazy" decoding="async"></div></div>
<div class="meta"><div><b>%(name)s</b><span>%(sub)s</span></div><span class="go" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div></a>"""


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    items = collect()
    for it in items:
        (OUT / it["slug"]).mkdir()
        shutil.copyfile(it["src"], OUT / it["slug"] / "index.html")
    _shots([it["slug"] for it in items])
    cards, counts = [], {"all": len(items)}
    for it in items:
        kind, g, city = META.get(it["slug"], (it["kind"] or "Local business", "other", it["place"]))
        counts[g] = counts.get(g, 0) + 1
        name = re.sub(r"\s+LLC$", "", it["name"])
        cards.append(CARD2 % dict(slug=it["slug"], g=g, name=html.escape(name), sub=html.escape("%s in %s" % (kind, city) if city else kind)))
    chips = "".join('<button type="button" class="chip" data-g="%s" aria-pressed="%s">%s<i>%d</i></button>' % (g, "true" if g == "all" else "false", lab, counts[g])
                    for g, lab in GROUPS if counts.get(g))
    fonts = _font("Archivo", "archivo-latin-800-normal.woff2", 800) + _font("Space Grotesk", "space-grotesk-latin-500-normal.woff2", 500) + _font("Space Grotesk", "space-grotesk-latin-600-normal.woff2", 600)
    page = (PAGE2.replace("%FONTS%", fonts).replace("%COUNT%", str(len(items))).replace("%CHIPS%", chips)
            .replace("%CARDS%", "\n".join(cards)).replace("%SALES_HOME%", SALES.split("#")[0]).replace("%SALES%", SALES))
    (OUT / "404.html").write_text(NOT_FOUND, encoding="utf-8")
    (OUT / "index.html").write_text(page, encoding="utf-8")
    (OUT / "_headers").write_text("/*\n  X-Robots-Tag: noindex\n/shots/*\n  Cache-Control: public, max-age=86400\n", encoding="utf-8")
    print("portfolio: %d demos -> %s" % (len(items), OUT))


if __name__ == "__main__":
    main()
