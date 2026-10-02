// Online booking link. Leave empty and every Book button opens the call/text sheet.
var BOOKING_URL = "";

(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var IMG = window.IMG || {};

  // Photo slots: only show when a photo exists for that stem
  $$("img[data-k]").forEach(function (img) {
    var k = img.getAttribute("data-k");
    var slot = img.closest("[data-slot]");
    if (IMG[k]) {
      img.src = IMG[k];
      if (slot) slot.hidden = false;
      if (k === "hero") { var art = $("#heroArt"); if (art) art.hidden = true; }
    } else {
      if (slot) slot.remove(); else img.remove();
    }
  });

  // Preview bar
  var pvX = $("#pvX");
  if (pvX) pvX.addEventListener("click", function () { var pv = $("#pv"); if (pv) pv.remove(); });

  // Nav hides on scroll down, shows on scroll up
  var nav = $("#nav"), lastY = window.scrollY;
  // Swatch fan opens with scroll (set straight from scrollY)
  var sws = $$("#fan .sw").map(function (g) { return { g: g, a: parseFloat(g.getAttribute("data-a")) }; });
  function fan(y) {
    var k = reduce ? 1 : 0.62 + 0.38 * Math.min(1, Math.max(0, y) / 420);
    for (var i = 0; i < sws.length; i++) sws[i].g.setAttribute("transform", "rotate(" + (sws[i].a * k).toFixed(2) + ")");
  }
  fan(window.scrollY);
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (nav) {
      if (y > lastY && y > 140 && !document.body.classList.contains("menu-on")) nav.classList.add("hide");
      else if (y < lastY) nav.classList.remove("hide");
    }
    lastY = y;
    fan(y);
  }, { passive: true });

  // Phone menu
  var menu = $("#menu"), openBtn = $('[data-qa="menu-open"]'), closeBtn = $('[data-qa="menu-close"]');
  function setMenu(on) {
    if (!menu) return;
    menu.hidden = !on;
    document.body.classList.toggle("menu-on", on);
    document.documentElement.style.overflow = on ? "hidden" : "";
    if (openBtn) openBtn.setAttribute("aria-expanded", on ? "true" : "false");
    if (on && closeBtn) closeBtn.focus(); else if (!on && openBtn) openBtn.focus({ preventScroll: true });
  }
  if (openBtn) openBtn.addEventListener("click", function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });
  $$("#menu nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  // Tabs
  var tabs = $$('[role="tab"]');
  function selectTab(cat, flash) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-cat") === cat;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      var p = document.getElementById(t.getAttribute("aria-controls"));
      if (p) {
        p.hidden = !on;
        if (on && flash && !reduce) { p.classList.remove("flash"); void p.offsetWidth; p.classList.add("flash"); }
      }
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t.getAttribute("data-cat"), false); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = tabs[(i + d + tabs.length) % tabs.length];
      selectTab(n.getAttribute("data-cat"), false);
      n.focus();
    });
  });

  // Strip items jump to their category and flash it
  $$(".strip [data-go]").forEach(function (b) {
    b.addEventListener("click", function () {
      var cat = b.getAttribute("data-go");
      selectTab(cat, true);
      var target = window.innerWidth >= 980 ? $("#services") : document.getElementById("p-" + cat);
      if (target) target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  });

  // FAQ
  $$('[data-qa="faq"]').forEach(function (b) {
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", open ? "false" : "true");
      var fq = b.closest(".fq");
      if (fq) fq.classList.toggle("open", !open);
    });
  });

  // Today (America/Los_Angeles)
  try {
    var wd = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", weekday: "long" }).format(new Date());
    var map = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
    var tn = $("#todayName");
    if (tn) tn.textContent = "Today, " + wd;
    var chip = $('#week [data-d="' + map[wd] + '"]');
    if (chip) { chip.classList.add("on"); chip.setAttribute("aria-current", "date"); }
  } catch (e) {}
  var yr = $("#yr");
  if (yr) yr.textContent = String(new Date().getFullYear());

  // Book: external link if configured, else the call/text sheet
  var sheet = $("#sheet"), scrim = $("#scrim"), lastFocus = null;
  function openSheet() {
    lastFocus = document.activeElement;
    scrim.hidden = false; sheet.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { scrim.classList.add("on"); sheet.classList.add("on"); }); });
    var x = $("#sheetX"); if (x) x.focus();
  }
  function closeSheet() {
    sheet.classList.remove("on"); scrim.classList.remove("on");
    sheet.style.transform = "";
    setTimeout(function () { sheet.hidden = true; scrim.hidden = true; }, reduce ? 0 : 280);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  $$("[data-book]").forEach(function (a) {
    if (BOOKING_URL) { a.href = BOOKING_URL; a.target = "_blank"; a.rel = "noopener"; return; }
    a.addEventListener("click", function (e) { e.preventDefault(); openSheet(); });
  });
  if (scrim) scrim.addEventListener("click", closeSheet);
  var sx = $("#sheetX"); if (sx) sx.addEventListener("click", closeSheet);
  // Drag to close
  var startY = null, dy = 0;
  if (sheet) {
    sheet.addEventListener("pointerdown", function (e) {
      if (e.target.closest("a,button")) return;
      startY = e.clientY; dy = 0; sheet.classList.add("drag");
      try { sheet.setPointerCapture(e.pointerId); } catch (er) {}
    });
    sheet.addEventListener("pointermove", function (e) {
      if (startY === null) return;
      dy = Math.max(0, e.clientY - startY);
      sheet.style.transform = "translateY(" + dy + "px)";
    });
    var end = function () {
      if (startY === null) return;
      startY = null; sheet.classList.remove("drag");
      if (dy > 90) closeSheet(); else sheet.style.transform = "";
    };
    sheet.addEventListener("pointerup", end);
    sheet.addEventListener("pointercancel", end);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (menu && !menu.hidden) setMenu(false);
    if (sheet && !sheet.hidden) closeSheet();
  });

  // Ambient: shears snip once, footer bulbs light once and a curl falls
  if ("IntersectionObserver" in window) {
    var once = function (el, fn, th) {
      if (!el) return;
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { fn(); io.disconnect(); } });
      }, { threshold: th || 0.5 });
      io.observe(el);
    };
    once($("#snip"), function () { if (!reduce) $("#snip").classList.add("snip"); }, 0.8);
    once($("#scene"), function () {
      var bulbs = $$("#scene .bulb");
      bulbs.forEach(function (b, i) { setTimeout(function () { b.style.fill = "#FFE2A8"; }, reduce ? 0 : 90 * i); });
      var curl = $("#curl");
      if (curl && !reduce && curl.animate) {
        curl.animate([
          { opacity: 0, transform: "translate(0,0) rotate(0deg)" },
          { opacity: 1, transform: "translate(-6px,30px) rotate(-30deg)", offset: .3 },
          { opacity: 1, transform: "translate(4px,80px) rotate(-80deg)", offset: .9 },
          { opacity: 0, transform: "translate(4px,84px) rotate(-90deg)" }
        ], { duration: 2600, easing: "cubic-bezier(.23,1,.32,1)", fill: "forwards", delay: 900 });
      }
    }, 0.4);
  }
})();
