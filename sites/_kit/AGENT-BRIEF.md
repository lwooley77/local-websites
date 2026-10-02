# Demo-site build brief (for build agents)

## Cost rules (apply to every step)
- At most 2 targeted web searches per subtask (verify, facts, photos). Extract only the facts you need, and never paste page dumps into context.
- Don't re-read big files you already read. Don't Read the dist file or any base64. Read only the screenshots you need (mobile-00..03 and desktop-00..01 first, the rest only to check a fix).
- Follow `.claude\skills\karpathy-guidelines\SKILL.md`: simplest change, surgical edits, verify with qa.py.
- Final report: 300 words or fewer, no preamble.

You build ONE premium, single-file pitch demo for a local Northern Nevada business that has no real website.
The site owner (mk) will walk in and show it on his phone to win the job. It must look custom and expensive, made for THIS business, never templated or AI-made.
Read `C:\Users\wooleluc\Desktop\Websites\CLAUDE.md`, sections "Never do", "Copy rules", "Motion, readability, mobile". Those rules apply. Where this brief differs from CLAUDE.md, this brief wins.

## Hard rules
- Work only inside `C:\Users\wooleluc\Desktop\Websites\sites\<slug>\`. Don't touch anything else.
- Never send messages, create accounts, publish, or pay. Never download photos of the business or people. Fonts come only from `sites\_fonts\`.
- **Never invent facts:** no prices, hours, years, staff names, reviews, awards or services you didn't find in a source. Unknown → honest wording ("Call for pricing", "Call for today's hours") and list it under Missing.
- Reviews: only real quotes found verbatim with a source URL, credited as First name + last initial + platform. If none, show the real star rating and review count from the lead sheet (Google), linked to their Google Maps page. Never write a quote.
- No em dashes anywhere. Plain, industry-normal wording.

## Step 1: Verify the lead (stop early if it's not a lead)
WebSearch "<name> <city> NV" and similar. If the business has its own working website (own domain, not Facebook/Booksy/Vagaro/Instagram/Linktree/Yelp), or is permanently closed, STOP. Write `sites\<slug>\SKIP.md` with the evidence and report "SKIP: <reason>".

## Step 2: Research (WebSearch + WebFetch; Yelp and Google Maps usually block fetching, so use search snippets, Facebook, Booksy/Vagaro/Fresha/StyleSeat, YellowPages, MapQuest, Birdeye, Nextdoor, chamber listings)
Write `research\facts.json`: [{field, value, source, confidence}]. Cover: exact name spelling, phone, address, hours, services and prices, owner or staff first names, years in business, booking method, social links, walk-ins, payment notes, languages, what reviewers repeatedly praise (paraphrased themes are OK in notes, not on the page as quotes).
Write `research\feel.md`: 3–5 feel words with reasons drawn from the facts (name, neighborhood, clientele, era, services). Then the palette as CSS tokens (WCAG AA text), fonts, 6–10 motif ideas, and 2–3 subtle ambient touches.

## Step 3: Build
Files: `site.json`, `src\head.html` (meta, title, OG, JSON-LD, favicon as an SVG data URI, `<style>%%FONTS%% …</style>`), `src\body.html`, `src\app.js`. Run `python sites\_kit\build.py sites\<slug>`. Read the docstring in `sites\_kit\build.py` for the placeholder format. Never hand-edit dist.
- Fonts: pick from `sites\_fonts\` (list the folder). Use a display face with character, a label face and a readable body face. Never Inter or system fonts. Pick a pairing that suits this business. Don't default to Fraunces/Cormorant for everyone.
- Sections:
  - preview bar ("Preview website prepared for <Name>", close button, one line on phones; the business name must never be cut off or ellipsized at 390px: on phones, shorten the lead-in to "Preview for" and use sentence case if needed)
  - sticky nav (hides on scroll down, shows on scroll up; live "Open now until X / Opens X" badge in America/Los_Angeles, only if hours are known; full-screen phone menu with `data-qa="menu-open"`, `data-qa="menu"`, `data-qa="menu-close"`)
  - hero: name, one honest line, Call / Book buttons, distinctive art
  - services strip
  - Services & Prices (category tabs if 3+ categories, `data-qa="tab"`; every row tappable to call or book)
  - about
  - reviews/rating
  - contact cards: big Call, Text (`sms:`), Directions (Google Maps link)
  - FAQ accordion (`data-qa="faq"` on the buttons, aria-expanded; answers only from facts, or honest "call us" answers)
  - Hours & Location (today highlighted)
  - footer with a themed scene
  - phone-only sticky bottom bar (Call / Text / Directions / Book)
- Booking: if they use Booksy/Vagaro/Square/etc., Book buttons go to that page. Otherwise Book = call/text. Write `BOOKING_URL` as one config line in app.js.
- **No photos.** Make the visuals from custom inline SVG illustration, type, texture and layout, themed to the business. It must look finished without photos, with no empty frames and no "photo here" text. Leave the build able to accept photos later: `window.IMG` from `%%IMAGES%%`, and `<img data-k="stem">` slots that only render when `IMG[stem]` exists.
- One layout only. Target under 450 KB. Mobile first: 390px wide, 44px+ tap targets, 16–18px body text, no horizontal scroll.
- Respect prefers-reduced-motion. Interface animations under 300ms, easing cubic-bezier(.23,1,.32,1).

## Launch checklist (qa.py enforces most of it; do all of it)
- `<title>` 10–70 chars. Meta description 50–170 chars. Favicon, og:title, html lang, JSON-LD.
- Logo is `<a data-qa="logo" href="#top">` and clickable back to the top (give the top element `id="top"`).
- Every in-page link resolves; no unused nav items; footer links work. Phone numbers are `tel:`, texts `sms:`, emails `mailto:`.
- Footer shows the current year (set from JS) and a **Privacy** link to a short `id="privacy"` note. It must say: the site uses no cookies, no tracking and no forms; calls and texts go straight to the business; booking links go to <platform> under its own privacy policy. No cookie banner, because there are no cookies. No refund or T&C page, because nothing is sold on the site; note that in STATUS.
- Accessibility: WCAG AA contrast, real alt text, every icon-only control has an aria-label, visible `:focus-visible` rings, everything reachable by keyboard, Escape closes the menu, sheet and lightbox.
- Clear button labels, verb first ("Call (775) 555-0100", "Book on Vagaro").
- Remove unsupported claims. Every claim (years, "family-owned", "best", "fairly priced", staff, awards) must trace to a source in facts.json, or it goes. Paraphrased praise from reviews must not appear as a claim.
- Local rules: for contractors, note in STATUS that Nevada requires a contractor's license number in advertising, if their work needs a license. Ask the owner; never invent one.
- No third-party requests at all (no Google Fonts, maps embeds or analytics). External links only.

## Real photos (when the task says to pull photos)
- Sources: ONLY the business's own public pages. Their Booksy/Vagaro/Squire/Fresha/StyleSeat gallery, their Facebook or Instagram posts, their Google Business photos, their Nextdoor page. Use WebFetch, or a Playwright script that loads the page and collects `<img>`/`srcset` URLs. Download with Python `urllib` (browser User-Agent) into `assets\raw\`.
- Never use photos from other businesses, stock sites, news sites or reviewers' personal accounts unless clearly posted by the business.
- **No identifiable client faces and no children.** Prefer storefront and signage, interior, stations and chairs, tools, products, close-ups of the work (nails, lashes, fades from the back or side with the face not visible), and job-site before/after for contractors. The owner's or staff's own profile photo is OK if the business posted it.
- Keep only sharp images at least 600px on the long side. No upscaling, no watermarked or screenshot images.
- Name files by what they show (`hero-storefront.jpg`, `work-skin-fade-1.jpg`). Record each in `research\photos.json` as {file, what, source_page, image_url, faces}.
- Use them well: the hero, a gallery with a lightbox (swipe, arrow keys, captions, counter, Escape to close), the about section, and service categories where a matching photo exists. Keep the custom illustration where it still adds character. Nothing may look worse than the no-photo version.
- STATUS: list every photo with its source, plus "Owner must approve photos and quotes before the site goes public."

## Step 4: QA loop (at least 2 full passes)
`python sites\_kit\qa.py sites\<slug>`. It must exit 0. Then Read EVERY screenshot in `qa\shots\` (mobile first). Fix overlaps, clipping, low contrast, awkward wraps, empty gaps, anything generic-looking. Rebuild and re-run.
Self-critique and score 1–10 on: custom to this business, premium polish, readability, mobile, ease of contacting/booking, faithful to facts, clean of the never-do list. Fix anything under 9.

## Step 5: Hand-off files
- `STATUS.md`:
  - Fact sheet: Verified (with source) / Unverified / Missing
  - Design decisions
  - **Photos to request**: which kinds of their own photos would most improve the demo
  - **Pitch notes**: 3 short talking points specific to this business, for mk's walk-in. Include what's wrong with their current online presence, with evidence
  - QA result
- `DECISIONS.md`: one line per judgment call.

## Final reply (max 8 lines)
slug, verified/skip, file size, QA pass/fail, self-scores, top 3 missing facts, one-line pitch hook.
