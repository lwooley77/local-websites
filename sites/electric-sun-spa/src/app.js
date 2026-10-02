// ---- config ----------------------------------------------------------------
var BOOKING_URL = "https://www.vagaro.com/electricsun1"; // Electric Sun's live Vagaro booking page
var TEL = "+17755751070";
// Hours in America/Los_Angeles. [open, close] in 24h, null = closed. 0 = Sunday.
var HOURS = {0: null, 1: [9, 17], 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 17], 6: [9, 17]};

// ---- menu data (from vagaro.com/electricsun1/services, Oct 2026) ------------
// row: [name, price, note]. "45+" renders as "from $45". price null = call.
var MENU = [
  {id: "hair", tab: "Hair", icon: "c-hair", title: "Hair, cuts & color",
   intro: "Cuts for women, men and kids, blowouts, treatments, color, highlights and balayage.",
   groups: [
    {h: "Cuts & styling", rows: [
      ["Women's Haircut", "45+", "Wash, cut, blowout and style"],
      ["Short Haircut for Women", "25+", "Above the ears, pixie to fade, with wash and blowout"],
      ["Men's Haircut with Shampoo", "25+"],
      ["Men's Haircut, no shampoo", "20+"],
      ["Child's Haircut", "20", "Ages 10 and under"],
      ["Blowout", "25", "Wash, blowout and style, silky smooth or full of volume"],
      ["Shampoo & Style", "25"],
      ["Bang Trim", "8"],
      ["Beard Trim", "10"],
      ["Mustache & Beard Trim", "15"],
      ["Special Event or Bridal Updo", "60+"],
      ["Hair Feathers & Tinsel", "5+", "Feathers $8, tinsel $15 a row"]
    ]},
    {h: "Treatments", rows: [
      ["Conditioning Treatment", "50+", "Restores protein and moisture"],
      ["Conditioning Treatment & Haircut", "85+"],
      ["ABC Bond Treatment", "50+", "Acidic Bonding Concentrate, strength repair in one use"],
      ["Matrix Smoothing System", "175+", "Permanent smoothing, frizz control"]
    ]},
    {h: "Color", rows: [
      ["All Over Color", "100+", "Includes a blowout"],
      ["Color Retouch, roots only", "100+", "Includes a blowout"],
      ["Toner / Gloss", "55+"],
      ["Traditional Partial Highlight", "130+", "20 to 25 foils"],
      ["Traditional Partial Lowlights", "150", "With conditioning treatment, cut, blowout and style"],
      ["Blonde Root Touch-Up", "150+", "Lift and toner"],
      ["Color & Partial Highlight", "185+"],
      ["Traditional Full Highlight", "200+"],
      ["Color & Full Highlight", "210+"],
      ["Platinum Card: All Over Blonde", "210+", "Priced by length, thickness and toners"],
      ["Balayage", "250+", "Free-hand painted highlights"],
      ["Highlight & Lowlight", "250+"],
      ["Color Correction", "275+", "Consultation first"],
      ["Vivid Colors", "275+", "Reds, blues, purples or your pick"]
    ]}
  ]},
  {id: "nails", tab: "Nails", icon: "c-nails", title: "Nails & pedicures",
   intro: "Manicures, gel, acrylic, hard gel and poly gel sets, pedicures and kids' nails.",
   groups: [
    {h: "Hands", rows: [
      ["Manicure, regular polish", "25+", "Cuticles, shaping, polish, hand and arm massage"],
      ["Manicure with Gel Polish", "30+"],
      ["Gel Manicure, French Tip or Nail Art", "35+"],
      ["Gel Manicure with Soak-Off Removal", "35+"],
      ["Men's Manicure", "25"],
      ["Acrylic Full Set", "55+"],
      ["Acrylic 2-Week Fill", "40+"],
      ["Hard Gel Full Set", "55+"],
      ["Hard Gel 2-Week Fill", "40+"],
      ["Poly Gel Full Set", "55"],
      ["Poly Gel 2-Week Fill", "40"],
      ["Gel Polish Change", "25+"],
      ["Regular Polish Change", "15"],
      ["Acrylic or Gel Removal", "35"],
      ["Nail Repair, one nail", "10"],
      ["Paraffin Treatment", "7+"],
      ["Child's Manicure", "20+", "Regular polish, art on 2 nails"],
      ["Child's Gel Manicure with Nail Art", "25+"]
    ]},
    {h: "Feet", rows: [
      ["Pedicure, regular polish", "35+"],
      ["Gel Pedicure", "45+"],
      ["Dry Pedicure, regular polish", "45+", "Waterless, with callus remover"],
      ["Dry Pedicure, gel polish", "55+", "Waterless, with callus remover"],
      ["French Pedicure", "50+"],
      ["Gel French Pedicure", "50+"],
      ["Men's Pedicure", "35"],
      ["Child's Pedicure, gel polish", "25+"],
      ["Acrylic Toes, full set", "65"],
      ["Acrylic Toes, fill", "50"],
      ["Acrylic Toes, fill with artwork", "55"],
      ["Gel Polish Change, toes", "25+"],
      ["Regular Polish Change, toes", "15"],
      ["Heel Clean-Up", "15", "Heel scrub only"],
      ["Pedicure Add-On: Mask", "7+"]
    ]}
  ]},
  {id: "lashes", tab: "Lashes & Brows", icon: "c-lash", title: "Lashes & brows",
   intro: "Classic, hybrid, volume and mega volume lash sets, fills, lifts and tints.",
   groups: [
    {h: "Lash extensions", rows: [
      ["Classic Lash Set", "150+", "About 2.5 to 3 hours"],
      ["Hybrid Lash Set", "150+", "About 2.5 to 3 hours"],
      ["Volume Lash Set", "160"],
      ["Mega Volume Lash Set", "175"],
      ["Lash Removal", "25"]
    ]},
    {h: "Fills", rows: [
      ["One-Week Fill", "35+"],
      ["Two-Week Fill", "50"],
      ["Three-Week Fill", "75+"],
      ["Mega Volume Fill", "75"]
    ]},
    {h: "Lifts & tints", rows: [
      ["Lash Lift & Tint", "85"],
      ["Lash Lift", "75+"],
      ["Lash Tint", "25+"],
      ["Brow Tint", "25"]
    ]}
  ]},
  {id: "skin", tab: "Skin Care", icon: "c-skin", title: "Facials & skin care",
   intro: "HydraFacial, dermaplaning, facials, back treatments and peels. Consultations are free.",
   groups: [
    {h: "Facials", rows: [
      ["HydraFacial Express", "149+", "Cleanse, extract and hydrate with the HydraFacial device"],
      ["Dermaplane", "45", "Exfoliation that removes dead skin and peach fuzz"],
      ["Signature Facial", "65+", "Cleanse, extract and hydrate with antioxidant serums"],
      ["Deluxe Facial", "80+", "With boosters and light therapy"],
      ["Specialized Peels", "90+", "Consultation required"],
      ["Back Facial", "55+", "With upper back and neck massage"],
      ["Back Peel", "90+"],
      ["Facial Consultation", "Free"]
    ]},
    {h: "Add-ons", rows: [
      ["Extractions", "10"],
      ["Extra Serum", "30"],
      ["Hot & Cold Hammer", "5"]
    ]}
  ]},
  {id: "wax", tab: "Waxing", icon: "c-wax", title: "Waxing",
   intro: "Face and body waxing, from brows to Brazilian.",
   groups: [
    {h: "Face", rows: [
      ["Brow Shaping", "20"], ["Lip", "15"], ["Chin", "20"], ["Nose", "15"], ["Ear", "20"], ["Sideburns", "20"], ["Full Face", "60"]
    ]},
    {h: "Body", rows: [
      ["Underarms", "25"], ["Half Arms", "45"], ["Full Arms", "75"], ["Half Legs", "50"],
      ["Full Legs", "75", "Please don't shave for 2 weeks before"], ["Chest", "45"], ["Stomach", "30"], ["Back", "60"],
      ["Bikini", "35"], ["Brazilian", "60"], ["Butt Strip", "15"], ["Full Butt", "25"], ["Full Head", "70"]
    ]}
  ]},
  {id: "massage", tab: "Massage", icon: "c-massage", title: "Massage",
   intro: "Swedish, therapeutic, deep tissue and pregnancy massage in 60 and 90 minute sessions.",
   groups: [
    {h: "60 minutes", rows: [
      ["Swedish Relaxation Massage", "85"],
      ["Therapeutic Massage", "90", "For chronic pain, injuries and recovery"],
      ["Deep Tissue Massage", "95"],
      ["Pregnancy Massage", "90", "Side-lying with a body pillow"]
    ]},
    {h: "90 minutes", rows: [
      ["Swedish Relaxation Massage", "115"],
      ["Therapeutic Massage", "120"],
      ["Deep Tissue Massage", "125"]
    ]}
  ]},
  {id: "tan", tab: "Tanning & Whitening", icon: "c-tan", title: "Tanning & teeth whitening",
   intro: "Airbrush spray tans, lay-down tanning beds and Designer Skin lotions, plus in-salon teeth whitening.",
   groups: [
    {h: "Tanning", rows: [
      ["Airbrush Spray Tan", "30", "Natural-looking, streak-free glow"],
      ["Tanning Bed Sessions", null, "Lay-down beds. Call for session rates and packages"]
    ]},
    {h: "Teeth whitening", rows: [
      ["Teeth Whitening", "149.99", "In-salon process with 16% HP"]
    ]}
  ]}
];

