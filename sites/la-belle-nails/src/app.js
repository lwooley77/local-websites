// ---- config (one line each, easy to update) ----
const BOOKING_URL = ''; // e.g. a Booksy / Vagaro / Square link. Empty = Book buttons start a text to the salon.
const SMS = 'sms:+17757878885?&body=' + encodeURIComponent("Hi La Belle Nails, I'd like to book an appointment.");
const RATING = 4.4;

(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // photo slots render only when an image exists
  const IMG = window.IMG || {};
  $$('img[data-k]').forEach(img => {
    const k = img.dataset.k, slot = img.closest('[data-slot]');
    if (IMG[k]) { img.src = IMG[k]; if (slot) { slot.hidden = false; const s = slot.nextElementSibling; if (s && s.tagName === 'svg') s.remove(); } }
    else if (slot) slot.remove(); else img.remove();
  });

  // booking
  $$('[data-book]').forEach(a => {
    if (BOOKING_URL) { a.href = BOOKING_URL; a.target = '_blank'; a.rel = 'noopener'; const l = a.querySelector('[data-book-label]'); if (l) l.textContent = 'Book online'; }
    else a.href = SMS;
  });

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

  // FAQ
  $$('.acc-b').forEach(b => b.addEventListener('click', () => b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true')));

  // stars (partial fill for the real rating)
  const bs = $('#bigStars');
  for (let i = 0; i < 5; i++) {
    const f = Math.max(0, Math.min(1, RATING - i)) * 100;
    bs.insertAdjacentHTML('beforeend', `<svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="sg${i}"><stop offset="${f}%" stop-color="#e9b9a1"/><stop offset="${f}%" stop-color="#4a5d52"/></linearGradient></defs><use href="#i-star" fill="url(#sg${i})"/></svg>`);
  }

  // today in America/Los_Angeles
  const wd = new Intl.DateTimeFormat('en-US', {timeZone:'America/Los_Angeles', weekday:'short'}).format(new Date());
  const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(wd);
  const cell = $(`#week [data-d="${day}"]`); if (cell) cell.classList.add('today');

  // hero nails open a few degrees with scroll (set straight from scrollY)
  const fan = $('#fan');
  if (!reduce && fan) {
    let tick = false;
    addEventListener('scroll', () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => { const s = 1 + Math.min(scrollY, 600) / 600 * .05; fan.setAttribute('transform', `translate(200 440) scale(${s.toFixed(3)})`); tick = false; });
    }, {passive:true});
  }

  $('#yr').textContent = new Date().getFullYear();
})();
