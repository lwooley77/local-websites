document.getElementById("yr").textContent = new Date().getFullYear();

// screenshots from the embedded image map (a slot is removed if its image is missing)
document.querySelectorAll("img[data-k]").forEach(function (im) {
  var k = im.getAttribute("data-k");
  if (window.IMG && IMG[k]) im.src = IMG[k]; else im.closest(".shot").remove();
});

// short intro: awning drops, OPEN sign lights up. Skippable (click, Skip, Escape). Not shown for reduced motion, deep links or automated tests.
(function () {
  var q = location.search.indexOf("intro") > -1;
  if (!q && (location.search.indexOf("tour") > -1 || navigator.webdriver || location.hash || matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
  var el = document.createElement("div");
  el.id = "intro";
  el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", "Welcome");
  el.innerHTML = '<div class="scene"><svg class="aw" viewBox="0 0 320 120" aria-hidden="true"><path d="M10 6 L40 6 H280 L310 6 V20 Z" fill="none"/>' +
    '<path d="M16 4 H304 L316 96 H4 Z" fill="#f4eee3" stroke="#e6b26a" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M44 4 L34 96 M92 4 L84 96 M140 4 L134 96 M188 4 L186 96 M236 4 L238 96 M284 4 L290 96" stroke="#e0793c" stroke-width="16"/>' +
    '<path d="M4 96 Q22 116 40 96 Q58 116 76 96 Q94 116 112 96 Q130 116 148 96 Q166 116 184 96 Q202 116 220 96 Q238 116 256 96 Q274 116 292 96 Q310 116 316 100" fill="#f4eee3" stroke="#e6b26a" stroke-width="3"/></svg>' +
    '<span class="sign">OPEN</span><div class="nm">Lucas Wooley</div></div><button type="button" class="skip">Skip</button>';
  document.body.appendChild(el);
  document.body.style.overflow = "hidden";
  var behind = [].slice.call(document.body.children).filter(function (n) { return n !== el; });
  behind.forEach(function (n) { n.setAttribute("inert", ""); });
  el.querySelector(".skip").focus();
  var done = false;
  function end() {
    if (done) return; done = true;
    el.classList.add("out"); document.body.style.overflow = "";
    behind.forEach(function (n) { n.removeAttribute("inert"); });
    setTimeout(function () { el.remove(); }, 400);
  }
  el.addEventListener("click", end);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") end(); });
  setTimeout(end, 2400);
})();

// ---- contact options: each one appears only when its setting is filled in (site.json: PHONE, BOOKING) ----
var PHONE = "%%PHONE%%", BOOKING = "%%BOOKING%%", EMAIL = "%%EMAIL%%";
var DIGITS = PHONE.replace(/[^\d+]/g, "");
(function () {
  var reach = document.getElementById("reach");
  function btn(label, href, alt, id) {
    var a = document.createElement("a");
    a.className = "btn" + (alt ? " alt" : ""); a.textContent = label; a.href = href; if (id) a.id = id;
    reach.appendChild(a); return a;
  }
  var cp = btn("Copy email", "#contact", true); cp.addEventListener("click", function (e) { e.preventDefault(); var done = function () { cp.textContent = "Copied: " + EMAIL; }; if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(done, done); else done(); });
  if (DIGITS) { btn("Call me " + PHONE, "tel:" + DIGITS); btn("Text me", "sms:" + DIGITS, true); }
  if (BOOKING) {
    var b = btn("Book a time to talk", BOOKING, true, "r-book"); b.setAttribute("data-book", "");
  }
  // phone gets its own button on the sticky bottom bar too
  var dock = document.querySelector(".dockbar");
  if (dock && DIGITS) {
    dock.style.display = ""; dock.style.gridTemplateColumns = "1fr 1fr"; dock.style.gap = "10px";
    var c = document.createElement("a"); c.className = "btn alt"; c.href = "tel:" + DIGITS; c.textContent = "Call me"; dock.insertBefore(c, dock.firstChild);
  }
})();

// ---- in-page booking panel for the calendar link (visitor stays on this site) ----
(function () {
  if (!BOOKING) return;
  var p = document.createElement("div");
  p.className = "bkp"; p.setAttribute("role", "dialog"); p.setAttribute("aria-modal", "true"); p.setAttribute("aria-label", "Book a time to talk");
  p.innerHTML = '<div class="bar"><span>Pick a time</span><button type="button">Close</button></div>';
  document.body.appendChild(p);
  var fr = null, last = null;
  function close() { p.classList.remove("on"); document.body.style.overflow = ""; if (last) last.focus(); }
  p.querySelector("button").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && p.classList.contains("on")) close(); });
  window.openBooking = function (e) {
    if (e) e.preventDefault();
    last = document.activeElement;
    if (!fr) { fr = document.createElement("iframe"); fr.title = "Booking calendar"; fr.src = BOOKING; p.appendChild(fr); }
    p.classList.add("on"); document.body.style.overflow = "hidden"; p.querySelector("button").focus();
  };
  document.querySelectorAll("[data-book]").forEach(function (a) { a.addEventListener("click", window.openBooking); });
})();