var STRIP = [["Haircuts", "hair"], ["Balayage & Color", "hair"], ["Gel & Acrylic Nails", "nails"], ["Pedicures", "nails"],
  ["Lash Extensions", "lashes"], ["HydraFacial", "skin"], ["Brazilian Wax", "wax"], ["Massage", "massage"],
  ["Spray Tans", "tan"], ["Teeth Whitening", "tan"]];

var FAQ = [
  ["Do you take walk-ins?", "Yes, walk-ins are accepted. Each technician keeps their own schedule, so booking online or calling ahead is the best way to get the service and time you want."],
  ["How do I book?", "Book online any time through Electric Sun's Vagaro page, or call (775) 575-1070 during business hours."],
  ["What is the cancellation policy?", "Please give at least 24 hours notice so someone else can take the spot. Cancellations with less notice are charged 100% of the scheduled services, and a no-show means a 100% deposit on future bookings. Real emergencies are handled with grace."],
  ["How much is tanning?", "An airbrush spray tan is $30. For tanning bed session rates and packages, give the salon a call at (775) 575-1070."],
  ["How do I get ready for lash extensions?", "Come in with clean eyes: no eyeliner or mascara. A full set takes about 2.5 to 3 hours. If you are coming from another salon's lashes, there is an extra $50 to work over them."],
  ["What if a nail breaks?", "Electric Sun repairs up to two nails for free within the first week of a fill or a new full set done on their product. After that, a single nail repair is $10."],
  ["Can you host a bridal party or girls' day?", "Yes. Call (775) 575-1070 to set up a custom day for a wedding party, birthday, girls' day or work retreat."],
  ["Do you sell gift cards?", "Yes. Gift cards are available on Electric Sun's Vagaro page, or call the salon."],
  ["What payment do you take?", "Visa, MasterCard, Discover, debit cards, cash and checks."]
];

