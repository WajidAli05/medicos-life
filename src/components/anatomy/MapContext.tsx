"use client";

import { createContext, useContext } from "react";
import type { MapPoint } from "@/lib/anatomy";

export type MapState = {
  points: MapPoint[];
  active: string | null;
  hovered: string | null;
  filter: string;
  /** desktop: cards float beside markers; mobile: details render below the canvas */
  floating: boolean;
  accent: string;
  setActive: (id: string | null) => void;
  setHovered: (id: string | null) => void;
};

export const MapContext = createContext<MapState | null>(null);

export function useMap() {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useMap must be used inside <MapContext>");
  return ctx;
}

/** Hand a treatment to the booking form and scroll to it */
export function bookFor(point: MapPoint) {
  window.dispatchEvent(
    new CustomEvent("clinic:book", {
      detail: { treatment: point.treatment, message: `${point.label}: ${point.teaser.toLowerCase()}` },
    }),
  );
  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
}
