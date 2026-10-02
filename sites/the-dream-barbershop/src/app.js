(function () {
  'use strict';
  // Booking: the shop books through Squire (link from their Instagram bio). Set to '' to make Book fall back to calling.
  var BOOKING_URL = 'https://getsquire.com/booking/book/the-dream-barbershop-reno';
  var TEL = '+17754486456';
  var TZ = 'America/Los_Angeles';
  // 0 = Sunday. [open, close] in 24h hours, null = closed. Saturday close per Google-fed listings (Instagram bio says 6 PM).
  var HOURS = { 0: null, 1: null, 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 16] };
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Book links
  $$('[data-book]').forEach(function (a) {
    if (BOOKING_URL) { a.href = BOOKING_URL; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.href = 'tel:' + TEL; a.removeAttribute('target'); }
  });

  // Optional photos
  var IMG = window.IMG || {};
  $$('img[data-k]').forEach(function (im) {
    var k = im.getAttribute('data-k');
    if (IMG[k]) { im.src = IMG[k]; im.classList.add('on'); } else { im.parentNode.removeChild(im); }
  });

  // Year
  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  // Preview bar
  var pv = $('#pv');
  $('#pvx').addEventListener('click', function () { pv.parentNode.removeChild(pv); });

  // Time in Reno
  function now() {
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday);
    var h = parseInt(o.hour, 10) % 24, m = parseInt(o.minute, 10);
    return { d: d, t: h + m / 60 };
  }
  function fmt(h) { var ap = h >= 12 ? 'PM' : 'AM'; var x = h % 12 || 12; return x + ' ' + ap; }
  function status() {
    var n = now(), today = HOURS[n.d];
    if (today && n.t >= today[0] && n.t < today[1]) return { open: true, text: 'Open <em>now </em>until ' + fmt(today[1]) };
    if (today && n.t < today[0]) return { open: false, text: 'Opens today ' + fmt(today[0]) };
    for (var i = 1; i <= 7; i++) {
      var d = (n.d + i) % 7;
      if (HOURS[d]) return { open: false, text: 'Opens ' + DAYS[d].slice(0, 3) + ' ' + fmt(HOURS[d][0]) };
    }
    return { open: false, text: 'Call for hours' };
  }
  function paint() {
    var s = status(), b = $('#badge');
    b.classList.toggle('open', s.open);
    b.querySelector('span').innerHTML = s.text;
    var d = now().d;
    $$('#days li').forEach(function (li) { li.classList.toggle('today', +li.getAttribute('data-d') === d); });
  }
  paint(); setInterval(paint, 60000);

  // Nav hide on scroll down, show on scroll up; moon phases follow scroll
  var nav = $('#nav'), lastY = window.scrollY, hcut = $('#hcut'), marks = $$('.markcut'), ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (y > 120 && y > lastY + 4 && !menu.classList.contains('on')) nav.classList.add('hide');
    else if (y < lastY - 4 || y < 120) nav.classList.remove('hide');
    lastY = y;
    if (!reduce) {
      var max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      var p = Math.min(1, y / max);
      if (hcut) hcut.setAttribute('cx', (112 + p * 64).toFixed(1));
      marks.forEach(function (c) { c.setAttribute('cx', (25 + p * 12).toFixed(1)); });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  // Phone menu
  var menu = $('#menu'), openBtn = $('[data-qa="menu-open"]'), closeBtn = $('[data-qa="menu-close"]');
  function setMenu(on) {
    menu.classList.toggle('on', on);
    openBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
    document.documentElement.style.overflow = on ? 'hidden' : '';
    if (on) { nav.classList.remove('hide'); closeBtn.focus(); } else { openBtn.focus({ preventScroll: true }); }
  }
  openBtn.addEventListener('click', function () { setMenu(true); });
  closeBtn.addEventListener('click', function () { setMenu(false); });
  $$('#menu nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('on')) setMenu(false); });

  // Service tabs
  var tabs = $$('[role="tab"]'), panel = $('#menu-list');
  function pick(cat, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-cat') === cat;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on) { panel.setAttribute('aria-labelledby', t.id); if (focus) t.focus(); }
    });
    $$('.cat', panel).forEach(function (c) { c.hidden = !(cat === 'all' || c.getAttribute('data-cat') === cat); });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(t.getAttribute('data-cat')); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, j = k === 'ArrowRight' ? i + 1 : k === 'ArrowLeft' ? i - 1 : k === 'Home' ? 0 : k === 'End' ? tabs.length - 1 : null;
      if (j === null) return;
      e.preventDefault(); j = (j + tabs.length) % tabs.length; pick(tabs[j].getAttribute('data-cat'), true);
    });
  });

  // Strip links jump to a category and flash the row
  $$('.strip a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      pick(a.getAttribute('data-go'));
      var target = document.getElementById(a.getAttribute('data-row'));
      $('#services').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
          target.classList.add('flash');
          setTimeout(function () { target.classList.remove('flash'); }, 1600);
        }, reduce ? 0 : 420);
      }
    });
  });

  // FAQ
  $$('[data-qa="faq"]').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', on ? 'true' : 'false');
      b.parentNode.classList.toggle('open', on);
    });
  });

  // One shooting star over Reviews, the first time it scrolls into view
  var shoot = $('#shoot');
  if (shoot && !reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { setTimeout(function () { shoot.classList.add('go'); }, 500); io.disconnect(); }
    }, { threshold: 0.45 });
    io.observe($('#reviews'));
  }
})();
