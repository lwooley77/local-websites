document.getElementById("yr").textContent = new Date().getFullYear();

// screenshots from the embedded image map (a slot is removed if its image is missing)
document.querySelectorAll("img[data-k]").forEach(function (im) {
  var k = im.getAttribute("data-k");
  if (window.IMG && IMG[k]) im.src = IMG[k]; else im.closest(".shot").remove();
});

// short intro: awning drops, OPEN sign lights up. Skippable (click, Skip, Escape). Not shown for reduced motion, deep links or automated tests.
(function () {
  var q = location.search.indexOf("intro") > -1;
  if (!q) return;
  var el = document.createElement("div");
  el.id = "intro";
  el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", "Welcome");
  el.innerHTML = '<div class="scene"><svg class="aw" viewBox="0 0 320 120" aria-hidden="true"><path d="M10 6 L40 6 H280 L310 6 V20 Z" fill="none"/>' +
    '<path d="M16 4 H304 L316 96 H4 Z" fill="#fafafa" stroke="#ff5a1f" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M44 4 L34 96 M92 4 L84 96 M140 4 L134 96 M188 4 L186 96 M236 4 L238 96 M284 4 L290 96" stroke="#ff5a1f" stroke-width="16"/>' +
    '<path d="M4 96 Q22 116 40 96 Q58 116 76 96 Q94 116 112 96 Q130 116 148 96 Q166 116 184 96 Q202 116 220 96 Q238 116 256 96 Q274 116 292 96 Q310 116 316 100" fill="#fafafa" stroke="#ff5a1f" stroke-width="3"/></svg>' +
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
  var cp = btn("Copy email", "#contact", true); cp.addEventListener("click", function (e) { e.preventDefault(); window.copyText(EMAIL, cp); });
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
    { k: ["package", "packages", "plan", "plans", "subscription", "monthly", "tier", "starter", "growth", "complete"], a: "Three packages: Starter is a clean one-page site, Growth adds local search, your booking tool and reviews, and Complete adds call-back requests and follow-up messages. Each has a launch fee plus a monthly plan for hosting and small edits. See the Pricing section for the details, or tell me which one interests you in the contact form." },
    { k: ["cost", "price", "pricing", "how much", "expensive", "afford", "fee", "charge", "pay"], a: "Packages start at %%P1_LAUNCH%% to launch plus %%P1_MONTH%% a month (Starter), %%P2_LAUNCH%% plus %%P2_MONTH%% a month (Growth), and %%P3_LAUNCH%% plus %%P3_MONTH%% a month (Complete). The sample is free, and your exact quote comes only after you've seen it, so you never pay to find out." },
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
    var ce = a("Copy email", "#contact"); ce.addEventListener("click", function (e) { e.preventDefault(); window.copyText(EMAIL, ce); });
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
        btn.disabled = false; st.textContent = "That didn't send. Please message me directly. Tap to copy my email: ";
        var cb = document.createElement("button"); cb.type = "button"; cb.className = "copylink"; cb.textContent = "%%EMAIL%%";
        cb.addEventListener("click", function () { window.copyText("%%EMAIL%%", cb); }); st.appendChild(cb);
      });
  });
})();

