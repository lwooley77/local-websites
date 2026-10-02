"""Shared demo QA (Playwright + Chromium).

Usage:  python sites/_kit/qa.py sites/<slug>

Loads <site>/dist/index.html at 1280x900 and 390x844 (mobile, touch) and fails on:
  page errors, horizontal overflow, leftover placeholders, em dashes, banned phrases,
  <img> without alt, dead links (href="" or "#"), broken data-qa interactions.
Saves viewport-sized screenshots down the page to <site>/qa/shots/{desktop,mobile}-NN.png
and writes <site>/qa/report.json. Exit code 1 if anything failed.

Interaction hooks (add these attributes in the markup so QA can drive the page):
  data-qa="menu-open"   button that opens the phone menu   -> expects [data-qa="menu"] visible after click
  data-qa="menu-close"  button that closes it               -> expects [data-qa="menu"] hidden after click
  data-qa="faq"         FAQ trigger buttons (aria-expanded) -> first one must flip aria-expanded on click
  data-qa="tab"         service category tabs (optional)    -> clicking must not throw
"""
import json, re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BANNED = [
    r"\belevate\b", r"\bunleash\b", r"experience the", r"welcome to", r"\bnestled\b", r"look no further",
    r"\bseamless", r"lorem", r"ipsum", r"\bTODO\b", r"\bTBD\b", r"placeholder", r"your (photo|image) here",
    r"%%[A-Z_]+%%", r"\[[A-Z ]{3,}\]",
]


