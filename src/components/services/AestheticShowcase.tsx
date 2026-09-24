"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { aesthetic } from "@/lib/services";
import { sectionImages } from "@/lib/content";
import SplitHeading from "../ui/SplitHeading";
import { useServiceModal } from "./ServiceModal";
import { DEMO } from "@/lib/site";
import { DemoTag } from "../demo/Watermark";

export default function AestheticShowcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { open } = useServiceModal();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: pin the section and scrub the track sideways; panels tilt in 3D and their images drift (parallax)
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const slide = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".ae-panel").forEach((panel) => {
          const img = panel.querySelector(".ae-img");
          const card = panel.querySelector(".ae-card");
          const copy = panel.querySelectorAll(".ae-copy > *");
          const inView = { containerAnimation: slide, trigger: panel, scrub: true };
          gsap.fromTo(img, { xPercent: -14, scale: 1.18 }, { xPercent: 14, scale: 1.05, ease: "none", scrollTrigger: { ...inView, start: "left right", end: "right left" } });
          gsap.fromTo(
            card,
            { rotateY: -22, z: -160, opacity: 0.55 },
            { rotateY: 0, z: 0, opacity: 1, ease: "power2.out", scrollTrigger: { ...inView, start: "left right", end: "center center" } },
          );
          gsap.to(card, { rotateY: 18, z: -140, opacity: 0.6, ease: "power2.in", scrollTrigger: { ...inView, start: "center center", end: "right left" } });
          gsap.from(copy, {
            y: 50,
            opacity: 0,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { ...inView, start: "left 75%", end: "left 35%" },
          });
        });

        gsap.to(".ae-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
        return () => ScrollTrigger.refresh();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="aesthetics" className="relative overflow-hidden bg-[#1f1715] text-cream lg:h-screen">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 size-[640px] rounded-full bg-[#7a3f2e]/40 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 size-[520px] rounded-full bg-blush/10 blur-[120px]" />

      <div
        ref={track}
        className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 py-24 [scrollbar-width:none] lg:h-full lg:snap-none lg:items-center lg:gap-10 lg:overflow-visible lg:px-[6vw] lg:py-0 [&::-webkit-scrollbar]:hidden"
        style={{ perspective: 1800 }}
      >
        {/* intro panel */}
        <div className="flex w-[85vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[34vw]">
          <p className="eyebrow mb-6 flex items-center gap-2 text-blush">
            <Sparkles className="size-4" /> Aesthetics
          </p>
          <SplitHeading lines={["Aesthetics,", "*refined.*"]} accentClass="text-blush" className="text-[clamp(3rem,6vw,6rem)]" />
          <p className="mt-6 max-w-sm leading-relaxed text-cream/70">
            Six doctor-supervised treatments for hair, skin and contour. Natural results, planned around your skin type and your calendar.
          </p>
          <div className="mt-8 hidden items-center gap-3 text-sm text-cream/60 lg:flex">
            <span className="h-px w-10 bg-cream/30" /> Scroll to explore <ArrowRight className="size-4 animate-pulse" />
          </div>
          <div className="relative mt-10 hidden h-44 w-36 overflow-hidden rounded-3xl ring-1 ring-cream/10 lg:block">
            <Image src={sectionImages.aestheticIntro} alt="" fill sizes="150px" className="object-cover" />
          </div>
        </div>

        {aesthetic.map((s, i) => (
          <article key={s.id} className="ae-panel w-[85vw] shrink-0 snap-center sm:w-[62vw] lg:w-[46vw]" style={{ perspective: 1600 }}>
            <button
              onClick={() => open(s.id)}
              aria-label={`${s.title}: ${s.tagline}. Open details`}
              className="ae-card group relative block h-[68svh] w-full overflow-hidden rounded-5xl text-left [transform-style:preserve-3d] lg:h-[74vh]"
            >
              <div className="ae-img absolute inset-[-8%]">
                <Image src={s.img} alt="" fill sizes="(min-width:1024px) 50vw, 90vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1715] via-[#1f1715]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1f1715]/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              {DEMO && <DemoTag className="left-6 top-6" />}
              <span
                aria-hidden
                className="display absolute right-6 top-4 text-[clamp(5rem,11vw,10rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgb(239_214_200/0.55)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="ae-copy absolute inset-x-0 bottom-0 p-6 md:p-10">
                <p className="eyebrow text-[0.65rem] text-blush">From {s.from}</p>
                <h3 className="display mt-2 text-[clamp(2.2rem,4vw,3.8rem)] leading-[1]">{s.title}</h3>
                <p className="mt-3 max-w-md text-cream/75">{s.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.helps.slice(0, 3).map((h) => (
                    <span key={h} className="rounded-full border border-cream/20 bg-white/5 px-3 py-1 text-xs backdrop-blur">
                      {h}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-3 rounded-full bg-cream py-1.5 pl-5 pr-1.5 text-sm font-semibold text-ink transition group-hover:bg-blush">
                  Discover
                  <span className="grid size-8 place-items-center rounded-full bg-clay text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </div>
            </button>
          </article>
        ))}
        <div className="w-px shrink-0 lg:w-[4vw]" aria-hidden />
      </div>

      {/* progress */}
      <div className="absolute inset-x-[6vw] bottom-8 hidden h-px bg-cream/15 lg:block">
        <div className="ae-progress h-full origin-left scale-x-0 bg-blush" />
      </div>
    </section>
  );
}
