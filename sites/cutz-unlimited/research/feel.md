# Feel brief: Cutz Unlimited

## Feel words
1. **Neighborhood regular**: reviewers have sat in the same chair for 3 and 13 years. A South Virginia St shop, not a lounge.
2. **Precise**: fades, skin fades, tapers. The fade itself (graded density, guard numbers) is the visual idea.
3. **Unfussy**: "Cutz" with a z, call to book, $$ price range. Plain words, big buttons.
4. **Every head, every style** ("Unlimited"): men, kids and women's cuts, shaves, beard work.
5. **Reno**: Sierra ridge to the west, the long run of South Virginia signage.

## Palette (light paper + ink, barber-pole red, steel)
```
--paper:   #f2ede3;  /* background */
--paper-2: #e8e1d3;  /* surface */
--paper-3: #dcd3c1;  /* surface deeper / rules */
--ink:     #191816;  /* text 16.4:1 on paper */
--ink-2:   #45413a;  /* muted text 9.2:1 */
--ink-3:   #6b6559;  /* small labels 5.0:1 */
--red:     #a3271f;  /* barber pole red, 6.6:1 on paper, used for buttons with paper text */
--steel:   #2f4a5c;  /* barber pole blue as flat steel */
--night:   #161a1e;  /* dark sections */
--cream:   #f2ede3;  /* text on night 15.9:1 */
```

## Type
- Display: Anton (tall condensed, shop signage, guard numbers)
- Labels: IBM Plex Mono 500 (ruler and guard-size labels, ticket feel)
- Body: Karla 400/500/700 (warm, readable)

## Motifs
1. The fade block: stacked bars thinning from dense to skin, guard ruler (#4 to 0) alongside
2. Barber pole: flat red / paper / steel stripes in a capsule, stripes move with scroll
3. Straight razor line drawing
4. Comb teeth as a divider rule
5. Clipper guard numbers as section numbers
6. Hot towel steam wisps (shaves category)
7. Scissors line icon (haircuts category)
8. Sierra ridge line (footer and hours)
9. Storefront with awning and OPEN sign (footer scene)

## Ambient touches
- Hero pole stripes driven directly by scrollY (no loop)
- Steam wisps rise once when Beard & Shave tab is shown
- Footer storefront "OPEN" sign lights only when the shop is actually open (live hours)
- All off under prefers-reduced-motion
