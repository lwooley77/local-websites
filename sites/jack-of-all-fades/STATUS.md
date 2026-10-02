# Jack Of All Fades: demo status

Deliverable: `sites\jack-of-all-fades\dist\index.html` (single file, 200 KB, no external requests).
Rebuild: `python sites\_kit\build.py sites\jack-of-all-fades`  QA: `python sites\_kit\qa.py sites\jack-of-all-fades`

## Lead check
- Not a skip. Their old site **jackofallfadesnv.com no longer resolves** (DNS "name does not exist", checked 2026-10-01). Not permanently closed: Yelp listing updated July 2026, Nevada Sports Net feature Feb 20, 2026.

## Fact sheet
### Verified (with source)
- Name: Jack Of All Fades. Phone (775) 560-2986. (mk lead sheet; Yelp)
- Address: 5000 Smithridge Dr, Suite C-7, Reno, NV 89502. (KOLO 8, Feb 2025; Sweet Deals)
- Google: 4.7 stars, 114 reviews. (mk lead sheet, https://maps.google.com/?cid=9191295867077080476)
- Booksy: 4.9 stars, 37 reviews, no services listed. (https://booksy.com/en-us/1533265_jack-of-all-fades_barber-shop_29330_reno)
- Owner D'Raun Manning ("the Jack of All Fades"); Hug High class of 2008; coaches basketball at Wooster High; unofficial barber for Nevada men's basketball. (https://nevadasportsnet.com/news/reporters/hanging-out-with-the-nevada-basketball-team-at-the-jack-of-all-fades-barbershop)
- Owner quote used on page: "I hope that when they leave, they want to come back." (same NSN article)
- Mission line "building a stronger community one cut at a time". (KOLO 8 Open for Business, 2024)
- Services: standard fade haircuts for adults 18+, custom hair designs for kids 17 and under, traditional barbering standards, men's haircuts and salon services. (Sweet Deals / KOLO 2024)
- Free haircut day Feb 16, 2025. (KOLO 8, Feb 2025)
- Instagram @jack_of_all__fades; YouTube @Jack_of_all__fades. (KOLO 2024; search)

### Unverified (used carefully or not shown)
- Hours shown: Sun-Thu 10-5, Fri-Sat 9-5 (Yelp via search snippets). Old site said 7 days 9-5. Page says "Hours as listed online... call ahead."
- Walk-ins welcome; team of barbers and cosmetologists (old website snippet, site now offline). Shown on page.
- Beard trims / haircut & beard (search snippet citing a booking platform). Shown as services, no prices.
- Prices NOT shown: snippets suggest Haircut $40, Kids (7-14) $35, Haircut & beard $50; expired Sweet Deals voucher valued a fade at $50.

### Missing
- Current price list (biggest gap)
- Confirmed hours from the owner
- Barber names / team size
- Years in business / opening date
- Payment methods, parking, any online booking link they actually use

## Design decisions
- Concept: "Jack of all trades" pun + Reno = a playing card. Hero is a custom SVG Jack of Spades court card: D'Raun-style barber with a flat-top fade (stacked thinning lines), shaved design, beard line-up, red barber cape, holding a straight razor; mirrored like a real court card. Card back + a "775" casino chip behind it.
- Palette: ivory card stock, ink black, card red, brass on dark felt. Type: Anton (barbershop window lettering), DM Serif Display (card indices), IBM Plex Mono labels, Karla body.
- Every section index is a Jack with a different suit (J spade, J heart, J diamond, J club) = "Jack of all suits".
- Reviews shown as an Ace card with the real 4.7 / 114 rating linked to Google. No quotes written.
- Footer scene: night hills, a Reno-style arch with bulbs that light up when you reach it, barber pole, fanned A-K-J hand.
- No prices: every service row is a tap-to-call "Call for price". Book = bottom sheet with Call / Text (drag to close). `BOOKING_URL` in app.js adds a "Book online" button once they have one.
- Photo slot ready: `assets\raw\shop.jpg` appears above the About fact card automatically.

## Photos to request
1. Close-up fades and custom kid designs (back/side of the head, no faces) for the services area
2. The shop interior / chairs at Smithridge (for the `shop` slot in About)
3. D'Raun at work (with his OK) for About
4. Storefront at Suite C-7 so people can find the door
(Owner must approve every photo before going public; no client faces or kids' faces.)

## Pitch notes
1. "Your website is gone." jackofallfadesnv.com no longer exists, but KOLO's 2024 story still sends people there to book. Every one of those clicks hits an error page today.
2. You're the Wolf Pack's barber and you've been on KOLO and Nevada Sports Net, yet a search shows other "Jack of All Fades" shops in Houston, NYC, Georgia and Vegas. This site puts D'Raun's story, hours and a one-tap Call button in front of Reno customers.
3. Your Booksy page shows 4.9 stars but no services and no way to book. The demo lets people call, text or get directions in one tap, and plugs in real online booking and your price list when you're ready.

## QA result
- `qa.py`: PASS (0 fails) on 3+ full passes at 1280x900 and 390x844. 200 KB.
- Extra checks: booking sheet opens and drag-closes; strip links switch tabs; nav hides on scroll down and shows on scroll up; open badge in America/Los_Angeles; today's hours highlighted; no overflow at 320px with reduced motion; all tap targets 44px+; zero em dashes.
- Self-scores: custom to business 9, premium polish 9, readability 9, mobile 9, ease of contact/booking 9, faithful to facts 9, never-do list clean 9.

## How to share (mk)
- Netlify Drop: drag the `dist` folder to app.netlify.com/drop. Or `npx netlify-cli deploy --dir dist --prod` after `npx netlify-cli login` once.
