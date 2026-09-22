"use client";

import { ArrowUpRight, Stethoscope, X } from "lucide-react";
import type { MapPoint } from "@/lib/anatomy";
import { bookFor } from "./MapContext";

type Props = { point: MapPoint; index: number; onClose?: () => void; tone?: "light" | "dark" };

/** The card content shared by the floating popup (desktop) and the bottom panel (mobile) */
export default function PointDetails({ point, index, onClose, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={dark ? "text-cream" : "text-ink"}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`eyebrow text-[0.62rem] ${dark ? "text-blush" : "text-clay"}`}>
            Area {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="display mt-1 text-[1.65rem] leading-tight">{point.label}</h3>
          <p className={`mt-1 text-sm ${dark ? "text-cream/70" : "text-muted"}`}>{point.teaser}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close details"
            className={`grid size-8 shrink-0 place-items-center rounded-full ring-1 transition ${dark ? "ring-cream/20 hover:bg-white/10" : "ring-ink/15 hover:bg-ink/5"}`}
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <p className={`eyebrow mt-4 text-[0.6rem] ${dark ? "text-cream/60" : "text-muted"}`}>What it feels like</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {point.pain.map((p) => (
          <span
            key={p}
            className={`rounded-full px-2.5 py-1 text-[0.72rem] leading-tight ${dark ? "bg-white/10 text-cream" : "bg-blush/60 text-ink"}`}
          >
            {p}
          </span>
        ))}
      </div>

      <p className={`eyebrow mt-4 text-[0.6rem] ${dark ? "text-cream/60" : "text-muted"}`}>Possible reasons</p>
      <ul className="mt-2 space-y-1">
        {point.causes.map((c) => (
          <li key={c} className={`flex gap-2 text-[0.8rem] leading-snug ${dark ? "text-cream/85" : "text-ink/80"}`}>
            <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${dark ? "bg-blush" : "bg-clay"}`} />
            {c}
          </li>
        ))}
      </ul>

      <div className={`mt-4 flex gap-2.5 rounded-2xl p-3 text-[0.8rem] leading-snug ${dark ? "bg-white/8 text-cream/85" : "bg-mist text-evergreen"}`}>
        <Stethoscope className="mt-0.5 size-4 shrink-0" />
        {point.care}
      </div>

      <button
        onClick={() => bookFor(point)}
        className="group mt-4 flex w-full items-center justify-between rounded-full bg-clay py-2 pl-5 pr-2 text-sm font-semibold text-white transition hover:bg-[#b3704f]"
      >
        Book for {point.label.toLowerCase()}
        <span className="grid size-8 place-items-center rounded-full bg-white text-clay transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </button>
    </div>
  );
}
