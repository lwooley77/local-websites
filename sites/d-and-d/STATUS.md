# D & D Barbers: demo status

Deliverable: `dist/index.html` (179 KB, one file, no external requests). Built 2026-10-02.
Lead check: this is a real lead. The lead sheet said "salon", but every source lists it as a barbershop, D & D Barbers at 3024 Kietzke Ln. It has no website of its own. It shows up only on Facebook, Yelp, Birdeye, an unclaimed Fresha page and directory sites. Birdeye shows Google reviews from the last month, so the shop is open.

## Fact sheet

### Verified (with source)
- Name: D & D Barbers (Facebook facebook.com/DandDBarbers, Yelp, 2news marketplace). Google uses just "D & D". Birdeye and barbershops.net say "D & D Barber Shop".
- Phone: (775) 825-1582. Sources: lead sheet, BestProsInTown https://www.bestprosintown.com/nv/reno/d-and-d-barber-shop-/, Barberhead https://barberhead.com/reno/d-and-d-barber-shop, barbershops.net
- Address: 3024 Kietzke Ln, Reno, NV 89502. Sources: Yelp, Birdeye, Fresha, BestProsInTown, barbershops.net
- Hours: Tue to Fri 7:00 AM to 3:30 PM, Sat 7:00 AM to 12:30 PM, closed Sun and Mon. Five sources agree: Birdeye https://reviews.birdeye.com/d-d-barber-shop-170189794922015, BestProsInTown, Barberhead, Fresha https://www.fresha.com/lvp/d-d-kietzke-lane-reno-a2W345, 2news.
- Walk-ins welcome. Sources: BestProsInTown amenities, barbershops.net, Yelp snippet
- Google rating: 4.6 from 98 reviews (lead sheet). Linked to https://maps.google.com/?cid=1744723605350550926
- Review quotes (Google reviews shown on Birdeye): Cody L., Carol B., John L. John's is the last sentence of a longer review and is marked with an ellipsis.
- Services: men's haircut, beard trim, head shave, hot towel shave (Fresha); fades and line-ups (barbershops.net); razor shaves with heated lather (BestProsInTown); "clipper haircuts & shaves" (2news). A mid skin fade is named in a Google review.

### Unverified (used on the page, confirm with the owner)
- Private lot parking and wheelchair access. Source: BestProsInTown amenities, which look like Yelp's. The page says "listed as wheelchair accessible".
- "On every type of hair" in the About text. Source: a Google review on Birdeye ("excellent fades on all types of hair").

### Unverified (not on the page)
- Year opened: a Yelp snippet says established 2003 ("23 years in business"), but D&B says 2008.
- Staff: an undated listing says 4 barbers with 30+ years of experience and 3 on staff at all times. Reviews name Cody, Melanie, Josh and AJ. AJ only appears inside a real quote.
- An old 2news listing says the shop is smoke-free.

### Missing
- Prices. None anywhere online. BestProsInTown only calls the price range "below average". The page says "Call for price".
- Payment methods
- Whether (775) 825-1582 takes texts. The 825 prefix suggests a landline, but the Text buttons assume it can.
- Owner name, languages, holiday hours, whether they cut kids' or women's hair

## Design decisions
- The idea is "the early shift". The shop opens at 7 AM and is done by 3:30, so it's a before-work shop. The clock and the time card carry the whole design.
- Dark bottle green (old barber chair vinyl) with a manila time card color and a sunrise orange. No red, white and blue pole palette, and nothing like the light paper look of Cutz Unlimited.
- Archivo Black for display (heavy, painted-sign weight, big orange ampersand), Oswald for labels (time-card print), Libre Franklin for body text. None of the sibling demos use these fonts.
- Hero art: a live shop clock with hands set to the real time in Reno and today's open hours shaded on the dial. On closed days it shades the next open day. A manila time card "No. 3024" (the street number) sits behind it.
- Hours are a punched time card with IN and OUT columns. Today's row is printed in red and gets a "TODAY" stamp when it scrolls into view.
- Footer scene: the Kietzke Lane storefront with a pole, a pickup in the lot and the Virginia Range behind it. The sun rises as you scroll into the footer. The windows and the OPEN card light up only during real hours.
- Services come in 2 categories (Haircuts, Shaves & Beard), so they sit side by side with no tabs (the brief asks for tabs only with 3 or more). Every row is a tap-to-call link.
- Book = a call/text sheet with drag to close. `BOOKING_URL` in `src/app.js` switches every Book button to an online booking link.
- Photo slots: `assets/raw/hero.jpg` (appears under the hero) and `assets/raw/shop.jpg` (under the About art). Rebuild after adding them.

## Photos to request
1. The storefront and sign on Kietzke Lane, ideally in early morning light
2. Finished fades and skin fades from the back and side, with no faces (`hero.jpg`)
3. The inside of the shop: the chairs, the stations and the wall clock if there is one (`shop.jpg`)
4. A hot towel shave or razor work in progress, with no client faces
5. Portraits of the barbers, only if they want to be on the site
The owner must approve all photos before anything goes public.

## Pitch notes
1. Search "D & D Barbers Reno" and nothing belongs to the shop. The top results are Yelp, an unclaimed Fresha page that says it isn't affiliated, and directory sites. The 2news marketplace listing even links "D & D Barbers" to townbarbers.com, a competitor's website (The Town Barbers, 500 Apple St). One site he controls fixes that.
2. The early hours are the selling point (open at 7, five days a week), but reviewers complain about the short hours and having no way to book. The demo puts the hours front and center with a live "open now" clock, and every screen has one-tap Call.
3. 4.6 stars from 98 Google reviews and a loyal walk-in crowd, but no prices anywhere online. Adding a price list later is a quick edit, and an online booking link is a one-line change if he ever wants one.

## Open items for mk
- Confirm prices, payment methods, whether the number takes texts (if not, remove the Text buttons), parking and accessibility. Then edit `src/body.html` and rebuild with `python sites\_kit\build.py sites\d-and-d`.
- To share it: Netlify Drop at app.netlify.com/drop (drag the `dist` folder in).

## QA result
- `python sites\_kit\qa.py sites\d-and-d` exits 0 at 1280x900 and 390x844. Two full passes, and every screenshot was reviewed.
- Extra Playwright checks with the clock mocked: on Monday 9 AM the badge reads "Opens Tue 7", the dial shades Tuesday and says "Closed today". On Saturday 11:15 AM it reads "Open to 12:30" and the dial shades 7 to 12:30. The phone menu opens and closes, the Book sheet opens and closes by drag, and there are no page errors.
- Fixed during QA: the `hidden` menu and the desktop call button blocked taps (display rules overrode `hidden`), the clock's day label ran into the numerals, the About lead text styled the eyebrow, the big Call card's number rendered small, the footer name was small, the sun was off-screen on phones, the desktop FAQ left a wide empty column, and the preview bar now reads "Preview for D & D Barbers" on phones with no truncation.
- Self-scores: custom 9, polish 9, readability 9, mobile 9, contact/booking ease 10, faithful to facts 9, never-do list clean 9.
