"use client";

import { useEffect } from "react";
import { owner } from "@/lib/site";

/**
 * Light-touch deterrents for the public demo: no right-click menu, no image dragging or
 * long-press saving, plus an ownership notice in the console.
 *
 * These only slow down casual copying. Anyone can still read the markup in devtools, so the
 * real protection is the visible watermarking and your copyright.
 */
export default function DemoGuards() {
  useEffect(() => {
    const block = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);

    const style = `background:#1d2826;color:#efd6c8;padding:6px 10px;border-radius:4px;font-weight:700`;
    console.log(`%c${owner.headline} — © ${owner.year} ${owner.name}`, style);
    console.log(`%c${owner.notice}`, "color:#5d6a66");

    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);

  return null;
}
