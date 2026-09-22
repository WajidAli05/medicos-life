"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let instance: Lenis | null = null;
/** Pause / resume page scrolling (e.g. while a modal is open) */
export const setScrollLocked = (locked: boolean) => (locked ? instance?.stop() : instance?.start());

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -72 },
    });

    instance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return <>{children}</>;
}
