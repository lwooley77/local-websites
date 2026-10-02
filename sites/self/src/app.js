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
  el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "Welcome");
  el.innerHTML = '<div class="scene"><svg class="aw" viewBox="0 0 320 120" aria-hidden="true"><path d="M10 6 L40 6 H280 L310 6 V20 Z" fill="none"/>' +
    '<path d="M16 4 H304 L316 96 H4 Z" fill="#f4eee3" stroke="#e6b26a" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M44 4 L34 96 M92 4 L84 96 M140 4 L134 96 M188 4 L186 96 M236 4 L238 96 M284 4 L290 96" stroke="#e0793c" stroke-width="16"/>' +
    '<path d="M4 96 Q22 116 40 96 Q58 116 76 96 Q94 116 112 96 Q130 116 148 96 Q166 116 184 96 Q202 116 220 96 Q238 116 256 96 Q274 116 292 96 Q310 116 316 100" fill="#f4eee3" stroke="#e6b26a" stroke-width="3"/></svg>' +
    '<span class="sign">OPEN</span><div class="nm">Lucas Wooley</div></div><button type="button" class="skip">Skip</button>';
  document.body.appendChild(el);
  document.body.style.overflow = "hidden";
  var done = false;
  function end() {
    if (done) return; done = true;
    el.classList.add("out"); document.body.style.overflow = "";
    setTimeout(function () { el.remove(); }, 400);
  }
  el.addEventListener("click", end);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") end(); });
  setTimeout(end, 2400);
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
    h.classList.toggle("hide", y > last && y > 120);
    last = y;
  }, { passive: true });
})();
