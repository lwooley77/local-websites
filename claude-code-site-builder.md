# Claude Code: Autonomous Premium Site Builder

There are two parts:

1. **CLAUDE.md**: save it once in your websites folder. Claude Code reads it automatically every session, so the rules never have to be repeated.
2. **Kickoff prompt**: paste it each time you start a new business. It's short because CLAUDE.md does the heavy lifting.

Tip: start Claude Code in that folder with `claude --permission-mode acceptEdits` so it can write files without asking each time. Also allow `python`, `npx`, `pip` and `git` in `/permissions`, so it can run builds and tests on its own.

---

## PART 1: Save this as `CLAUDE.md` in your websites folder

```markdown
# Premium Demo Site Builder — Operating Manual

You build premium, launch-ready, single-file demo websites for local businesses, so the owner (mk) can pitch them. They must look custom and expensive, never templated or AI-made. You work autonomously, from first research to a verified, deployable file.

## Autonomy rules
- Do not ask questions. Make the best call, write it in `DECISIONS.md` (one line: decision + reason), and keep going.
- Stop and ask ONLY for things you are not allowed to do or cannot know:
  - creating accounts or typing passwords (Cal.com, Netlify, Google)
  - solving CAPTCHAs
  - publishing anything publicly
  - sending messages to anyone
  - spending money
- Even then, finish every other part of the job first, and leave the blocked item as a clear TODO in `STATUS.md` with exact steps for mk.
- Never invent facts, prices, hours, years, reviews or policies. If something is unknown, use honest wording ("Call for details", "Ask about pricing") and list it under Missing.
- Work in milestones. After each one, run the build and QA, then `git commit` with a clear message.
- Use subagents for parallel work: research (facts / voice / photos / industry), a design critic, and a QA reviewer. Keep conclusions and drop raw dumps.
- Keep a todo list for the whole job and keep working until every item in "Definition of done" passes.

## Folder layout (one folder per business)
sites/<slug>/
  research/facts.json      every fact, each with its source URL
  research/voice.md        how they talk, phrases, tone, real quotes with sources
  research/feel.md         vibe words → concrete motifs, palette, type, references
  research/industry.md     5 best niche sites + 3 local competitors: what to copy and what to beat
  assets/raw/              original photos (highest resolution available)
  assets/web/              processed JPEGs (generated)
  src/head.html            CSS (tokens, components, layouts, ambient)
  src/body.html            markup with %%PLACEHOLDERS%% filled by the build
  src/app.js               all JS
  build.py                 assembles dist/index.html (images and fonts embedded as base64)
  qa/qa.py                 Playwright checks + screenshots
  qa/shots/                screenshots from the last run
  dist/index.html          the deliverable
  STATUS.md                facts, decisions, booking setup, open items, how to share
  DECISIONS.md             running log of judgment calls

## Phase 1 — Research (subagents in parallel, then merge)
1. **Facts**:
   - Sources: WebSearch + WebFetch on every link given, plus "<name> <city>", Google Maps, Yelp, Facebook, and booking platforms (Fresha, Booksy, Vagaro, Square).
   - Collect: name spelling, phone, address, hours, every service and price, booking method, licensing or supervision rules.
   - Each fact goes in facts.json as {value, source, confidence}.
2. **Voice**:
   - Read their bio and recent captions: tone, emoji use, slang, repeated phrases, what they're proud of, what clients say.
   - Real quotes only, as First name + last initial + platform.
3. **Photos**:
   - Get their own work photos at the highest resolution.
   - If Instagram blocks fetching, try Claude in Chrome if it's connected. Otherwise, list the exact posts you want in STATUS.md and ask mk to drop the images into assets/raw/. Keep building with the photos you have.
   - Never include children or clients' faces. Note that the owner must approve photos before anything goes public.
4. **Feel**:
   - For each vibe word or reference (a film, era, culture, place), list its concrete motifs: shapes, symbols, materials, textures, creatures, light.
   - Pull the palette from their photos and references.
5. **Industry**:
   - Study 5 top sites in the niche: how they structure services and prices, booking, and galleries, and the normal wording customers expect.
   - Study 3 local competitors: what they all do badly.
6. Write the Fact Sheet in STATUS.md: Verified (with source) / Unverified / Missing / Needs owner approval.

## Phase 2 — Feel brief (write to research/feel.md, then build; don't wait for approval)
- 3–5 feel words and their references
- Palette as CSS tokens: background, 2 surface shades, text, 2 muted text shades, 1–2 accents. Text contrast must reach WCAG AA.
- Type: a display face with character, a small-caps label face, and a readable body face. Get the woff2 files (e.g. `npm i @fontsource/<font>`) and embed them as base64.
- Motif kit: 6–10 custom SVG symbols in a thin, delicate line style, plus one icon per service category in the same style
- Ambient life: 3–5 subtle, themed background touches. Examples: wisps, glowing specks, falling petals, a creature that drifts by now and then, a few shooting stars at set scroll points, a moon that changes as you scroll, a footer scene.

## Never do (it reads as AI-made)
- purple or blue gradients, gradient text, glassmorphism everywhere
- Inter or default system fonts, a badge pill above the headline
- rows of icons in boxes, three equal feature cards
- fade-in on every section, grain over a gradient, serif italic accent words
- em dashes, emoji as icons
- generic slogans ("Elevate your…"), cute taglines bragging about ratings
- stock photos when their own work exists, stretched or blurry images
- everything centered, template-sounding copy, fake reviews, invented numbers, placeholder text
Check the finished page against this list on every QA pass.

## Copy rules
- Plain, industry-normal wording ("Services & Prices", "Book Now"), written in the owner's voice and formality.
- Hero headline = the business name or something about the owner, with one honest line under it.
- Never narrow their scope. If they offer the full range, say so everywhere: nav, hero, about, FAQ, footer, meta tags. After writing, grep the copy for anything that contradicts their scope.
- Make it easy to update: put the current location or arrangement in one short line that can be swapped later.

## Site structure (single self-contained HTML)
- Preview bar "Preview website prepared for <Name>" with a close button (one line on phones).
- Sticky nav that hides on scroll down and shows on scroll up. Live "Open now until X / Opens at X" badge in the business's time zone. Full-screen menu on phones.
- Hero: big type, Book Now button + "View Services & Prices" link, a collage of their best photos in themed frames.
- A scrolling services strip that pauses on hover only. Each item jumps to its price category and briefly highlights it.
- Services & Prices:
  - Every service and price.
  - Default is a compact "All prices at a glance" grid in balanced columns, with a toggle to "Detailed with photos".
  - A category icon on each, scroll-following category tabs, and every row tappable to book that service.
- Gallery: an uneven grid with a lightbox (swipe, arrow keys, captions, counter).
- About, then reviews or notes in a carousel (real quotes only).
- Booking (see below), plus big Call and Message cards.
- FAQ accordion, Hours & Location (today highlighted, directions button), and a footer with credits, privacy/payments note, year and the themed footer scene.
- Phone-only sticky bottom bar (Call / Message / Directions / Book Now) and a slide-up sheet with drag-to-close.
- 3 layout variations (keys 1/2/3 or a small pill, with a crossfade). "Download" on desktop only.
- JSON-LD for the specific business type, Open Graph tags, favicon.

## Booking (effortless, including for older people)
- mk creates the free Cal.com account (you can't). You prepare everything else and write the exact setup steps in STATUS.md:
  - event length, location and hours that match the business
  - required name, email and phone
  - a required "Which service?" dropdown that matches the site menu, plus "Something else"
  - the owner's Google Calendar connected
- Until the booking URL exists, keep `BOOKING_URL` as one config line and make Book buttons fall back to Call/Message.
- The site's own calendar comes from the public slots API:
  - `GET https://api.cal.com/v2/slots?eventTypeSlug=<slug>&username=<user>&start=<YYYY-MM-DD>&end=<YYYY-MM-DD>&timeZone=<IANA zone>`
  - header `cal-api-version: 2024-09-04`, no key needed, works from file:// too
  - UI: an optional Service dropdown → "1. Pick a day" (scrollable day cards with the number of open times, the first tagged "Soonest") → "2. Tap a time" (big buttons, the earliest tagged "Soonest")
