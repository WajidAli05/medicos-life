"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul";
  /** Stagger direct children marked with [data-reveal] */
  stagger?: number;
  y?: number;
  id?: string;
};

/**
 * Scroll-triggered 3D reveal: elements with [data-reveal] rise and un-tilt into place.
 */
export default function Reveal({ children, className, as = "div", stagger = 0.08, y = 60, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current);
      if (!items.length) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(ref.current, { perspective: 1200 });
        gsap.from(items, {
          y,
          rotateX: -18,
          opacity: 0,
          transformOrigin: "50% 100%",
          duration: 1.1,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: ref.current, start: "top 82%" },
        });
      });
    },
    { scope: ref },
  );

  const Tag = as as "div";
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className} id={id}>
      {children}
    </Tag>
  );
}
