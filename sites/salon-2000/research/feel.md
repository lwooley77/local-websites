# Feel brief: Salon 2000

## Feel words
1. **Millennium-born**: opened spring 1999 under the name of the year about to arrive. The number 2000 is the brand. Read it as clean turn-of-the-century futurism (orbits, rings, flip-clock numerals), never chrome bubbles or purple gradients.
2. **Long-standing**: same plaza corner (Sparks Blvd and E Prater Way) since 1999; reviewers stay 10 to 15 years; Neighborhood Favorite seven years running.
3. **Full-service**: hair, color, perms, braids, nails and nail art, waxing, skin care, makeup, and now Botox with an APRN. A whole team of eleven names on the holiday card.
4. **Friendly and funny**: "keeps you laughing while in the chair", their own word BeYouTiFul. Warm, a little playful, never stiff.
5. **Neighborhood Sparks**: a shopping-plaza salon for East Sparks families, not a downtown boutique.

## Palette (CSS tokens, AA checked)
```
--bg:     #F1EFEA  /* soft silver-cream, cool-leaning */
--surf:   #E6E4DE  /* surface */
--surf2:  #DAD8D1  /* deeper surface, rules */
--ink:    #18181B  /* 15.4:1 */
--ink2:   #44464D  /* 8.2:1 */
--ink3:   #5E6169  /* 5.4:1 */
--tang:   #B23C0C  /* tangerine accent text + buttons, 5.2:1 on bg, white on it 5.9:1 */
--night:  #1A1B1F  /* graphite bands */
--on:     #F1EFEA  /* text on night 15:1 */
--on2:    #C9CBD0  /* 10.6:1 */
--apricot:#FF9B5E  /* accent on night 8.3:1 */
--blush:  #F4B8A6  /* decor + accent on night 10:1 */
```
No purple/blue, no gradient text. Tangerine + graphite reads "year 2000 product design" (think clear plastics and orange accents) without the cliches.

## Type
- Display: **Unbounded** 500/700. Wide, round, slightly futurist; the 2000 numerals are its best feature.
- Labels: **Outfit** 600, uppercase, tracked.
- Body: **Manrope** 400/500/700, 17px.
(Siblings use Anton, Young Serif, Josefin, Karla, Syne, Archivo, Bricolage; none of those.)

## Motifs (1.6px line, round caps)
1. The 2000 mark: the three zeros are rings; inside them a pair of shears, a polish bottle and a leaf drop (hair / nails / skin)
2. Orbit rings: thin concentric ellipses behind the hero, turned with scroll
3. Flip-clock tiles: "Since 1999" set as split flap digits
4. Hand mirror with a glint
5. Hair curl spiral (bullets)
6. Category icons: shears + comb (hair), polish bottle (nails), wax strip / leaf drop (skin & waxing), brush (makeup), droplet + plus (Botox)
7. Seven small year tiles 2019 to 2025 for the Neighborhood Favorite run
8. The corner street sign: "SPARKS BLVD / E PRATER WAY" blades on a post (footer scene with plaza storefront and East Sparks hills)
9. Holiday card signature row: the team's first names in a row

## Ambient touches
- Hero flip tiles turn 1999 to 2000 once on load (off under reduced motion)
- Orbit rings rotate a few degrees as you scroll, set straight from scrollY
- A single glint crosses the hand mirror ring every ~9 s, only while hero is in view
