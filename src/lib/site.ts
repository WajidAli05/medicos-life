/**
 * Two independent switches.
 *
 * 1. ANONYMOUS — which data the site shows.
 *      true  (default) → invented demo clinic: no real names, phone, address or reviews
 *      false           → the real clinic's data   (NEXT_PUBLIC_DEMO=false)
 *
 * 2. WATERMARKS — the "for sale" banner, tiled watermarks and copy guards.
 *      false (default) → clean site, nothing overlaid
 *      true            → ownership banner + watermarks  (NEXT_PUBLIC_WATERMARK=true)
 *
 * SEO: a demo/anonymous build is kept out of search results. Set
 * NEXT_PUBLIC_ALLOW_INDEXING=true once it's the buyer's real, live site.
 */
export const ANONYMOUS = process.env.NEXT_PUBLIC_DEMO !== "false";
export const WATERMARKS = process.env.NEXT_PUBLIC_WATERMARK === "true";
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" || !ANONYMOUS;

/** kept for the older flag name used around the data layer */
export const DEMO = ANONYMOUS;

export const owner = {
  name: "Wajid",
  status: "For sale",
  /** shown in the top banner when WATERMARKS is on */
  headline: "This design is FOR SALE",
  sub: "Original design & build by Wajid",
  /** paste your Flippa listing URL here to link the banner */
  listingUrl: "",
  notice:
    "Demo preview. Design, layout, code and animations © Wajid. All content shown is sample data and not licensed for reuse or redistribution.",
  year: new Date().getFullYear(),
};

/** repeated across the tiled watermark */
export const watermarkText = `${owner.name.toUpperCase()} · FOR SALE · DEMO`;
