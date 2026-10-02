// ---- config ----------------------------------------------------------------
const BOOKING_URL = ""; // set to an online booking link (Square, Vagaro, etc.) and every Book button uses it. Empty = call.

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // photos: <img data-k="stem"> only shows when IMG[stem] exists
  const IMG = window.IMG || {};
  $$("img[data-k]").forEach((img) => {
    const src = IMG[img.dataset.k];
    const fig = img.closest(".photo");
    if (src) { img.src = src; fig && fig.classList.add("has"); }
    else if (fig) fig.remove();
  });

  // booking link
  if (BOOKING_URL) $$("[data-book]").forEach((a) => { a.href = BOOKING_URL; a.target = "_blank"; a.rel = "noopener"; });

  // preview bar
  $("#pbarX").addEventListener("click", () => $("#pbar").classList.add("gone"));

  // year + years open (Hacienda Plaza since May 1999)
  const now = new Date();
  $("#yr").textContent = now.getFullYear();
  let yrs = now.getFullYear() - 1999 - (now.getMonth() < 4 ? 1 : 0);
  $("#yrs").textContent = yrs;

  // ---- live badge, America/Los_Angeles -------------------------------------
  // Verified across all listings: Tue-Fri 9-6, Sunday closed, Monday opens 9.
  // Monday close and Saturday hours differ between listings, so we never guess them.
  function laNow() {
    const p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
    const g = (t) => p.find((x) => x.type === t).value;
    const d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"));
    return { d, m: (+g("hour") % 24) * 60 + +g("minute") };
  }
  function badge() {
    const { d, m } = laNow();
    const el = $("#badge"), t = el.querySelector("span");
    let txt = "Call for today's hours", open = false;
    if (d >= 2 && d <= 5) {
      if (m < 540) txt = "Opens 9 AM";
      else if (m < 1080) { txt = "Open now until 6 PM"; open = true; }
      else txt = d === 5 ? "Closed now, call for Sat hours" : "Opens tomorrow 9 AM";
    } else if (d === 1) {
      if (m < 540) txt = "Opens 9 AM";
      else if (m < 900) { txt = "Open now, call for close"; open = true; }
      else txt = "Opens tomorrow 9 AM";
    } else if (d === 6) {
      if (m >= 540 && m < 840) { txt = "Open now, call for close"; open = true; }
    } else if (d === 0) txt = "Closed today, opens Mon 9 AM";
    t.textContent = txt;
    el.classList.toggle("open", open);
    $$("#hoursList li").forEach((li) => li.classList.toggle("today", +li.dataset.d === d));
  }
  badge();
  setInterval(badge, 60000);

  // ---- nav hide on scroll down, show on up ---------------------------------
  const nav = $("#nav");
  let lastY = window.scrollY;
  const orbG = $("#orb"), orbits = $("#orbitsG");
  function onScroll() {
    const y = window.scrollY;
    if (y > 140 && y > lastY + 4) nav.classList.add("hide");
    else if (y < lastY - 4 || y < 140) nav.classList.remove("hide");
    lastY = y;
    if (!RM && y < 1200) {
      orbG.setAttribute("transform", "rotate(" + (y * 0.012).toFixed(2) + " 280 84)");
      orbits.setAttribute("transform", "rotate(" + (y * -0.008).toFixed(2) + " 600 230)");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- phone menu -----------------------------------------------------------
  const menu = $("#menu"), mOpen = $('[data-qa="menu-open"]'), mClose = $('[data-qa="menu-close"]');
  function setMenu(on) {
    menu.classList.toggle("on", on);
    mOpen.setAttribute("aria-expanded", on);
    document.body.style.overflow = on ? "hidden" : "";
    if (on) mClose.focus(); else mOpen.focus({ preventScroll: true });
  }
  mOpen.addEventListener("click", () => setMenu(true));
  mClose.addEventListener("click", () => setMenu(false));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("on")) setMenu(false); });

  // ---- tabs -----------------------------------------------------------------
  const tabs = $$('[role="tab"]');
  function pick(cat, focus) {
    tabs.forEach((t) => {
      const on = t.dataset.cat === cat;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      $("#" + t.getAttribute("aria-controls")).hidden = !on;
      if (on && focus) t.focus();
      if (on) t.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => pick(t.dataset.cat));
    t.addEventListener("keydown", (e) => {
      const k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (k) { e.preventDefault(); pick(tabs[(i + k + tabs.length) % tabs.length].dataset.cat, true); }
    });
  });
  // strip links jump to a category and briefly highlight it
  $$(".strip a[data-cat]").forEach((a) => a.addEventListener("click", () => {
    pick(a.dataset.cat);
    const p = $("#p-" + a.dataset.cat);
    p.classList.add("flash");
    setTimeout(() => p.classList.remove("flash"), 1400);
  }));

  // ---- FAQ ------------------------------------------------------------------
  $$('[data-qa="faq"]').forEach((b) => b.addEventListener("click", () => {
    const on = b.getAttribute("aria-expanded") !== "true";
    b.setAttribute("aria-expanded", on);
    $("#" + b.getAttribute("aria-controls")).classList.toggle("open", on);
  }));

  // ---- split-flap tiles settle on 1999, once --------------------------------
  const tiles = $$("#flap .tile b");
  if (!RM && "IntersectionObserver" in window) {
    const target = ["1", "9", "9", "9"];
    tiles.forEach((b) => (b.textContent = "0"));
    let done = false;
    const io = new IntersectionObserver((es) => {
      if (done || !es[0].isIntersecting) return;
      done = true; io.disconnect();
      tiles.forEach((b, i) => {
        const goal = +target[i];
        let n = 0, steps = 3 + i * 2;
        const seq = [];
        for (let s = steps; s >= 0; s--) seq.push((goal - s + 10) % 10);
        const tick = () => {
          const tile = b.parentNode;
          tile.classList.add("flip");
          setTimeout(() => { b.textContent = seq[n]; tile.classList.remove("flip"); n++; if (n < seq.length) setTimeout(tick, 70); }, 140);
        };
        setTimeout(tick, 350 + i * 90);
      });
    }, { threshold: 0.6 });
    io.observe($("#flap"));
  }

  // ---- rare glint on the third ring while the hero is on screen -------------
  const glint = $("#glint");
  if (!RM && glint) {
    let heroOn = true;
    new IntersectionObserver((es) => (heroOn = es[0].isIntersecting)).observe($(".hero"));
    const fire = () => {
      if (heroOn && !document.hidden) { glint.classList.remove("go"); void glint.getBBox(); glint.classList.add("go"); }
    };
    setTimeout(fire, 2200);
    setInterval(fire, 9000);
  }
})();
