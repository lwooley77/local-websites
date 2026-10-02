# Slice Salon: demo status

Deliverable: `dist/index.html` (167 KB, single file, no external requests, no cookies). Built 2026-10-02.
Lead check: this is a lead. Their old website **slicesalon.com has expired**: it 301-redirects to expireddomains.com/domain/slicesalon.com. Their Vagaro booking page (vagaro.com/slicesalon, still listed on Birdeye) returns 404. They are still active: the Yelp listing was updated Sept/Oct 2026 and the review count keeps rising (78 to 80).

## Fact sheet

### Verified (with source)
- Name: Slice Salon. Google Maps shows it as "Slice". Sources: Yelp https://www.yelp.com/biz/slice-salon-reno, Birdeye https://reviews.birdeye.com/slice-salon-149499171280132
- Type: hair salon (Yelp Hair Salons, a second Yelp listing under Waxing, Facebook category Hair salon)
- Phone: (775) 323-2100. Sources: lead sheet, Nextdoor https://nextdoor.com/pages/slice-salon-reno-nv/, Fresha https://www.fresha.com/lvp/slice-vassar-street-reno-ovl1z9
- Address: 137 Vassar St, Ste 4, Reno, NV 89502. Sources: Birdeye, Nextdoor
- Neighborhood, in their own words: "the heart of Reno's Mid-Town Arts District", and "a dynamic style of chic, glam, and fun". Source: Vagaro listing text (search snippet, page now 404)
- Services: women's, men's and children's haircuts, curly hair, styling, braiding, hair coloring, highlights, balayage, keratin treatment, permanent straightening, hair extensions, hair weaves. Sources: Fresha, YellowPages and search snippets
- Adored hand-tied extensions partner salon. Source: https://adoredhairextensions.com/stores/slice-salon/
- Google rating: 4.6 from 80 reviews (lead sheet), linked to https://maps.google.com/?cid=5293939307827189518
- Review quotes (verbatim from the Birdeye page's raw HTML, originally Facebook reviews): Bobby G., Ellie G. (excerpt), Angela M. (excerpt)

### Unverified (used on the page, confirm with the owner)
- In business since 2011 (a snippet gives July 14, 2011; YellowPages says 13 years). Shown as "Since 2011".
- Nextdoor Neighborhood Favorite 2020 and 2022 (Nextdoor page)
- By appointment only (Loc8NearMe, 2news listing)
- Credit cards and Apple Pay (2news listing snippet)
- Private parking and gender-neutral restrooms (Loc8NearMe, which copies Yelp attributes)
- Waxing, eyebrow and eyelash services (second Yelp listing and directory categories)
- Vivid color (an older Facebook review describes a pink to purple ombre with teal)

### Missing
- **Hours.** Five sources disagree (Birdeye Mon-Fri 9-6; Fresha/BestProsInTown Mon-Sat 9-6 + Sun 11-5; Vagaro Mon-Fri 9-5; Yelp a different split again). The page shows no hours and no open/closed badge, only "Call for today's hours".
- All prices
- The current stylist team. Reviews from different years name Laura Christopher, Madison Leisy, Melissa Lazzarini, Candy Allen-Campbell, Erica, Amber, Bella, Lorena, Carlee and Jenell. Several have their own phone numbers, so it may be a team of independent stylists. No names are on the page.
- Whether (775) 323-2100 takes texts (a 323 prefix is often a landline). Every Text button assumes it does.
- Instagram handle for the salon itself, and whether the Facebook page (facebook.com/SliceReno) is still active
- Owner name. The Nextdoor email is lazzarini@slicesalon.com, which suggests Melissa Lazzarini, but that is not confirmed.

## Design decisions
- Concept: "the slice". The SLICE wordmark is cut on a diagonal, top half ink and bottom half cherry, slightly shifted along the cut, with a thin cut line across it in the hero. The same diagonal edges the dark reviews band and the footer.
- Hero art: a salon color swatch ring fanned open (Platinum, Honey, Copper, Espresso, Cherry, Orchid, Teal) with a pair of open shears. It points at what reviewers praise most: custom and vivid color. The fan opens a little more as you scroll (set straight from scrollY).
- Light warm "porcelain" page with cherry and teal accents and a near-black band. It looks nothing like the two reference demos (Cutz is paper and red barber-pole, The Dream is black and gold).
- Type: Syne 700 (wide, art-district poster feel), Space Grotesk for labels and buttons, Figtree for body text.
- Services & Prices: 4 tabs (Cut & Style, Color, Smoothing & Extensions, Brows & Waxing), one thin-line icon per category, every row is a tap-to-call link showing "Call for price". A scrolling strip of service names jumps to the right tab and flashes it.
- About uses their own phrase "chic, glam, and fun" as a pull line, plus a short facts list.
- Hours card is honest: it highlights today's day name and says to call, since hours conflict online.
- Footer scene: a styling station with a bulb mirror (bulbs light up once), a chair, plant, color bowl, swatch ring and a pink neon "slice" sign. One snipped curl falls once.
- Book = a call/text sheet with drag-to-close. `BOOKING_URL` (first line of `src/app.js`) switches every Book button to an online booking link.
- Photo slots: `assets/raw/hero.jpg` replaces the swatch art; `assets/raw/salon.jpg` appears above the facts list. Rebuild after adding them.

## Photos to request
1. Their best color work, especially balayage and vivid pinks, purples and teals (back of head, no faces) for `hero.jpg`
2. The inside of the salon: stations, mirrors, the bright clean space reviewers mention (`salon.jpg`)
3. The building and sign on Vassar St
4. Before and after of hand-tied extensions or keratin smoothing
5. A photo of the team, only if they want stylists named on the site
The owner must approve every photo before anything goes public.

## Pitch notes
1. **Their website is gone.** slicesalon.com expired and now redirects to a domain-sale page, yet Nextdoor, Fresha, Yelp and directory sites still send people there. Every one of those clicks is a lost booking. The Vagaro link on Birdeye is also dead (404).
2. **Nobody can tell when they're open.** Five listings show five different sets of hours. One site they control, with hours they set, fixes that, and it can be linked from Google, Yelp and Facebook.
3. **Their reputation is strong but invisible.** 4.6 stars from 80 Google reviews, Nextdoor Neighborhood Favorite twice, an Adored extensions partner, and reviewers rave about color. The demo puts the color work front and center and makes every service one tap from a call.

## Open items for mk
- Confirm hours, prices, the stylist list, whether the number takes texts, and who the owner is. Then edit `src/body.html` and rebuild with `python sites\_kit\build.py sites\slice-reno`.
- If they want online booking again (Vagaro, Square or Cal.com), mk sets up or recovers the account and pastes the link into `BOOKING_URL` in `src/app.js`.
- To share: Netlify Drop at app.netlify.com/drop (drag in the `dist` folder).

## QA result
- `python sites\_kit\qa.py sites\slice-reno` exits 0 at 1280x900 and 390x844 (three full passes, including the newer launch checks: meta length, logo link, footer year, #privacy note, contrast, no ellipsis). Every screenshot was reviewed.
- Extra checks with a scratch Playwright script: phone menu opens and closes, Book sheet opens and closes by dragging down, a strip item selects the Color tab, no page errors.
- Fixed during QA: contact cards overflowed at 390px (wide phone number in Syne), a decorative ring crossed the About heading, the brand mark looked crossed out in the nav and footer, empty columns on desktop About and Hours, FAQ heading floated mid-column on desktop, a stray paper strip under the footer, and the quote <footer> tags hid the real footer from QA.
- Self-scores: custom 9, polish 9, readability 9, mobile 9, contact/booking ease 9, faithful to facts 9, never-do list clean 9.
