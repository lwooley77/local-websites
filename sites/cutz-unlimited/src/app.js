// Booking: paste a Booksy/Square/Cal.com link here once the shop has one. Empty = Book buttons call/text.
var BOOKING_URL = '';

(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* photos: slots render only when the build embedded a matching image */
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

  /* nav hide on scroll down, show on scroll up */
  var nav = $('#nav'), lastY = window.scrollY;
  var pole = $('#polesvg');
  function onScroll() {
    var y = window.scrollY;
    if (y > 160 && y > lastY + 4) nav.classList.add('hide');
    else if (y < lastY - 4 || y < 160) nav.classList.remove('hide');
    lastY = y;
    if (pole && !reduce) pole.style.transform = 'translateY(' + ((y * 0.4) % 60) + 'px)';
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* hours, open badge, today */
  var HOURS = { 0: null, 1: [10, 18], 2: [10, 18], 3: [10, 18], 4: [10, 18], 5: [10, 18], 6: [9, 17] };
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function fmt(h) { return (h % 12 || 12) + ' ' + (h < 12 ? 'AM' : 'PM'); }
  function laNow() {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    return { d: d, m: (+p.hour % 24) * 60 + (+p.minute) };
  }
  function status() {
    var n = laNow(), h = HOURS[n.d];
    if (h && n.m >= h[0] * 60 && n.m < h[1] * 60) return { open: true, long: 'Open now until ' + fmt(h[1]), short: 'Open to ' + fmt(h[1]), d: n.d };
    if (h && n.m < h[0] * 60) return { open: false, long: 'Opens today at ' + fmt(h[0]), short: 'Opens ' + fmt(h[0]), d: n.d };
    for (var i = 1; i < 8; i++) {
      var dd = (n.d + i) % 7;
      if (HOURS[dd]) {
        var when = i === 1 ? 'tomorrow' : DAYS[dd];
        return { open: false, long: 'Opens ' + when + ' at ' + fmt(HOURS[dd][0]), short: 'Opens ' + DAYS[dd].slice(0, 3), d: n.d };
      }
    }
  }
  function paint() {
    var s = status(), b = $('#badge');
    b.classList.toggle('open', s.open);
    var wide = window.innerWidth >= 960;
    b.querySelector('span').textContent = wide ? s.long : s.short;
    b.setAttribute('aria-label', s.long);
    $('#foot').classList.toggle('is-open', s.open);
    $$('#hrows tr').forEach(function (tr) { tr.classList.toggle('today', +tr.getAttribute('data-d') === s.d); });
    $('#today-line').textContent = (s.open ? 'Open right now until ' + fmt(HOURS[s.d][1]) + '. ' : s.long + '. ') + 'Hours: Monday to Friday 10 AM to 6 PM, Saturday 9 AM to 5 PM, closed Sunday.';
    $('#sheet-p').textContent = (s.open ? 'The shop is open until ' + fmt(HOURS[s.d][1]) + '. ' : s.long + '. ') + 'Booking is by phone. Call or text and ask for the next opening.';
  }
  paint();
  setInterval(paint, 60000);
  window.addEventListener('resize', paint);
  $('#yr').textContent = new Date().getFullYear();

  /* phone menu */
  var menu = $('#menu'), openBtn = $('[data-qa="menu-open"]');
  function setMenu(on) {
    if (on) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add('on'); }); }
    else { menu.classList.remove('on'); setTimeout(function () { if (!menu.classList.contains('on')) menu.hidden = true; }, reduce ? 0 : 250); }
    openBtn.setAttribute('aria-expanded', on);
    document.body.style.overflow = on ? 'hidden' : '';
    if (on) setTimeout(function () { $('[data-qa="menu-close"]').focus(); }, 30); else openBtn.focus();
  }
  openBtn.addEventListener('click', function () { setMenu(true); });
  $('[data-qa="menu-close"]').addEventListener('click', function () { setMenu(false); });
  $$('#menu ol a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  /* fade art: bars thin from #4 down to skin */
  var NS = 'http://www.w3.org/2000/svg', bars = $('#fadebars'), ruler = $('#ruler');
  if (bars) {
    var N = 30, top = 6, pitch = 11.6;
    for (var i = 0; i < N; i++) {
      var t = i / (N - 1), th = Math.max(0.6, 10.4 * Math.pow(1 - t, 1.5));
      var r = document.createElementNS(NS, 'rect');
      var y = top + i * pitch + (pitch - th) / 2;
      r.setAttribute('x', 62); r.setAttribute('y', y.toFixed(1));
      r.setAttribute('width', 192); r.setAttribute('height', th.toFixed(2)); r.setAttribute('rx', Math.min(th / 2, 2).toFixed(2));
      if (i > 25) r.setAttribute('opacity', (1 - (i - 25) / 6).toFixed(2));
      bars.appendChild(r);
      var tk = document.createElementNS(NS, 'rect');
      tk.setAttribute('x', 44); tk.setAttribute('y', (top + i * pitch + pitch / 2 - .5).toFixed(1));
      tk.setAttribute('width', i % 6 === 0 ? 12 : 6); tk.setAttribute('height', 1); tk.setAttribute('fill', '#625c51');
      ruler.appendChild(tk);
    }
    ['#4', '#3', '#2', '#1', '#0', 'SKIN'].forEach(function (lab, j) {
      var tx = document.createElementNS(NS, 'text');
      tx.setAttribute('x', 0); tx.setAttribute('y', (top + [0, 6, 12, 18, 24, 29][j] * pitch + pitch / 2 + 4).toFixed(1));
      tx.textContent = lab; ruler.appendChild(tx);
    });
  }

  /* services tabs */
  var tabs = $$('[role="tab"]');
  function selectTab(cat, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-cat') === cat;
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).classList.toggle('on', on);
      if (on && focus) t.focus();
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t.getAttribute('data-cat')); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowRight' || k === 'ArrowDown') n = (i + 1) % tabs.length;
      if (k === 'ArrowLeft' || k === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
      if (n !== null) { e.preventDefault(); selectTab(tabs[n].getAttribute('data-cat'), true); }
    });
  });

  /* strip: duplicate for a seamless loop, items jump to their category */
  var track = $('#strip');
  if (track) {
    var copy = track.querySelector('ul').cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    $$('a', copy).forEach(function (a) { a.tabIndex = -1; });
    track.appendChild(copy);
    $$('a[data-cat]', track).forEach(function (a) {
      a.addEventListener('click', function () {
        var cat = a.getAttribute('data-cat');
        selectTab(cat);
        var p = $('#p-' + cat);
        p.classList.remove('flash'); void p.offsetWidth; p.classList.add('flash');
        setTimeout(function () { p.classList.remove('flash'); }, 1400);
      });
    });
  }

  /* FAQ */
  $$('.faq-btn').forEach(function (b) {
    b.addEventListener('click', function () { var on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); b.closest('.faq-item').classList.toggle('open', on); });
  });

  /* booking sheet with drag to close */
  var sheet = $('#sheet'), bg = $('#sheet-bg');
  function setSheet(on) {
    if (on) { sheet.hidden = false; requestAnimationFrame(function () { sheet.classList.add('on'); bg.classList.add('on'); }); }
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
