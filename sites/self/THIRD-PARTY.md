# Third-party code in this site

All of it is copied into the project (`src/vendor/`) and bundled into the page at build time. The live site loads nothing from outside servers.

| Library | Version | Used for | License | Source |
|---|---|---|---|---|
| GSAP | 3.13.0 | scroll animations, timelines, matchMedia | GreenSock "Standard no-charge" license, free for commercial sites (gsap.com/standard-license) | https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js |
| ScrollTrigger (GSAP plugin) | 3.13.0 | pinning, scrubbing, scroll-triggered effects | same as GSAP | https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js |
| Lenis | 1.1.20 | smooth scrolling | MIT | https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js |

Fonts (Fraunces, Work Sans) come from @fontsource and are under the SIL Open Font License.

To add or update a library: put the file in `src/vendor/` (files are bundled in name order, so prefix a number), then run
`python sites/_kit/build.py sites/self` and `python sites/self/extras.py`.
