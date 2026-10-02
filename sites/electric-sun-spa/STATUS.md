# Electric Sun (Fernley, NV) : demo status

Deliverable: `dist/index.html` (170 KB, single file, no photos needed). Built with `python sites\_kit\build.py sites\electric-sun-spa`.

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
- Photo slots ready: `assets/raw/hero.jpg`, `salon.jpg`, `storefront.jpg` render automatically after a rebuild.

## Photos to request
1. The yellow building from the street (storefront slot)
2. The salon floor or tanning rooms with no clients (salon slot)
3. Close-ups of their own work: nail sets, lash sets, a balayage (hero slot or a later gallery)
4. The boutique wall (jewelry, handbags)

## Pitch notes for mk
1. **Their website now sends people to a gambling site.** electricsunnv.com (still listed on Vagaro, Nextdoor and in Google results) 301-redirects to sattamatkaresult.org, and old deep links show a "DEMO version" scraper page. Anyone who clicks "Website" from Google or Vagaro lands there. Checked 2026-10-01.
2. **They already have the hard parts:** a live Vagaro menu with 140+ priced services and 141 reviews averaging 4.9. This demo puts that menu, the reviews and one-tap booking on a page that is theirs and works well on a phone.
3. **They're a full salon, not just tanning.** Google lists them as a salon and many people know them for tanning. The site shows hair, color, nails, lashes, HydraFacial, massage and whitening in one place, and gives "the yellow building on Main Street" a recognizable look.

## Booking
Booking already works through Vagaro (`BOOKING_URL` in `src/app.js`). Nothing for mk to set up. If they move platforms, change that one line.

## QA result
- `python sites\_kit\qa.py sites\electric-sun-spa`: exit 0 on pass 1 and pass 2 (desktop 1280 and mobile 390): no overflow, ellipsis, em dashes, banned phrases, or dead links. Menu, FAQ and tabs all work.
- I reviewed every screenshot. Pass-1 fixes: hero art overlapping the label on mobile, desktop tabs clipped, star colour, empty desktop columns (made About/FAQ sticky, added a location card), contact cards too tall on mobile, day-arc sun covering the time label, footer scene cropped on mobile, preview bar shortened to "Preview for Electric Sun" on phones.
- Self-scores: custom 9, polish 9, readability 9, mobile 9, contact/booking 9, faithful to facts 9, never-do list 9.

## How to share
Netlify Drop (app.netlify.com/drop) with the `dist` folder, or `npx netlify-cli deploy --dir dist --prod` after mk runs `npx netlify-cli login` once. Don't publish until the owner approves.