AUDIT_JS = r"""() => {
  const f = [];
  const year = String(new Date().getFullYear());
  // head
  const t = document.title.trim();
  if (t.length < 10 || t.length > 70) f.push('title length ' + t.length + ' (want 10-70): ' + t);
  const md = document.querySelector('meta[name="description"]');
  const mdl = md ? md.content.trim().length : 0;
  if (mdl < 50 || mdl > 170) f.push('meta description length ' + mdl + ' (want 50-170)');
  if (!document.querySelector('link[rel~="icon"]')) f.push('no favicon');
  if (!document.querySelector('meta[property="og:title"]')) f.push('no og:title');
  if (!document.documentElement.lang) f.push('no html lang');
  if (!document.querySelector('script[type="application/ld+json"]')) f.push('no JSON-LD');
  // in-page anchors must resolve (nav, footer, buttons)
  const bad = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href'))
    .filter(h => h.length > 1 && !document.getElementById(decodeURIComponent(h.slice(1))));
  if (bad.length) f.push('anchors with no target: ' + [...new Set(bad)].slice(0, 6).join(' '));
  // clickable logo
  const logo = document.querySelector('[data-qa="logo"]');
  if (!logo || logo.tagName !== 'A') f.push('logo must be an <a data-qa="logo"> linking to the top');
  // tel / sms / mailto formats
  for (const a of document.querySelectorAll('a[href^="tel:"],a[href^="sms:"]')) {
    const n = a.getAttribute('href').replace(/^(tel|sms):/, '').split(/[?&]/)[0].replace(/[^\d+]/g, '');
    if (!/^\+?1?\d{10}$/.test(n)) { f.push('bad phone link ' + a.getAttribute('href')); break; }
  }
  for (const a of document.querySelectorAll('a[href^="mailto:"]')) {
    if (!/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}/i.test(a.getAttribute('href'))) { f.push('bad mailto ' + a.getAttribute('href')); break; }
  }
  // external links open safely
  const ext = [...document.querySelectorAll('a[target="_blank"]')].filter(a => !/noopener/.test(a.rel || ''));
  if (ext.length) f.push(ext.length + ' target=_blank links without rel=noopener');
  // controls need a name
  const unnamed = [...document.querySelectorAll('a,button')].filter(e => e.offsetParent !== null &&
    !(e.textContent || '').trim() && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby') && !e.getAttribute('title') &&
    !e.querySelector('img[alt]:not([alt=""]), svg title, [aria-label]'));
  if (unnamed.length) f.push(unnamed.length + ' links/buttons with no accessible name: ' + unnamed.slice(0, 4).map(e => e.outerHTML.slice(0, 70)).join(' | '));
  // visible focus style present
  let focus = false;
  for (const s of document.styleSheets) { try { for (const r of s.cssRules) if ((r.cssText || '').includes(':focus-visible')) { focus = true; break; } } catch (e) {} if (focus) break; }
  if (!focus) f.push('no :focus-visible style (keyboard users)');
  // footer year + privacy note
  const foot = document.querySelector('footer');
  if (!foot) f.push('no <footer>');
  else if (!foot.innerText.includes(year)) f.push('footer has no current year ' + year);
  const pv = document.getElementById('privacy');
  if (!pv || !/cookie/i.test(pv.textContent)) f.push('missing #privacy note (must mention cookies/tracking)');
  // cookies
  if (document.cookie) f.push('page sets cookies: ' + document.cookie.slice(0, 60));
  // oversized embedded images
  const big = Object.entries(window.IMG || {}).filter(([k, v]) => v.length > 400000).map(([k]) => k);
  if (big.length) f.push('images over ~300KB: ' + big.join(' '));
  // contrast (solid backgrounds only)
  const rgb = s => (s.match(/[\d.]+/g) || []).map(Number);
  const lum = c => { const a = c.slice(0, 3).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * a[0] + .7152 * a[1] + .0722 * a[2]; };
  const low = [];
  for (const el of document.querySelectorAll('body *')) {
    if (low.length >= 5) break;
    if (!el.offsetParent || el.closest('[aria-hidden="true"]')) continue;
    const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!own) continue;
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 1) continue;
    const fg = rgb(cs.color); if (fg.length > 3 && fg[3] < .99) continue;
    let p = el, bg = null;
    while (p && p.nodeType === 1) {
      const ps = getComputedStyle(p);
      if (ps.backgroundImage !== 'none') { bg = 'img'; break; }
      const b = rgb(ps.backgroundColor);
      if (b.length === 3 || (b.length > 3 && b[3] > .99)) { bg = b; break; }
      if (b.length > 3 && b[3] > 0) { bg = 'img'; break; }
      p = p.parentElement;
    }
    if (!bg || bg === 'img') continue;
    const L1 = lum(fg), L2 = lum(bg), ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
    const size = parseFloat(cs.fontSize), large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight) >= 700);
    if (ratio < (large ? 3 : 4.5)) low.push(ratio.toFixed(2) + ' "' + el.textContent.trim().slice(0, 30) + '"');
  }
  if (low.length) f.push('low contrast text: ' + low.join(' | '));
  return f;
}"""


