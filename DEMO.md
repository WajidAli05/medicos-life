# Demo mode

The site ships **clean and anonymous**: the design is shown exactly as it will be delivered,
with invented clinic data instead of any real business details.

## Switches

All three are environment variables (see `.env.example`), and all are optional.

| Variable | Default | What it does |
|---|---|---|
| `NEXT_PUBLIC_DEMO` | `true` | `true` = anonymous demo clinic ("Aurelia", London). `false` = the real clinic's data. |
| `NEXT_PUBLIC_WATERMARK` | `false` | `true` = "for sale" banner, tiled watermarks, corner badge, section tags, right-click guard and console notice. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` | `true` = allow search engines. Anonymous demo builds are `noindex` by default. |

So:

- **Public sale listing (current setup):** defaults. Clean look, anonymous data, not indexed.
- **If you want watermarks back:** `NEXT_PUBLIC_WATERMARK=true`.
- **Buyer's live site:** `NEXT_PUBLIC_DEMO=false` and `NEXT_PUBLIC_ALLOW_INDEXING=true`.

## What "anonymous" means

The demo profile invents everything: clinic name, address, phone (an Ofcom fictional number),
staff names and photos, reviews and prices. No real person or business appears.

## Where things live

| What | File |
|---|---|
| The switches and owner details | `src/lib/site.ts` |
| Anonymous demo data | `src/lib/data/demo.ts` |
| Real clinic data | `src/lib/data/client.ts` |
| Which profile is used | `src/lib/data/index.ts` |
| Banner / watermarks / guards | `src/components/demo/` |

## Before you hand the repo to a buyer

The real clinic's phone number, address, staff photos and Google reviews still exist in the
repository even though the site doesn't show them. Remove them:

1. Replace the contents of `src/lib/data/client.ts` with:
   ```ts
   export { demoProfile as clientProfile } from "./demo";
   ```
2. Delete `public/brand/` and `public/team/` (the clinic logo and the founder's photo).
