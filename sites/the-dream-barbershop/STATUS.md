# The Dream Barbershop : demo status

Deliverable: `dist/index.html` (single file, 162 KB, no external requests except outbound links).
Build: `python sites\_kit\build.py sites\the-dream-barbershop`. QA: `python sites\_kit\qa.py sites\the-dream-barbershop` (passes, 0 fails, 3 passes run).

## Fact sheet

### Verified (with source)
- Name: The Dream Barbershop (Instagram @thedreambarbershopreno, Squire listing)
- Phone: (775) 448-6456 (lead sheet, Yahoo Local, BestProsInTown)
- Address: 1109 California Ave, Reno, NV 89509 (Instagram bio, Yahoo Local, BestProsInTown)
- Hours Tue to Fri 9 AM to 6 PM; closed Sun and Mon (Yahoo Local, BestProsInTown, Instagram bio)
- Owner: Rodrigo Gomez (Facebook video "A little bit about Rodrigo Gomez the owner of The Dream Barbershop"; his Instagram @thebarberrigz)
- Barbers: Rodrigo, Hakim, Marcos, Victor, Kevin, Gisella (Squire listing snippet + Instagram story highlights)
- Prices (Squire listing snippets): Haircut $50 (30 to 60 min), Haircut & Eyebrows $60 (45 to 60), Haircut & Beard $70 (45 to 60), Haircut, Beard & Eyebrows $75 (45 to 75), Adult Haircut & Design $70, Kids Haircut ages 2 to 12 $40, Kids Haircut with Design ages 6+ $50, Before 9am / After 5pm $100 (1 hr)
- Booking: Squire, https://getsquire.com/booking/book/the-dream-barbershop-reno (link in their Instagram bio)
- Walk-ins welcome, appointments prioritized (Squire snippet, BestProsInTown)
- Google: 4.8 stars, 82 reviews (lead sheet), Maps https://maps.google.com/?cid=2113090195408155263
- Wheelchair accessible, free Wi-Fi (Yahoo Local, BestProsInTown)
- Bio scope: "Haircuts | Shaves | Experiences" (Instagram)

### Unverified (single or indirect source)
- Saturday hours: Yahoo Local and BestProsInTown say 9 AM to 4 PM; Instagram bio says Tue to Sat 9 AM to 6 PM. Site shows 9 to 4 with an asterisk and "call to confirm".
- Squire rating 5.0 from 347 reviews (search snippet of Squire page; Squire blocks fetching)
- Apple Pay accepted (BestProsInTown only)
- About 55 services on Squire (snippet); full menu not readable
- Latinx-owned, private parking (BestProsInTown only; not used on page)
- Owner is also an SMP artist (search snippet; not used on page)

### Missing
- Full Squire menu (shaves, color designs, add-ons and their prices)
- Confirmed Saturday closing time
- Years in business / opening date
- Payment methods beyond Apple Pay, cash policy
- Parking details, languages spoken
- Any verbatim review quotes with a clean source (none used)

## Design decisions
- Concept: "The Dream" as a lit shop window at night. Arched gold-leaf window with a crescent moon and a pair of scissors drawn as a star constellation, beside a turning barber pole. Footer is a small shop front under the Sierra at night.
- Palette: warm black + cream + brass, barber-pole red only in decor. No blue/purple, no gradients behind text. All text passes AA (dust #a99c86 is 6.0:1 on the darkest card).
- Type: Young Serif (vintage sign serif) for display, Josefin Sans caps for labels (deco shop-door lettering), Karla for body at 17 to 18 px.
- Section labels carry a tiny moon that waxes section by section; the hero moon and nav mark fill as you scroll.
- The barbers are shown on a felt letter board ("The Chairs"), a real barbershop object, instead of staff cards.
- Services: 4 categories with tabs (All default), every row links to Squire. A dashed note says the full 55-service menu lives on Squire, so the site never narrows their scope.
- Reviews: no quotes. Big 4.8 with Google count linked to Maps, plus a Squire link.
- Booking: every Book button goes to Squire (`BOOKING_URL` in app.js). Contact cards: Call (largest), Text, Directions, Book.
- Photo slots ready: drop `hero.jpg` (shows inside the arch window) and `shop.jpg` (shows on the letter board) into `assets/raw/` and rebuild.

## Photos to request
1. Best straight-on shot of the shop front or window on California Ave (hero, inside the arch)
2. Wide interior shot of the chairs and stations, ideally empty or with backs only (letter board)
3. 6 to 8 close-ups of finished cuts: fades, designs, beard line-ups (gallery later)
4. One photo per barber at their chair, if they want to be pictured (owner approval for each)
5. The barber pole or sign at night, if they have one

## Pitch notes for mk
1. No website anywhere: Google, Yelp, Facebook and directories all point only to Instagram/Facebook/Squire. The Squire booking link is only findable through the Instagram bio. This site puts "Book on Squire" one tap away from Google.
2. Hours are inconsistent online: directories (fed from Google/Yelp) say Saturday 9 to 4, their own Instagram says Tue to Sat 9 to 6. One site they control fixes the source of truth (the demo flags it for them to confirm).
3. Great numbers, scattered: 4.8 on Google (82), 5.0 on Squire (347 per listing), but Yelp sits around 4.3 to 4.5 (28) with complaints about wait times quoted on the phone. A clear walk-in vs. appointment explainer plus Call/Text buttons answers that before the visit. Six barbers by name, kids pricing and the $100 early/late chair are all on one page.

## Open items / owner approvals
- Owner to confirm Saturday hours, Apple Pay, and whether to list shaves and other Squire services with prices.
- Owner approval needed before any photos or barber names go public.
- Publishing: Netlify Drop (app.netlify.com/drop, drag the `dist` folder) or `npx netlify-cli deploy --dir dist --prod` after mk logs in. Not published.

## QA result
- qa.py: 0 fails at 1280x900 and 390x844 (3 full passes). 162 KB.
- Extra checks: All-tab view, phone menu open/close, strip link jumps to Kids and flashes the row: all working, no page errors.
- Self-scores: custom to business 9, premium polish 9, readability 9, mobile 9, ease of contacting/booking 9, faithful to facts 9, clean of never-do list 9.
