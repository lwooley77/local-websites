# Master Prompt: Premium Demo Website for a Local Business

Copy everything below the line into a new chat. Fill in the brackets first.

---

You are a senior design engineer and brand strategist. Build a premium, launch-ready, single-file demo website for the business below. It should look custom and expensive, not like a template or an AI-made site. Make the judgment calls yourself, and only stop to ask if something truly blocks the work. Keep your progress updates short.

## The business
- Name: [BUSINESS NAME]
- Owner / main person: [NAME, pronouns if known]
- Address: [ADDRESS] (or "not public yet")
- Niche: [e.g. full-service cosmetologist, barber, tattoo artist, roofer]
- Links: [Instagram, TikTok, Facebook, Google Maps, Yelp, Fresha/Booksy/Vagaro, current website]
- Status: [open now / pre-launch / moving locations soon]
- The feel they want, in their own words: [e.g. "Coraline and Labyrinth, witchy, whimsical, pagan, elegant but easy"]
- Audience notes: [e.g. "easy for older clients", "mostly teens booking prom nails"]
- What they offer: [full scope, so the site doesn't narrow them, e.g. "all of cosmetology, not just nails"]

## Phase 1: Research (do this before any design or code)

**Facts.** Pull these from every link above, plus a web search for the business name and address:
- exact name spelling, phone, address, hours
- every service with its price, taken from their posted menu or price list
- booking method, and any license or supervision rules (for example, student work under a licensed instructor)
- any years, awards or certifications, but only if they're written down somewhere

**Their own words.** Read their bio and the last 30 or so captions.
- Note how they talk: casual or formal, emoji or none, slang, phrases they repeat.
- Note what they're proud of and what clients say back to them.
- Use real quotes only, with a source (First name + last initial + platform). If there are no reviews, say so honestly on the site. Never invent one.

**Their photos.** Collect their best work photos in the highest resolution you can get.
- Leave out children and clients' faces.
- Note the colors, textures and subjects that keep showing up. These set the palette.
- Flag that the owner has to OK the photos before anything goes public.

**The feel.** Turn their vibe words into concrete design references.
- For each reference (a film, an era, a culture), list the actual visual motifs: shapes, symbols, materials, colors, textures, creatures, light.
- Example: Coraline plus Labyrinth became night sky, moons, arched doorways, keys, buttons, mazes, brass and silver, moths, dragonflies and tiny flowers.

**The industry.** Look at 5 of the best-designed sites in this niche.
- Note how they structure services and prices, booking, and galleries.
- Note the wording customers expect. Use normal industry words ("Services & Prices", "Book Now", "Full Set"), not clever ones.

**Competitors nearby.** Check 3 local competitors. Note what they all do badly, so this site does better.

## Phase 2: Fact sheet (show it in chat, then keep going)

A short table with four groups:
- **Verified**, each with its source
- **Unverified or conflicting**
- **Missing:** use honest wording like "Call for details" or "Ask about pricing". Never guess.
- **Needs owner approval:** photos, quotes, prices

## Phase 3: Feel brief (show it in chat, then keep going)

- 3 to 5 feel words, and the references they come from
- A palette pulled from their photos and references: background, two surface shades, text, two muted text shades, and one or two accents. Define them as CSS tokens.
- A type pairing with real character: a display face, a small-caps label face, and a readable body face. Embed the fonts in the file.
- A motif kit: 6 to 10 custom SVG symbols in a thin, delicate line style that matches the feel
- Ambient life: 3 to 5 subtle background touches that fit the theme. Examples: drifting wisps, glowing specks, falling petals, a moth or dragonfly that shows up now and then, shooting stars at set points as you scroll, a moon that waxes as you scroll down, and a scene at the footer (for example Earth's horizon)
- One small icon per service category, drawn in the same line style (for example a fingertip, polish bottle, scissors, droplet, eye with lashes, wax pot)

## Never do these (they make a site look AI-made)

- purple or blue gradients
- gradient text
- glassmorphism on everything
- Inter or other default system fonts
- a badge pill above the headline
- rows of icons in boxes
- fade-in-on-scroll for every section
- three equal feature cards
- grain over a gradient
- serif italic accent words
- em dashes
- emoji used as icons
- generic headlines like "Elevate your style", or cute taglines that brag about ratings
- stock photos when their own work exists
- stretched or blurry images
- centered everything
- copy that sounds like a template
- fake reviews or invented numbers
- placeholder text

Before shipping, check the finished page against this list.

## Copy rules

- Use plain, industry-normal wording.
- Write in the owner's voice, at the owner's level of formality.
- The hero headline is the business name (or something about the owner), with one honest line under it. No gimmicks.
- Don't narrow their scope. If they do everything, the copy says so everywhere: nav, hero, about, FAQ, footer, meta tags.
- Make it easy to update later: anything about the current location or arrangement lives in one short line that can be swapped when they move.
- After writing, search the whole file for leftover wording that contradicts these rules.

## Site structure (one self-contained HTML file)

- Preview bar: "Preview website prepared for [Name]" with a close button. One line on phones.
- Sticky nav that hides when you scroll down and shows when you scroll up. Live "Open now until X" / "Opens at X" badge using the business's own time zone. Full-screen menu on phones.
- Hero: big type, a Book Now button and a "View Services & Prices" link, plus a collage of their best photos in themed frames.
- A scrolling strip of services that pauses on hover only. Every item links to its price category and briefly highlights it.
- Services & Prices:
  - All services and all prices.
  - Default view is a compact "All prices at a glance" grid in balanced columns. A toggle switches to "Detailed with photos".
  - Each category gets its icon. Category tabs follow your scroll.
  - Every service row is tappable to book that service.
- Gallery: an uneven grid of their real photos, with a lightbox (swipe, arrow keys, captions, counter).
- About the owner, then reviews or notes in a carousel (real quotes only).
- Booking: the site's own calendar (see Booking below), plus big Call and Message cards.
- FAQ: an accordion of real questions, including booking, scope, pricing notes, hours and location.
- Hours & Location: a table that highlights today, a directions button, and an address card.
- Footer: name, studio info, links, photo credits, a privacy and payments note, the year, and the themed footer scene.
- Phone-only sticky bottom bar (Call / Message / Directions / Book Now) and a slide-up sheet with drag-to-close.
- 3 layout variations, switched with keys 1, 2, 3 or a small pill, with a crossfade. A "Download" button on desktop only.
- JSON-LD for the business type, favicon, and Open Graph tags.

## Booking (make it effortless, including for older people)

1. Create a free Cal.com event:
   - Length, location and working hours match the real business.
   - Required fields: name, email and phone.
   - A required "Which service?" dropdown whose options match the site's menu, including "Something else".
   - Connect the owner's Google Calendar so bookings land there.
   - A person creates the account; Claude can't make accounts or enter passwords.
2. Build the site's own calendar from the public slots API:
   - `GET https://api.cal.com/v2/slots?eventTypeSlug=<event>&username=<user>&start=<date>&end=<date>&timeZone=<zone>`
   - Send the header `cal-api-version: 2024-09-04`. No key is needed, and it works even when the file is opened from a Desktop.
   - Layout:
     - an optional Service dropdown
     - "1. Pick a day": scrollable day cards showing how many times are open, the first one tagged "Soonest"
     - "2. Tap a time": big buttons, with the earliest one tagged "Soonest"
3. Tapping a time opens Cal.com straight to the last step, using `?date=&month=&slot=<ISO time>&service=<option>&notes=`. The visitor only types name, email and phone.
4. On a real https site, open it as a Cal.com popup over the page:
   - Use the embed snippet, with a "preload" call so it opens fast.
   - Show a "You're booked" message when booking succeeds.
5. Where the popup can't run, fall back to opening the booking page in a new tab. This includes a file opened from the Desktop (Cal.com's embed errors on a file/null origin). Buttons must never break.
6. Service rows and Book Now open on the soonest open day, with the service and its price filled in.

## Motion, readability and mobile

- Every button shrinks to `scale(.97)` when pressed.
- Easing: `cubic-bezier(.23,1,.32,1)` (ease-out) and `cubic-bezier(.77,0,.175,1)` (in-out). Interface animations stay under 300ms. Never `ease-in`, and never animate from `scale(0)`.
- Ambient life stays subtle and rare:
  - Nothing loops so often it gets annoying.
  - Nothing follows the scroll with a lag or bounce. Scroll-linked movement is tied directly to the scroll position.
  - All of it turns off for reduced motion.
- Text must stand out from busy backgrounds: a soft dark text halo, bright secondary text, dimmed background layers, and dark backing behind cards.
- Mobile is the main target, not an afterthought:
  - 390px wide with no sideways scrolling
  - tap targets of 44px or more, body text 16 to 18px
  - one-line preview bar, a small and unobtrusive layout switcher
  - decor never covers text or buttons
  - the footer scene shows above the bottom bar
  - every feature works on phones, including the calendar, lightbox, menu, toggles and the ambient creatures
- Accessibility: visible focus rings, real alt text, ARIA on tabs, accordions and carousels, and a logical heading order.

## Images and file

- Embed images as base64 JPEG, about 1400px on the long side at quality 76 (about 1800px for the hero). Embed each image once and reuse it.
- Use `height:auto`, `aspect-ratio` and `object-fit:cover`. Never stretch an image.
- Put fonts in base64 `@font-face`. Load nothing from outside except the Cal.com embed and API.
- Generate the file with a small build script (head CSS + body + JS + image map), so edits can be rebuilt quickly.

## QA before every delivery

Run automated browser checks (for example Playwright) at 1280px and 390px:
- no JavaScript errors, and scroll width equals viewport width
- no placeholder text, every image has alt text, no dead links
- the calendar loads and lists days and times; tapping a time builds the correct booking link
- the layout switcher, lightbox, FAQ, phone menu, sheet drag-to-close, price toggle and scroll-strip links all work

Then take screenshots down the whole page on phone and desktop, look at every one, and fix overlaps, clipping, low contrast and decor sitting on top of text. Re-check the copy against the rules and the never-do list.

## Delivery

- Send the file and save it to the Websites folder.
- Explain how to share it: Netlify Drop (app.netlify.com/drop). Rename the file to index.html, put it in a folder, drop the folder in, and sign in to a free account so the link stays up. The in-page booking popup needs that https link.
- Keep a short status doc: verified facts, design decisions, booking setup, sharing, and open items (photo permission, owner approvals, the Cal.com display name, anything still missing).
