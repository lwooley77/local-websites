# Feel brief: Saint Patrick Yard Maintenance LLC

## Feel words
1. **Hard-working** - every review talks about work ethic: "very hard worker", "hard work that nobody else wanted", one man outworking a crew.
2. **Neighborly** - Patrick writes "Hey neighbors" on Nextdoor, is a Nextdoor Neighborhood Fave, answers texts fast. Plain talk, first names.
3. **High desert** - Reno, Washoe Valley, Carson City, Dayton: sagebrush, Jeffrey pine, decorative rock, Sierra skyline, dry gold light, tumbleweeds.
4. **Tidy finish** - the payoff in reviews is "cleaned up everything and hauled it away". Raked lines, clean edges, a swept driveway.
5. **Saint Patrick** - the name gives a quiet green clover mark. Used once as a brand seal, never as shamrock wallpaper.

## Palette (CSS tokens, AA checked)
```
--paper:#F4F0E6;   /* limestone / dry grass paper, main bg */
--paper-2:#EBE5D6; /* surface */
--paper-3:#E0D8C4; /* deeper surface, rules */
--ink:#1B271F;     /* 13.6:1 on paper */
--ink-2:#46534B;   /* 7.1:1 */
--ink-3:#5A665E;   /* 5.3:1 (4.65 on paper-3) */
--pine:#163021;    /* dark bands: hero card, footer */
--pine-2:#21422F;
--clover:#2E6B3F;  /* brand green, 5.6:1 on paper */
--rust:#A84B1A;    /* estimate CTA, white text 5.7:1 */
--sun:#E3A74A;     /* highlight on pine, 6.7:1 */
--sage:#B9C7B8;    /* secondary text on pine, 8:1 */
```

## Type
- Display: Bricolage Grotesque 700/500. Sturdy and a little hand-made, reads like truck-door lettering, not a salon serif.
- Labels: IBM Plex Mono 500. Work-order / estimate-slip voice for small caps labels and numbers.
- Body: Figtree 400/600. Very readable at 17px for older homeowners.

## Motif kit (thin 1.6px line, ink on paper)
1. Three-leaf clover seal (brand mark, favicon)
2. Jeffrey pine
3. Stump with growth rings (tree & stump removal)
4. Gabion basket of rock (rock work, from a real review)
5. Wheelbarrow with branches (cleanups and hauling)
6. Rake and raked lines (section dividers)
7. Fence pickets (fence work)
8. Grass tuft / sod roll (lawn)
9. Sierra skyline with snow lines
10. Tumbleweed (footer)

## Layout ideas
- Hero art framed as a carbon "work order" card with a stamp: FREE ESTIMATE / CALL OR TEXT.
- How it works as a single raked path with three stops (not three cards).
- Service area as a schematic route map: Spanish Springs and Reno down the 580 through Washoe Valley (lake shape) to Carson City, then east to Mound House and Dayton.

## Ambient (all off under prefers-reduced-motion)
1. Hero sun sinks behind the Sierra as you scroll (set straight from scrollY).
2. Now and then a single dry cottonwood leaf drifts across the hero (a few times max).
3. A tumbleweed rolls across the footer scene once when it comes into view.
