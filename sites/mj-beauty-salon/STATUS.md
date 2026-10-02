# MJ Beauty Salon: demo status

Deliverable: `dist/index.html` (single file, 141 KB). Rebuild with `python sites\_kit\build.py sites\mj-beauty-salon`.
Lead check: no own website found (only directory listings and an unclaimed Fresha page). Not closed. Valid lead.

## Fact sheet

### Verified (with source)
- Name: MJ Beauty Salon (also "M J Beauty Salon"). Lead sheet, bestprosintown.com, yellowpages.com
- Phone: (775) 883-7671. Lead sheet, bestprosintown, 2news.com, fresha.com listing
- Address: 1778 Airport Rd, Ste A, Carson City, NV 89706. 2news.com, thedirectory.com, birdeye
- Google rating: 4.6 stars, 103 reviews. Lead sheet / https://maps.google.com/?cid=2585910318510759158
- Family-owned. Birdeye description + Google review (Ryan P.)
- Booking is by phone only (Fresha page is an unclaimed listing with "Call to book"). https://www.fresha.com/lvp/mj-beauty-salon-airport-road-carson-city-X4wVwM
- Review quotes used (verbatim, Google reviews as shown on third-party sites):
  - "This place is the best!" Annette H. https://reviews.birdeye.com/mj-beauty-salon-170182700038378
  - "Family owned awesome business!" Ryan P. (same Birdeye page)
  - "Nice haircut low price" Lior S. (Jan 2018) https://manereviews.com/biz/8801066-mj-beauty-salon-carson-city-nevada

### Unverified (used on page, needs owner OK)
- Owners "MJ and Carol", a mother-daughter team. bestprosintown + chamberofcommerce.com snippet
- "Over 40 years of experience" (shown as "40+" sticker). Same sources
- "Often in and out in under 20 minutes". Same sources
- Hours: Tue to Fri 9 AM to 4 PM, Sun and Mon closed, Saturday "Call to check". Listings disagree: Birdeye and BestPros say Tue-Fri 9-4 only; other snippets add Sat 9-12 or Sat 7-12, one says 7 AM opening, 2news says Mon-Fri 7-5 + Sat 7-2, Fresha says Thu-Fri only. Page shows the most-cited version with "call to confirm" everywhere. No live open/closed badge until confirmed (flip `HOURS_CONFIRMED` in app.js).
- Services beyond men's cuts: women's cuts, beard trims, hair color, shampoo & set, balayage, permanent straightening, extensions, manicure, pedicure, fill-ins, polish change. These come from directory listings (Fresha auto listing, Chamber snippet, 2news). Confirm the real menu with the owner.

### Missing
- Prices (2news shows an old "$8 haircut" tag; not used). Page says "Call for price".
- Confirmed hours, especially Saturday.
- Whether (775) 883-7671 can receive texts (it may be a landline). The Text buttons use `sms:`.
- Payment methods, walk-in policy (one snippet says walk-ins welcome, unconfirmed), Facebook page (BestPros mentions one, none found).
- Year opened.

## Design decisions
- Feel: a classic hometown beauty shop on Airport Road. Retro 70s salon: cherry-red vinyl chair, bonnet hood dryer, mint walls, checkerboard floor, striped awning.
- Type: Young Serif (painted-sign display), Josefin Sans (signage labels), Karla (body).
- Palette: cream #F6EFE3, espresso #2A1E1A, cherry #A8233A, mint #8CC3B0 / deep mint #2C6658. All text AA.
- Art: all custom inline SVG (hood-dryer chair in an arched mirror, rollers, comb, shears, hand mirror, storefront footer scene with Sierra foothills). No photos needed.
- Ambient: a little prop plane (nod to Airport Road) tows an "MJ BEAUTY" banner across the hero art once; three sparkles twinkle slowly. Off under reduced motion.
- Booking: `BOOKING_URL` is empty, so every Book button calls the salon.
- Photo-ready: drop `salon.jpg` into `assets/raw/` and rebuild; the About section shows it automatically.

## Photos to request
1. The salon chairs and stations (no clients' faces), ideally with any vintage dryer chairs
2. The storefront and sign on Airport Rd
3. MJ and Carol together (only with their OK)
4. A few fresh men's cuts / beard trims from behind or the side
5. A nail set or color result

## Pitch notes for mk
1. Right now Google is all they have: no website, no Facebook page found, and directory sites list five different sets of hours (Birdeye says Tue-Fri 9-4, 2news says Mon-Fri 7-5 plus Sat 7-2, Fresha says Thu-Fri only). Customers are guessing. One site with the right hours fixes that.
2. Their Fresha page is unclaimed and only lists hair services, and Yelp files them under "Nail Salons". New customers don't know they do quick men's cuts, women's cuts, beard trims and nails all in one place. This site shows the full menu.
3. 4.6 stars from 103 Google reviews and regulars of 25 years is a great story nobody can find. The site puts the rating and real quotes up front with a one-tap Call button on every screen, which suits their phone-only booking.

## QA result
- `python sites\_kit\qa.py sites\mj-beauty-salon`: exit 0, zero fails at 1280x900 and 390x844 (4 passes run).
- Fixed during QA: grid min-width overflow that widened the mobile layout (menu close was off-screen), plane crossing the headline (now confined to the hero art), oversized/under-sized decor icons, footer hills not reaching the edge, FAQ gap on phones, heading orphans (text-wrap: balance).
- Self-scores: custom 9, polish 9, readability 9, mobile 9, contact/booking ease 9, faithful to facts 9, never-do clean 9.

## Open items for mk
- Owner must confirm: hours, service menu, "MJ and Carol" and "40+ years", and whether the number takes texts.
- If they want online booking later, put the link in `BOOKING_URL` (src/app.js) and rebuild.
- Sharing: Netlify Drop at app.netlify.com/drop (drag the `dist` folder). mk does this; nothing has been published.