// ---- helpers ----------------------------------------------------------------
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function fmtH(h) { var hh = Math.floor(h), m = Math.round((h - hh) * 60); var ap = hh >= 12 ? "PM" : "AM"; var x = hh % 12 || 12; return x + (m ? ":" + (m < 10 ? "0" : "") + m : "") + " " + ap; }
var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// photos: Electric Sun's own pictures (assets/raw), embedded by build.py as window.IMG
var IMG = window.IMG || {};
var PHOTOS = [
  {k: "hero-sun-wall", cap: "The metal sun on the salon wall", alt: "Metal sun sculpture with a glass face, lit on the wall inside Electric Sun", cls: "tall"},
  {k: "about-pedicure-lounge", cap: "The pedicure lounge", alt: "Pedicure lounge with cushioned chairs, mosaic tile footbaths and a sun medallion on the wall", cls: "wide"},
  {k: "tanning-bed", cap: "A lay-down tanning bed", alt: "Inside a lit lay-down tanning bed"},
  {k: "work-highlights", cap: "Highlights on long hair", alt: "Long wavy hair with caramel highlights, seen from behind", cls: "tall"},
  {k: "boutique-floor", cap: "Clothing, handbags and gifts in the boutique", alt: "Racks of clothing and handbags on the boutique floor, with a salon chair in the back", cls: "wide"},
  {k: "work-nail-shaping", cap: "Shaping a natural nail", alt: "Close-up of a nail tech shaping a nail with an electric file"},
  {k: "boutique-jewelry", cap: "Jewelry in the boutique", alt: "Necklaces displayed on black velvet busts in the boutique"},
  {k: "hair-shampoo-bowl", cap: "A shampoo bowl at the stations", alt: "Black shampoo bowl with a hose at a styling station"}
].filter(function (p) { return IMG[p.k]; });
function photoAlt(k) { for (var i = 0; i < PHOTOS.length; i++) if (PHOTOS[i].k === k) return PHOTOS[i].alt; return ""; }
// service tab -> matching photo
var PANEL_PHOTO = {hair: ["work-highlights", "50% 30%"], nails: ["work-nail-shaping", "50% 50%"], tan: ["tanning-bed", "50% 50%"]};
(function () {
  $$("img[data-k]").forEach(function (im) { var k = im.getAttribute("data-k"); if (IMG[k]) im.src = IMG[k]; else im.remove(); });
})();

