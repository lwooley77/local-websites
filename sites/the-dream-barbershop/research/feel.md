# Feel: The Dream Barbershop

## Feel words
1. **Night-sign** : the name is "The Dream". Read it as a lit shop sign after dark, a crescent moon, stars. Not cute sleepy clouds; a confident night-time glow.
2. **Classic** : their own bio is set in heavy bold serif caps ("Haircuts | Shaves | Experiences"). Straight razors, barber pole, gold leaf window lettering.
3. **Sharp** : a young, skilled six-chair team doing fades, designs and beard work. Clean lines, precise rules, tight type.
4. **Family / neighborhood** : kids cuts from age 2, walk-ins welcome, a shop on California Ave in Reno 89509.
5. **Warm** : reviewers keep saying welcoming and classy. Warm black and brass, not cold blue.

## Palette (CSS tokens)
```
--ink:   #12100e;  /* page background, warm black */
--ink-2: #1b1815;  /* surface */
--ink-3: #262019;  /* raised surface / cards */
--cream: #f4ecdf;  /* main text  (17.0:1 on ink) */
--sand:  #d4c8b4;  /* secondary text (11.5:1 on ink) */
--dust:  #a99c86;  /* tertiary text (6.6:1 on ink, 5.6:1 on ink-3) */
--brass: #e0ad5e;  /* accent, button fill with ink text (9.6:1) */
--brass-2:#b9893f; /* lines, rules, decor only */
--pole:  #c8432f;  /* barber-pole red, decor and small marks only, never body text */
```

## Type
- Display: **Young Serif** 400. A chunky, warm, vintage-sign serif. Feels like gold window lettering without being a wedding script.
- Labels: **Josefin Sans** 600, wide-tracked caps. Art-deco shop-door feel.
- Body: **Karla** 400/500/700. Friendly, very readable at 17px.

## Motif kit (thin line, brass stroke)
1. Crescent moon whose inner curve is a straight-razor edge
2. Scissors drawn as a star constellation (dots joined by hairlines) : the hero centerpiece
3. Barber pole with slowly turning red / cream stripes
4. Four-point sparkle stars
5. Straight razor (category icon: shaves / combos)
6. Comb (category icon: haircuts)
7. Small crown-free "kid" star cluster (kids icon) drawn as a tiny two-star constellation
8. Clock with a moon in it (after-hours service icon)
9. Sierra ridge line (footer, Reno)
10. Window-lettering rule: double line with a dot

## Ambient touches
- A few hero stars twinkle at long, offset intervals (opacity only).
- The moon in the nav mark and the hero fills from crescent to near-full as you scroll (set straight from scrollY).
- One shooting star crosses the Reviews sky the first time it scrolls into view.
- Barber pole stripes drift slowly in the hero and footer.
All off under prefers-reduced-motion.
