"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stats } from "@/lib/content";
import Reveal from "./ui/Reveal";

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const end = Number(el.dataset.value);
        const decimals = Number(el.dataset.decimals ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-cream">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-20 md:px-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} data-reveal className="border-l border-ink/10 px-4 py-6 first:border-l-0 md:px-8 max-lg:[&:nth-child(3)]:border-l-0">
            <p className="display text-[clamp(3rem,6vw,5rem)] text-evergreen">
              <span className="stat-num" data-value={s.value} data-decimals={s.decimals ?? 0}>
                {s.value}
              </span>
              <span className="text-clay">{s.suffix}</span>
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
