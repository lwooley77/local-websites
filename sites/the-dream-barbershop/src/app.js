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

  // Hero photo inside the arch window
  var heroImg = $('#heroimg');
  if (heroImg) {
    if (IMG['hero-shop-at-work']) { heroImg.setAttribute('href', IMG['hero-shop-at-work']); }
    else { heroImg.parentNode.removeChild(heroImg); }
  }
  var picLine = $('.pic-line');
  if (picLine && IMG['hero-shop-at-work']) picLine.hidden = false;

  // Gallery + lightbox
  var PHOTOS = [
    { k: 'shop-floor-monogram', wide: 1, alt: 'The shop floor with the gold monogram set into the marbled epoxy, the waiting couch and caped chairs', cap: 'The gold monogram in the marbled floor, with the waiting couch and chairs.' },
    { k: 'hero-shop-at-work', alt: 'A barber cutting a client under the hex LED ceiling, skate decks on the wall behind', cap: 'A cut in progress under the hex LED ceiling, skate decks on the wall.' },
    { k: 'shop-gold-chair', alt: 'A gold and black barber chair at a station with a lit mirror and trophies', cap: 'A gold and black chair at a lit station, trophies on the shelf.' },
    { k: 'work-design-back', alt: 'A taper with a freehand design, seen from the back', cap: 'A taper with a freehand design.' },
    { k: 'work-green-design', alt: 'A green color design over a buzz cut, seen from behind', cap: 'A green color design over a buzz cut.' },
    { k: 'work-braids-top', alt: 'Braids seen from above', cap: 'Braids, seen from above.' },
    { k: 'work-braids-pattern', alt: 'A braid pattern seen from above against a black 3D wall panel', cap: 'A braid pattern against the black 3D wall panel.' }
  ].filter(function (p) { return IMG[p.k]; });
  var grid = $('#grid'), lb = $('#lb');
  if (!PHOTOS.length) {
    var gsec = $('#gallery'); if (gsec) gsec.parentNode.removeChild(gsec);
    $$('a[href="#gallery"]').forEach(function (a) { a.parentNode.removeChild(a); });
  } else if (grid && lb) {
    var cur = 0, opener = null, tx = null;
    var lbimg = $('#lbimg'), lbcap = $('#lbcap'), lbn = $('#lbn');
    PHOTOS.forEach(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'g press' + (p.wide ? ' wide' : '');
      b.setAttribute('aria-label', 'View photo ' + (i + 1) + ' of ' + PHOTOS.length + ': ' + p.cap);
      var im = document.createElement('img');
      im.src = IMG[p.k]; im.alt = ''; im.loading = 'lazy'; im.decoding = 'async';
      b.appendChild(im);
      b.addEventListener('click', function () { show(i); opener = b; lb.hidden = false; document.body.style.overflow = 'hidden'; $('#lbx').focus(); });
      grid.appendChild(b);
    });
    function show(i) {
      cur = (i + PHOTOS.length) % PHOTOS.length;
      var p = PHOTOS[cur];
      lbimg.src = IMG[p.k]; lbimg.alt = p.alt; lbcap.textContent = p.cap;
      lbn.textContent = (cur + 1) + ' / ' + PHOTOS.length;
    }
    function close() {
      lb.hidden = true; document.body.style.overflow = '';
      if (opener) opener.focus();
    }
    $('#lbx').addEventListener('click', close);
    $('#lbp').addEventListener('click', function () { show(cur - 1); });
    $('#lbnx').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { show(cur - 1); }
      else if (e.key === 'ArrowRight') { show(cur + 1); }
      else if (e.key === 'Tab') {
        var f = $$('button', lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (tx === null) return;
      var dx = e.changedTouches[0].clientX - tx; tx = null;
      if (Math.abs(dx) > 45) show(cur + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }
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
