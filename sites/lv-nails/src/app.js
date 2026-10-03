// ---- config (one line each, easy to update) ----
const BOOKING_URL = ''; // e.g. a Booksy / Vagaro / Square link. Empty = Book buttons start a text to the salon.
const SMS = 'sms:+17753229800';
// Hours as listed online (Fresha listing, not owner-confirmed). 0 = Sunday. [open, close] in 24h.
const HOURS = {0:[10,17],1:[9,19],2:[9,19],3:[9,19],4:[9,19],5:[9,19],6:[9,19]};
const RATING = 4.2;

(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // photo slots render only when an image exists
  const IMG = window.IMG || {};
  $$('img[data-k]').forEach(img => {
    const k = img.dataset.k, slot = img.closest('[data-slot]');
    if (IMG[k]) { img.src = IMG[k]; if (slot) slot.hidden = false; }
    else if (slot) slot.remove(); else img.remove();
  });

  // booking
  $$('[data-book]').forEach(a => {
    if (BOOKING_URL) { a.href = BOOKING_URL; a.target = '_blank'; a.rel = 'noopener'; const l = a.querySelector('[data-book-label]'); if (l) l.textContent = 'Book online'; }
    else a.href = SMS;
  });

  // preview bar
  $('#pbarX').addEventListener('click', () => $('#pbar').classList.add('gone'));

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
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });

  // tabs
  const tabs = $$('[role="tab"]');
  const show = (cat, flash) => tabs.forEach(t => {
    const on = t.dataset.cat === cat, p = document.getElementById(t.getAttribute('aria-controls'));
    t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; p.hidden = !on;
    if (on && flash && !reduce) { p.classList.remove('flash'); void p.offsetWidth; p.classList.add('flash'); }
  });
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t.dataset.cat, true));
    t.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return; e.preventDefault();
      const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); show(n.dataset.cat, true);
    });
  });

  // services strip: duplicate for a seamless loop; links jump to their category
  const strip = $('#strip');
  if (!reduce) [...strip.children].forEach(a => { const c = a.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; strip.appendChild(c); });
  strip.addEventListener('click', e => { const a = e.target.closest('a[data-cat]'); if (a) show(a.dataset.cat, true); });

  // FAQ
  $$('.acc-b').forEach(b => b.addEventListener('click', () => b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true')));

  // stars (partial fill for the real rating)
  const bs = $('#bigStars');
  for (let i = 0; i < 5; i++) {
    const f = Math.max(0, Math.min(1, RATING - i)) * 100;
    bs.insertAdjacentHTML('beforeend', `<svg width="34" height="34" viewBox="0 0 24 24"><defs><linearGradient id="sg${i}"><stop offset="${f}%" stop-color="#a3122f"/><stop offset="${f}%" stop-color="#e6d3cb"/></linearGradient></defs><use href="#i-star" fill="url(#sg${i})"/></svg>`);
  }

  // today + open badge, America/Los_Angeles
  const parts = new Intl.DateTimeFormat('en-US', {timeZone:'America/Los_Angeles', weekday:'short', hour:'numeric', minute:'numeric', hour12:false}).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(get('weekday'));
  const now = (+get('hour') % 24) + (+get('minute')) / 60;
  const fmt = h => (h % 12 || 12) + (h < 12 ? 'am' : 'pm');
  const row = $(`#htab [data-d="${day}"]`); if (row) row.classList.add('today');
  const badge = $('#openBadge'), h = HOURS[day];
  if (h && now >= h[0] && now < h[1]) { badge.classList.add('on'); badge.innerHTML = `<i></i><span>Open now<b> until ${fmt(h[1])}</b></span>`; }
  else {
    let d = day, when = '';
    if (h && now < h[0]) when = `today ${fmt(h[0])}`;
    else { d = (day + 1) % 7; when = `${fmt(HOURS[d][0])}`; when = (d === (day + 1) % 7 ? 'tomorrow ' : '') + when; }
    badge.innerHTML = `<i></i><span>Closed<b>, opens ${when}</b></span>`;
  }

  // hero fan turns a few degrees with scroll (set straight from scrollY)
  const fan = $('#fan');
  if (!reduce && fan) {
    let tick = false;
    addEventListener('scroll', () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => { const r = Math.min(scrollY, 700) / 700 * 8; fan.setAttribute('transform', `translate(165 362) rotate(${r.toFixed(2)})`); tick = false; });
    }, {passive:true});
  }

  $('#yr').textContent = new Date().getFullYear();
})();
