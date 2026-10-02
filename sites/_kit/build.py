"""Shared demo builder.

Usage:  python sites/_kit/build.py sites/<slug>

Reads   <site>/site.json, <site>/src/head.html, <site>/src/body.html, <site>/src/app.js,
        optional photos in <site>/assets/raw/
Writes  <site>/dist/index.html   (single self-contained file)

site.json:
{
  "lang": "en",
  "fonts": [{"family": "Fraunces", "file": "fraunces-latin-600-normal.woff2", "weight": 600}],
  "vars":  {"NAME": "Business Name", "PHONE": "(775) 555-0100", ...}
}
Placeholders:
  %%FONTS%%   in head.html  -> @font-face rules (fonts embedded as base64 from sites/_fonts)
  %%IMAGES%%  anywhere      -> <script>window.IMG={stem: dataURI}</script> built from assets/raw
  %%KEY%%     anywhere      -> site.json vars[KEY]
The build fails if any %%PLACEHOLDER%% is left unfilled.
"""
import base64, io, json, re, sys
from pathlib import Path

KIT = Path(__file__).resolve().parent
FONTS = KIT.parent / "_fonts"


def font_css(fonts):
    out = []
    for f in fonts:
        data = base64.b64encode((FONTS / f["file"]).read_bytes()).decode()
        out.append(
            "@font-face{font-family:'%s';font-style:%s;font-weight:%s;font-display:swap;"
            "src:url(data:font/woff2;base64,%s) format('woff2')}"
            % (f["family"], f.get("style", "normal"), f.get("weight", 400), data)
        )
    return "\n".join(out)


def images(site):
    raw = site / "assets" / "raw"
    files = [p for p in sorted(raw.glob("*")) if p.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")] if raw.exists() else []
    if not files:
        return "<script>window.IMG={}</script>"
    from PIL import Image, ImageOps

    web = site / "assets" / "web"
    web.mkdir(parents=True, exist_ok=True)
    m = {}
    for p in files:
        im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
        cfg = json.loads((site / "site.json").read_text(encoding="utf-8-sig"))
        cap = cfg.get("img_cap") or (1600 if p.stem.startswith("hero") else 1100)
        if max(im.size) > cap:
            im.thumbnail((cap, cap), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=cfg.get("img_q", 70), optimize=True, progressive=True)
        (web / (p.stem + ".jpg")).write_bytes(buf.getvalue())
        m[p.stem] = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()
    return "<script>window.IMG=" + json.dumps(m) + "</script>"


def main(site):
    site = Path(site).resolve()
    cfg = json.loads((site / "site.json").read_text(encoding="utf-8-sig"))
    src = site / "src"
    head = (src / "head.html").read_text(encoding="utf-8")
    body = (src / "body.html").read_text(encoding="utf-8")
    app = (src / "app.js").read_text(encoding="utf-8") if (src / "app.js").exists() else ""

    html = (
        "<!doctype html>\n<html lang=\"%s\">\n<head>\n%s\n</head>\n<body>\n%s\n<script>\n%s\n</script>\n</body>\n</html>\n"
        % (cfg.get("lang", "en"), head, body, app)
    )
    html = html.replace("%%FONTS%%", font_css(cfg.get("fonts", [])))
    html = html.replace("%%IMAGES%%", images(site))
    for k, v in cfg.get("vars", {}).items():
        html = html.replace("%%" + k + "%%", str(v))

    left = sorted(set(re.findall(r"%%[A-Z0-9_]+%%", html)))
    if left:
        sys.exit("BUILD FAILED, unfilled placeholders: " + ", ".join(left))

    dist = site / "dist"
    dist.mkdir(exist_ok=True)
    (dist / "index.html").write_text(html, encoding="utf-8", newline="\n")
    print("built %s  %d KB" % (dist / "index.html", len(html.encode()) // 1024))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ".")
