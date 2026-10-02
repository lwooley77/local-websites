# Cutz Unlimited: demo status

Deliverable: `dist/index.html` (157 KB, single file, no external requests). Built 2026-10-02.
Lead check: no website of its own. It shows up only on Yelp, Instagram, a Fresha listing page (which says it is not affiliated with the business), an unclaimed cgmimm listing and some directories. Yelp was updated Sept 2026, so the shop is active.

## Fact sheet

### Verified (with source)
- Name: Cutz Unlimited (Fresha and the lead sheet also write it as one word, "CutzUnlimited"). Sources: Yelp, Fresha https://www.fresha.com/lvp/cutzunlimited-south-virginia-street-reno-Noq32v
- Phone: (775) 842-6345. Sources: Instagram bio https://www.instagram.com/cutz_unlimited/, Yahoo Local, Giftly, BestProsInTown
- Address: 4938 S Virginia St, Reno, NV 89502. Sources: Yelp, Fresha, Yahoo Local, Birdeye, BestProsInTown
- Owner: Christian Shaeffer, "Owner and stylist of Cutz Unlimited. Specializing in men's haircuts." Source: Instagram bio
- Services: men's haircut, beard trim, head shave, hot towel shave (Fresha); fades, skin fades and scissor cutting (Yahoo/Yelp); styling and blowouts (Yelp categories)
- Google rating: 4.6 from 137 reviews (lead sheet). Linked to https://maps.google.com/?cid=6999421632732897131
- Review quotes (Google, shown verbatim on Birdeye https://reviews.birdeye.com/cutz-unlimited-170229726569420): Lance M., Michael S., Tami B., Brian S.

### Unverified (used on the page, confirm with the owner)
- Hours: Mon to Fri 10 to 6, Sat 9 to 5, Sun closed. Four listings agree (Fresha, Yahoo, BestProsInTown, Giftly). Birdeye says Mon to Fri 9 to 6 with Saturday closed.
- Stylists Kirti and Jen (Jennifer Bruno). Both are named in Google reviews from the last 1 to 3 months. A "Mark" appears in one older Yelp review and is left off the page.
- Kids' and women's cuts are offered. Reviews mention kids' cuts and a woman's a-line cut.
- Appointment only, with walk-ins usually waiting. Source: Yelp Q&A snippet.
- Taper as a menu item. Source: Giftly description ("classic tapers and modern fades").

### Missing
- Prices. A Yelp Q&A answer says "around $20" for a men's cut with a wash and a hot towel, but its age is unknown, so the page says "Call" instead.
- Year opened or years in business
- Payment methods (one listing says credit cards, low confidence)
- Whether the number accepts texts. Every Text button assumes it does.
- Parking, languages, holiday hours
- Eyebrow threading. It appears only in a search snippet and is not on the page.

## Design decisions
- Light "paper and ink" look with barber pole red and flat steel blue. It avoids the usual black and gold barbershop template.
- Anton for display (tall shop-sign lettering), IBM Plex Mono for labels (ruler and guard-size feel), Karla for body text.
- Hero art "Fig. 1, The fade": bars that thin from #4 down to skin next to a guard ruler. This makes the shop's specialty the visual idea. Beside it is a barber pole whose stripes move with scroll position, not on a loop.
- Services strip in the shop's own words. Each item jumps to its category and flashes it.
- Services & Prices has 3 tabs (Haircuts, Beard & Shave, Styling). Every row is a tap-to-call link, and the price column says "Call".
- About uses a "chairs" list (Christian, Kirti, Jen) so callers can ask for someone by name.
- Footer scene: the storefront at night under a Sierra ridge. The OPEN sign and the warm window light come on only during real opening hours (America/Los_Angeles).
- Book = a call/text sheet with drag to close. `BOOKING_URL` in app.js switches every Book button to an online booking link.
- Photo slots: `assets/raw/hero.jpg` replaces the fade art and `assets/raw/christian.jpg` appears above the stylist list. Rebuild after adding them.

## Photos to request
1. Close-up photos of finished fades and skin fades: back and side views, no faces (for the hero slot `hero.jpg`)
2. A portrait of Christian at his chair (`christian.jpg`), with his approval
3. The storefront and sign on S Virginia St
4. The inside of the shop: chairs, mirrors, the station
5. A beard trim or hot towel shave in progress, without client faces
The owner must approve all photos before anything goes public.

## Pitch notes
1. Search "Cutz Unlimited Reno" and the top results are Yelp, an unaffiliated Fresha page and directory sites. Nothing is his. Birdeye even lists different hours (Saturday closed) than his other listings. One site he controls fixes that.
2. His Google rating is strong (4.6 from 137 reviews) and reviewers ask for stylists by name (Kirti, Jen, Christian), but nowhere online can a new customer see the menu, the team or "call ahead". The demo puts all of that one tap from a call.
3. The Instagram (@cutz_unlimited) was last active around Aug 2024 and has no link in the bio. This page could go in that link, and adding prices and a booking link later is a one-line change.

## Open items for mk
- Confirm prices, hours, stylist names and whether the number takes texts. Then update `src/body.html` and rebuild with `python sites\_kit\build.py sites\cutz-unlimited`.
- If he wants online booking (Booksy, Square or Cal.com), mk sets up the account and pastes the link into `BOOKING_URL` in `src/app.js`.
- To share it: Netlify Drop at app.netlify.com/drop (drag the `dist` folder in).

## QA result
- `python sites\_kit\qa.py sites\cutz-unlimited` exits 0 at 1280x900 and 390x844. Three full passes, and every screenshot was reviewed.
- Extra checks with the clock set to Saturday 11 AM Los Angeles time: the badge reads "Open to 5 PM", today's row is highlighted, the footer sign lights up, the Book sheet opens and closes by drag, a strip item selects its tab, the FAQ answer expands. No page errors.
- Fixed during QA: FAQ answers didn't open (bad sibling selector), the reviews grid layout was off on desktop, the phone number wrapped, the heading had an orphan word, the address wrapped to 3 lines in a card, the moon and stars were cropped on desktop.
- Self-scores: custom 9, polish 9, readability 9, mobile 9, contact/booking ease 10, faithful to facts 9, never-do list clean 9.
