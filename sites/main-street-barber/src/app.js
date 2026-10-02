(function () {
  // ---- config ----
  var BOOKING_URL = ""; // Online booking link once the shop has one (Square, Booksy, etc). Empty = Book opens the Call / Text sheet.
  var TZ = "America/Los_Angeles";
  // Hours as listed online (Fresha, BestProsInTown, Nextdoor). Day 0=Sun..6=Sat, [open, close] in 24h.
  var HOURS = { 2: [8, 17], 3: [8, 17], 4: [8, 17], 5: [8, 17], 6: [8, 12] };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- photos (only render when provided) ----
  var IMG = window.IMG || {};
  $$("img[data-k]").forEach(function (im) {
    var k = im.getAttribute("data-k");
    if (IMG[k]) { im.src = IMG[k]; im.classList.add("has"); } else { im.remove(); }
  });

  // ---- preview bar ----
  $("#pbar-x").addEventListener("click", function () { $("#pbar").classList.add("gone"); });

  // ---- open badge ----
  function nowLA() {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { d: days[o.weekday], t: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
  }
  function fmt(h) { return h === 12 ? "noon" : (h % 12 || 12) + (h >= 12 ? " PM" : " AM"); }
  var NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function status() {
    var n = nowLA(), today = HOURS[n.d];
    if (today && n.t >= today[0] && n.t < today[1]) return { open: true, text: "Open now until " + fmt(today[1]) };
    if (today && n.t < today[0]) return { open: false, text: "Opens today at " + fmt(today[0]) };
    for (var i = 1; i <= 7; i++) {
      var d = (n.d + i) % 7;
      if (HOURS[d]) return { open: false, text: "Opens " + (i === 1 ? "tomorrow" : NAMES[d]) + " " + fmt(HOURS[d][0]) };
    }
    return { open: false, text: "Call for today's hours" };
  }
  function paint() {
    var s = status();
    $$("[data-badge]").forEach(function (b) {
      b.classList.toggle("open", s.open);
      b.querySelector("span").textContent = s.text;
    });
    var d = nowLA().d;
    $$("#htable tr").forEach(function (tr) { tr.classList.toggle("today", +tr.getAttribute("data-d") === d); });
  }
  paint();
  setInterval(paint, 60000);

  // ---- nav hide on scroll down / show on scroll up, road line ----
  var nav = $("#nav"), lastY = window.scrollY, ticking = false, roadFill = $("#road i");
  function onScroll() {
    var y = window.scrollY;
    if (Math.abs(y - lastY) > 4) {
      nav.classList.toggle("hide", y > lastY && y > 180);
      lastY = y;
    }
    if (roadFill && !reduce) {
      var max = document.documentElement.scrollHeight - innerHeight;
      roadFill.style.height = (max > 0 ? (y / max) * 100 : 0).toFixed(2) + "%";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  // ---- phone menu ----
  var menu = $("#menu"), mOpen = $('[data-qa="menu-open"]'), mClose = $('[data-qa="menu-close"]');
  function setMenu(on) {
    menu.classList.toggle("on", on);
    mOpen.setAttribute("aria-expanded", on ? "true" : "false");
    document.documentElement.style.overflow = on ? "hidden" : "";
    if (on) mClose.focus(); else mOpen.focus({ preventScroll: true });
  }
  mOpen.addEventListener("click", function () { setMenu(true); });
  mClose.addEventListener("click", function () { setMenu(false); });
  $$("#menu nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  // ---- tabs ----
  var tabs = $$('[role="tab"]');
  function selectTab(cat, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-cat") === cat;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      var p = document.getElementById(t.getAttribute("aria-controls"));
      if (p) p.hidden = !on;
      if (on && focus) t.focus();
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t.getAttribute("data-cat")); });
    t.addEventListener("keydown", function (e) {
      var k = e.key, j = -1;
      if (k === "ArrowRight") j = (i + 1) % tabs.length;
      if (k === "ArrowLeft") j = (i - 1 + tabs.length) % tabs.length;
      if (k === "Home") j = 0;
      if (k === "End") j = tabs.length - 1;
      if (j > -1) { e.preventDefault(); selectTab(tabs[j].getAttribute("data-cat"), true); }
    });
  });
  $$(".strip a").forEach(function (a) {
    a.addEventListener("click", function () {
      var cat = a.getAttribute("data-cat");
      selectTab(cat);
      var rows = $("#p-" + cat + " .rows");
      if (rows) { rows.classList.remove("flash"); void rows.offsetWidth; rows.classList.add("flash"); }
    });
  });

  // ---- FAQ ----
  $$('[data-qa="faq"]').forEach(function (b) {
    b.addEventListener("click", function () {
      b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") === "true" ? "false" : "true");
    });
  });

  // ---- reviews carousel ----
  var cards = $("#cards"), slides = $$("#cards .card"), count = $("#c-count");
  function current() {
    var x = cards.scrollLeft, best = 0, bd = 1e9;
    slides.forEach(function (s, i) { var d = Math.abs(s.offsetLeft - cards.offsetLeft - x); if (d < bd) { bd = d; best = i; } });
    return best;
  }
  function go(i) {
    i = (i + slides.length) % slides.length;
    cards.scrollTo({ left: slides[i].offsetLeft - cards.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }
  $("#c-prev").addEventListener("click", function () { go(current() - 1); });
  $("#c-next").addEventListener("click", function () { go(current() + 1); });
  var ct = null;
  cards.addEventListener("scroll", function () {
    clearTimeout(ct);
    ct = setTimeout(function () { count.textContent = (current() + 1) + " / " + slides.length; }, 80);
  }, { passive: true });
  cards.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(current() + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(current() - 1); }
  });

  // ---- booking sheet ----
  var sheet = $("#sheet"), bg = $("#sheet-bg"), lastFocus = null;
  if (BOOKING_URL) {
    var bk = document.createElement("a");
    bk.className = "btn btn-hay press";
    bk.href = BOOKING_URL; bk.target = "_blank"; bk.rel = "noopener";
    bk.innerHTML = '<svg class="ico"><use href="#i-cal"/></svg>Book online';
    $("#sheet-opts").insertBefore(bk, $("#sheet-opts").firstChild);
  }
  function setSheet(on) {
    sheet.style.transform = "";
    sheet.classList.toggle("on", on);
    bg.classList.toggle("on", on);
    if (on) { lastFocus = document.activeElement; setTimeout(function () { var f = sheet.querySelector(".opts a"); if (f) f.focus({ preventScroll: true }); }, 30); }
    else if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$("[data-book]").forEach(function (b) { b.addEventListener("click", function () { setSheet(true); }); });
  bg.addEventListener("click", function () { setSheet(false); });
  $("#sheet-x").addEventListener("click", function () { setSheet(false); });
  var grab = $("#grab"), sy = 0, dy = 0, dragging = false;
  grab.addEventListener("pointerdown", function (e) { dragging = true; sy = e.clientY; dy = 0; sheet.classList.add("drag"); grab.setPointerCapture(e.pointerId); });
  grab.addEventListener("pointermove", function (e) { if (!dragging) return; dy = Math.max(0, e.clientY - sy); sheet.style.transform = "translateY(" + dy + "px)"; });
  function endDrag() { if (!dragging) return; dragging = false; sheet.classList.remove("drag"); if (dy > 90) setSheet(false); else sheet.style.transform = ""; }
  grab.addEventListener("pointerup", endDrag);
  grab.addEventListener("pointercancel", endDrag);
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (menu.classList.contains("on")) setMenu(false);
    if (sheet.classList.contains("on")) setSheet(false);
  });

  // ---- ambient: hawk + sign sway in the hero, truck + hawk at the footer ----
  if (!reduce) {
    var art = $("#art");
    setTimeout(function () { art.classList.add("sway"); }, 500);
    setTimeout(function () { art.classList.add("fly"); }, 2600);
  }
  var foot = $("#foot");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { foot.classList.add("seen"); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(foot);
  }

  $("#yr").textContent = new Date().getFullYear();
})();
