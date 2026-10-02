# Slice Salon: feel brief

## Feel words
1. **Chic** : their own word ("chic, glam, and fun"). Clean layout, confident whitespace, sharp type.
2. **Glam** : also their word. Cherry pink accent, a mirror-bulb station in the footer, a little shine.
3. **Fun / Arts District** : Midtown Reno is murals and small galleries. Poster-like type, flat bold color blocks, a few playful angles.
4. **Colorful** : reviewers talk about custom and vivid color (pink to purple ombre with teal). Hair-color swatches are the main art.
5. **Sharp** : the name. One clean diagonal cut runs through the wordmark and repeats as the section divider.

## Palette (CSS tokens)
```
--paper:   #F5EFE8  /* background, warm porcelain */
--paper-2: #ECE2D7  /* surface band */
--card:    #FFFAF5  /* cards */
--ink:     #1F1A1E  /* text, 15.6:1 on paper */
--ink-2:   #4A4148  /* muted text, ~9:1 */
--ink-3:   #675D64  /* small labels, ~5.6:1 */
--cherry:  #B0154F  /* accent + buttons, ~6.5:1 on paper, white on it 6.9:1 */
--teal:    #0D6764  /* second accent, ~6.4:1 */
--copper:  #C47A2E  /* decorative only */
--orchid:  #7E3B96  /* decorative swatch only, flat (no gradients) */
--night:   #1F1A1E  /* dark band */
--pink-hi: #FF8DB5  /* accent text on dark, ~8:1 */
```

## Type
- Display: **Syne 700** (wide, art-district poster feel; fits "SLICE" cut in two)
- Labels: **Space Grotesk 500/600**, uppercase, tracked
- Body: **Figtree 400/500/600**, 17px

## Motifs
1. The slice: one diagonal cut line through the SLICE wordmark, top half shifted along the cut
2. Color swatch fan: a fanned salon swatch book of wavy locks in Platinum, Honey, Copper, Cherry, Orchid, Teal, Espresso
3. Open shears (thin line) crossing the cut line
4. Slash separators "/" in the services strip and labels
5. Category icons in one thin line style: comb + shears (cuts), color bowl + brush (color), flat iron (smoothing), weft strand (extensions), brow arch (brows and waxing)
6. A clipped lock of hair curl used as a bullet
7. Mural-like flat circles and half-moons behind sections (very light)
8. Footer: a styling station with a round bulb mirror, salon chair, plant and swatch ring

## Ambient
- The swatch fan opens as you scroll the hero (rotation set straight from scrollY, no lag)
- The shears snip once when Services & Prices first enters view
- In the footer the mirror bulbs light up one by one once, and one snipped curl falls
- All off under prefers-reduced-motion
