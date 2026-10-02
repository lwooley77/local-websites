# D & D Barbers: feel brief

## Feel words
1. **Early shift**: doors open at 7 AM Tuesday to Saturday and close at 3:30 (12:30 Saturday). This is a before-work, on-the-way-to-the-job shop. The clock is the whole personality.
2. **Plain-spoken**: a Google reviewer says looks aren't everything and that it is no bourbon-and-haircut place, but the barbers are very good. No frills, good work.
3. **Working Reno**: Kietzke Lane in South Central Reno is shops, warehouses and service businesses, not a downtown boutique strip. Private lot out front.
4. **Steady**: decades-old listings, same hours everywhere, walk-ins, clipper cuts and shaves. A regulars' shop.
5. **Dawn light**: 7 AM in Reno means sun coming up over the Virginia Range to the east.

## Palette (dark "pre-dawn shop" with a manila time card and sunrise orange)
```css
--bg:      #13221c;  /* bottle green, near black: old barber chair vinyl / shop at 6:45 AM */
--bg2:     #1b2f27;  /* surface */
--bg3:     #22392f;  /* raised surface, lines */
--text:    #f2ead9;  /* warm cream, 13.8:1 on bg */
--muted:   #c9c0ab;  /* 9.1:1 on bg */
--muted2:  #a3ad9f;  /* 7.1:1 on bg, 6.1:1 on bg2 */
--sun:     #f2913d;  /* sunrise orange, buttons and accents, 7:1 with bg as text color */
--card:    #efe3c8;  /* manila time card */
--ink:     #1d1a14;  /* card ink, 13.6:1 on card */
--stamp:   #b8321f;  /* time clock red stamp, 4.7:1 on card */
--ink2:    #6b604c;  /* faint card print, 4.85:1 on card */
```
No gradients on text, no blue or purple. The only gradient is the dawn sky in the footer scene.

## Type
- Display: **Archivo Black**. Heavy, wide, hand-painted-sign weight. The "&" in D & D becomes a graphic mark.
- Labels: **Oswald 500/600**, uppercase, tracked. Reads like the stamped print on a time card or a punch clock.
- Body: **Libre Franklin 400/500/600**. Plain, sturdy, very readable on phones.
(Sibling demos use Anton, Karla, Plex Mono, Young Serif and Josefin, so none of those.)

## Motif ideas
1. The shop clock: a round wall clock in the hero whose dial has the open window (7:00 to 3:30) shaded orange, hands set to the real time in Reno.
2. Manila time card: hours shown as a punch card, IN 7:00 / OUT 3:30 stamped per day, today's row stamped red.
3. Punch holes and perforated tear lines as section dividers.
4. The big ampersand from the name as a recurring mark (favicon, about section, footer).
5. Clipper outline icon (haircuts), straight razor icon (shaves), hot towel icon, comb.
6. Sun rising over the Virginia Range: a low ridge silhouette with the sun.
7. Kietzke Lane strip-front building with a pole and a lit "OPEN" card in the footer.
8. "Card No. 3024" (the street number) printed on the time card.

## Ambient touches (subtle, all off under reduced motion)
1. Hero clock hands set from the real Los Angeles time, updated once a minute (no loop animation; the second hand is left off on purpose).
2. Footer sunrise: the sun's height and the sky warmth are set straight from scroll position as the footer comes into view.
3. Footer OPEN card and window light switch on only during real opening hours.
4. Today's row on the time card gets a red "stamp" press when it first scrolls into view.
