# Hollywood Nails demo: STATUS

## Fact sheet
Verified (source):
- Name, phone (775) 825-1877: lead sheet + Fresha directory (https://www.fresha.com/lp/en/bt/nail-salons/in/us-reno)
- Address 4930 S Virginia St, Reno, NV 89502: Fresha listing https://www.fresha.com/lvp/hollywood-nails-south-virginia-street-reno-Kz7wW1
- Google 4.4 stars, 193 reviews: lead sheet, https://maps.google.com/?cid=15241436422396130871
- No website; Fresha page is an unclaimed directory listing marked "call to book"
- Services: Manicure, Pedicure, Spa Pedicure, Nail Polish, Gel Nails, Gel Nail Extensions, Nail Extensions, Dip Powder (Fresha listing/snippets, medium confidence)

Unverified (not used): Nail Art, Fish Pedicure (aggregator tags only).

Missing: hours, prices, owner/staff names, years open, walk-in policy, payment methods, social links, review quotes.

## Design decisions
Old Hollywood Regency, not lacquer: ink black, emerald, gold, ivory. Bebas Neue marquee type, Josefin Sans Deco labels, Karla body. Hero is a lit theatre marquee sign with velvet rope; checkerboard lobby floor; services as a playbill ("Now Showing") with tabs; Walk of Fame star tile in About; sunburst behind the rating; ticket-stub contact cards; "Showtimes" hours board; marquee storefront footer scene. Ambient: one bulb blinks briefly every ~2s, spotlights tilt with scroll; off under reduced motion. Clearly different from lv-nails (burgundy bottles, DM Serif).
Booking = text (BOOKING_URL in app.js). Hours board shows "Call for hours" with today highlighted; set HOURS in app.js to show real hours. No refund or T&C page: nothing is sold on the site.

## Photos to request
Storefront and sign, the pedicure chairs and manicure stations, close-ups of their gel, dip and extension work (hands only), polish wall. Slot ready: about-salon.

## Pitch notes
- Searching "Hollywood Nails Reno" turns up only directory pages; the Fresha page is unclaimed and says call to book, with no hours or prices.
- 193 Google reviewers at 4.4 stars, but nowhere online shows their services, hours or prices; this site does, and every row is one tap to call.
- A name like Hollywood deserves a look to match: the marquee, star and ticket theme is built for them, ready for their own photos.

## QA
qa.py exit 0 on 3 passes, 112 KB, no fails. All mobile and desktop shots reviewed.
Owner must approve photos and quotes before the site goes public.
