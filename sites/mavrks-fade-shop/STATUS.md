# MAVRKS Fade Shop: STATUS

## Fact sheet
Verified (source):
- Name, phone (619) 674-8684, rating 4.9 / 224 Google reviews: lead sheet, https://maps.google.com/?cid=13972990795745056188
- Address 1801 E William St, Bldg I, Carson City NV 89701: https://linktr.ee/MAVRKS
- Barbers Bill (shop owner), Beto, Bryan ("Bryan Blendz"), Martin, Juan (Sat-Sun) and their phones: Linktree
- Full menu, prices and durations per barber: https://mavrks.as.me/<Name> (Acuity)
- Cash only; 2-hour cancel notice; $25 no-show and $25 rebook fee; kids 5+: "Barber Shop Policies" PDF on Linktree
Unverified:
- Bill's Acuity early-bird line says text (619)684-8684; looks like a typo of 674. Site uses 674.
- Instagram handle (Linktree bio links one, not captured).
Missing:
- Shop hours (site says "By appointment", "call for today's hours"; no open-now badge)
- Walk-in policy (FAQ says call to check)
- Years in business, owner story, real review quotes

## Design decisions
Dark shop palette, bone and barber-pole red. Anton poster caps, IBM Plex Mono labels, Work Sans body. Hero art is a "fade chart": clipper guard bands #4 to #0 drawn as hair lines that shorten toward skin. Pole stripe slides once under the nav; hero hatch drifts a few px with scroll. Services use one tab per barber because each barber has their own prices; every row books that barber on Acuity (after-hours rows open a text). No cookie banner (no cookies). No refund or T&C page: nothing is sold on the site.

## Photos to request
Storefront and Bldg I sign, the chairs/stations, fades and designs from the back or side, Bill and the crew at their chairs (their own photos).

## Pitch notes
- Their only web presence is a Linktree (display name "One lovve"); searching "MAVRKS Fade Shop Carson City" returns nothing of theirs.
- Prices are scattered across five Acuity pages and two Google Drive PDFs; this puts every barber's menu on one page.
- 4.9 stars from 224 reviews deserves a home that shows up in search, with cash-only and no-show rules stated up front.

## QA
qa.py exit 0, 0 fails, 2 passes, 133 KB. Owner must approve the prices, staff list and wording before the site goes public.