// scroll story v3: the pieces of a complete business site start as a tornado across the whole screen, then fly out and assemble.
// Everything is set straight from scrollY (no lag). The final layout is real page layout, so it also works with no animation.
(function () {
  var st = document.getElementById("story"), stage = st && st.querySelector(".stage"), bento = document.getElementById("bento"), cv = document.getElementById("twister");
  if (!st || !stage || !bento) return;
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var P = [].slice.call(bento.querySelectorAll(".pc")), caps = [].slice.call(st.querySelectorAll(".cap"));
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  if (still || !cv || !cv.getContext) { caps.forEach(function (c, i) { c.classList.toggle("on", i === caps.length - 1); }); if (cv) cv.style.display = "none"; return; }
  var ctx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1), W = 0, H = 0, fin = [], rt = 0;
  var N = P.length, START = 0.06, SLOT = 0.17, GAP = 0.1;
  var bits = [];
  for (var k = 0; k < 64; k++) bits.push({ a: k * 2.399, t: ((k * 0.317) % 0.86) + 0.07, kind: k % 3, s: 4 + (k % 5) * 1.6 });
  function funnel(t) { return { r: (1 - t * 0.8) * W * (W < 700 ? 0.5 : 0.4) + 18, y: H * (0.1 + 0.8 * t) }; }
  function measure() {
    P.forEach(function (el) { el.style.transform = ""; el.style.opacity = ""; });
    var sr = stage.getBoundingClientRect(); W = sr.width; H = sr.height;
    fin = P.map(function (el) { var r = el.getBoundingClientRect(); return { cx: r.left - sr.left + r.width / 2, cy: r.top - sr.top + r.height / 2 }; });
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.width = W + "px"; cv.style.height = H + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  measure();
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(measure, 160); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  var cur = -1, lastZ = [];
  function draw(time) {
    var rect = st.getBoundingClientRect(), total = st.offsetHeight - innerHeight;
    var p = total > 0 ? clamp(-rect.top / total, 0, 1) : 1;
    var cx0 = W * (W < 900 ? 0.5 : 0.6), active = 0;
    // the pieces
    P.forEach(function (el, i) {
      var t = ((i * 0.381) + 0.1) % 0.74 + 0.1, f = funnel(t);
      var ang = i * 2.4 + time * 0.0011 * (1.5 - t);
      var d = 0.5 + 0.5 * Math.sin(ang);
      var fx = cx0 + f.r * Math.cos(ang), fy = f.y + f.r * 0.2 * Math.sin(ang);
      var s0 = 0.6 + 0.6 * d, o0 = 0.5 + 0.5 * d, r0 = Math.sin(ang) * 40 + i * 24;
      var start = START + i * GAP, u = (p - start) / SLOT, e = ease(clamp(u, 0, 1));
      var x = lerp(fx, fin[i].cx, e), y = lerp(fy, fin[i].cy, e);
      // a little spiral while it flies in
      var sw = Math.sin(e * Math.PI) * 70 * (i % 2 ? 1 : -1);
      el.style.transform = "translate(" + (x - fin[i].cx + sw).toFixed(1) + "px," + (y - fin[i].cy).toFixed(1) + "px) rotate(" + lerp(r0, 0, e).toFixed(1) + "deg) scale(" + lerp(s0, 1, e).toFixed(3) + ")";
      el.style.opacity = lerp(o0, 1, e).toFixed(2);
      var z = e >= 1 ? 2 : (d > 0.5 ? 4 : 1); if (lastZ[i] !== z) { el.style.zIndex = z; lastZ[i] = z; }
      var hot = u > 0 && u < 1; el.classList.toggle("hot", hot);
      if (u > 0 && u < 1 && !active) active = i + 1;
    });
    // the tornado itself: funnel rings and flying shards
    ctx.clearRect(0, 0, W, H);
    var fade = clamp(1 - p * 1.35, 0, 1);
    if (fade > 0.01) {
      ctx.save(); ctx.globalAlpha = fade; ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = 1.2; ctx.setLineDash([5, 9]); ctx.lineDashOffset = -time * 0.02;
      for (var q = 0; q <= 8; q++) { var tt = q / 8, ff = funnel(tt); ctx.beginPath(); ctx.ellipse(cx0, ff.y, ff.r, ff.r * 0.2, 0, 0, Math.PI * 2); ctx.stroke(); }
      ctx.setLineDash([]);
      bits.forEach(function (b, bi) {
        var ff = funnel(b.t), a = b.a + time * 0.0016 * (1.6 - b.t), dd = 0.5 + 0.5 * Math.sin(a);
        var pull = clamp(p * 1.4, 0, 1), x = lerp(cx0 + ff.r * Math.cos(a), cx0, pull * 0.5), y = lerp(ff.y + ff.r * 0.2 * Math.sin(a), H * 0.5, pull * 0.5);
        ctx.save(); ctx.translate(x, y); ctx.rotate(a * 2 + bi); ctx.globalAlpha = fade * (0.25 + 0.6 * dd);
        ctx.fillStyle = b.kind === 0 ? "#ff5a1f" : (b.kind === 1 ? "#fafafa" : "#71717a");
        var s = b.s * (0.6 + dd * 0.7);
        if (b.kind === 2) { ctx.beginPath(); ctx.moveTo(-s, s); ctx.lineTo(0, -s * 1.4); ctx.lineTo(s, s); ctx.closePath(); ctx.fill(); } else ctx.fillRect(-s / 2, -s / 2, s, s * (b.kind ? 0.5 : 1));
        ctx.restore();
      });
      ctx.restore();
    }
    stage.classList.toggle("assembled", p > 0.95);
    var c = p < START ? 0 : (p >= START + (N - 1) * GAP + SLOT ? N + 1 : (active || (cur > 0 ? cur : 0)));
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
  // (full-site tour controls removed: the bar is never added to the page)
  var play = bar.querySelector(".tb-play"), spd = bar.querySelector(".tb-speed"), txt = bar.querySelector(".tb-txt");
  var watch = document.querySelector(".watch");
  function maxY() { return document.documentElement.scrollHeight - innerHeight; }
  function setY(v) { if (window.__lenis) window.__lenis.scrollTo(v, { immediate: true, force: true }); else window.scrollTo(0, v); }
  var speedOverride = null;
  function zoneSpeed() {
    if (speedOverride) return speedOverride;
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
  function stop(state) { playing = false; speedOverride = null; cancelAnimationFrame(raf); label(state || "paused"); document.body.classList.remove("autoplay"); }
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
  // the opening story plays by itself every time the site is opened (once per visit, not on refresh), about 5 seconds, and any touch/scroll/key stops it
  (function () {
    var force = location.search.indexOf("play") > -1, seen = false;
    try { seen = sessionStorage.getItem("wl-seen-story") === "1"; } catch (e) {}
    if ((seen && !force) || location.hash || window.scrollY > 40 || (navigator.webdriver && !force) || location.search.indexOf("tour") > -1) return;
    var hint = document.createElement("div");
    hint.className = "skiphint"; hint.setAttribute("role", "status"); hint.textContent = "Tap anywhere to skip";
    document.body.appendChild(hint);
    setTimeout(function () {
      try { sessionStorage.setItem("wl-seen-story", "1"); } catch (e) {}
      var st = document.getElementById("story"); if (!st || window.scrollY > 40) return;
      document.body.classList.add("autoplay");
      speedOverride = 700; start(st.offsetTop + st.offsetHeight - innerHeight + 30);
    }, 800);
  })();
})();

// optional price line and testimonial: both stay hidden until you fill them in (site.json)
(function () {
  var from = "%%PRICE_FROM%%", month = "%%PRICE_MONTH%%", quote = "%%QUOTE%%", by = "%%QUOTE_BY%%";
  var ph = document.getElementById("pricehint");
  if (ph && from) {
    ph.innerHTML = "";
    var b = document.createElement("b"); b.textContent = "Most sites start around " + from;
    ph.appendChild(b); ph.appendChild(document.createTextNode(" to launch" + (month ? ", then about " + month + " a month" : "") + ". Your exact price comes after you've seen your sample."));
    ph.hidden = false;
  }
  var pf = document.getElementById("proof");
  if (pf && quote) {
    pf.querySelector("blockquote").textContent = "\u201C" + quote + "\u201D";
    pf.querySelector("figcaption").textContent = by || "";
    pf.hidden = false;
  }
})();

// copy to clipboard with a fallback for browsers/pages where the clipboard API is blocked; tells the truth about the result
window.copyText = function (txt, el) {
  var label = el && (el.getAttribute("data-label") || el.textContent);
  if (el && !el.getAttribute("data-label")) el.setAttribute("data-label", label);
  function done(ok) {
    if (!el) return;
    el.textContent = ok ? "Copied. Paste it into any email app." : "Press and hold to copy: " + txt;
    setTimeout(function () { el.textContent = label; }, ok ? 2800 : 6000);
  }
  function fallback() {
    var t = document.createElement("textarea"); t.value = txt; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0;left:0;top:0";
    document.body.appendChild(t); t.select(); t.setSelectionRange(0, txt.length);
    var ok = false; try { ok = document.execCommand("copy"); } catch (e) {} t.remove(); done(ok);
  }
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(function () { done(true); }, fallback); else fallback();
};
document.querySelectorAll("[data-copy]").forEach(function (b) { b.addEventListener("click", function () { window.copyText(b.getAttribute("data-copy"), b); }); });

// package buttons: pick the package in the form, then glide down to it
(function () {
  var sel = document.getElementById("cf-pkg");
  document.querySelectorAll("[data-pkg]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (sel) sel.value = b.getAttribute("data-pkg");
      var t = document.getElementById("contact"); if (!t) return;
      if (window.__lenis) window.__lenis.scrollTo(t, { offset: -70, duration: 1.4 }); else t.scrollIntoView({ behavior: "smooth" });
      setTimeout(function () { var n = document.getElementById("cf-name"); if (n) n.focus({ preventScroll: true }); }, 900);
    });
  });
})();
