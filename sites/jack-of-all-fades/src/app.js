(function () {
  // ---- config ----
  var BOOKING_URL = ""; // e.g. a Booksy/Square booking link once the shop has one. Empty = Book opens Call/Text sheet.
  var TZ = "America/Los_Angeles";
  // day index 0=Sun..6=Sat, [open, close] in 24h hours
  var HOURS = { 0: [10, 17], 1: [10, 17], 2: [10, 17], 3: [10, 17], 4: [10, 17], 5: [9, 17], 6: [9, 17] };

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
  var pbx = $("#pbar-x");
  if (pbx) pbx.addEventListener("click", function () { $("#pbar").classList.add("gone"); });

  // ---- open badge ----
  function nowLA() {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var h = parseInt(o.hour, 10) % 24;
    return { d: days[o.weekday], t: h + parseInt(o.minute, 10) / 60 };
  }
  function fmt(h) { var ap = h >= 12 ? "PM" : "AM"; var x = h % 12 || 12; return x + " " + ap; }
  function status() {
    var n = nowLA(), today = HOURS[n.d];
    if (today && n.t >= today[0] && n.t < today[1]) return { open: true, text: "Open now until " + fmt(today[1]) };
    if (today && n.t < today[0]) return { open: false, text: "Opens today at " + fmt(today[0]) };
    for (var i = 1; i <= 7; i++) {
      var d = (n.d + i) % 7;
      if (HOURS[d]) {
        var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return { open: false, text: "Opens " + (i === 1 ? "tomorrow" : names[d]) + " at " + fmt(HOURS[d][0]) };
      }
    }
    return { open: false, text: "Call for hours" };
  }
  function paintBadge() {
    var s = status();
    $$("[data-badge]").forEach(function (b) {
      b.classList.toggle("open", s.open);
      b.querySelector("span").textContent = s.text;
    });
    var bt = $("[data-badge-text]");
    if (bt) bt.textContent = s.text;
    var d = nowLA().d;
    $$("#htable tr").forEach(function (tr) { tr.classList.toggle("today", +tr.getAttribute("data-d") === d); });
  }
  paintBadge();
  setInterval(paintBadge, 60000);

  // ---- nav hide on scroll down / show on scroll up ----
  var nav = $("#nav"), lastY = window.scrollY, ticking = false, jack = $("#jack");
  function onScroll() {
    var y = window.scrollY;
    if (Math.abs(y - lastY) > 4) {
      var down = y > lastY && y > 160;
      nav.classList.toggle("hide", down);
      document.body.classList.toggle("navup", !down && y > 160);
      lastY = y;
    }
    if (jack && !reduce) {
      var t = Math.min(y, 700) / 700;
      jack.style.setProperty("--tilt", (-7 * t).toFixed(2) + "deg");
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
      if (on) t.scrollIntoView({ block: "nearest", inline: "nearest" });
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

  // strip links jump to a category and highlight it
  $$(".strip a").forEach(function (a) {
    a.addEventListener("click", function () {
      var cat = a.getAttribute("data-cat");
      if (!cat) return;
      selectTab(cat);
      var p = document.getElementById("p-" + cat);
      var rows = p && p.querySelector(".rows");
      if (rows) {
        rows.classList.remove("flash");
        void rows.offsetWidth;
        rows.classList.add("flash");
      }
    });
  });

  // ---- FAQ ----
  $$('[data-qa="faq"]').forEach(function (b) {
    b.addEventListener("click", function () {
      var on = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", on ? "false" : "true");
    });
  });

  // ---- booking sheet ----
  var sheet = $("#sheet"), bg = $("#sheet-bg"), lastFocus = null;
  if (BOOKING_URL) {
    var a = document.createElement("a");
    a.className = "btn btn-ink press";
    a.href = BOOKING_URL;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = 'Book online<svg aria-hidden="true"><use href="#i-cal"/></svg>';
    $("#sheet-opts").insertBefore(a, $("#sheet-opts").firstChild);
  }
  function setSheet(on) {
    sheet.style.transform = "";
    sheet.classList.toggle("on", on);
    bg.classList.toggle("on", on);
    if (on) { lastFocus = document.activeElement; setTimeout(function () { var f = sheet.querySelector(".opts a"); if (f) f.focus({ preventScroll: true }); }, 30); }
    else if (lastFocus) { lastFocus.focus({ preventScroll: true }); }
  }
  $$("[data-book]").forEach(function (b) { b.addEventListener("click", function () { setSheet(true); }); });
  bg.addEventListener("click", function () { setSheet(false); });
  $("#sheet-x").addEventListener("click", function () { setSheet(false); });

  // drag to close
  var grab = $("#grab"), sy = 0, dy = 0, dragging = false;
  grab.addEventListener("pointerdown", function (e) {
    dragging = true; sy = e.clientY; dy = 0;
    sheet.classList.add("drag");
    grab.setPointerCapture(e.pointerId);
  });
  grab.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    dy = Math.max(0, e.clientY - sy);
    sheet.style.transform = "translateY(" + dy + "px)";
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    sheet.classList.remove("drag");
    if (dy > 90) setSheet(false); else sheet.style.transform = "";
  }
  grab.addEventListener("pointerup", endDrag);
  grab.addEventListener("pointercancel", endDrag);

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (menu.classList.contains("on")) setMenu(false);
    if (sheet.classList.contains("on")) setSheet(false);
  });

  // ---- footer scene lights ----
  var foot = $("#foot");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { foot.classList.add("seen"); io.disconnect(); } });
    }, { threshold: 0.25 });
    io.observe(foot);
  } else { foot.classList.add("seen"); }

  var yr = $("#yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
