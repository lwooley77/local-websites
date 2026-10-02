# Salon 2000 (Sparks, NV): demo status

Deliverable: `dist/index.html` (195 KB, single file, no external requests). Build: `python sites\_kit\build.py sites\salon-2000`. QA: `python sites\_kit\qa.py sites\salon-2000` (passes, 0 fails, desktop + mobile).

## Lead check
Verified lead. Listings (Yelp, chamber, Fresha, Facebook) point to **salon2000nv.com**, which now shows a parked "This domain may be for sale" page (fetched 2026-10-02). No working site, not closed.

## Fact sheet
### Verified (with source)
- Name: Salon 2000 (Facebook styles it SALON2000nv). facebook.com/SALON2000nv, nextdoor.com/pages/salon-2000-1
- Phone (775) 351-2222. Lead sheet, Nextdoor, LocalStylist
- Address 1450 E Prater Way, Sparks, NV 89434; in Hacienda Plaza at Sparks Blvd and E Prater Way since May 1999. Nextdoor, BestProsInTown, chamber/YP listing text (search snippet)
- Owner: Rhonda Clark, Owner/Hairstylist since April 1999. LinkedIn (snippet), WeddingWire
- Team first names (holiday post, Dec 24 2025): Rhonda, Carla, Kay, Tammy, Carina, Jenn, Bertha, Delores, Katie, Sheryl, Maxine. Facebook mirror (beautynailhairsalons.com)
- Katie Darby, nail technician, nail art (Facebook post Dec 2025)
- Casey, certified APRN Nurse Practitioner, Botox injector; Botox parties (Facebook post May 15 2026)
- Services: hair, nails, skin care, waxing, spa treatments (LocalStylist); color, curly hair, kids' hair, perms (BestProsInTown); braids (Facebook review); manicures, pedicures, makeup, waxing brows/legs/bikini, bridal (WeddingWire, Fresha)
- Tagline in their words: "We make you feel comfortable as well as BeYouTiFul!" (Nextdoor)
- Nextdoor Neighborhood Favorite 2019 to 2025 (Nextdoor)
- Google 4.6 stars, 73 reviews (lead sheet)
- Review quotes used: Robin H., Laura B., Shelby T., all Facebook, verbatim via reviews.birdeye.com/salon-2000-149498987950805 (6 to 8 years old)
- Booking is by phone (Fresha lists them but says not affiliated)
- Hours, Tuesday to Friday 9 AM to 6 PM, Sunday closed, Monday opens 9 AM: all sources agree

### Unverified (medium confidence, used carefully)
- Dermalogica products, credit cards accepted, women-owned, wheelchair accessible (BestProsInTown attributes; only Dermalogica and cards appear on the page)
- Email SALON2000nv@gmail.com (Nextdoor; in JSON-LD only)
- Waxing areas (brows, legs, bikini) come from an older WeddingWire listing

### Missing
- **Monday closing time and Saturday hours**: five sources disagree (Mon close 3/4/5/6 PM; Sat 8-2, 8-3, 9-4, 9-5, 9-6). Page says "Opens 9 AM, call for close" and "Morning hours, call". Get the real hours from Rhonda.
- **All prices** (none published anywhere). Every row says "Call for price".
- Suite number (Ste 112 vs #107 in different listings; left off)
- Walk-in policy, roles for most team members, which services each person does
- Instagram (none found)

## Design decisions
- Concept: the name is the year. "Salon" over a giant 2000 where the three zeros are rings holding shears, a polish bottle and a leaf (hair / nails / skin), with a thin orbit line and a tiny tangerine "satellite". Turn-of-the-millennium futurism done flat: no chrome, no gradients, no purple.
- Palette: cool silver-cream paper, graphite bands, one tangerine accent (#B23C0C, AA on paper; white on it 5.9:1), apricot accent on dark.
- Type: Unbounded (display; wide round numerals made for "2000"), Outfit caps labels, Manrope body at 17px. None used by sibling demos.
- Ambient: split-flap tiles settle on "1999" once, orbit rings turn a few degrees with scroll, a sparkle glints off the last ring every 9 s while the hero is visible. All off under reduced motion.
- "Since 1999" card counts years live (27 now). Team shown as name pills from their own holiday card.
- Hours: only verified windows drive the live badge ("Open now until 6 PM" Tue to Fri; "Open now, call for close" on Mon 9-3 and Sat 9-2, the windows every source agrees on). Otherwise "Call for today's hours".
- Footer scene: the plaza storefront with the lit salon window, a SPARKS BLVD / E PRATER WAY corner sign, the brand ring as a planet over the hills.
- Booking: `BOOKING_URL` in app.js is empty, so every Book button calls. Set it if they adopt Square/Vagaro.
- Photo slots ready: `assets/raw/hero.jpg` and `assets/raw/salon.jpg` render automatically on rebuild.
- No refund/T&C page: nothing is sold on the site. Privacy note in footer (#privacy): no cookies, tracking or forms.

## Photos to request
1. Storefront and sign in Hacienda Plaza (hero)
2. The salon floor: stations, mirrors, the chairs (about)
3. Rhonda at her chair, and a team photo if everyone agrees (about)
4. Close-ups of Katie's nail art (nails panel)
5. Color and braid work from behind or side, no client faces
Owner must approve photos and quotes before the site goes public.

## Pitch notes (for mk's walk-in)
1. Their listed website is dead: Yelp, Fresha and the chamber listing send people to salon2000nv.com, which shows "This domain may be for sale". Every customer who clicks it hits a parking page. This demo can go on that exact domain if they buy it back.
2. Their hours are wrong somewhere: five directories show five different Monday/Saturday schedules. One site they control fixes that, and the badge shows "Open now" live.
3. They now offer Botox with an APRN (May 2026) and a nail artist, but none of the directories list it; only Facebook does. The site puts hair, nails, skin, makeup and Botox in one menu, with the seven-year Neighborhood Favorite run and their own "BeYouTiFul" line.

## QA result
- qa.py: 0 fails at 1280x900 and 390x844 (overflow, contrast, a11y names, anchors, privacy, logo, meta, no third-party requests, no cookies).
- Manual checks: menu opens/closes and Escape closes it; tabs switch; strip links jump to the right tab and highlight it; FAQ toggles; split-flap ends on 1999; partial 5th star for 4.6.
- Screenshots in qa/shots read at both widths: three passes, fixes for footer padding, scene crop on phones, team card contrast, star rating, strip separators.

## Open items for mk
- Ask Rhonda for real Monday/Saturday hours and a few prices, then update `src/body.html` hours list and `app.js` badge.
- Owner approval of the three Facebook quotes and any photos before publishing.
- Sharing: Netlify Drop (app.netlify.com/drop) with the `dist` folder, or `npx netlify-cli deploy --dir dist --prod` after `npx netlify-cli login`.
