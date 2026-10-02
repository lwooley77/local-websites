// ---- config (one line each, easy to update) ----
const BOOKING_URL = ''; // e.g. a Booksy / Square / Cal.com link. Empty = Book buttons call the salon.
const TEL = 'tel:+17758837671';
// Listed hours (most-cited online, not owner-confirmed). Set HOURS_CONFIRMED = true once the owner confirms.
const HOURS_CONFIRMED = false;
const HOURS = {0:null,1:null,2:[9,16],3:[9,16],4:[9,16],5:[9,16],6:'call'};

(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // photo slots: only render when an image exists
  const IMG = window.IMG || {};
  $$('img[data-k]').forEach(img => {
    const k = img.dataset.k, slot = img.closest('[data-slot]');
    if (IMG[k]) { img.src = IMG[k]; if (slot) slot.hidden = false; }
    else if (slot) slot.remove(); else img.remove();
  });

  // booking
  $$('[data-book]').forEach(a => {
    if (BOOKING_URL) { a.href = BOOKING_URL; a.target = '_blank'; a.rel = 'noopener'; }
    else a.href = TEL;
  });

  // preview bar
  const pbar = $('#pbar');
  $('#pbarX').addEventListener('click', () => pbar.classList.add('gone'));

  // nav hide on scroll down, show on scroll up
  const nav = $('#nav'); let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (y > lastY && y > 160) nav.classList.add('hide'); else if (y < lastY - 4 || y < 160) nav.classList.remove('hide');
    lastY = y;
  }, {passive:true});

  // phone menu
  const menu = $('#menu'), open = $('[data-qa="menu-open"]'), close = $('[data-qa="menu-close"]');
  const setMenu = on => {
    menu.classList.toggle('open', on);
    open.setAttribute('aria-expanded', on);
    document.body.style.overflow = on ? 'hidden' : '';
    if (on) close.focus(); else open.focus();
  };
  open.addEventListener('click', () => setMenu(true));
  close.addEventListener('click', () => setMenu(false));
  $$('#menu nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });

  // tabs
  const tabs = $$('[role="tab"]');
  const show = (cat, flash) => {
    tabs.forEach(t => {
      const on = t.dataset.cat === cat;
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      const p = document.getElementById(t.getAttribute('aria-controls'));
      p.hidden = !on;
      if (on && flash && !reduce) { p.classList.remove('flash'); void p.offsetWidth; p.classList.add('flash'); }
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t.dataset.cat));
    t.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return; e.preventDefault();
      const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); show(n.dataset.cat);
    });
  });

  // services strip: duplicate for a seamless loop, links jump to category
  const strip = $('#strip');
  if (!reduce) [...strip.children].forEach(a => { const c = a.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; strip.appendChild(c); });
  strip.addEventListener('click', e => { const a = e.target.closest('a[data-cat]'); if (a) setTimeout(() => show(a.dataset.cat, true), 60); });

  // FAQ
  $$('.acc-b').forEach(b => b.addEventListener('click', () => b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true')));

  // today in America/Los_Angeles
  const now = new Date(new Date().toLocaleString('en-US', {timeZone:'America/Los_Angeles'}));
  const d = now.getDay(), names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const li = $(`#hoursList li[data-d="${d}"]`); if (li) li.classList.add('today');
  const h = HOURS[d], line = $('#todayLine');
  const fmt = x => (x % 12 || 12) + (x < 12 ? ' AM' : ' PM');
  if (h === null) line.textContent = `Today is ${names[d]}. The salon is usually closed today.`;
  else if (h === 'call') line.textContent = `Today is ${names[d]}. Call ahead to check today's hours.`;
  else line.textContent = `Today is ${names[d]}. Usually open ${fmt(h[0])} to ${fmt(h[1])}${HOURS_CONFIRMED ? '' : ', call ahead to confirm'}.`;

  // ambient: the little Airport Road plane crosses the hero sky once, shortly after load
  const plane = $('#plane');
  if (!reduce && plane) {
    const fly = () => { plane.classList.remove('fly'); void plane.offsetWidth; plane.classList.add('fly'); };
    setTimeout(fly, 1800);
  }
})();

document.getElementById('yr').textContent = new Date().getFullYear();
