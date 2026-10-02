# Electric Sun: feel brief

## Feel words
1. **Sunlit** : the name, the tanning roots (since 2003), and "the beautiful yellow building" on Main Street that they use as their own landmark.
2. **Neighborly** : their mission line is a "neighborhood retreat", a spa "home away from home where you can drop in and be yourself". Walk-ins accepted, kid friendly, beer and wine.
3. **Glowing** : tans, HydraFacial, peels, gel shine, lash sets. Everything on the menu ends in glow.
4. **Small-town bright** : Fernley high desert, Main Street, big sky, the hills around the Lahontan Valley. Not city-slick; warm, a bit retro, honest prices.
5. **A spark of fun** : feathers and tinsel, vivid colors, a boutique with jewelry and handbags. "Electric" earns a zig-zag.

## Palette (CSS tokens)
```
--cream:   #FFF6E6;  /* page */
--sand:    #FCEBCB;  /* surface 1 */
--butter:  #F9DD9C;  /* surface 2 */
--ink:     #2A1A10;  /* text, 16.6:1 on cream */
--ink-2:   #5A4232;  /* muted text, 8.9:1 on cream */
--ink-3:   #6F5442;  /* muted text 2, 6.6:1 on cream */
--sun:     #FFC21A;  /* sun yellow (fills only, ink text on it 11:1) */
--ember:   #B93A0B;  /* burnt orange accent text, 5.6:1 on cream */
--coral:   #EE6A3D;  /* decor only */
--dusk:    #2A1A10;  /* dark bands; cream text 16.6:1, sun text 11:1 */
```
No blue/purple, no gradient text. Sun yellow is a fill and a ray colour, never body text on light.

## Type
- Display: **Young Serif** (warm, chunky, 70s sign-painter feel that fits a tanning salon from the 2000s on a small-town Main Street)
- Labels: **Josefin Sans 600** (geometric, retro tracking, uppercase small labels)
- Body: **Figtree 400/500/600** (open and very readable at 17px)

## Motif kit (thin line SVG, 1.5px stroke, ink or ember)
1. The Electric Sun: a disc with alternating straight and zig-zag rays (the "electric" in the name)
2. Horizon hills: the low desert ridgeline around Fernley
3. The yellow building: a simple two-storey storefront with awning, in sun yellow
4. Scissors (hair)
5. Nail bottle (nails)
6. Lash curve (lashes and brows)
7. Leaf drop (skin care)
8. Hands / stone stack (massage)
9. Wax strip / spark (waxing)
10. Half sun with rays (tanning) and a smile tooth outline (whitening)

## Ambient touches (subtle, off under reduced motion)
1. Hero sun rays rotate very slowly (one turn per 120s), rays set straight from scrollY for a slight turn while scrolling.
2. Hours section: the sun sits at today's real position on a day arc (sunrise to sunset, Fernley time).
3. Footer scene: Main Street at dusk with the yellow building, hills and a low sun, the building windows glowing after closing.
