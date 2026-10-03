const BOOKING_URL = "https://mavrks.as.me/";
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Barbers and menus, copied from each barber's Acuity page (mavrks.as.me/<Name>)
  var B = [
    { id: "Bill", role: "Shop owner", tel: "+16196748684", ph: "(619) 674-8684", menu: [
      ["Haircut", "50 min", 50, "Any hairstyle. Hair wash included if you want it."],
      ["Haircut & Full Beard", "1 hr", 60],
      ["Beard Only", "30 min", 25],
      ["Perm and Haircut", "3 hr 20 min", 180],
      ["Early Bird or After Hours", "1 hr", 100, "Full service: cut, full beard, brows, hair wash, freestyle design if you want it. Text to set up.", 1]
    ]},
    { id: "Beto", role: "Barber", tel: "+17754501385", ph: "(775) 450-1385", menu: [
      ["Haircut", "1 hr 10 min", 50],
      ["Haircut & Full Beard", "1 hr 30 min", 60],
      ["After Hours", "1 hr 30 min", 100, "Full service: cut, beard, brows, design, hair wash. Text to set up.", 1]
    ]},
    { id: "Bryan", role: "Bryan Blendz", tel: "+17756009104", ph: "(775) 600-9104", menu: [
      ["Haircut", "1 hr", 50],
      ["Haircut & Brows", "1 hr", 60],
      ["Haircut & Full Beard", "1 hr 30 min", 60],
      ["Haircut & Freestyle Design", "1 hr", 55],
      ["Full Service", "1 hr 20 min", 75, "Hair wash, cut, beard, brows and design."],
      ["Perm & Haircut", "4 hr 30 min", 200],
      ["Color / Highlights & Haircut", "4 hr 30 min", 200],
      ["After Hours Haircut", "1 hr", 100, "After 6pm. Text or call to set up.", 1]
    ]},
    { id: "Martin", role: "Barber", tel: "+17755310081", ph: "(775) 531-0081", menu: [
      ["Haircut", "1 hr", 50],
      ["Haircut & Full Beard", "1 hr 10 min", 60],
      ["Haircut & Freestyle Design", "1 hr", 55]
    ]},
    { id: "Juan", role: "Saturdays & Sundays", tel: "", ph: "", menu: [
      ["Haircut", "1 hr", 40],
      ["Haircut & Design", "1 hr", 45],
      ["Haircut & Full Beard", "1 hr", 50],
      ["Beard Only", "30 min", 25],
      ["Eyebrow Clean-up Only", "10 min", 10],
      ["Perm & Haircut", "4 hr 30 min", 160]
    ]}
  ];
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var url = function (b) { return BOOKING_URL + b.id; };

  // services tabs + panels
  var tabs = $("#tabs"), panels = $("#panels"), crew = $("#crew");
  B.forEach(function (b, i) {
    var t = document.createElement("button");
    t.type = "button"; t.className = "tab"; t.id = "t-" + b.id; t.textContent = b.id;
    t.setAttribute("role", "tab"); t.setAttribute("data-qa", "tab");
    t.setAttribute("aria-controls", "p-" + b.id); t.setAttribute("aria-selected", i ? "false" : "true");
    t.tabIndex = i ? -1 : 0;
    tabs.appendChild(t);
    var rows = b.menu.map(function (m) {
      var href = m[4] && b.tel ? "sms:" + b.tel : url(b);
      var ext = href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "";
      var act = m[4] && b.tel ? "Text " + b.id : "Book with " + b.id;
      return '<li><a href="' + href + '"' + ext + ' aria-label="' + esc(act + ": " + m[0] + ", $" + m[2]) + '"><span class="n">' + esc(m[0]) + '</span><span class="pr">$' + m[2] + '</span><span class="d">' + esc(m[1]) + (m[3] ? " / " + esc(m[3]) : "") + ' <em>' + esc(act) + '</em></span></a></li>';
    }).join("");
    var acts = '<a class="btn p" href="' + url(b) + '" target="_blank" rel="noopener">Book with ' + b.id + '</a>' +
      (b.tel ? '<a class="btn" href="sms:' + b.tel + '">Text ' + b.ph + '</a>' : "");
    var p = document.createElement("div");
    p.className = "panel board"; p.id = "p-" + b.id; p.setAttribute("role", "tabpanel"); p.setAttribute("aria-labelledby", "t-" + b.id);
    if (i) p.hidden = true;
    p.innerHTML = '<div class="bh"><div><h3>' + b.id + '</h3><span class="lab">' + esc(b.role) + '</span></div><div class="acts">' + acts + '</div></div><ul class="rows">' + rows + '</ul>';
    panels.appendChild(p);
    crew.insertAdjacentHTML("beforeend", '<li><a href="' + url(b) + '" target="_blank" rel="noopener" aria-label="Book with ' + b.id + '"><span class="no">0' + (i + 1) + '</span><span class="nm">' + b.id + '<small>' + esc(b.role) + '</small></span><span class="go">Book</span></a></li>');
  });
  var tabEls = $$(".tab", tabs);
  function sel(t, focus) {
    tabEls.forEach(function (x) {
      var on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1;
      $("#" + x.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) t.focus();
  }
  tabEls.forEach(function (t, i) {
    t.addEventListener("click", function () { sel(t); });
    t.addEventListener("keydown", function (e) {
      var k = e.key, n = tabEls.length;
      if (k === "ArrowRight") sel(tabEls[(i + 1) % n], 1);
      else if (k === "ArrowLeft") sel(tabEls[(i - 1 + n) % n], 1);
      else if (k === "Home") sel(tabEls[0], 1);
      else if (k === "End") sel(tabEls[n - 1], 1);
      else return;
      e.preventDefault();
    });
  });

  // book links
  $$("[data-book]").forEach(function (a) { a.href = BOOKING_URL; });

  // hero fade chart: five guard bands, hair lines get denser and longer toward the top
  var g = $("#bands"), out = "", labels = ["#4", "#3", "#2", "#1", "#0"];
  for (var r = 0; r < 5; r++) {
    var y0 = 62 + r * 70, h = 62, step = [5, 6, 8, 11, 16][r], len = [54, 44, 32, 20, 8][r], op = [1, .85, .7, .55, .4][r];
    out += '<text x="24" y="' + (y0 + 14) + '" font-family="Plex Mono, monospace" font-size="11" fill="' + (r === 4 ? "#ff5a47" : "#93a7b1") + '" letter-spacing="1">' + labels[r] + '</text>';
    for (var x = 64; x < 376; x += step) {
      var j = ((x * 37 + r * 13) % 9) - 4, base = y0 + h;
      out += '<path d="M' + x + " " + base + "l" + (j * .4).toFixed(1) + " -" + Math.max(4, len + j) + '" stroke="#efe8dc" stroke-opacity="' + op + '" stroke-width="1.6" stroke-linecap="round"/>';
    }
    out += '<path d="M64 ' + (y0 + h + 4) + 'H376" stroke="#2e2e33"/>';
  }
  g.innerHTML = out;

  // hero hatch background drifts a few px with scroll (set straight from scrollY)
  var hatch = $("#hatch"), rm = window.matchMedia("(prefers-reduced-motion: reduce)");
  hatch.style.background = "repeating-linear-gradient(90deg,rgba(239,232,220,.10) 0 1px,transparent 1px 9px)";
  hatch.style.webkitMaskImage = hatch.style.maskImage = "linear-gradient(180deg,#000 0%,rgba(0,0,0,.4) 55%,transparent 100%)";
  if (!rm.matches) window.addEventListener("scroll", function () { var y = window.scrollY; if (y < 1200) hatch.style.transform = "translateY(" + (y * 0.04).toFixed(1) + "px)"; }, { passive: true });

  // preview bar
  $("#pvx").addEventListener("click", function () { $("#pv").remove(); });

  // menu
  var menu = $("#menu"), mo = $("[data-qa=menu-open]"), mc = $("[data-qa=menu-close]");
  function openM() { menu.classList.add("on"); mo.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; mc.focus(); }
  function closeM() { menu.classList.remove("on"); mo.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
  mo.addEventListener("click", openM);
  mc.addEventListener("click", function () { closeM(); mo.focus(); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", closeM); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("on")) { closeM(); mo.focus(); } });

  // faq
  $$("[data-qa=faq]").forEach(function (b) {
    b.addEventListener("click", function () {
      var on = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", on);
      b.closest("h3").parentNode.classList.toggle("open", on);
    });
  });

  // photos later: <img data-k="stem"> fills only when IMG[stem] exists
  var IMG = window.IMG || {};
  $$("img[data-k]").forEach(function (i) { if (IMG[i.dataset.k]) i.src = IMG[i.dataset.k]; });

  $("#yr").textContent = new Date().getFullYear();
})();
