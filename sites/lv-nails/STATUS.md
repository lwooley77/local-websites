# LV Nails (lv-nails) status

## Fact sheet
**Verified (with source)**
- Name "LV Nails", phone (775) 322-9800, address 1155 W 4th St #115, Reno, NV 89503: Fresha listing https://www.fresha.com/lvp/lv-nails-west-4th-street-reno-464Zjx + lead sheet
- Google 4.2 stars, 409 reviews: lead sheet, https://maps.google.com/?cid=9833995311002539361
- Instagram: http://www.instagram.com/lvnailsreno (lead sheet; profile behind login)
- Service categories: Manicure, Gel Nails, Nail Polish, Men's Manicure, Pedicure, Men's Pedicure, Manicure and Pedicure, Acrylic Nails, Dip Powder Nails, Gel Nail Extensions, Nail Extensions, Nail Art (Fresha listing)
- No online booking: the Fresha page is listing-only and says the business is not affiliated with Fresha

**Unverified**
- Hours Mon-Sat 9am-7pm, Sun 10am-5pm (Fresha listing, not owner-confirmed; Wed 9-7 also in a search snippet). Shown as "Hours as listed online".
- Russian manicure (one search snippet only; not on the site)
- Reviewer themes: friendly, kind staff; one called it family owned (not used on the page)

**Missing**
- Prices (site says "Call for price"), walk-in policy, owner/staff names, years open, payment methods, languages, parking, gift cards, online booking link, any verbatim reviews

## Design decisions
- Lacquer red, oxblood ink, blush and cream palette from nail polish itself; gold accent for decor only.
- DM Serif Display (glossy, high contrast, like a polish label) + Outfit labels + Figtree body.
- Hero art: a swatch fan of nail tips beside a red "LV" polish bottle with a slow gloss sheen; fan turns a few degrees with scroll. Footer: a shelf of polish bottles. Nail-tip shapes as bullets, tabs and hours markers. "Shapes to ask about" card (square, round, almond, coffin).
- Book = text the salon (no booking platform). BOOKING_URL is one line in src/app.js.
- No refund or T&C page: nothing is sold on the site. No cookie banner: no cookies.
- Photo slot ready: drop `about-salon.jpg` in assets/raw and rebuild.

## Photos to request
Storefront sign on W 4th St; the pedicure chairs and stations; the polish wall; close-ups of their own sets (acrylic, dip, nail art), hands only; owner or tech at work, faces optional.

## Pitch notes
1. Their only web presence is Instagram, which shows a login wall to anyone not signed in (checked: profile content was not readable). Google shows 409 reviews but sends people nowhere.
2. The Fresha page that shows up for "LV Nails Reno" says the business is not affiliated with Fresha and cannot be booked. Customers searching to book hit a dead end; this site gives a one-tap Call/Text on every screen.
3. Hours online come only from that third-party listing. The site shows a live "Open now" badge and full service menu they can confirm and own; adding prices would answer the most common phone question.

## QA
qa.py exit 0, two full passes (fixes: hidden tab panels showing, mobile hero art placement, footer bottle sizing, map label, button icon fill). 146 KB single file. Owner must approve hours, services and any photos before the site goes public.
