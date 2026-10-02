# Feel: Deja Vu Salon (Minden)

## Feel words
1. **Seen twice**: the name is "already seen". In a salon that is the mirror: you see yourself, then you see yourself again, done. Two facing station mirrors make an endless run of arches. Echoes, reflections, a doubled outline.
2. **Carson Valley**: the salon sits on US Highway 395 in Minden. Jobs Peak and the Sierra front stand right over town and turn pink at sunset (alpenglow). Hay fields, the long straight 395, big sky.
3. **Bright boutique**: reviewers call it a "very nice boutique", "very spacious", "very clean", with "positive energy". Light, airy, a bit of glamour (vanity bulbs), never dark or moody.
4. **Regulars**: open since 2006, their own stated values are "quality, education, and customer loyalty", and clients write about the same stylist for 15 years. Coming back again and again is literally deja vu.
5. **Everything under one roof**: cuts, color, foils, perms, keratin, up-styles, makeup, extensions, nails, waxing, massage, with many stylists to choose from.

## Palette (cool mirror-mist + spruce + alpenglow; deliberately not the warm cream of the other demos)
```
--mist:    #ECEFEA;  /* page, cool silvered sage like mirror glass */
--glass:   #F8F9F6;  /* raised surface */
--sage:    #DCE3DA;  /* second surface, rules */
--spruce:  #172A28;  /* ink + dark sections (Sierra pines at dusk) */
--muted:   #43534F;  /* secondary text on mist, 7.0:1 */
--muted2:  #52615C;  /* tertiary text, 5.6:1 on mist, 5.0:1 on sage */
--glow:    #A3422A;  /* alpenglow accent for text/buttons, 5.4:1 on mist, 4.8:1 on sage */
--peach:   #F0B9A2;  /* alpenglow fill, accent on spruce (8.7:1) */
--bulb:    #F6D9A8;  /* vanity bulb warm light, decor only */
```
White text on --glow = 6.2:1. --mist on --spruce = 13.0:1.

## Type
- Display: **Instrument Serif** 400. Tall, narrow, fashion-magazine serif. The name at huge size, upright only (no italic accent words).
- Labels: **Syne** 600/700, uppercase, wide tracking. Slightly odd geometry, feels like a boutique sign.
- Body: **Manrope** 400/500/700. Clear at 17px on phones.

## Motif kit (thin 1.5px line style, spruce ink)
1. Arched station mirror ringed with vanity bulbs (hero frame)
2. Two facing mirrors: receding arches (the deja vu tunnel, About)
3. Jobs Peak / Sierra front silhouette with its reflection below a waterline
4. Shears (cuts), round brush (style), foil square (color), perm rod (texture)
5. Nail polish bottle (nails), wax strip / brow arch (waxing), hot stones stack (massage), lipstick (makeup)
6. US 395 route shield (location)
7. Doubled outline echo behind display type
8. Small four-point glint star

## Ambient touches
- Hero: vanity bulbs warm up one after another on load, then a single glint sweeps across the mirror glass. Once only.
- Hero reflection: the mirrored mountains drift a few pixels with scrollY (set directly, no lag).
- Section titles: a faint outlined echo of the word sits offset behind it and settles into register once when it scrolls in (the deja vu moment). Text itself is always visible.
- Footer: Carson Valley at alpenglow; a pair of tail lights drives up 395 once when the footer comes into view.
- All off under prefers-reduced-motion.
