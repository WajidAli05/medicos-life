"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { journey } from "@/lib/content";
import SplitHeading from "./ui/SplitHeading";

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".journey-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          // as the next card slides over, this one tips back into depth
          const st = { trigger: next, start: "top bottom", end: "top 15%", scrub: true };
          gsap.to(card.querySelector(".journey-inner"), {
            scale: 0.86,
            rotateX: -10,
            yPercent: -4,
            ease: "none",
            scrollTrigger: st,
          });
          gsap.to(card.querySelector(".journey-shade"), { opacity: 0.7, ease: "none", scrollTrigger: st });
        });
        gsap.to(".journey-progress", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".journey-stack", start: "top 30%", end: "bottom bottom", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="journey" className="relative bg-evergreen py-28 text-cream md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6 text-blush">Your care journey</p>
            <SplitHeading
              lines={["Four steps,", "*zero guesswork.*"]}
              accentClass="text-blush"
              className="text-[clamp(2.5rem,5vw,4.2rem)]"
            />
            <p className="mt-6 max-w-sm leading-relaxed text-cream/70">
              Whether you are recovering from an injury or refreshing your skin, every plan follows the same honest, measurable path.
            </p>
            <div className="mt-10 hidden h-48 w-px bg-cream/15 lg:block">
              <div className="journey-progress h-full w-full origin-top scale-y-0 bg-blush" />
            </div>
          </div>
        </div>

        <div className="journey-stack lg:col-span-8">
          {journey.map((j, i) => (
            <div
              key={j.step}
              className="journey-card sticky pb-8"
              style={{ top: `calc(14vh + ${i * 18}px)`, perspective: 1400 }}
            >
              <div className="journey-inner relative origin-top overflow-hidden rounded-5xl bg-cream text-ink shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.4)] will-change-transform">
                <div className="grid md:grid-cols-2">
                  <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
                    <span className="display text-7xl text-clay/90 md:text-8xl">{j.step}</span>
                    <div>
                      <h3 className="display text-4xl md:text-5xl">{j.title}</h3>
                      <p className="mt-4 max-w-sm leading-relaxed text-muted">{j.text}</p>
                    </div>
                  </div>
                  <div className="relative min-h-64 md:min-h-[420px]">
                    <Image src={j.img} alt="" fill sizes="(min-width:768px) 35vw, 100vw" className="object-cover" />
                  </div>
                </div>
                <div className="journey-shade pointer-events-none absolute inset-0 bg-pine opacity-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
