"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  /** Each entry renders as its own masked line. Wrap words in *asterisks* for italic accent. */
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** "scroll" animates when scrolled into view, "load" animates immediately */
  trigger?: "scroll" | "load";
  delay?: number;
  accentClass?: string;
};

function renderLine(line: string, accentClass: string) {
  return line.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") ? (
      <em key={i} className={`italic ${accentClass}`}>
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function SplitHeading({
  lines,
  className = "",
  as = "h2",
  trigger = "scroll",
  delay = 0,
  accentClass = "text-clay",
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".split-line > span", {
          yPercent: 110,
          rotateZ: 3,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.09,
          delay,
          scrollTrigger: trigger === "scroll" ? { trigger: ref.current, start: "top 85%" } : undefined,
        });
      });
    },
    { scope: ref },
  );

  const Tag = as;
  return (
    <Tag ref={ref} className={`display ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="split-line">
          <span>{renderLine(l, accentClass)}</span>
        </span>
      ))}
    </Tag>
  );
}
