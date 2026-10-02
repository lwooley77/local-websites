# Saint Patrick Yard Maintenance LLC: demo status

Deliverable: `dist/index.html` (single file, 186 KB, no external requests). Build: `python sites\_kit\build.py sites\saint-patrick-yard`.

## Lead check
Valid lead. The website listed on both Nextdoor pages and several directories, saintpatricklandscapereno.com, does not resolve (DNS "name does not exist", checked 2026-10-01, www too). Not closed: Nextdoor recommendations from Aug to Oct 2025, Google listing active (4.6 stars). saintpatricklandscape.com is a different company (Utah, 801 number).

## Fact sheet

### Verified (with source)
| Fact | Source |
|---|---|
| Name: Saint Patrick Yard Maintenance LLC | lead sheet, Nextdoor, Birdeye |
| Phone (775) 505-7553 | lead sheet, both Nextdoor pages, renotoprated, repairhit |
| Google 4.6 stars, 133 reviews; Maps cid link | lead sheet; renotoprated (4.6 / 133) |
| Owner: Patrick, owner-operated ("one man operation" per a Google review) | nextdoor.com/pages/saint-patrick-yard-maintenance-llc-reno-nv/ ; Birdeye (Ryan S. review) |
| Free estimates: "Give me a call for a free estimate" | both Nextdoor pages (owner-written text) |
| Services (owner's own list): tree & stump removal, fall cleanups, junk removal, gutter cleaning, rock installation & removal, fence installation & repair, paver repair, root removal, weed removal, brush clearing, grass removal & installation, decorative rock | Nextdoor page 1 |
| Also: yard cleanups, spring maintenance, weed spraying, mowing, debris removal, junk hauling, driveway cleanup | nextdoor.com/pages/silverback-yard-services-reno-nv/ |
| Rock gabion wall work, trimming, raking, haul-away | Nextdoor (C.N.), Birdeye Google reviews (Dori S.) |
| Nextdoor Neighborhood Fave (3 neighborhoods) | Nextdoor page 1 |
| 6 review quotes, verbatim, credited as shown | Birdeye (Google reviews) and both Nextdoor pages, see research/facts.json |

### Unverified / conflicting
- **Hours.** Google/Birdeye: open 24 hours. Nextdoor 1: Mon-Wed 7 AM-7 PM, Thu-Sun 7 AM-8 PM. Nextdoor 2: 7 AM-7 PM daily. The site shows **7 AM to 7 PM every day**, the window all of them include. Confirm with Patrick.
- **Service area** list (South Reno, Somersett, Caughlin Ranch, Spanish Springs, etc.) comes from a directory (renotoprated) and Nextdoor neighborhoods (Washoe Valley, Dayton, Mound House). Confirm how far he goes.
- **Review count.** Lead sheet 133; Birdeye shows 152 Google reviews. Site uses 133. Update when live.
- **Address.** Three different ones (735 Mill St Reno; 390 Linnet Way Washoe Valley; 3501 Sherman Ln Carson City). Site shows no street address on purpose (service-area business).
- "License NV20222633835" on Nextdoor looks like a Nevada business ID, not a contractor license. Not shown.

### Missing
- Prices or minimums (site says every job is priced at the free estimate)
- Years in business, insurance, any contractor license
- Payment methods
- Real photos of his work
- Email, social links he wants shown (Facebook pages exist but could not be read)

## Design decisions
- Contractor layout: hero with Call / Text-photos actions, services strip, Services in 4 tabs (every row opens a prefilled text: "Hi Patrick, I'd like a free estimate for tree removal."), How it works timeline, About with quick facts, schematic service-area map, Reviews, "Get a free estimate" contact cards, FAQ, Hours, footer scene.
- Look: high-desert paper and pine green, rust for the estimate action, a quiet clover seal for the Saint Patrick name. Type: Bricolage Grotesque (sturdy, truck-door feel), IBM Plex Mono for work-order labels, Figtree body at 17px+.
- Hero art is a custom SVG "job site" (Sierra peaks, Jeffrey pine, cut stump, rock gabion wall from a real review, rake, wheelbarrow of branches) on a work-order card with a FREE ESTIMATE stamp.
- Ambient: sun sinks behind the Sierra on scroll, a single leaf drifts across the hero a few times, a tumbleweed rolls through the footer. All off under reduced motion.
- Live "Open until 7 PM / Opens 7 AM" badge in Reno time; today highlighted in the hours table.
- `BOOKING_URL` in app.js is empty, so every estimate button calls or texts. Photo slots ready: drop `hero.jpg`, `patrick.jpg`, `work1.jpg`... into `assets/raw/` and rebuild; a "Recent work" section appears automatically.

## Photos to request
1. Before/after pairs of yard cleanups (the strongest sell for this trade)
2. Tree or stump removal jobs, ideally with the cleaned-up result
3. The rock gabion wall and decorative rock jobs
4. Patrick on a job or with his truck/trailer (only if he is comfortable)
5. A fence or paver repair
No customers' faces or house numbers. Owner must approve every photo before anything goes public.

## Pitch notes
1. **His website is dead.** Nextdoor and directories send people to saintpatricklandscapereno.com, which no longer exists (DNS fails). Every neighbor who clicks it from Nextdoor hits an error page. This site can go live on that domain or a new one.
2. **His reviews are better than his listings.** 4.6 stars on Google (133+), Neighborhood Fave on Nextdoor, and reviewers keep saying "on time", "hard worker", "hauled it all away". Right now that is scattered across three listings with three different addresses and three different sets of hours. One clean page fixes that.
3. **Built for how he already works.** He gives free estimates by phone and people text him photos. Every service on the page opens a text to Patrick with the job already typed in, so the phone rings with ready-to-quote work, not "do you do yards?"

## QA
- `python sites\_kit\qa.py sites\saint-patrick-yard`: exit 0, zero fails, 2 full passes (desktop 1280 and mobile 390), every screenshot reviewed.
- Extra checks: menu open/close, FAQ opens with visible answer, strip links switch the right tab, review carousel, prefilled sms links, no page errors.
- Fixed between passes: FAQ answer not expanding (selector bug), how-it-works step misalignment, map labels overlapping the Sierra, phone number wrapping in the call card, mobile service rows (now arrow buttons), hero proof line wrap, lawn icon.

## How to share
Netlify Drop at app.netlify.com/drop (drag the folder that holds dist/index.html), or `npx netlify-cli deploy --dir dist --prod` after mk runs `npx netlify-cli login` once. Not published by the agent.
