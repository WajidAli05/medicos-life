# Demo / for-sale mode

This site ships in **demo mode**, which is what the public sale listing shows.

| | Demo mode (default) | Live mode |
|---|---|---|
| Clinic data | Invented demo clinic ("Aurelia", London) | The real clinic's data |
| Ownership banner | Shown at the top | Hidden |
| Watermarks | Tiled across the page + corner badge + section tags | None |
| Right-click & image dragging | Blocked | Normal |
| Console / source notice | Shown | None |
| Search engines | `noindex, nofollow` | Indexable |

## Switching it off (for the buyer)

One environment variable controls everything:

```bash
NEXT_PUBLIC_DEMO=false
```

Set it in `.env.local` (or in your host's environment settings) and rebuild. Every banner,
watermark, guard and demo detail disappears, and the site renders the real content.

## Where things live

| What | File |
|---|---|
| Owner name, banner wording, listing URL | `src/lib/site.ts` |
| Demo clinic data (names, address, reviews) | `src/lib/data/demo.ts` |
| Real clinic data | `src/lib/data/client.ts` |
| Which profile is used | `src/lib/data/index.ts` |
| Banner | `src/components/demo/DemoBanner.tsx` |
| Watermarks | `src/components/demo/Watermark.tsx` |
| Right-click / console guards | `src/components/demo/DemoGuards.tsx` |

To link the banner to your Flippa listing, set `listingUrl` in `src/lib/site.ts`.

## Before you hand the repo to a buyer

The real clinic's phone number, address, staff photos and Google reviews are still in the
repository. Remove them:

1. Replace the contents of `src/lib/data/client.ts` with:
   ```ts
   export { demoProfile as clientProfile } from "./demo";
   ```
2. Delete `public/brand/` and `public/team/` (the clinic logo and the founder's photo).

## A note on what this protects

The watermarks, banner and copyright notices establish ownership and make copied screenshots
obvious. The right-click block only deters casual copying: anyone can still read the page source
in their browser. Keep the watermarks on until the sale completes.
