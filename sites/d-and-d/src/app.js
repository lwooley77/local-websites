// Booking: paste a Booksy/Square/Cal.com link here if the shop ever takes online bookings. Empty = Book opens call/text.
var BOOKING_URL = '';

(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';

  /* photo slots: shown only when the build embedded a matching image */
  var IMG = window.IMG || {};
  $$('img[data-k]').forEach(function (im) {
    var k = im.getAttribute('data-k'), box = im.parentElement;
    if (IMG[k]) { im.src = IMG[k]; box.hidden = false; } else { box.remove(); }
  });

  /* booking links */
  if (BOOKING_URL) {
    $$('.js-book').forEach(function (a) { a.href = BOOKING_URL; a.target = '_blank'; a.rel = 'noopener'; a.classList.remove('js-sheet'); });
  }

  /* preview bar */
  $('#pbar-x').addEventListener('click', function () { $('#pbar').classList.add('gone'); });

  /* nav: hide on scroll down, show on scroll up; footer sunrise set straight from scroll */
  var nav = $('#nav'), lastY = window.scrollY, foot = $('#foot'), sun = $('#sun'), skyLow = $('#sky-low');
  function mix(a, b, t) {
    var pa = [1, 3, 5].map(function (i) { return parseInt(a.substr(i, 2), 16); });
    var pb = [1, 3, 5].map(function (i) { return parseInt(b.substr(i, 2), 16); });
    return 'rgb(' + pa.map(function (v, i) { return Math.round(v + (pb[i] - v) * t); }).join(',') + ')';
  }
  function sunrise() {
    var r = foot.getBoundingClientRect();
    var t = (window.innerHeight - r.top) / Math.max(1, Math.min(r.height, window.innerHeight));
    t = Math.max(0, Math.min(1, t));
    if (reduce) t = 1;
    sun.setAttribute('transform', 'translate(0,' + (110 - t * 160).toFixed(1) + ')');
    skyLow.setAttribute('stop-color', mix('#2a2a1c', '#b8692c', t));
  }
  function onScroll() {
    var y = window.scrollY;
    if (y > 160 && y > lastY + 4) nav.classList.add('hide');
    else if (y < lastY - 4 || y < 160) nav.classList.remove('hide');
    lastY = y;
    sunrise();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  sunrise();

  /* hours (minutes after midnight), Reno time */
  var HOURS = { 0: null, 1: null, 2: [420, 930], 3: [420, 930], 4: [420, 930], 5: [420, 930], 6: [420, 750] };
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function fmt(m, short) {
    var h = Math.floor(m / 60), mm = m % 60;
    var s = (h % 12 || 12) + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '');
    return short ? s : s + ' ' + (h < 12 ? 'AM' : 'PM');
  }
  function clk(m) { var h = Math.floor(m / 60); return (h % 12 || 12) + ':' + ((m % 60) < 10 ? '0' : '') + (m % 60); }
  function laNow() {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { d: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), m: (+p.hour % 24) * 60 + (+p.minute) };
  }
  function status(n) {
    var h = HOURS[n.d];
    if (h && n.m >= h[0] && n.m < h[1]) return { open: true, long: 'Open now until ' + fmt(h[1]), short: 'Open to ' + fmt(h[1], true) };
    if (h && n.m < h[0]) return { open: false, long: 'Opens today at ' + fmt(h[0]), short: 'Opens ' + fmt(h[0]) };
    for (var i = 1; i < 8; i++) {
      var dd = (n.d + i) % 7;
      if (HOURS[dd]) return { open: false, long: 'Opens ' + (i === 1 ? 'tomorrow' : DAYS[dd]) + ' at ' + fmt(HOURS[dd][0]), short: 'Opens ' + DAYS[dd].slice(0, 3) + ' ' + fmt(HOURS[dd][0], true) };
    }
  }

  /* shop clock: ticks, numerals, open window arc, hands */
  var C = 200;
  function pt(r, deg) { var a = deg * Math.PI / 180; return [(C + r * Math.cos(a)).toFixed(1), (C + r * Math.sin(a)).toFixed(1)]; }
  var ticks = $('#ticks'), nums = $('#nums');
  for (var i = 0; i < 60; i++) {
    var deg = i * 6 - 90, hr = i % 5 === 0;
    var a = pt(178, deg), b = pt(hr ? 160 : 170, deg);
    var l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]); l.setAttribute('x2', b[0]); l.setAttribute('y2', b[1]);
    l.setAttribute('stroke-width', hr ? 5 : 2);
    ticks.appendChild(l);
  }
  for (var n = 1; n <= 12; n++) {
    var p = pt(112, n * 30 - 90), t = document.createElementNS(NS, 'text');
    t.setAttribute('x', p[0]); t.setAttribute('y', (+p[1] + 10.5).toFixed(1)); t.textContent = n;
    nums.appendChild(t);
  }
  function hourDeg(m) { return ((m / 60) % 12) / 12 * 360 - 90; }
  function setArc(win) {
    var arc = $('#open-arc');
    if (!win) { arc.setAttribute('d', ''); return; }
    var s = hourDeg(win[0]), span = (win[1] - win[0]) / 720 * 360, e = s + span;
    var A = pt(146, s), B = pt(146, e);
    arc.setAttribute('d', 'M' + A[0] + ' ' + A[1] + ' A146 146 0 ' + (span > 180 ? 1 : 0) + ' 1 ' + B[0] + ' ' + B[1]);
  }
  function setHands(m) {
    $('#hand-h').style.transform = 'rotate(' + ((m % 720) / 720 * 360) + 'deg)';
    $('#hand-m').style.transform = 'rotate(' + ((m % 60) / 60 * 360) + 'deg)';
  }

  var stamped = false;
  function paint() {
    var now = laNow(), s = status(now), b = $('#badge'), h = HOURS[now.d];
    b.classList.toggle('open', s.open);
    b.querySelector('span').textContent = window.innerWidth >= 1100 ? s.long : s.short;
    b.setAttribute('aria-label', s.long);
    foot.classList.toggle('is-open', s.open);
    $$('#hrows tr').forEach(function (tr) { tr.classList.toggle('today', +tr.getAttribute('data-d') === now.d); });

    // clock window: today's hours, or the next open day's
    var win = h, label;
    if (h) {
      label = 'Shaded: today, ' + fmt(h[0]) + ' to ' + fmt(h[1]);
      $('#clock-day').textContent = 'TODAY';
    } else {
      for (var i = 1; i < 8; i++) { var dd = (now.d + i) % 7; if (HOURS[dd]) { win = HOURS[dd]; break; } }
      label = 'Closed today. Shaded: ' + DAYS[dd].slice(0, 3) + ', ' + fmt(win[0]) + ' to ' + fmt(win[1]);
      $('#clock-day').textContent = DAYS[dd].slice(0, 3).toUpperCase();
    }
    $('#clock-win').textContent = clk(win[0]) + ' TO ' + clk(win[1]);
    setArc(win);
    $('#clock-cap').textContent = label;
    setHands(now.m);

    $('#today-line').textContent = (s.open ? 'Open right now until ' + fmt(h[1]) + '.' : s.long + '.') + ' Walk-ins welcome.';
    $('#sheet-p').textContent = (s.open ? 'The shop is open until ' + fmt(h[1]) + '. ' : s.long + '. ') + 'Walk-ins are welcome. Call or text to check the wait or ask about a time.';
  }
  paint();
  setInterval(paint, 30000);
  window.addEventListener('resize', paint);
  $('#yr').textContent = new Date().getFullYear();

  /* today's row gets stamped when the card scrolls into view */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !stamped) { stamped = true; var r = $('#hrows tr.today'); if (r) r.classList.add('pressed'); io.disconnect(); }
      });
    }, { threshold: .5 });
    io.observe($('.timecard'));
  }

  /* phone menu */
  var menu = $('#menu'), openBtn = $('[data-qa="menu-open"]');
  function setMenu(on) {
    if (on) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add('on'); }); }
    else { menu.classList.remove('on'); setTimeout(function () { if (!menu.classList.contains('on')) menu.hidden = true; }, reduce ? 0 : 240); }
    openBtn.setAttribute('aria-expanded', on);
    document.body.style.overflow = on ? 'hidden' : '';
    if (on) setTimeout(function () { $('[data-qa="menu-close"]').focus(); }, 30); else openBtn.focus();
  }
  openBtn.addEventListener('click', function () { setMenu(true); });
  $('[data-qa="menu-close"]').addEventListener('click', function () { setMenu(false); });
  $$('#menu ol a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  /* strip: duplicate for a seamless loop; items jump to their category and flash it */
  var track = $('#strip .strip-track');
  var copy = track.querySelector('ul').cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  $$('a', copy).forEach(function (a) { a.tabIndex = -1; });
  track.appendChild(copy);
  $$('#strip a[data-cat]').forEach(function (a) {
    a.addEventListener('click', function () {
      var cat = a.getAttribute('data-cat');
      if (!cat) return;
      var p = $('#cat-' + cat);
      p.classList.remove('flash'); void p.offsetWidth; p.classList.add('flash');
      setTimeout(function () { p.classList.remove('flash'); }, 1500);
    });
  });

  /* FAQ */
  $$('.faq-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', on);
      b.parentElement.classList.toggle('open', on);
    });
  });

  /* book sheet with drag to close */
  var sheet = $('#sheet'), bg = $('#sheet-bg');
  function setSheet(on) {
    if (on) { sheet.hidden = false; requestAnimationFrame(function () { sheet.classList.add('on'); bg.classList.add('on'); }); setTimeout(function () { $('#sheet-x').focus(); }, 30); }
    else { sheet.classList.remove('on'); bg.classList.remove('on'); sheet.style.transform = ''; setTimeout(function () { if (!sheet.classList.contains('on')) sheet.hidden = true; }, reduce ? 0 : 300); }
  }
  $$('.js-sheet').forEach(function (a) {
    a.addEventListener('click', function (e) { if (!BOOKING_URL) { e.preventDefault(); setSheet(true); } });
  });
  $('#sheet-x').addEventListener('click', function () { setSheet(false); });
  bg.addEventListener('click', function () { setSheet(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (sheet.classList.contains('on')) setSheet(false);
    if (menu.classList.contains('on')) setMenu(false);
  });
  var sy = null, dy = 0;
  sheet.addEventListener('pointerdown', function (e) { if (e.target.closest('a,button')) return; sy = e.clientY; dy = 0; sheet.style.transition = 'none'; sheet.setPointerCapture(e.pointerId); });
  sheet.addEventListener('pointermove', function (e) { if (sy === null) return; dy = Math.max(0, e.clientY - sy); sheet.style.transform = 'translateY(' + dy + 'px)'; });
  function endDrag() { if (sy === null) return; sy = null; sheet.style.transition = ''; if (dy > 80) setSheet(false); else sheet.style.transform = ''; }
  sheet.addEventListener('pointerup', endDrag);
  sheet.addEventListener('pointercancel', endDrag);
})();
