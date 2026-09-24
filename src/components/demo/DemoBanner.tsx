import { BadgeCheck, Lock } from "lucide-react";
import { owner } from "@/lib/site";

/** Fixed ownership bar above everything. Height is 36px (see BANNER_H). */
export const BANNER_H = 36;

export default function DemoBanner() {
  const body = (
    <>
      <span className="flex items-center gap-1.5 font-semibold text-blush">
        <BadgeCheck className="size-3.5" />
        {owner.headline}
      </span>
      <span className="hidden opacity-30 sm:inline">|</span>
      <span className="hidden sm:inline">{owner.sub}</span>
      <span className="hidden opacity-30 md:inline">|</span>
      <span className="hidden items-center gap-1.5 opacity-80 md:inline-flex">
        <Lock className="size-3" />
        Demo preview · sample content · not licensed for reuse
      </span>
      <span className="opacity-80 sm:hidden">· by {owner.name}</span>
    </>
  );

  return (
    <div
      style={{ height: BANNER_H }}
      className="fixed inset-x-0 top-0 z-[90] flex items-center justify-center gap-3 overflow-hidden bg-ink px-4 text-[0.72rem] text-cream"
    >
      {/* slow sheen so the bar reads as deliberate, not a cookie notice */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 animate-[sheen_6s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      {owner.listingUrl ? (
        <a href={owner.listingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline">
          {body}
        </a>
      ) : (
        <div className="flex items-center gap-3">{body}</div>
      )}
    </div>
  );
}
