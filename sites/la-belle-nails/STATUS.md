# La Belle Nails: STATUS

## Fact sheet
**Verified**
- Name: La Belle Nails (lead sheet, Fresha Reno listing snippet)
- Phone: (775) 787-8885 (lead sheet, Fresha listing snippet)
- Google: 4.4 stars, 212 reviews (lead sheet), https://maps.google.com/?cid=3384486869276807310
- Instagram: https://www.instagram.com/labellereno (lead sheet)
- No own website found (3 searches)

**Unverified (search snippet only, confirm with owner)**
- Address: 6275 Sharlands Ave #8, Reno, NV 89523 (Fresha Reno listing snippet; matches phone)
- Services: manicures, gel nails, pedicures, nail art (Fresha category listings)

**Missing**
- Hours (site says "Call for today's hours"; no open/closed badge)
- Prices (every row says "Call for pricing")
- Full service list (acrylic, dip, waxing, etc. not confirmed), walk-in policy, booking platform, owner/staff names, years open, payment, languages

## Design decisions
- Parisian salon front for "La Belle": sage and ivory striped awning with scallops, arched window, pine/ivory/peach/clay palette. Deliberately unlike LV Nails (red/burgundy, polish bottle).
- Hero art: five almond nails with French tips fanned in an arched window; fan opens slightly with scrollY. One glint on load.
- Services shown as an arched bistro-style menu card with dotted leaders, no tabs (only one short category list known).
- Fonts: Young Serif (display), Josefin Sans (labels), Karla (body).
- Footer: foothills with a tiny awning storefront.
- Book = text message (no booking platform found). Change `BOOKING_URL` in src/app.js.
- No cookies, tracking or forms. No refund or T&C page, because nothing is sold on the site.

## Photos to request
Storefront and awning/signage, interior stations and pedicure chairs, close-ups of their own nail sets (no faces), polish wall. Slot ready: `assets/raw/about-salon.jpg`.

## Pitch notes
1. Their only web presence is Instagram (@labellereno): a search for the salon turns up directory pages for other salons, not them. Phone, address and hours are hard to find.
2. 4.4 stars from 212 Google reviews is strong; this site links straight to those reviews and puts Call/Text one tap away on every screen.
3. No hours or prices are posted anywhere online; a site with their real menu and hours answers the two questions callers ask most.

## QA
qa.py exit 0, 0 fails, 2+ passes, 124 KB. Mobile (390px) and desktop screenshots reviewed; fixed fan sizing, phone-number wraps, translucent nav bleed, tiny mobile footer scene.
Owner must approve photos and quotes before the site goes public.