- Tapping a time opens Cal.com at the final step: `?date=&month=&slot=<ISO>&service=<option>&notes=`. The visitor only types name, email and phone.
- On https, open it as a Cal.com embed popup:
  - namespace init, `preload`, a dark theme with the brand accent
  - a "You're booked" message on `bookingSuccessful`
- On file:// (the embed errors there) or if embed.js fails, open the same link in a new tab. Buttons must never break.
- Service rows and Book Now open on the soonest open day, with the service and price prefilled.

## Motion, readability, mobile
- Press feedback is `scale(.97)`. Easing: `cubic-bezier(.23,1,.32,1)` and `cubic-bezier(.77,0,.175,1)`.
- Interface animations stay under 300ms. Never `ease-in`, never animate from `scale(0)`.
- Ambient life stays subtle and rare:
  - Nothing loops annoyingly.
  - Nothing lags or bounces behind the scroll; scroll-linked values are set straight from scrollY.
  - Everything turns off under prefers-reduced-motion.
- Text must stand out over decorative backgrounds: a soft dark text halo, bright secondary text, dimmed background layers, dark card backing.
- Mobile is the main target:
  - 390px wide with zero horizontal scroll, 44px+ tap targets, 16–18px body text
  - decor never overlaps text or buttons
  - every feature works on phones, including the calendar, lightbox, menu, toggles and ambient creatures
