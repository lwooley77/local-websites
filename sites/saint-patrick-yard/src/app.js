(function () {
  'use strict';
  // ---- config ----
  var BOOKING_URL = ''; // set to an online estimate/booking link if Patrick ever gets one; empty = call/text
  var TEL = '+17755057553';
  var TZ = 'America/Los_Angeles';
  // minutes from midnight, index 0 = Sunday. Every listing agrees on at least 7 AM to 7 PM daily.
  var HOURS = [[420, 1140], [420, 1140], [420, 1140], [420, 1140], [420, 1140], [420, 1140], [420, 1140]];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- preview bar ----
  var pvx = $('#pv-x');
  if (pvx) pvx.addEventListener('click', function () { $('#pv').remove(); });

  // ---- booking fallback ----
  if (BOOKING_URL) {
    $$('[data-est]').forEach(function (a) { a.href = BOOKING_URL; a.target = '_blank'; a.rel = 'noopener'; });
  }

  // ---- service rows: prefilled text ----
  $$('.row[data-svc]').forEach(function (a) {
    var msg = "Hi Patrick, I'd like a free estimate for " + a.getAttribute('data-svc') + '.';
    a.href = 'sms:' + TEL + '?&body=' + encodeURIComponent(msg);
    a.setAttribute('aria-label', a.querySelector('b').textContent + ': text Patrick for a free estimate');
  });

  // ---- time in Reno ----
  function renoNow() {
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday);
    return { day: day, min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }
  function fmt(m) {
    var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '') + ' ' + ap;
  }
  function badge() {
    var b = $('#badge');
    if (!b) return;
    var n = renoNow(), t = HOURS[n.day], txt, open = false;
    if (t && n.min >= t[0] && n.min < t[1]) { open = true; txt = 'Open until ' + fmt(t[1]); }
    else if (t && n.min < t[0]) txt = 'Opens ' + fmt(t[0]);
    else { var nx = HOURS[(n.day + 1) % 7]; txt = 'Opens ' + fmt(nx[0]) + ' tomorrow'; }
    b.classList.toggle('open', open);
    b.querySelector('span').textContent = txt;
    $$('#htable tr').forEach(function (r) { r.classList.toggle('today', +r.getAttribute('data-d') === n.day); });
  }
  badge();
  setInterval(badge, 60000);

  // ---- nav hide on scroll ----
  var nav = $('#nav'), lastY = window.scrollY, menuOpen = false;
  var sun = $('#sun');
  var hero = $('.hero');
  function onScroll() {
    var y = window.scrollY;
    if (!menuOpen) {
      if (y > lastY + 6 && y > 240) nav.classList.add('hide');
      else if (y < lastY - 6 || y < 80) nav.classList.remove('hide');
    }
    lastY = y;
    if (sun && !reduce && y < hero.offsetHeight + 400) sun.setAttribute('transform', 'translate(0 ' + Math.min(y * 0.14, 86).toFixed(1) + ')');
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- phone menu ----
  var menu = $('#menu'), openBtn = $('[data-qa="menu-open"]'), closeBtn = $('[data-qa="menu-close"]');
  function openMenu() {
    menuOpen = true;
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('on'); });
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { closeBtn.focus(); }, 30);
  }
  function closeMenu(focusBack) {
    menuOpen = false;
    menu.classList.remove('on');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(function () { if (!menuOpen) menu.hidden = true; }, 240);
    if (focusBack) openBtn.focus();
  }
  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', function () { closeMenu(true); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { closeMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) closeMenu(true); });

  // ---- service tabs ----
  var tabs = $$('[role="tab"]');
  function select(cat, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-cat') === cat;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
      if (on) {
        if (focus) t.focus();
        var bar = t.parentNode;
        bar.scrollTo({ left: t.offsetLeft - bar.offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t.getAttribute('data-cat')); });
    t.addEventListener('keydown', function (e) {
      var j = null;
      if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') j = 0;
      if (e.key === 'End') j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); select(tabs[j].getAttribute('data-cat'), true); }
    });
  });

  // ---- services strip (duplicated for a seamless loop) ----
  var track = $('#strip');
  if (track) {
    $$('a', track).forEach(function (a) {
      var c = a.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.tabIndex = -1;
      track.appendChild(c);
    });
    track.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-go]');
      if (!a) return;
      e.preventDefault();
      var cat = a.getAttribute('data-go');
      select(cat);
      $('#services').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      var p = $('#p-' + cat);
      p.classList.remove('flash');
      void p.offsetWidth;
      p.classList.add('flash');
    });
  }

  // ---- FAQ ----
  $$('.faq-q').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', on ? 'true' : 'false');
      b.closest('.faq-item').classList.toggle('open', on);
    });
  });

  // ---- reviews carousel ----
  var rt = $('#track'), prev = $('#prev'), next = $('#next'), count = $('#count');
  if (rt) {
    var cards = $$('.quote', rt);
    var step = function () { return cards[0].getBoundingClientRect().width + 14; };
    var update = function () {
      var i = Math.round(rt.scrollLeft / step());
      if (rt.scrollLeft + rt.clientWidth >= rt.scrollWidth - 4) i = cards.length - 1;
      count.textContent = (i + 1) + ' of ' + cards.length;
      prev.disabled = rt.scrollLeft <= 4;
      next.disabled = rt.scrollLeft + rt.clientWidth >= rt.scrollWidth - 4;
    };
    prev.addEventListener('click', function () { rt.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
    next.addEventListener('click', function () { rt.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
    rt.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ---- photos (render only when provided) ----
  var IMG = window.IMG || {};
  $$('img[data-k]').forEach(function (im) {
    var k = im.getAttribute('data-k');
    if (IMG[k]) {
      im.src = IMG[k];
      im.hidden = false;
      var f = im.closest('figure');
      if (f) f.hidden = false;
    } else {
      im.removeAttribute('src');
    }
  });
  var workKeys = Object.keys(IMG).filter(function (k) { return /^work/.test(k); }).sort();
  if (workKeys.length) {
    var g = $('#work-grid');
    workKeys.forEach(function (k) {
      var f = document.createElement('figure');
      var im = document.createElement('img');
      im.src = IMG[k]; im.alt = 'Yard work by Saint Patrick Yard Maintenance'; im.loading = 'lazy';
      f.appendChild(im); g.appendChild(f);
    });
    $('#work').hidden = false;
  }

  // ---- footer year ----
  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- ambient life (off under reduced motion) ----
  if (reduce || !Element.prototype.animate) return;

  // a dry leaf drifts across the hero now and then (max 4 times)
  var leafCount = 0;
  function leaf() {
    if (leafCount++ >= 4 || document.hidden || window.scrollY > hero.offsetHeight) return;
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('class', 'leaf');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" fill="#C98A3A" stroke="#1B271F" stroke-width="1"/><path d="M4 20L15 9" stroke="#1B271F" stroke-width="1" fill="none"/>';
    hero.appendChild(s);
    var w = hero.offsetWidth, h = hero.offsetHeight;
    var y0 = h * (0.1 + Math.random() * 0.25);
    var a = s.animate([
      { transform: 'translate(-30px,' + y0 + 'px) rotate(0deg)', opacity: 0 },
      { opacity: 0.85, offset: 0.1 },
      { transform: 'translate(' + (w * 0.35) + 'px,' + (y0 + 60) + 'px) rotate(160deg)', offset: 0.4 },
      { transform: 'translate(' + (w * 0.7) + 'px,' + (y0 + 40) + 'px) rotate(300deg)', offset: 0.75, opacity: 0.85 },
      { transform: 'translate(' + (w + 30) + 'px,' + (y0 + 110) + 'px) rotate(420deg)', opacity: 0 }
    ], { duration: 9000, easing: 'linear' });
    a.onfinish = function () { s.remove(); };
  }
  setTimeout(function () { leaf(); setInterval(leaf, 15000); }, 3500);

  // a tumbleweed rolls across the footer scene when it comes into view (at most 3 times)
  var tumble = $('#tumble'), tw = $('#tw'), rolls = 0, rolling = false;
  if (tumble && 'IntersectionObserver' in window) {
    tw.style.transformBox = 'fill-box';
    tw.style.transformOrigin = 'center';
    var roll = function () {
      if (rolling || rolls >= 3) return;
      rolling = true; rolls++;
      tumble.animate([{ transform: 'translate(-60px,0)' }, { transform: 'translate(1520px,0)' }], { duration: 9000, easing: 'linear' }).onfinish = function () { rolling = false; };
      tw.animate([
        { transform: 'translateY(0) rotate(0deg)' }, { transform: 'translateY(-10px) rotate(180deg)', offset: 0.12 },
        { transform: 'translateY(0) rotate(360deg)', offset: 0.24 }, { transform: 'translateY(-6px) rotate(560deg)', offset: 0.4 },
        { transform: 'translateY(0) rotate(760deg)', offset: 0.55 }, { transform: 'translateY(0) rotate(1440deg)' }
      ], { duration: 9000, easing: 'linear' });
    };
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) roll(); }); }, { threshold: 0.6 }).observe($('.foot-scene'));
  }
})();
