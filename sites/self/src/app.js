document.getElementById("yr").textContent = new Date().getFullYear();

// screenshots from the embedded image map (a slot is removed if its image is missing)
document.querySelectorAll("img[data-k]").forEach(function (im) {
  var k = im.getAttribute("data-k");
  if (window.IMG && IMG[k]) im.src = IMG[k]; else im.closest(".shot").remove();
});

// short intro: awning drops, OPEN sign lights up. Skippable (click, Skip, Escape). Not shown for reduced motion, deep links or automated tests.
(function () {
  var q = location.search.indexOf("intro") > -1;
  if (!q && (navigator.webdriver || location.hash || matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
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
    { k: ["start", "begin", "next", "sign", "how do"], a: "Email me your business name. I build the sample from your public listings and send it to you. You look, tell me what to change, and only then do we talk price." },
    { k: ["logo", "brand", "branding", "seo", "marketing", "ads", "social media", "print", "flyer"], a: "My focus is your website. If you need a logo, ads or social media, ask me directly and I'll tell you honestly whether I can help or point you to someone good." },
    { k: ["safe", "privacy", "data", "cookie", "track"], a: "This site uses no cookies, no analytics and no tracking, and what you type in this helper never leaves your browser." }
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
