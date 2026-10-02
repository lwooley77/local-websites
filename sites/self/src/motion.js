/* Motion layer: GSAP + ScrollTrigger (scroll-driven animation) and Lenis (smooth scroll), bundled into this file's page.
   Everything below is guarded: no libraries, reduced-motion, or an error in one effect never breaks the page. */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  var root = document.documentElement;
  root.classList.add("has-motion");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn("motion:", e); } }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var automated = navigator.webdriver && location.search.indexOf("lenis") < 0;

  // ---- 1. smooth scroll (Lenis) ----
  var lenis = null;
  safe(function () {
    if (!window.Lenis || automated) return;
    $$(".ask .log, .mmenu, .bkp").forEach(function (el) { el.setAttribute("data-lenis-prevent", ""); });
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href"); if (id.length < 2) return;
        var t = document.querySelector(id); if (!t) return;
        e.preventDefault(); lenis.scrollTo(t, { offset: -70, duration: 1.5 }); history.replaceState(null, "", id);
      });
    });
    new MutationObserver(function () { if (document.body.style.overflow === "hidden") lenis.stop(); else lenis.start(); })
      .observe(document.body, { attributes: true, attributeFilter: ["style"] });
  });

  // ---- 2. headlines: words rise out of a mask ----
  safe(function () {
    $$("main section:not(.story) h2").forEach(function (h) {
      var text = h.textContent.trim(); if (!text) return;
      h.setAttribute("aria-label", text);
      h.innerHTML = text.split(/\s+/).map(function (w) { return '<span class="w" aria-hidden="true"><span class="wi">' + esc(w) + "</span></span>"; }).join(" ");
      var wi = $$(".wi", h);
      gsap.set(wi, { yPercent: 118, rotate: 5 });
      ScrollTrigger.create({ trigger: h, start: "top 90%", once: true, onEnter: function () { gsap.to(wi, { yPercent: 0, rotate: 0, duration: 1.05, ease: "expo.out", stagger: 0.07 }); } });
    });
  });

  // ---- 3. kickers: the gold line draws in ----
  safe(function () {
    $$("main .k").forEach(function (k) {
      gsap.set(k, { "--kl": 0 });
      ScrollTrigger.create({ trigger: k, start: "top 92%", once: true, onEnter: function () { gsap.to(k, { "--kl": 1, duration: 0.9, ease: "power3.out" }); } });
    });
  });

  // ---- 4. rows: the divider draws across, then the content slides in ----
  safe(function () {
    $$(".svc > div, .why > div").forEach(function (row) {
      var kids = $$("h3, p, dt, dd", row);
      gsap.set(row, { "--ln": 0 }); gsap.set(kids, { y: 34, opacity: 0 });
      ScrollTrigger.create({
        trigger: row, start: "top 88%", once: true,
        onEnter: function () {
          gsap.to(row, { "--ln": 1, duration: 1, ease: "power3.out" });
          gsap.to(kids, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.1 });
        }
      });
    });
  });

  // ---- 5. "Who it's for": words rise and settle ----
  safe(function () {
    var types = $(".types"); if (!types) return;
    var sp = $$("span", types);
    gsap.set(sp, { yPercent: 120, skewY: 7 });
    ScrollTrigger.create({ trigger: types, start: "top 88%", once: true, onEnter: function () { gsap.to(sp, { yPercent: 0, skewY: 0, duration: 1, ease: "power4.out", stagger: 0.07 }); } });
  });

  // ---- 6. scenes: pinned horizontal story on desktop, slide-ins on phones ----
  safe(function () {
    var sec = $("#scenes"), list = $(".scn"); if (!sec || !list) return;
    var wrap = $(".wrap", sec), mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", function () {
      sec.classList.add("hs-on");
      var dist = function () { return Math.max(0, list.scrollWidth - wrap.clientWidth); };
      var tw = gsap.to(list, { x: function () { return -dist(); }, ease: "none" });
      ScrollTrigger.create({ trigger: sec, start: "top 64px", end: function () { return "+=" + (dist() + 160); }, pin: true, scrub: 0.6, animation: tw, anticipatePin: 1, invalidateOnRefresh: true });
      return function () { sec.classList.remove("hs-on"); gsap.set(list, { clearProps: "transform" }); };
    });
    mm.add("(max-width: 899px)", function () {
      $$("li", list).forEach(function (li, i) {
        gsap.from(li, { x: i % 2 ? 56 : -56, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: li, start: "top 90%", once: true } });
      });
    });
  });

  // ---- 7. customer journey: a line fills and each step lights up as you scroll ----
  safe(function () {
    var fl = $(".flow"); if (!fl) return;
    var items = $$("li", fl), line = document.createElement("div");
    line.className = "flowline"; line.innerHTML = "<i></i>"; fl.parentNode.insertBefore(line, fl);
    gsap.set(items, { opacity: 0.28, y: 14 });
    var tl = gsap.timeline({ scrollTrigger: { trigger: fl, start: "top 82%", end: "bottom 58%", scrub: 0.6 } });
    tl.to(line.firstChild, { scaleX: 1, ease: "none", duration: items.length });
    items.forEach(function (li, i) { tl.to(li, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, i); });
  });

  // ---- 8. booking sync: a beam of data travels between customer and business ----
  safe(function () {
    var sync = $(".sync"); if (!sync) return;
    var beam = document.createElement("div");
    beam.className = "beam"; beam.setAttribute("aria-hidden", "true"); beam.innerHTML = "<i></i>";
    var intro = $(".intro", sync); (intro || $("h3", sync)).insertAdjacentElement("afterend", beam);
    var ticks = $$(".get li", sync);
    gsap.set(ticks, { x: -22, opacity: 0 });
    ScrollTrigger.create({ trigger: sync, start: "top 80%", once: true, onEnter: function () { gsap.to(ticks, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.14 }); } });
    gsap.fromTo($("i", beam), { x: -80 }, { x: function () { return beam.clientWidth + 20; }, duration: 2.2, ease: "power1.inOut", repeat: -1, repeatDelay: 0.3, scrollTrigger: { trigger: sync, toggleActions: "play pause resume pause" } });
  });

  // ---- 9. work: browser windows tilt up into place ----
  safe(function () {
    $$(".shots .win").forEach(function (w) {
      gsap.fromTo(w, { y: 90, rotateX: fine ? 12 : 0, scale: 0.92, transformPerspective: 1000, transformOrigin: "50% 100%" },
        { y: 0, rotateX: 0, scale: 1, ease: "none", scrollTrigger: { trigger: w, start: "top 105%", end: "top 40%", scrub: 0.6 } });
    });
  });

  // ---- 10. about + process: items step in ----
  safe(function () {
    $$(".who > div, .steps li").forEach(function (el, i) {
      gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
  });

  // ---- 11. contact: the finished storefront is revealed top to bottom, the sign flickers on ----
  safe(function () {
    var shop = $(".shopdone"); if (!shop) return;
    var sign = $$("text", shop);
    gsap.set(shop, { clipPath: "inset(0 0 100% 0)" }); gsap.set(sign, { opacity: 0 });
    ScrollTrigger.create({
      trigger: shop, start: "top 88%", once: true,
      onEnter: function () {
        gsap.to(shop, { clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "power3.inOut" });
        gsap.fromTo(sign, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "steps(9)", delay: 1.3 });
      }
    });
  });

  // ---- 12. desktop only: magnetic buttons, and a light that follows the pointer in the story ----
  safe(function () {
    if (!fine) return;
    $$(".btn:not(.cardform .btn)").forEach(function (b) {
      b.addEventListener("pointermove", function (e) { var r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.32, duration: 0.35, ease: "power3.out" }); });
      b.addEventListener("pointerleave", function () { gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.5)" }); });
    });
    var stage = $(".stage");
    if (stage) stage.addEventListener("pointermove", function (e) { var r = stage.getBoundingClientRect(); stage.style.setProperty("--mx", (e.clientX - r.left) + "px"); stage.style.setProperty("--my", (e.clientY - r.top) + "px"); });
  });

  // ---- keep trigger positions right when the layout changes ----
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  $$(".faq button").forEach(function (b) { b.addEventListener("click", function () { setTimeout(function () { ScrollTrigger.refresh(); }, 60); }); });
})();