// booking links
$$("[data-book]").forEach(function (a) { a.href = BOOKING_URL; });

// ---- preview bar --------------------------------------------------------------
$("#pv-x").addEventListener("click", function () { $("#pv").remove(); });

// ---- nav hide/show --------------------------------------------------------------
(function () {
  var nav = $("#nav"), last = window.scrollY, body = document.body;
  body.classList.add("nav-shown");
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (y > last + 6 && y > 140) { nav.classList.add("hide"); body.classList.remove("nav-shown"); }
    else if (y < last - 6 || y < 140) { nav.classList.remove("hide"); body.classList.add("nav-shown"); }
    last = y;
  }, {passive: true});
})();

// ---- live hours ---------------------------------------------------------------
function laNow() {
  var p = new Intl.DateTimeFormat("en-US", {timeZone: "America/Los_Angeles", weekday: "short", hour: "numeric", minute: "numeric", hour12: false}).formatToParts(new Date());
  var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
  var d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
  var h = parseInt(o.hour, 10) % 24 + parseInt(o.minute, 10) / 60;
  return {d: d, h: h};
}
function status() {
  var n = laNow(), t = HOURS[n.d];
  if (t && n.h >= t[0] && n.h < t[1]) return {open: true, text: "Open now until " + fmtH(t[1]), n: n, t: t};
  if (t && n.h < t[0]) return {open: false, text: "Opens today at " + fmtH(t[0]), n: n, t: t};
  for (var i = 1; i <= 7; i++) {
    var d = (n.d + i) % 7;
    if (HOURS[d]) return {open: false, text: "Opens " + (i === 1 ? "tomorrow" : DAYS[d]) + " at " + fmtH(HOURS[d][0]), n: n, t: t};
  }
  return {open: false, text: "Call for hours", n: n, t: t};
}
function paintHours() {
  var s = status();
  $$("[data-badge]").forEach(function (b) { b.classList.toggle("open", s.open); b.lastElementChild.textContent = s.text; });
  $$("#hours tr").forEach(function (tr) { tr.classList.toggle("today", +tr.getAttribute("data-d") === s.n.d); });
  var note = $("[data-callnote]"); if (note) note.textContent = s.open ? "Open now until " + fmtH(s.t[1]) : s.text;
  // day arc
  var path = $("#arc-done"), sun = $("#arc-sun"), cap = $("#arc-cap");
  var t = s.t, frac;
  if (t) { $("#arc-o").textContent = fmtH(t[0]); $("#arc-c").textContent = fmtH(t[1]); }
  if (t) frac = Math.max(0, Math.min(1, (s.n.h - t[0]) / (t[1] - t[0]))); else frac = 1;
  // arc is an ellipse centred (260,150), rx 230, ry 112
  var ang = Math.PI * (1 - frac), x = 260 + 230 * Math.cos(ang), y = 150 - 112 * Math.sin(ang);
  sun.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")");
  path.setAttribute("stroke-dasharray", (frac * 100).toFixed(1) + " 100");
  if (!t) cap.innerHTML = "<b>Closed today.</b> " + s.text + ".";
  else if (s.open) cap.innerHTML = "<b>Open now.</b> Today's hours are " + fmtH(t[0]) + " to " + fmtH(t[1]) + ".";
  else if (s.n.h < t[0]) cap.innerHTML = "<b>Not open yet.</b> Today's hours are " + fmtH(t[0]) + " to " + fmtH(t[1]) + ".";
  else cap.innerHTML = "<b>Closed for the day.</b> " + s.text + ".";
}
paintHours(); setInterval(paintHours, 60000);

