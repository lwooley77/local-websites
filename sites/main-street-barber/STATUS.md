# Main Street Barber Shop: demo status

Deliverable: `sites\main-street-barber\dist\index.html` (single file, 201 KB, no external requests).
Rebuild: `python sites\_kit\build.py sites\main-street-barber`  QA: `python sites\_kit\qa.py sites\main-street-barber`

## Lead check
- Not a skip. No website of their own. `mainstreetbarbers.net` belongs to Main Street Barbers in Burlington, VT. Nextdoor and Yahoo Local point to an auto-generated `main-street-barbers-nv.hub.biz` directory page. Fresha has an **unclaimed** listing (no booking). Not closed: Yelp listing "Updated June 2026", Yelp reviews dated 06/2026.

## Fact sheet
### Verified (with source)
- Name: Main Street Barber Shop (Google, Fresha, Birdeye); also "Main Street Barbers" on Facebook, Yelp, Nextdoor.
- Phone (775) 782-8259 (mk lead sheet; Fresha; BestProsInTown; a Nextdoor recommendation quotes it).
- Address: 1428 US Hwy 395 N, Gardnerville, NV 89410 (Fresha, Birdeye, BestProsInTown, Nextdoor, Yahoo Local). US 395 is Main Street through Gardnerville.
- Google: 4.8 stars, 67 reviews (mk lead sheet, https://maps.google.com/?cid=7305285018290689536). Birdeye shows 4.8 / 68.
- Barbers: Dan and Jeff (Facebook/YellowPages snippet "home to Dan and Jeff"; BestProsInTown 2021 review; Google and Yelp reviews).
- Services: men's haircut, beard trim, head shave, hot towel shave (Fresha); face shave, beard and moustache trim (YellowPages snippet); fades (Nextdoor); kids' cuts and buzz cuts (Google reviews).
- Facebook: https://www.facebook.com/mainstreetbarbersnv/
- Quotes used (verbatim, fetched twice each):
  - Alona B., Google, via https://reviews.birdeye.com/main-street-barber-shop-170204645738303
  - Mike P., Google, same Birdeye page
  - Heidi W., Yelp, via https://local.yahoo.com/info-20305500-main-street-barbers-gardnerville/
  - Dan K., Yelp, same Yahoo Local page

### Unverified (used carefully)
- **Hours conflict.** Fresha, BestProsInTown and Nextdoor: Tue-Fri 8-5, Sat 8-12, closed Sun-Mon (used on page). Birdeye and Yahoo Local: Mon-Sat 8-5. A Yelp snippet: Mon-Fri 8-5. Page says "Hours as listed online. Please call ahead to confirm." The live Open/Closed badge uses the 3-source schedule. One line in `src\app.js` (`HOURS`) to change.
- Walk-ins welcome / when possible (YellowPages snippet, BestProsInTown). Shown.
- Credit cards accepted (YellowPages snippet). Shown with "call to double-check" in the FAQ.
- Street parking, kid-friendly, wheelchair accessible (BestProsInTown). Street parking and kids shown; accessibility not shown.
- Other phone numbers on Nextdoor (775-309-4585) and Yahoo (775-309-1942): likely tracking numbers. Not used.
- Nextdoor "Neighborhood Favorite 2023 and 2024": not shown (could not confirm the badge).
- Women's cuts and hair straightening appear only as directory tags. Not listed, but no copy says "men only".

### Missing
- Prices (biggest gap; every row says "Call for price")
- Confirmed hours, especially Monday and Saturday afternoon
- Years in business (reviews imply 20+ years; no opening year found)
- Whether (775) 782-8259 can receive texts (782 is likely a landline; Text card says "If it doesn't go through, give them a call")
- Last names / who owns the shop, any online booking they use

## Design decisions
- Concept: **the shop is on Main Street, and Main Street is US 395.** The brand mark is a green street-name blade "MAIN ST"; the hero is a custom SVG of the street sign post with a US 395 shield and a hanging BARBER shingle, with Highway 395 running through Carson Valley hay fields, round bales, a split-rail fence and a Jobs Peak style ridge. No barber pole, no black-and-brass, no cream-and-red, so it looks nothing like the other barbershop demos.
- Palette: sagebrush mist background, street-sign green, hay gold, road-line yellow. All text WCAG AA (checked).
- Type: Bricolage Grotesque (display), Bebas Neue (highway-sign labels), Work Sans (body). No Karla, Anton, Young Serif or Josefin.
- Section numbers are green mile-marker signs (1 to 6). The price list is styled as a highway guide sign with exit-style arrows; every row taps to call.
- About: SVG of two green barber chairs with DAN and JEFF name plates and a Walk-ins Welcome sign (illustration, not a claim about the interior).
- Reviews: real 4.8 / 67 Google rating linked to Maps, plus 4 verbatim quotes in a swipe carousel with buttons and a counter.
- Hours: today highlighted; simple 395 strip map (north to Minden / Carson City, south to Topaz Lake) and a directions button.
- Ambient: a hawk glides across the hero once, the BARBER shingle sways once on load, desktop has a road center line in the left margin that fills with scroll (set straight from scrollY), footer dusk scene of the shop on Main Street where a pickup drives by once and a hawk crosses. All off under reduced motion.
- No online booking exists, so Book opens a sheet with Call / Text (drag to close, Escape closes). `BOOKING_URL` in `src\app.js` adds a "Book online" button when they have one.
- Privacy note in footer (`#privacy`): no cookies, no tracking, no forms. No cookie banner (no cookies). No refund or T&C page because nothing is sold on the site.
- Photo slot ready: `assets\raw\shop.jpg` shows above the chairs illustration in About automatically.

## Photos to request
1. The storefront and the sign on 395, so people can spot it from the road (hero / Hours & Location)
2. The two chairs and the shop interior (About, `shop` slot)
3. Dan and Jeff at work, with their OK (About)
4. Close-ups of fades, buzz cuts and a hot towel shave, back or side of the head only (Services)
(No client faces and no kids' faces. The owner must approve every photo and the quotes before the site goes public.)

## Pitch notes
1. "Your listings point people to pages that aren't yours." Nextdoor shows a contact email at mainstreetbarbers.net, and that domain is the website of a Main Street Barbers in Burlington, Vermont, with its own prices and hours. Nextdoor and Yahoo list your "website" as an auto-generated hub.biz directory page, and the Fresha page is an unclaimed listing.
2. "Your hours disagree everywhere." Fresha and Nextdoor say Tue-Sat with Saturday until noon and closed Monday; Birdeye and Yahoo say Monday to Saturday 8 to 5. Directories also show two other phone numbers (309-4585, 309-1942). One page with the right hours and the real number fixes that.
3. "4.8 stars from 67 Google reviews and nowhere to show it." Customers say things like "top notch barbers" and "Great Old-Time Barbershop." The demo puts Dan and Jeff, those reviews, one-tap Call and Directions, and a Main Street / US 395 look that only this shop can own on one page.

## QA result
- `qa.py`: PASS (0 fails) on 3 full passes at 1280x900 and 390x844 (launch checklist included: logo link, #privacy, meta description, contrast).
- Extra checks: menu and sheet close with Escape, sheet drag-to-close, nav hides on scroll down, strip links switch tabs and flash the list, no horizontal overflow at 320px, every tap target 44px+, zero page errors.
- Self-scores: custom to business 9, premium polish 9, readability 9, mobile 9, ease of contact/booking 9, faithful to facts 9, never-do list clean 9.

## How to share (mk)
- Netlify Drop: drag the `dist` folder to app.netlify.com/drop. Or `npx netlify-cli deploy --dir dist --prod` after `npx netlify-cli login` once.
