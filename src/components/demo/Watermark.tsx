import { owner, watermarkText } from "@/lib/site";

/**
 * Tiled diagonal watermark across the whole page, plus a corner badge.
 * Drawn twice (dark + light) so it stays legible on cream and on the dark sections,
 * and sits above modals so screenshots of any part of the site carry the mark.
 */
/** One horizontal strip of repeating text; the whole layer is rotated in CSS so tiles never clip */
function strip(color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='150'>
<text x='0' y='28' font-family='Manrope,Arial,sans-serif' font-size='17' font-weight='700' letter-spacing='3' fill='${color}'>${watermarkText}</text>
<text x='150' y='103' font-family='Manrope,Arial,sans-serif' font-size='17' font-weight='700' letter-spacing='3' fill='${color}'>${watermarkText}</text>
</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

export default function Watermark() {
  const layer = "pointer-events-none absolute inset-[-60%] rotate-[-24deg]";
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[85] overflow-hidden">
        <div className={layer} style={{ backgroundImage: strip("rgba(15,26,24,0.10)"), backgroundRepeat: "repeat" }} />
        <div className={`${layer} mix-blend-overlay`} style={{ backgroundImage: strip("rgba(255,255,255,0.45)"), backgroundRepeat: "repeat" }} />
      </div>

      {/* centred so it doesn't cover buttons; the banner carries the notice on small screens */}
      <div className="pointer-events-none fixed bottom-3 left-1/2 z-[86] hidden -translate-x-1/2 lg:block">
        <div className="flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-[0.68rem] font-semibold text-cream shadow-lg backdrop-blur-sm">
          <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-[#e0442f]" />
          <span>
            © {owner.year} {owner.name} · demo, not licensed
          </span>
        </div>
      </div>
    </>
  );
}

/** Small inline mark for hero / 3D panels, so cropped screenshots stay watermarked */
export function DemoTag({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-[45] rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] backdrop-blur-sm ${
        tone === "dark" ? "bg-black/35 text-white/80" : "bg-white/60 text-ink/70"
      } ${className}`}
    >
      {owner.name} · demo
    </span>
  );
}
