# Your site: what's ready and what to do next

Site: https://euphonious-yeot-fce456.netlify.app/
Two packages are ready (each is a folder + a zip):

| Package | What it is |
|---|---|
| `deploy\live-plus` | The version that is live now, **plus all the improvements**. Light and fast. |
| `deploy\me` | The animated version (storefront story, motion on every section, tour). Heavier. |

## 1. Fix the contact form (do this first, about 3 minutes)

**The problem:** when a message is posted to your live site, Netlify answers "404 Not Found". The form on the page is built correctly, but Netlify is not set to look for forms on this site, so nothing is received.

1. Open your site in Netlify → **Forms** (left menu).
2. Click **Enable form detection**.
3. Go to **Deploys** and drag **`live-plus`** (or `me`) onto the "drag and drop" box. Forms are found when a deploy happens, so this step is required after enabling detection.
4. Back on **Forms**, you should now see a form named **contact**.
5. Go to **Project configuration → Notifications → Form submission notifications → Add notification → Email**, choose the form "contact", and enter your email.
6. Test it: fill in the form on the live site from your phone. You should see "Got it. Thank you." and get an email within a minute.

If step 4 doesn't show a "contact" form, tell me what the Forms page says.

Note: the form can only send from the live site, never from a file opened on your PC.

## 2. Fill in your real details (tell me, or edit `site.json`)

Open `sites\self-live\site.json` (or `sites\self\site.json`) and fill in the values. Empty ones are simply hidden, nothing is invented.

| Setting | Effect |
|---|---|
| `NAME` | Your name or business name (currently the placeholder "Lucas Wooley"). |
| `PHONE` | Shows Call and Text buttons everywhere, and a Call button on the phone bottom bar. |
| `BOOKING` | A Cal.com (or similar) link. Adds "Book a time to talk", opened inside the site. |
| `PRICE_FROM`, `PRICE_MONTH` | Shows "Most sites start around $___ to launch, then about $___ a month." |
| `QUOTE`, `QUOTE_BY` | Shows one real customer quote in the Work section. Only use a real one. |

Then rebuild (or just ask me):
```
python sites/_kit/build.py sites/self-live
python sites/self-live/extras.py
```

## 3. A real auto-reply email (needs a free account)

The page already thanks the visitor instantly ("Got it. Thank you. I'll reply within a day"). Netlify cannot email the visitor back by itself. To add that:
use a free **Zapier** (or Make) account: trigger "Netlify: New Form Submission", action "Gmail: Send Email" to the submitter's email address.

Suggested text:
> Subject: Got your message
>
> Hi {name},
>
> Thanks for reaching out. I got your message and I'll reply within a day. If it's urgent, call or text me at {your phone}.
>
> {your name}
> Websites for local businesses, Northern Nevada

## 4. Count your visitors (optional)

Right now you can't see visits. The privacy-friendly options are GoatCounter (free) or Plausible (paid). Either needs an account and one small script. If you add one, change the privacy note on the site so it stays true: it currently says "no analytics".

## 5. When you have a domain

Tell me the domain. I will turn off the hide-from-Google setting, add the sitemap and canonical link, and update the share-preview image address. Until then the site is hidden from search engines on purpose.

## Already done in `live-plus`

- Link previews: texts and social posts show a proper preview card (title, description, image).
- Friendlier confirmation after sending the form.
- No more `mailto:` links: they do nothing on a PC without a mail app. The email is now tap-to-copy everywhere, including when the form fails.
- A ballpark price line and a testimonial slot (hidden until you fill them in).
- Work screenshots anonymized: no other business's name, town, rating or phone number shows. They use "Your Name Barber Shop", "Your Town" and a sample number.
- Tighter page: removed 2 of the scenarios, 2 of the objections and 2 FAQ items.
- Phone polish: header on one line, smaller "Questions?" button, no decoration over the headline, no sideways scroll even at 320px.

---

## v2 (the redesign): `deploy\v2`

This is the newest version: black, white and one orange accent, bold Archivo headlines, and the opening where the pieces of a complete business site swirl across the whole screen like a tornado and assemble into one layout as you scroll. It plays by itself every time the site is opened (about 6 seconds, once per visit, any touch or scroll stops it).

### Prices and packages (edit in one place)
Open `sites\self-v2\site.json` and change these. The numbers I put in are **starting suggestions, not facts**: set them to what you actually want to charge.

| Setting | Currently | Meaning |
|---|---|---|
| `P1_LAUNCH`, `P1_MONTH` | $400, $30 | Starter: one-time launch fee, then per month |
| `P2_LAUNCH`, `P2_MONTH` | $650, $45 | Growth |
| `P3_LAUNCH`, `P3_MONTH` | $950, $75 | Complete |

Then rebuild:
```
python sites/_kit/build.py sites/self-v2
python sites/self-v2/extras.py
```
Each package has an "I'm interested" button. It jumps to the contact form with that package already chosen, and the message you receive includes a field called `package`. (After you redeploy, Netlify picks up the new field automatically once form detection is on.)

The "Questions?" helper also answers pricing and package questions using these same numbers.