// ---- "Questions?" helper: instant answers from this site's own content. Not a person, not AI. Runs in the browser, sends nothing. ----
(function () {
  var KB = [
    { k: ["cost", "price", "pricing", "how much", "expensive", "afford", "fee", "charge", "pay"], a: "There's a one-time launch fee to set up and publish your site, then a small monthly fee for hosting and edits like prices and hours. The sample is free, and I give you the number only after you've seen it, so you never pay to find out." },
    { k: ["free", "sample", "preview", "demo", "try"], a: "The sample is free. I build it from your public listings (your services, hours, address and what customers say) and send it to you. You look, and then you decide." },
    { k: ["seo", "rank", "ranking", "search", "show up", "found", "find me", "visible", "first page"], a: "I set up the things that matter for local search: clear titles and descriptions, your name, address and phone written the same way everywhere, a fast phone-friendly site, and your business details in a form Google can read. I can't promise a ranking, and nobody honestly can, but I make sure nothing on your site holds you back." },
    { k: ["follow", "followup", "call back", "callback", "missed call", "lead", "funnel", "customers", "more calls"], a: "Beyond tap-to-call, text and booking, I can set up call-back requests and follow-up messages for people who reached out, using the tools you already have or simple ones. We decide how far to go after you've seen your sample." },
    { k: ["why", "need", "worth", "instagram", "facebook", "yelp", "google", "already", "social"], a: "Keep your Instagram, Facebook and Google page. A site adds the one place you control: your own hours, prices and services, correct and in your voice. People who hear your name and look you up find something solid, and it works at 11 PM when you're closed." },
    { k: ["include", "included", "get", "offer", "do you do", "service", "what do"], a: "Custom design and build, setting up your domain and putting it online, hosting, small edits like prices and hours, and your booking or ordering link. Terms are in writing before anything goes live." },
    { k: ["kind", "type", "business", "restaurant", "salon", "barber", "contractor", "shop", "clinic", "who"], a: "Any local business: restaurants, shops, salons and barbers, contractors, clinics, studios and more. If customers look you up, you can use a good website." },
    { k: ["long", "time", "when", "fast", "quick", "timeline", "days", "weeks"], a: "I build the sample first and you can see it before we talk about anything else. I'll give you a clear timeline for going live when you've seen it." },
    { k: ["photo", "picture", "image"], a: "I only use photos you've posted publicly, and only after you say yes. You can ask me to remove any of them, and you can send me better ones." },
    { k: ["book", "booking", "order", "appointment", "schedule", "online"], a: "Yes. Customers pick an open time on your own site and get a confirmation. The booking lands on your calendar and client list automatically, so you never retype it. I connect the booking tool you already use, like Vagaro, Booksy or Square, or set up a simple one." },
    { k: ["change", "update", "edit", "hours", "fix", "modify"], a: "Small edits like prices, hours and services are included in the monthly fee. Send me a message and I update it." },
    { k: ["own", "domain", "host", "hosting", "name"], a: "I set up your domain and hosting as part of launch and keep it running. I'll put the details in writing before anything goes live." },
    { k: ["cancel", "contract", "terms", "commit", "lock"], a: "I put terms in writing before anything goes live, including how to cancel. If you don't like the sample, you owe nothing." },
    { k: ["start", "begin", "next", "sign", "how do"], a: "Send me your business name with the contact form at the bottom of this page. I build the sample from your public listings and send it to you. You look, tell me what to change, and only then do we talk price." },
    { k: ["logo", "brand", "branding", "seo", "marketing", "ads", "social media", "print", "flyer"], a: "My focus is your website. If you need a logo, ads or social media, ask me directly and I'll tell you honestly whether I can help or point you to someone good." },
    { k: ["safe", "privacy", "data", "cookie", "track"], a: "This site uses no cookies, no analytics and no tracking. The contact form sends what you enter to me only, and what you type in this helper never leaves your browser." }
  ];
  var CHIPS = ["What does it cost?", "Why do I need a website?", "What's included?", "How do I get started?"];
  var fab = document.createElement("button");
  fab.type = "button"; fab.className = "ask-fab"; fab.textContent = "Questions?"; fab.setAttribute("aria-haspopup", "dialog");
  var box = document.createElement("div");
  box.className = "ask"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Instant answers");
  box.innerHTML = '<header><div><b>Instant answers</b><span>From this site. Not a person, and not AI.</span></div><button type="button" class="x" aria-label="Close">&times;</button></header>' +
    '<div class="log" role="log" aria-live="polite"></div><div class="chips2"></div>' +
    '<form><label for="askq" style="position:absolute;left:-9999px">Your question</label><input id="askq" type="text" placeholder="Type a question" autocomplete="off"><button type="submit">Ask</button></form>';
  document.body.appendChild(fab); document.body.appendChild(box);
  var log = box.querySelector(".log"), chips = box.querySelector(".chips2"), inp = box.querySelector("input");
  function say(t, cls) { var d = document.createElement("div"); d.className = "m " + cls; d.textContent = t; log.appendChild(d); log.scrollTop = log.scrollHeight; return d; }
  function acts(d) {
    var w = document.createElement("div"); w.className = "acts";
    function a(t, h) { var x = document.createElement("a"); x.textContent = t; x.href = h; w.appendChild(x); return x; }
    var mm = a("Send me a message", "#contact"); mm.addEventListener("click", function () { box.classList.remove("on"); fab.style.display = ""; setTimeout(function () { var x = document.getElementById("cf-name"); if (x) x.focus({ preventScroll: true }); }, 400); });
    if (DIGITS) { a("Call " + PHONE, "tel:" + DIGITS); a("Text", "sms:" + DIGITS); }
    if (BOOKING) { var b = a("Book a time", BOOKING); b.addEventListener("click", function (e) { box.classList.remove("on"); fab.style.display = ""; if (window.openBooking) window.openBooking(e); }); }
    a("Email", "mailto:" + EMAIL + "?subject=Question");
    d.appendChild(w);
  }
  function answer(q) {
    var s = q.toLowerCase(), best = null, score = 0;
    KB.forEach(function (e) { var n = 0; e.k.forEach(function (w) { if (s.indexOf(w) > -1) n += w.length > 3 ? 2 : 1; }); if (n > score) { score = n; best = e; } });
    if (/(call|phone|talk|speak|person|human|reach|contact|number)/.test(s)) {
      var d = say(DIGITS ? "Of course. You can reach me directly:" : "Of course. The fastest way to reach me right now is email:", "bot"); acts(d); return;
    }
    if (best && score >= 2) say(best.a, "bot");
    else { var f = say("I don't have a good answer to that one. Ask me directly and you'll hear back from a real person:", "bot"); acts(f); }
  }
  function ask(q) { if (!q.trim()) return; say(q, "me"); answer(q); }
  CHIPS.forEach(function (c) {
    var b = document.createElement("button"); b.type = "button"; b.textContent = c;
    b.addEventListener("click", function () { ask(c); inp.focus(); }); chips.appendChild(b);
  });
  say("Hi, I'm the quick-answers helper for this site. Tap a question, or type your own.", "bot");
  box.querySelector("form").addEventListener("submit", function (e) { e.preventDefault(); ask(inp.value); inp.value = ""; });
  function open() { box.classList.add("on"); fab.style.display = "none"; inp.focus(); }
  function close() { box.classList.remove("on"); fab.style.display = ""; fab.focus(); }
  fab.addEventListener("click", open); box.querySelector(".x").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("on")) close(); });
})();

