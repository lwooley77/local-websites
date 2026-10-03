// Config: swap these when the owner confirms details.
var BOOKING_URL = 'sms:+17758251877'; // no online booking found; booking is by text or call
var HOURS = null; // e.g. {0:null,1:[9.5,19],...} in 24h decimal; null = unknown, show "Call"
var RATING = 4.4;

(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var NS = 'http://www.w3.org/2000/svg';

  $$('.js-book').forEach(function (a) { a.href = BOOKING_URL; });
  $('#yr').textContent = new Date().getFullYear();
  $('#pvx').addEventListener('click', function () { $('.pv').remove(); document.body.prepend(Object.assign(document.createElement('span'), { id: 'top' })); });

  // photo slots: only shown when a real photo exists
  var IMG = window.IMG || {};
  $$('img[data-k]').forEach(function (im) { var s = IMG[im.dataset.k]; if (s) { im.src = s; im.hidden = false; } });

  // star rows (partial fill for 4.4)
  $$('.st').forEach(function (box, n) {
    for (var i = 0; i < 5; i++) {
      var f = Math.max(0, Math.min(1, RATING - i)), id = 'sg' + n + i;
      box.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24"><defs><linearGradient id="' + id + '"><stop offset="' + f + '" stop-color="#d6b25e"/><stop offset="' + f + '" stop-color="rgba(214,178,94,.25)"/></linearGradient></defs><use href="#i-star" fill="url(#' + id + ')"/></svg>');
    }
  });

  // marquee bulbs
  var g = $('#bulbs'), bulbs = [];
  function bulb(x, y, parent, r) { var c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', r || 4.2); c.setAttribute('class', 'bulb'); parent.appendChild(c); return c; }
  for (var x = 42; x <= 358; x += 19.75) { bulbs.push(bulb(x, 108, g)); bulbs.push(bulb(x, 260, g)); }
  for (var y = 128; y <= 240; y += 22.4) { bulbs.push(bulb(42, y, g)); bulbs.push(bulb(358, y, g)); }
  var fb = $('#fbulbs');
  for (var fx = 392; fx <= 808; fx += 26) { var c = bulb(fx, 128, fb, 3); c.removeAttribute('class'); c = bulb(fx, 168, fb, 3); c.removeAttribute('class'); }

  // sunburst rays behind the rating
  var sr = $('#sunrays');
  for (var a = 8; a < 180; a += 12) { var rad = a * Math.PI / 180, l = document.createElementNS(NS, 'line'); l.setAttribute('x1', 450 - 140 * Math.cos(rad)); l.setAttribute('y1', 520 - 140 * Math.sin(rad)); l.setAttribute('x2', 450 - 560 * Math.cos(rad)); l.setAttribute('y2', 520 - 560 * Math.sin(rad)); sr.appendChild(l); }

  if (!reduce) {
    // one bulb blinks now and then, nothing chases
    setInterval(function () {
      if (document.hidden) return;
      var b = bulbs[Math.floor(Math.random() * bulbs.length)];
      b.classList.add('off'); setTimeout(function () { b.classList.remove('off'); }, 260);
    }, 2200);
    // spotlights tilt with scroll, set straight from scrollY
    var beams = $$('.beams i');
    addEventListener('scroll', function () {
      var t = Math.min(scrollY, 700) / 700 * 6;
      beams[0].style.transform = 'rotate(' + (-16 + t) + 'deg)';
      beams[1].style.transform = 'rotate(' + (14 - t) + 'deg)';
    }, { passive: true });
  }

  // menu
  var menu = $('#menu'), open = $('[data-qa="menu-open"]'), close = $('[data-qa="menu-close"]');
  function setMenu(on) {
    menu.classList.toggle('on', on); open.setAttribute('aria-expanded', on);
    document.body.style.overflow = on ? 'hidden' : '';
    (on ? close : open).focus();
  }
  open.addEventListener('click', function () { setMenu(true); });
  close.addEventListener('click', function () { setMenu(false); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('on')) setMenu(false); });

  // tabs
  var tabs = $$('[role="tab"]');
  function pick(t) {
    tabs.forEach(function (x) { var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(t); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { var n = tabs[(i + d + tabs.length) % tabs.length]; pick(n); n.focus(); }
    });
  });

  // faq
  $$('[data-qa="faq"]').forEach(function (b) {
    b.addEventListener('click', function () { b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true'); });
  });

  // hours board, today highlighted (Reno time)
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })).getDay();
  function fmt(h) { var hr = Math.floor(h), m = Math.round((h - hr) * 60); return ((hr + 11) % 12 + 1) + (m ? ':' + (m < 10 ? '0' : '') + m : '') + (hr < 12 ? ' am' : ' pm'); }
  var ul = $('#hours');
  [1, 2, 3, 4, 5, 6, 0].forEach(function (d) {
    var v = HOURS ? (HOURS[d] ? fmt(HOURS[d][0]) + ' to ' + fmt(HOURS[d][1]) : 'Closed') : 'Call for hours';
    ul.insertAdjacentHTML('beforeend', '<li' + (d === today ? ' class="today"' : '') + '><span>' + days[d] + '</span><span>' + v + '</span></li>');
  });
})();