def check(page, label, errors, shots_dir):
    fails = []
    page.wait_for_timeout(600)
    if errors:
        fails += ["%s page error: %s" % (label, e) for e in errors]
    sw, iw = page.evaluate("[document.documentElement.scrollWidth, window.innerWidth]")
    if sw > iw:
        wide = page.evaluate(
            """() => [...document.querySelectorAll('body *')].filter(e => {const r=e.getBoundingClientRect(); return r.right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed'}).slice(0,5).map(e => e.tagName + '.' + (e.className && e.className.baseVal === undefined ? e.className : '') )"""
        )
        fails.append("%s horizontal overflow %d > %d (%s)" % (label, sw, iw, wide))
    clipped = page.evaluate(
        """() => [...document.querySelectorAll('body *')].filter(e => {
            const cs = getComputedStyle(e);
            return cs.textOverflow === 'ellipsis' && e.offsetParent !== null && e.scrollWidth > e.clientWidth + 1;
        }).slice(0, 5).map(e => e.innerText.slice(0, 50))"""
    )
    if clipped:
        fails.append("%s text cut off with ellipsis: %s" % (label, clipped))
    text = page.evaluate("document.body.innerText")
    if "—" in text:
        fails.append("%s em dash in copy (%d)" % (label, text.count("—")))
    for pat in BANNED:
        m = re.search(pat, text, re.I)
        if m:
            fails.append("%s banned/placeholder text: %r" % (label, m.group(0)))
    noalt = page.evaluate("[...document.images].filter(i => !i.hasAttribute('alt')).length")
    if noalt:
        fails.append("%s %d <img> without alt" % (label, noalt))
    broken = page.evaluate("[...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).length")
    if broken:
        fails.append("%s %d broken images" % (label, broken))
    dead = page.evaluate("[...document.querySelectorAll('a')].filter(a => {const h=a.getAttribute('href'); return h === null || h === '' || h === '#'}).length")
    if dead:
        fails.append("%s %d dead links" % (label, dead))

    # launch checklist (titles, meta, favicon, anchors, logo, links, contrast, a11y, privacy, footer year)
    audit = page.evaluate(AUDIT_JS)
    fails += ["%s %s" % (label, a) for a in audit]

    # interactions
    if label == "mobile" and page.query_selector('[data-qa="menu-open"]'):
        try:
            page.click('[data-qa="menu-open"]')
            page.wait_for_timeout(400)
            if not page.is_visible('[data-qa="menu"]'):
                fails.append("mobile menu did not open")
            elif page.query_selector('[data-qa="menu-close"]'):
                page.click('[data-qa="menu-close"]')
                page.wait_for_timeout(400)
                if page.is_visible('[data-qa="menu"]'):
                    fails.append("mobile menu did not close")
        except Exception as e:
            fails.append("mobile menu interaction error: %s" % e)
    faq = page.query_selector('[data-qa="faq"]')
    if faq:
        try:
            faq.scroll_into_view_if_needed()
            before = faq.get_attribute("aria-expanded")
            faq.click()
            page.wait_for_timeout(300)
            if faq.get_attribute("aria-expanded") == before:
                fails.append("%s FAQ aria-expanded did not change" % label)
        except Exception as e:
            fails.append("%s FAQ interaction error: %s" % (label, e))
    for t in page.query_selector_all('[data-qa="tab"]')[:3]:
        try:
            t.scroll_into_view_if_needed()
            t.click()
        except Exception as e:
            fails.append("%s tab click error: %s" % (label, e))
    if errors:
        fails += ["%s page error after interaction: %s" % (label, e) for e in errors if ("%s page error: %s" % (label, e)) not in fails]

    # screenshots down the page
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(200)
    h = page.evaluate("document.documentElement.scrollHeight")
    vh = page.viewport_size["height"]
    n = 0
    y = 0
    while y < h and n < 14:
        page.evaluate("y => window.scrollTo(0, y)", y)
        page.wait_for_timeout(250)
        page.screenshot(path=str(shots_dir / ("%s-%02d.png" % (label, n))))
        n += 1
        y += vh
    return fails, n


def main(site):
    site = Path(site).resolve()
    dist = site / "dist" / "index.html"
    shots = site / "qa" / "shots"
    shots.mkdir(parents=True, exist_ok=True)
    for old in shots.glob("*.png"):
        old.unlink()
    report = {"fails": [], "shots": {}, "kb": dist.stat().st_size // 1024}
    with sync_playwright() as p:
        b = p.chromium.launch()
        for label, opts in (
            ("desktop", dict(viewport={"width": 1280, "height": 900})),
            ("mobile", dict(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2)),
        ):
            ctx = b.new_context(**opts)
            page = ctx.new_page()
            errors = []
            page.on("pageerror", lambda e, errors=errors: errors.append(str(e)))
            external = []
            page.on("request", lambda r, external=external: external.append(r.url) if not r.url.startswith(("file:", "data:", "blob:", "about:")) else None)
            page.goto(dist.as_uri())
            fails, n = check(page, label, errors, shots)
            if external:
                fails.append("%s third-party requests (tracking/embeds must be none): %s" % (label, sorted(set(u.split("/")[2] for u in external))))
            if ctx.cookies():
                fails.append("%s cookies set" % label)
            report["fails"] += fails
            report["shots"][label] = n
            ctx.close()
        b.close()
    (site / "qa" / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))
    sys.exit(1 if report["fails"] else 0)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ".")