// ---- phone menu -----------------------------------------------------------------
(function () {
  var menu = $("#menu"), openB = $("[data-qa='menu-open']"), closeB = $("[data-qa='menu-close']");
  function open() { menu.classList.add("on"); openB.setAttribute("aria-expanded", "true"); document.documentElement.style.overflow = "hidden"; setTimeout(function () { closeB.focus(); }, 30); }
  function close() { menu.classList.remove("on"); openB.setAttribute("aria-expanded", "false"); document.documentElement.style.overflow = ""; }
  openB.addEventListener("click", open);
  closeB.addEventListener("click", function () { close(); openB.focus(); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", close); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("on")) { close(); openB.focus(); } });
})();

// ---- services ---------------------------------------------------------------------
(function () {
  var tabs = $("#tabs"), panels = $("#panels"), th = "", ph = "";
  MENU.forEach(function (c, i) {
    th += '<button class="tab press" role="tab" data-qa="tab" id="t-' + c.id + '" aria-controls="p-' + c.id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '"><svg aria-hidden="true"><use href="#' + c.icon + '"/></svg>' + esc(c.tab) + "</button>";
    var g = "";
    c.groups.forEach(function (gr) {
      g += '<div class="group"><h4>' + esc(gr.h) + "</h4>";
      gr.rows.forEach(function (r) {
        var call = r[1] === null, pr;
        if (call) pr = "Call";
        else if (r[1] === "Free") pr = "Free";
        else if (/\+$/.test(r[1])) pr = "<i>from</i>$" + r[1].slice(0, -1);
        else pr = "$" + r[1];
        var href = call ? "tel:" + TEL : BOOKING_URL;
        var lab = (call ? "Call about " : "Book ") + r[0];
        g += '<a class="row" href="' + href + '"' + (call ? "" : ' target="_blank" rel="noopener"') + ' aria-label="' + esc(lab + (call ? "" : ", " + pr.replace(/<[^>]+>/g, " "))) + '"><span class="nm"><b>' + esc(r[0]) + "</b>" + (r[2] ? "<small>" + esc(r[2]) + "</small>" : "") + '</span><span class="pr">' + pr + '</span><svg class="go" aria-hidden="true"><use href="#' + (call ? "i-phone" : "i-arrow") + '"/></svg></a>';
      });
      g += "</div>";
    });
    var pp = PANEL_PHOTO[c.id], ppk = pp && IMG[pp[0]] ? pp : null;
    var phot = ppk ? '<figure class="panel-photo"><img src="' + IMG[ppk[0]] + '" alt="' + esc(photoAlt(ppk[0])) + '" style="object-position:' + ppk[1] + '" loading="lazy"></figure>' : "";
    ph += '<div class="panel' + (i === 0 ? " on" : "") + '" role="tabpanel" id="p-' + c.id + '" aria-labelledby="t-' + c.id + '" tabindex="0"><div class="panel-head' + (ppk ? " has-photo" : "") + '"><div class="panel-intro"><svg aria-hidden="true"><use href="#' + c.icon + '"/></svg><div><h3>' + esc(c.title) + "</h3><p>" + esc(c.intro) + '</p></div></div>' + phot + '</div><div class="groups">' + g + "</div></div>";
  });
  tabs.innerHTML = th; panels.innerHTML = ph;
  var tbs = $$(".tab", tabs);
  function sel(id, focus) {
    tbs.forEach(function (t) { var on = t.id === "t-" + id; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; if (on) { if (focus) t.focus(); if (tabs.scrollWidth > tabs.clientWidth + 2) { var L = t.offsetLeft - tabs.offsetLeft - 16; tabs.scrollTo({left: Math.max(0, L), behavior: reduce ? "auto" : "smooth"}); } } });
    $$(".panel", panels).forEach(function (p) { p.classList.toggle("on", p.id === "p-" + id); });
  }
  window.__selTab = sel;
  tbs.forEach(function (t, i) {
    t.addEventListener("click", function () { sel(t.id.slice(2)); });
    t.addEventListener("keydown", function (e) {
      var k = e.key, j = -1;
      if (k === "ArrowRight") j = (i + 1) % tbs.length; else if (k === "ArrowLeft") j = (i - 1 + tbs.length) % tbs.length; else if (k === "Home") j = 0; else if (k === "End") j = tbs.length - 1;
      if (j >= 0) { e.preventDefault(); sel(tbs[j].id.slice(2), true); }
    });
  });
  // strip
  var s = "";
  for (var k = 0; k < 2; k++) STRIP.forEach(function (x) {
    s += '<a href="#services" data-go="' + x[1] + '"' + (k ? ' tabindex="-1" aria-hidden="true"' : "") + ">" + esc(x[0]) + '<svg aria-hidden="true"><use href="#i-spark"/></svg></a>';
  });
  $("#strip").innerHTML = s;
  $$("#strip a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var id = a.getAttribute("data-go"); sel(id);
      var sec = $("#services"); window.scrollTo({top: sec.getBoundingClientRect().top + window.scrollY - 10, behavior: reduce ? "auto" : "smooth"});
      var p = $("#p-" + id); p.classList.remove("flash"); void p.offsetWidth; p.classList.add("flash");
      setTimeout(function () { p.classList.remove("flash"); }, 1300);
    });
  });
})();

