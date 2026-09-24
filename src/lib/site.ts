/**
 * Demo / sale mode.
 *
 * ON  (default) → invented demo clinic data, ownership banner, watermarks, no search indexing.
 * OFF           → the real clinic's data and a clean, unwatermarked site.
 *
 * The buyer turns everything off with a single environment variable:
 *   NEXT_PUBLIC_DEMO=false
 */
export const DEMO = process.env.NEXT_PUBLIC_DEMO !== "false";

export const owner = {
  name: "Wajid",
  status: "For sale",
  /** shown in the top banner */
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
