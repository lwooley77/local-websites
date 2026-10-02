# Electric Sun (Fernley, NV) : demo status

Deliverable: `dist/index.html` (about 1.1 MB, single file, 8 real photos embedded). Built with `python sites\_kit\build.py sites\electric-sun-spa`.

## Fact sheet
### Verified (source)
- Name "Electric Sun" (Vagaro; Facebook page "The Electric Sun Day Spa, Salon, and Tanning"): https://www.vagaro.com/electricsun1
- Phone (775) 575-1070 (lead sheet, Vagaro, Fresha)
- 480 E Main St, Suite 210, Fernley NV 89408, "the beautiful yellow building" (Vagaro description)
- Hours: Mon 9-5, Tue-Thu 9-7, Fri-Sat 9-5, Sun closed (Vagaro, Fresha, archived old site). Technicians keep their own schedules.
- Since 2003, full salon and day spa since 2007 (Vagaro description)
- Owner Shannon Ceresola (Vagaro staff page). Current staff on Vagaro: Charley, Kirsten, Tiffanie, Haylee, Jenna, Franklin, McKinsey, Jocelyn
- Full service menu and prices: Vagaro services, captured 2026-10-01 (all 7 tabs on the page come from this)
- Booking: Vagaro online booking (Book buttons go there)
- Walk-ins accepted; Visa/MC/Discover/debit/cash/check; free parking, WiFi, beer and wine, disabled access, kid friendly (Vagaro)
- 24-hour cancellation policy, lash prep, wax prep, free nail repair within a week (Vagaro service text)
- Ratings: Google 4.6 / 126 (lead sheet), Vagaro 4.9 / 141 (https://www.vagaro.com/electricsun1/reviews)
- 4 quotes, verbatim from Vagaro reviews: Justine E. (Feb 2026), Brooklyn C. (May 2024), Debbie B. (Feb 2025), Hannah W. (Jan 2026; trailing emoji dropped)
- Brands: Pureology, Nicolas, Designer Skin, Lira Clinical; boutique clothing, handbags, jewelry, gifts

### Unverified (not on the page)
- APRN medical aesthetics (Botox, Juvederm, B-12, DermaSweep): only in old directory snippets
- Nextdoor "Neighborhood Favorite" 2023-2025 (fetch summary only)
- Instagram @electricsunnv (search snippet, about 181 followers)
- Whether (775) 575-1070 accepts texts (Text buttons use it)
- Custom group days (bridal/birthday/girls' day) come from the 2024 site; the page says "call to plan it"

### Missing
- Tanning bed session prices and packages (page says "Call")
- Whether the stand-up tanning booth is still in use
- Staff roles and specialties (only inferred from reviews, so not listed on the page)

### Needs owner approval
- Use of the four client quotes and staff first names in them
- Any photos before going public

## Design decisions
- Concept: "The Electric Sun" = a sun disc with alternating straight and zig-zag (electric) rays, with Fernley hills and their yellow Main Street building inside it. The yellow building comes back in About and in the footer dusk scene.
- Warm cream, sand and butter surfaces, espresso ink, sun yellow fills, burnt-orange accent. No blue or purple, no gradient text.
- Type: Young Serif (display, 70s sign-painter warmth), Josefin Sans (labels), Figtree (body 17px).
- 7 service tabs (Hair, Nails, Lashes & Brows, Skin Care, Waxing, Massage, Tanning & Whitening). Every row opens Vagaro; tanning beds row calls.
- Live open/closed badge plus a "day arc" where the sun sits at the current time between open and close (America/Los_Angeles).
- Ambient touches: slow ray rotation (turns with scroll, off under reduced motion), service marquee that pauses on hover, footer dusk scene.
- Real photos (8) are in the hero arch (over the sun illustration), a "A look around" gallery with lightbox (swipe, arrow keys, captions, counter, Escape, focus return), About (pedicure lounge) and the Hair, Nails and Tanning service panels. The illustrated yellow building stays in the hero, About and footer because no storefront photo exists on their own pages.

## Photos used (8, all from Electric Sun's own pages; none show client faces or children)
Files are in `assets/raw/`, details in `research/photos.json`. Source for seven: Electric Sun's own old site electricsunnv.com (Wix files, archived Jun 2024, still served by Wix); one from their Vagaro gallery.
1. `hero-sun-wall.jpg`: metal sun sculpture on the salon wall (hero, gallery). Home page of electricsunnv.com. Only the sculpture's glass face shows; a blurred, unidentifiable shape sits in the background mirror.
2. `about-pedicure-lounge.jpg`: pedicure lounge (About, gallery). electricsunnv.com home/about.
3. `tanning-bed.jpg`: inside a tanning bed (Tanning panel, gallery). electricsunnv.com home.
4. `work-highlights.jpg`: highlights on long hair from behind (Hair panel, gallery). Crop of the photo on https://www.vagaro.com/electricsun1/photos.
5. `work-nail-shaping.jpg`: hands, nail shaping (Nails panel, gallery). electricsunnv.com home.
6. `boutique-floor.jpg`: boutique clothing and handbags (gallery). electricsunnv.com home.
7. `boutique-jewelry.jpg`: jewelry display (gallery). electricsunnv.com contact page.
8. `hair-shampoo-bowl.jpg`: shampoo bowl (gallery). electricsunnv.com services page.
Note: the hair photo shows a client's hair and pink top from behind (not identifiable); drop it if the owner prefers.

**Owner must approve photos and quotes before the site goes public.**

Still worth requesting: a street shot of the yellow building, lash and nail sets, and a skin or massage room, so those tabs get photos too.
## Pitch notes for mk
1. **Their website now sends people to a gambling site.** electricsunnv.com (still listed on Vagaro, Nextdoor and in Google results) 301-redirects to sattamatkaresult.org, and old deep links show a "DEMO version" scraper page. Anyone who clicks "Website" from Google or Vagaro lands there. Checked 2026-10-01.
2. **They already have the hard parts:** a live Vagaro menu with 140+ priced services and 141 reviews averaging 4.9. This demo puts that menu, the reviews and one-tap booking on a page that is theirs and works well on a phone.
3. **They're a full salon, not just tanning.** Google lists them as a salon and many people know them for tanning. The site shows hair, color, nails, lashes, HydraFacial, massage and whitening in one place, and gives "the yellow building on Main Street" a recognizable look.

## Booking
Booking already works through Vagaro (`BOOKING_URL` in `src/app.js`). Nothing for mk to set up. If they move platforms, change that one line.

## Launch checklist
- Privacy note (`#privacy`, footer link): no cookies, no tracking, no forms; calls and texts go straight to the business; booking goes to Vagaro under its own privacy policy. No cookie banner and no refund or T&C page, because nothing is sold on the site.

## QA result
- Photo pass: `python sites\_kit\qa.py sites\electric-sun-spa` exit 0 after adding photos, logo data-qa, #privacy and a shorter meta description. Checked mobile-00..03, gallery, lightbox (open, arrows, Escape, focus return) and the three photo panels on mobile and desktop.
- `python sites\_kit\qa.py sites\electric-sun-spa`: exit 0 on pass 1 and pass 2 (desktop 1280 and mobile 390): no overflow, ellipsis, em dashes, banned phrases, or dead links. Menu, FAQ and tabs all work.
- I reviewed every screenshot. Pass-1 fixes: hero art overlapping the label on mobile, desktop tabs clipped, star colour, empty desktop columns (made About/FAQ sticky, added a location card), contact cards too tall on mobile, day-arc sun covering the time label, footer scene cropped on mobile, preview bar shortened to "Preview for Electric Sun" on phones.
- Self-scores: custom 9, polish 9, readability 9, mobile 9, contact/booking 9, faithful to facts 9, never-do list 9.

## How to share
Netlify Drop (app.netlify.com/drop) with the `dist` folder, or `npx netlify-cli deploy --dir dist --prod` after mk runs `npx netlify-cli login` once. Don't publish until the owner approves.