// FAQ accordion
document.querySelectorAll(".faq button").forEach(function (b) {
  b.addEventListener("click", function () {
    var open = b.getAttribute("aria-expanded") === "true";
    b.setAttribute("aria-expanded", String(!open));
    document.getElementById(b.getAttribute("aria-controls")).classList.toggle("on", !open);
  });
});

// header hides on scroll down, shows on scroll up
(function () {
  var h = document.getElementById("hdr"), last = 0;
  addEventListener("scroll", function () {
    var y = scrollY;
    h.classList.toggle("scrolled", y > 8);
    last = y;
  }, { passive: true });
})();

// mobile menu
(function () {
  var menu = document.getElementById("mmenu"), open = document.querySelector('[data-qa="menu-open"]'), close = document.querySelector('[data-qa="menu-close"]');
  if (!menu || !open || !close) return;
  function shut() { menu.hidden = true; open.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; open.focus(); }
  open.addEventListener("click", function () { menu.hidden = false; open.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; close.focus(); });
  close.addEventListener("click", shut);
  menu.querySelectorAll("a").forEach(function (l) { l.addEventListener("click", function () { menu.hidden = true; open.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) shut(); });
})();

// reading progress bar and "you are here" highlight in the menu
(function () {
  var bar = document.getElementById("prog"), links = [].slice.call(document.querySelectorAll("[data-spy]"));
  var secs = links.map(function (l) { return document.getElementById(l.getAttribute("data-spy")); });
  function tick() {
    var max = document.documentElement.scrollHeight - innerHeight;
    if (bar && max > 0) bar.style.width = Math.min(100, scrollY / max * 100).toFixed(1) + "%";
    var cur = -1;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
    links.forEach(function (l, i) { l.classList.toggle("on", i === cur); if (i === cur) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current"); });
  }
  addEventListener("scroll", tick, { passive: true }); tick();
})();

// in-site contact form: posts to the site's own host (Netlify Forms). Visitor never leaves the page or opens a mail app.
(function () {
  var f = document.getElementById("cform"); if (!f) return;
  var st = f.querySelector(".fstat"), btn = f.querySelector('button[type="submit"]'), done = document.querySelector(".fdone");
  function bad(el, msg) { el.classList.add("invalid"); el.setAttribute("aria-invalid", "true"); st.textContent = msg; el.focus(); }
  [].forEach.call(f.querySelectorAll("input,textarea"), function (el) { el.addEventListener("input", function () { el.classList.remove("invalid"); el.removeAttribute("aria-invalid"); st.textContent = ""; }); });
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var n = f.elements["name"], em = f.elements["email"], m = f.elements["message"];
    if (!n.value.trim()) return bad(n, "Please add your name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(em.value.trim())) return bad(em, "Please add a valid email so I can reply.");
    if (!m.value.trim()) return bad(m, "Please add a short message.");
    btn.disabled = true; st.textContent = "Sending...";
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(f)).toString() })
      .then(function (r) { if (!r.ok) throw new Error("bad status"); f.hidden = true; done.hidden = false; done.setAttribute("tabindex", "-1"); done.focus(); })
      .catch(function () {
        btn.disabled = false; st.textContent = "That didn't send. Please email me instead at ";
        var a = document.createElement("a"); a.href = "mailto:" + (window.CFG_EMAIL || "%%EMAIL%%") + "?subject=Free%20sample%20website"; a.textContent = "%%EMAIL%%"; st.appendChild(a); st.appendChild(document.createTextNode("."));
      });
  });
})();

