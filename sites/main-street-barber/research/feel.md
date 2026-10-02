# Feel: Main Street Barber Shop, Gardnerville

## Feel words
1. **Main Street** : the shop sits on US 395, which is Main Street through Gardnerville. The green street-name blade and the US 395 route shield are the ownable symbols. Nobody else in the portfolio owns "the road".
2. **Valley ranch town** : Carson Valley is hay fields, round bales, fence posts, hawks over the pasture and Jobs Peak behind it all. Sage, alfalfa green and hay gold, not black-and-brass.
3. **Old-time, two chairs** : reviewers say "old school", "Old-Time Barbershop", two barbers (Dan and Jeff). Honest, unhurried, no lounge.
4. **Regulars** : 10+ year clients, a son cut from baby to 22. Kids welcome. The page should feel like a familiar stop on the way through town.
5. **Easy humor** : "Best buzz job east of Kauai and west of Cuba." Copy can be plain and a little dry, never salesy.

## Palette (CSS tokens, light sage + street-sign green + hay)
```
--bg:     #EEF1E7;  /* sagebrush mist background */
--surf:   #E2E8D8;  /* card */
--surf2:  #D3DCC6;  /* deeper sage, rules */
--ink:    #14231B;  /* text, 15.5:1 on bg */
--ink2:   #34473B;  /* muted text, 9.4:1 */
--ink3:   #4D6053;  /* labels, 6.4:1 */
--sign:   #0F5A3A;  /* street-sign green, buttons with white text 7.9:1 */
--sign-d: #0B3F29;  /* dark green sections */
--white:  #F7F8F2;  /* text on green */
--hay:    #E7B748;  /* hay gold, decor + text on dark green (8.1:1) */
--hay-dk: #7A5410;  /* hay gold as text on light (6.0:1) */
--line:   #F2C94C;  /* road centerline yellow, decor only */
```

## Type
- Display: Bricolage Grotesque 700 (a gothic with ink-trap character, like old wood-type posters on a ranch-town storefront).
- Labels: Bebas Neue, tracked caps (highway and mile-marker signage; also the 395 in the route shield).
- Body: Work Sans 400/500/600 (plain, sturdy American grotesque, very readable at 17px).
- None of these three are used together in any sibling demo; no Karla, Anton, Young Serif or Josefin like the other barbershops.

## Motif kit
1. Green street-name blade "MAIN ST" with "1428" block number on a post (hero centerpiece)
2. US 395 route shield (favicon, nav mark, hours card)
3. Road with yellow center dashes (dividers; vertical road line down the page margin)
4. Mile-marker posts as section numbers
5. Round hay bales and split-rail fence (footer, about)
6. Jobs Peak / Carson Range layered silhouette (footer, flat fields first)
7. Red-tailed hawk silhouette (ambient)
8. Two classic barber chairs in thin line (about)
9. Category icons: shears (haircuts), straight razor with towel steam (shaves), moustache and comb (beard)
10. Highway guide-sign panel style for the price list (white border on green, exit-arrow on each row)

## Ambient touches
- A road center line in the left margin that fills as you scroll (value set straight from scrollY, desktop only).
- A hawk that glides across the hero sky once, a few seconds after load, and again when the footer comes into view.
- Footer scene at dusk: Main Street, fence, round bales, Jobs Peak; a pickup's headlights pass once when the footer is reached.
- All off under prefers-reduced-motion.