// ---- gallery + lightbox -------------------------------------------------------------
(function () {
  var gal = $("#gal"), lb = $("#lb"), img = $("#lb-img"), cap = $("#lb-cap"), cnt = $("#lb-count");
  if (!gal || !PHOTOS.length) { var s = $("#gallery"); if (s) s.remove(); $$("a[href='#gallery']").forEach(function (a) { a.remove(); }); return; }
  var cur = 0, opener = null, h = "";
  PHOTOS.forEach(function (p, i) {
    h += '<button type="button" class="gal-item' + (p.cls ? " " + p.cls : "") + '" data-i="' + i + '" aria-haspopup="dialog"><img src="' + IMG[p.k] + '" alt="' + esc(p.alt) + '" loading="lazy"><span>' + esc(p.cap) + "</span></button>";
  });
  gal.innerHTML = h;
  function show(i) {
    cur = (i + PHOTOS.length) % PHOTOS.length;
    var p = PHOTOS[cur];
    img.src = IMG[p.k]; img.alt = p.alt; cap.textContent = p.cap;
    cnt.textContent = (cur + 1) + " / " + PHOTOS.length;
  }
  function open(i, from) {
    opener = from; show(i);
    lb.classList.add("on"); lb.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    $("#lb-x").focus();
  }
  function close() {
    lb.classList.remove("on"); lb.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    if (opener) opener.focus();
  }
  $$(".gal-item", gal).forEach(function (b) { b.addEventListener("click", function () { open(+b.getAttribute("data-i"), b); }); });
  $("#lb-x").addEventListener("click", close);
  $("#lb-prev").addEventListener("click", function () { show(cur - 1); });
  $("#lb-next").addEventListener("click", function () { show(cur + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowLeft") show(cur - 1);
    else if (e.key === "ArrowRight") show(cur + 1);
    else if (e.key === "Tab") {
      var f = [$("#lb-x"), $("#lb-prev"), $("#lb-next")], i = f.indexOf(document.activeElement);
      e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
    }
  });
  var sx = null;
  lb.addEventListener("touchstart", function (e) { sx = e.touches.length === 1 ? e.touches[0].clientX : null; }, {passive: true});
  lb.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 45) show(cur + (dx < 0 ? 1 : -1));
  }, {passive: true});
})();
// ---- FAQ -----------------------------------------------------------------------
(function () {
  var h = "";
  FAQ.forEach(function (f, i) {
    h += '<div class="faq-item"><button type="button" data-qa="faq" aria-expanded="false" aria-controls="fa-' + i + '" id="fq-' + i + '">' + esc(f[0]) + '<svg aria-hidden="true"><use href="#i-plus"/></svg></button><div class="faq-a" id="fa-' + i + '" role="region" aria-labelledby="fq-' + i + '"><div><p>' + esc(f[1]) + "</p></div></div></div>";
  });
  $("#faq-list").innerHTML = h;
  $$("#faq-list button").forEach(function (b) {
    b.addEventListener("click", function () {
      var on = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", on); b.parentNode.classList.toggle("on", on);
    });
  });
})();