// scroll story: pieces swirl in a funnel, then each flies to the front to show what it is, then goes into place.
// Everything is set straight from scrollY (no lag).
(function () {
  var st = document.getElementById("story"), svg = document.getElementById("pieces");
  if (!st || !svg) return;
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var P = [].slice.call(svg.querySelectorAll("[data-p]")).sort(function (a, b) { return a.getAttribute("data-i") - b.getAttribute("data-i"); });
  var paintOrder = [].slice.call(svg.querySelectorAll("[data-p]"));
  var D = [].slice.call(svg.querySelectorAll("[data-d]"));
  var caps = [].slice.call(st.querySelectorAll(".cap")), neon = svg.querySelector(".neon"), funnel = svg.querySelector(".funnel");
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  if (still) { caps.forEach(function (c, i) { c.classList.toggle("on", i === caps.length - 1); }); neon.setAttribute("opacity", "1"); funnel.setAttribute("opacity", "0"); D.forEach(function (d) { d.style.display = "none"; }); return; }
  var N = P.length, START = 0.07, SLOT = 0.125;
  var items = P.map(function (g, i) {
    var bb = g.getBBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2, big = Math.max(bb.width, bb.height);
    var ang = i * 2.399 + 0.6, t = (i * 0.381 + 0.1) % 1, r = (1 - t * 0.72) * 150 + 24;
    var sx = 160 + r * Math.cos(ang), sy = 14 + t * 205;
    return { g: g, cx: cx, cy: cy, sdx: sx - cx, sdy: sy - cy, fdx: 160 - cx, fdy: 112 - cy, S: i === 0 ? 1 : clamp(150 / big, 1.2, 2.6), l: g.querySelector('.lbl'), rot: ((i * 97) % 300) - 150 + (i % 2 ? 140 : -140), sw: (i % 2 ? 1 : -1) * (250 + i * 11), start: START + i * SLOT };
  });
  var bits = D.map(function (g, i) {
    var ang = i * 1.9 + 0.3, t = (i * 0.29) % 1, r = (1 - t * 0.6) * 130 + 30;
    return { g: g, sx: 160 + r * Math.cos(ang), sy: 20 + t * 190, spin: 160 + i * 31 };
  });
  var cur = -1;
  function draw(time) {
    var rect = st.getBoundingClientRect(), total = st.offsetHeight - innerHeight;
    var p = total > 0 ? clamp(-rect.top / total, 0, 1) : 1;
    var active = 0;
    items.forEach(function (it, i) {
      var u = (p - it.start) / SLOT, offx, offy, sc, rot, sw, hot = false;
      var wob = Math.sin(time / 900 + i) * 7;
      if (u <= 0) { offx = it.sdx; offy = it.sdy; sc = 1; rot = it.rot; sw = it.sw + wob; }
      else if (u < 0.34) { var e = ease(u / 0.34); offx = lerp(it.sdx, it.fdx, e); offy = lerp(it.sdy, it.fdy, e); sc = lerp(1, it.S, e); rot = lerp(it.rot, 0, e); sw = lerp(it.sw + wob, 0, e); hot = e > 0.8; active = i + 1; }
      else if (u < 0.7) { offx = it.fdx; offy = it.fdy + Math.sin(time / 500) * 2; sc = it.S; rot = 0; sw = 0; hot = true; active = i + 1; }
      else if (u < 1) { var e2 = ease((u - 0.7) / 0.3); offx = lerp(it.fdx, 0, e2); offy = lerp(it.fdy, 0, e2); sc = lerp(it.S, 1, e2); rot = 0; sw = 0; active = i + 1; }
      else { offx = 0; offy = 0; sc = 1; rot = 0; sw = 0; }
      it.g.setAttribute("transform", "rotate(" + sw.toFixed(1) + " 160 120) translate(" + offx.toFixed(1) + " " + offy.toFixed(1) + ") rotate(" + rot.toFixed(1) + " " + it.cx.toFixed(1) + " " + it.cy.toFixed(1) + ") translate(" + it.cx.toFixed(1) + " " + it.cy.toFixed(1) + ") scale(" + sc.toFixed(3) + ") translate(" + (-it.cx).toFixed(1) + " " + (-it.cy).toFixed(1) + ")");
      it.g.classList.toggle("hot", hot);
      if (it.l) it.l.setAttribute("opacity", (clamp((u - 0.18) / 0.14, 0, 1) * clamp((0.86 - u) / 0.14, 0, 1)).toFixed(2));
    });
    // the piece being shown rides on top while it is out front
    if (active > 0) { var gg = items[active - 1].g; if (svg.lastChild !== gg && (p - items[active - 1].start) / SLOT < 0.9) svg.insertBefore(gg, svg.querySelector(".neon")); }
    else if (p >= START + N * SLOT - 0.001) { paintOrder.forEach(function (g) { svg.insertBefore(g, D[0]); }); }
    var q = clamp((p - 0.04) / 0.9, 0, 1);
    bits.forEach(function (b, i) {
      var k = 1 - q, x = 160 + (b.sx - 160) * k, y = 226 - (226 - b.sy) * k;
      b.g.setAttribute("transform", "rotate(" + (b.spin * q + Math.sin(time / 800) * 6).toFixed(1) + " 160 120) translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")");
      b.g.setAttribute("opacity", (1 - q * q).toFixed(2));
    });
    funnel.setAttribute("opacity", (0.5 * clamp(1 - p * 1.7, 0, 1)).toFixed(2));
    funnel.style.transform = "rotate(" + (p * 50).toFixed(1) + "deg)"; funnel.style.transformOrigin = "160px 100px";
    neon.setAttribute("opacity", clamp((p - 0.95) / 0.05, 0, 1).toFixed(2));
    var c = p < START ? 0 : (p >= START + N * SLOT ? N + 1 : active || cur);
    if (c !== cur) { cur = c; caps.forEach(function (el, i) { el.classList.toggle("on", i === c); }); }
  }
  function loop(time) { if (!document.hidden) draw(time); requestAnimationFrame(loop); }
  draw(0); requestAnimationFrame(loop);
})();