- Accessibility: visible focus rings, real alt text, ARIA on tabs, accordions and carousels, a logical heading order.

## Images, fonts, build
- Pillow pipeline: assets/raw → assets/web at about 1400px long side, quality 76 (hero about 1800px), EXIF-rotated, no upscaling.
- Embed each image once in a JS map, reused by `data-k`. CSS uses `height:auto`, `aspect-ratio`, `object-fit:cover`. Never stretch.
- Fonts are embedded as base64 `@font-face`. The only external requests allowed are the Cal.com embed and API.
- `python build.py` must regenerate dist/index.html from src/ every time. Never hand-edit dist.

## QA loop (after every milestone, and at least 3 full passes before done)
1. `python qa/qa.py` (Playwright, Chromium) at 1280×900 and 390×844 (is_mobile, has_touch). It fails on:
   - any page error, or scrollWidth > innerWidth
   - placeholder text, an image without alt text, a dead link
   - any of these not working: layout switch, lightbox open/close, FAQ, phone menu, sheet drag-to-close, price toggle, strip links
   - the calendar not rendering days and times, checked with the real slots API or a mocked response in the same format
   - a time tap that doesn't produce the right booking URL
2. Take screenshots down the full page at both widths into qa/shots/. Read every screenshot yourself, and look for overlaps, clipping, low contrast, decor on top of text, awkward wraps and empty gaps.
3. Run a design-critic subagent. It scores the page 1–10 on: feels custom to this business, premium polish, readability, mobile, booking ease, faithful to facts, and clean of the never-do list. Fix every item below 9, then re-run.
4. Grep the copy for scope contradictions, em dashes and banned phrases.

## Definition of done
- QA passes at both widths with zero errors, and the critic scores 9+ everywhere.
- STATUS.md is complete:
  - the fact sheet
  - design decisions
  - booking setup with mk's exact remaining steps
  - open items (photo permission, owner approvals, missing info)
  - how to share: Netlify Drop at app.netlify.com/drop (folder containing dist/index.html), or `npx netlify-cli deploy --dir dist --prod` after mk runs `npx netlify-cli login` once. The in-page booking popup needs the https link.
- Final git commit, and a 5-line summary for mk: what was built, what's verified, what needs him.
```

---

## PART 2: Kickoff prompt (paste each time)

```
New site. Follow CLAUDE.md end to end, autonomously. Don't ask me questions; log assumptions in DECISIONS.md and only stop for the hard-stop list.

Business: [NAME]
Owner: [NAME, pronouns]
Address: [ADDRESS or "not public yet"]
Niche: [e.g. full-service cosmetologist — nails, hair, color, skin, waxing, tinting]
Links: [Instagram, TikTok, Facebook, Google Maps, Yelp, booking page, current site]
Status: [open / pre-launch / moving soon]
Feel they want, their words: [e.g. "Coraline and Labyrinth, witchy, whimsical, pagan, elegant but easy to navigate"]
Audience: [e.g. "older clients must find booking easy"]
Booking: [Cal.com URL if it exists, otherwise "not set up yet"]
Photos: [in sites/<slug>/assets/raw already / pull from Instagram]

Start with parallel research subagents, write the fact sheet and feel brief, then build, QA and iterate until the Definition of done passes. Commit at each milestone and give me the 5-line summary at the end.
```
