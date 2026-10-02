document.getElementById("yr").textContent = new Date().getFullYear();

// screenshots from the embedded image map (slot is removed if its image is missing)
document.querySelectorAll("img[data-k]").forEach(function (im) {
  var k = im.getAttribute("data-k");
  if (window.IMG && IMG[k]) im.src = IMG[k]; else im.closest(".ph, figure").remove();
});

// live "try it" phone preview (all in the browser, nothing is sent anywhere)
(function () {
  var sim = document.getElementById("sim"), nameIn = document.getElementById("shopname");
  if (!sim || !nameIn) return;
  var KINDS = {
    beauty: { tag: "Hair & beauty", line: "Walk-ins welcome. Book your next visit in one tap.", a: "Call to book", b: "Services & prices", rows: ["Cuts & styling", "Color", "Nails & lashes"], dock: ["Call", "Text", "Directions"] },
    food:   { tag: "Food & drink", line: "See the menu, today's hours and how to find us.", a: "Call to order", b: "See the menu", rows: ["Menu", "Hours today", "Catering"], dock: ["Call", "Order", "Directions"] },
    retail: { tag: "Local shop", line: "See what's in store and when we're open.", a: "Call the shop", b: "Browse what we carry", rows: ["Featured items", "Hours today", "Gift cards"], dock: ["Call", "Text", "Directions"] },
    home:   { tag: "Home services", line: "Tell us what you need and get a straight answer.", a: "Call for an estimate", b: "Our services", rows: ["Repairs", "Installs", "Service area"], dock: ["Call", "Text", "Estimate"] },
    health: { tag: "Health & fitness", line: "New clients welcome. See our services and book.", a: "Call to book", b: "Our services", rows: ["Services", "Our team", "New patients"], dock: ["Call", "Book", "Directions"] },
    other:  { tag: "Local business", line: "Everything a customer needs, one tap from their phone.", a: "Call us", b: "What we offer", rows: ["Services", "Hours today", "Get in touch"], dock: ["Call", "Text", "Directions"] }
  };
  var PAL = [
    { bg: "#15120e", fg: "#f4eee3", acc: "#e6b26a", btn: "#15120e" },
    { bg: "#f4eee3", fg: "#1e1b16", acc: "#1f6b4a", btn: "#ffffff" },
    { bg: "#fbe9ee", fg: "#2a1420", acc: "#8a2c58", btn: "#ffffff" },
    { bg: "#26303a", fg: "#f3efe8", acc: "#e8883a", btn: "#1a1006" }
  ];
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function render() {
    var k = KINDS[document.querySelector('input[name="kind"]:checked').value];
    var p = PAL[+document.querySelector('input[name="pal"]:checked').value];
    var nm = nameIn.value.trim() || "Your Business Name";
    sim.style.setProperty("--pbg", p.bg); sim.style.setProperty("--pink", p.fg);
    sim.style.setProperty("--pacc", p.acc); sim.style.setProperty("--pbtn", p.btn);
    sim.innerHTML = '<div class="sim"><div class="bar"><span>Menu</span><i></i></div>' +
      '<div class="kk">' + k.tag + '</div><div class="nm">' + esc(nm) + '</div><div class="ln">' + k.line + '</div>' +
      '<div class="b1">' + k.a + '</div><div class="b2">' + k.b + '</div>' +
      '<ul>' + k.rows.map(function (r) { return "<li>" + r + "</li>"; }).join("") + '</ul>' +
      '<div class="dock">' + k.dock.map(function (d) { return "<span>" + d + "</span>"; }).join("") + '</div></div>';
  }
  document.querySelectorAll(".ctl input").forEach(function (i) { i.addEventListener("input", render); i.addEventListener("change", render); });
  render();
})();

// FAQ accordion
document.querySelectorAll(".faq button").forEach(function (b) {
  b.addEventListener("click", function () {
    var open = b.getAttribute("aria-expanded") === "true";
    b.setAttribute("aria-expanded", String(!open));
    document.getElementById(b.getAttribute("aria-controls")).classList.toggle("on", !open);
  });
});

// header hides on scroll down, shows on scroll up; hero phones drift with scroll (set straight from scrollY)
(function () {
  var h = document.getElementById("hdr"), last = 0, root = document.documentElement;
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  addEventListener("scroll", function () {
    var y = scrollY;
    h.classList.toggle("hide", y > last && y > 120);
    last = y;
    if (!still && y < 900) {
      root.style.setProperty("--p1", (-y * 0.05).toFixed(1) + "px");
      root.style.setProperty("--p2", (-y * 0.1).toFixed(1) + "px");
    }
  }, { passive: true });
})();