(function () {
  var st = document.getElementById("story");
  if (!st || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(function (es) { document.body.classList.toggle("in-story", es[0].isIntersecting); }, { threshold: 0.05 }).observe(st);
})();

// auto-play tour: scrolls the page for you. Slower through the story and the pinned scenes so every animation reads.
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var root = document.documentElement, fast = true, playing = false, last = 0, y = 0, stopAt = null, raf = 0;
  var bar = document.createElement("div");
  bar.className = "tourbar";
  bar.innerHTML = '<button type="button" class="tb-play" aria-label="Play the tour"><span class="tb-ico" aria-hidden="true"></span><span class="tb-txt">Play tour</span></button>' +
    '<button type="button" class="tb-speed" aria-label="Tour speed: fast. Press to switch to slow." aria-pressed="true">Fast</button>';
  document.body.appendChild(bar);
  var play = bar.querySelector(".tb-play"), spd = bar.querySelector(".tb-speed"), txt = bar.querySelector(".tb-txt");
  var watch = document.querySelector(".watch");
  function maxY() { return document.documentElement.scrollHeight - innerHeight; }
  function setY(v) { if (window.__lenis) window.__lenis.scrollTo(v, { immediate: true, force: true }); else window.scrollTo(0, v); }
  function zoneSpeed() {
    var st = document.getElementById("story"), sc = document.getElementById("scenes");
    var r = st && st.getBoundingClientRect();
    if (r && r.top <= 70 && r.bottom > innerHeight * 0.9) return fast ? 540 : 240;
    var pin = sc && sc.parentElement && sc.parentElement.classList.contains("pin-spacer") ? sc.parentElement.getBoundingClientRect() : null;
    if (pin && pin.top <= 80 && pin.bottom > innerHeight * 0.9) return fast ? 520 : 230;
    return fast ? 1100 : 460;
  }
  function label(state) {
    var t = state === "playing" ? "Pause tour" : state === "done" ? "Replay tour" : "Play tour";
    txt.textContent = t; play.setAttribute("aria-label", t);
    bar.classList.toggle("playing", state === "playing");
    if (watch) watch.classList.toggle("playing", state === "playing");
  }
  function stop(state) { playing = false; cancelAnimationFrame(raf); label(state || "paused"); }
  function tick(t) {
    if (!playing) return;
    var dt = Math.min(0.05, (t - last) / 1000); last = t;
    y += zoneSpeed() * dt;
    var end = stopAt != null ? Math.min(stopAt, maxY()) : maxY();
    if (y >= end - 1) { setY(end); stop("done"); return; }
    setY(y); raf = requestAnimationFrame(tick);
  }
  function start(toY) {
    stopAt = toY == null ? null : toY;
    y = window.scrollY; if (y >= maxY() - 4) { y = 0; setY(0); }
    playing = true; last = performance.now(); label("playing"); raf = requestAnimationFrame(tick);
  }
  play.addEventListener("click", function () { if (playing) stop("paused"); else start(null); });
  spd.addEventListener("click", function () {
    fast = !fast; spd.textContent = fast ? "Fast" : "Slow"; spd.setAttribute("aria-pressed", String(fast));
    spd.setAttribute("aria-label", "Tour speed: " + (fast ? "fast. Press to switch to slow." : "slow. Press to switch to fast."));
  });
  if (watch) watch.addEventListener("click", function () {
    if (playing) { stop("paused"); return; }
    var st = document.getElementById("story");
    setY(0); y = 0; start(st.offsetTop + st.offsetHeight - innerHeight + 30);
  });
  // any manual input takes over
  window.addEventListener("wheel", function () { if (playing) stop("paused"); }, { passive: true });
  ["touchstart", "keydown"].forEach(function (ev) { window.addEventListener(ev, function (e) { if (playing && !(e.target && e.target.closest && (e.target.closest(".tourbar") || e.target.closest(".watch")))) stop("paused"); }, { passive: true }); });
  window.addEventListener("pointerdown", function (e) { if (playing && !(e.target.closest && (e.target.closest(".tourbar") || e.target.closest(".watch")))) stop("paused"); });
  // ?tour in the address starts it by itself
  if (location.search.indexOf("tour") > -1) setTimeout(function () { start(null); }, 1200);
})();