// ---- electric sun rays ------------------------------------------------------------
(function () {
  function rays(g, cx, cy, r0, r1, n, col1, col2, w) {
    var ns = "http://www.w3.org/2000/svg";
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 - Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a);
      var el = document.createElementNS(ns, i % 2 ? "polyline" : "line");
      if (i % 2) {
        // zig-zag ray: the "electric" one
        var pts = [], steps = 5, len = r1 - r0 + 8;
        for (var k = 0; k <= steps; k++) {
          var rr = r0 + (len * k) / steps, off = k === 0 || k === steps ? 0 : (k % 2 ? 6 : -6);
          pts.push((cx + ca * rr - sa * off).toFixed(1) + "," + (cy + sa * rr + ca * off).toFixed(1));
        }
        el.setAttribute("points", pts.join(" ")); el.setAttribute("stroke", col2); el.setAttribute("stroke-width", w * .8);
      } else {
        el.setAttribute("x1", (cx + ca * r0).toFixed(1)); el.setAttribute("y1", (cy + sa * r0).toFixed(1));
        el.setAttribute("x2", (cx + ca * (r1 - 10)).toFixed(1)); el.setAttribute("y2", (cy + sa * (r1 - 10)).toFixed(1));
        el.setAttribute("stroke", col1); el.setAttribute("stroke-width", w);
      }
      g.appendChild(el);
    }
  }
  var g = $("#rays"); if (g) rays(g, 280, 280, 214, 268, 28, "#B93A0B", "#2A1A10", 4);
  var f = $("#foot-rays");
  if (f) {
    var ns = "http://www.w3.org/2000/svg";
    for (var i = 0; i < 11; i++) {
      var a = Math.PI + (i / 10) * Math.PI, ca = Math.cos(a), sa = Math.sin(a), el = document.createElementNS(ns, "line");
      el.setAttribute("x1", (880 + ca * 134).toFixed(1)); el.setAttribute("y1", (170 + sa * 134).toFixed(1));
      el.setAttribute("x2", (880 + ca * 156).toFixed(1)); el.setAttribute("y2", (170 + sa * 156).toFixed(1));
      f.appendChild(el);
    }
  }
  // slow turn of the hero rays, set straight from time and scrollY (no easing lag)
  if (!reduce && g) {
    var t0 = performance.now(), vis = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe($(".hero-art"));
    (function tick(now) {
      if (vis) { var deg = ((now - t0) / 1000) * 3 + window.scrollY * 0.06; g.setAttribute("transform", "rotate(" + (deg % 360).toFixed(2) + " 280 280)"); }
      requestAnimationFrame(tick);
    })(t0);
  }
})();

var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
