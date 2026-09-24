"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowUpRight, HeartPulse, Home, UserRound } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { physio, type Service } from "@/lib/services";
import { clinic } from "@/lib/content";
import SplitHeading from "../ui/SplitHeading";
import TiltCard from "../ui/TiltCard";
import { useServiceModal } from "./ServiceModal";

const SIZE: Record<NonNullable<Service["size"]> | "base", string> = {
  xl: "row-span-2 sm:col-span-2",
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  base: "",
};

function ServiceCard({ s, index }: { s: Service; index: number }) {
  const { open } = useServiceModal();
  const big = s.size === "xl";
  // spotlight that follows the cursor across the card
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spot = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgb(239 214 200 / 0.35), transparent 70%)`;

  return (
    <div data-reveal className={`${SIZE[s.size ?? "base"]} [transform-style:preserve-3d]`}>
      <TiltCard className="h-full" max={big ? 5 : 8}>
        <button
          onClick={() => open(s.id)}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(e.clientX - r.left);
            my.set(e.clientY - r.top);
          }}
          onPointerLeave={() => {
            mx.set(-300);
            my.set(-300);
          }}
          aria-label={`${s.title}: ${s.tagline}. Open details`}
          className="group relative block h-full w-full overflow-hidden rounded-4xl bg-pine text-left text-cream shadow-[0_30px_60px_-35px_rgb(23_52_48/0.7)]"
        >
          <Image
            src={s.img}
            alt=""
            fill
            sizes={big ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/45 to-pine/5 transition-opacity duration-500 group-hover:opacity-95" />
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spot }} />

          <div className="absolute left-5 right-5 top-5 flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
            <span className="rounded-full bg-pine/55 px-3 py-1 text-[0.7rem] font-semibold tracking-wider ring-1 ring-cream/20 backdrop-blur-md">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-cream text-evergreen transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6" style={{ transform: "translateZ(60px)" }}>
            {big && <p className="eyebrow mb-3 text-[0.65rem] text-blush">Specialist service</p>}
            <h3 className={`display leading-[1.05] ${big ? "text-[2.4rem] md:text-5xl" : "text-[1.65rem]"}`}>{s.title}</h3>
            <p className={`mt-2 text-cream/75 ${big ? "max-w-md text-base" : "text-sm"}`}>{s.tagline}</p>
            <div className={`grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr] ${big ? "max-md:grid-rows-[1fr]" : ""}`}>
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {s.helps.slice(0, big ? 5 : 3).map((h) => (
                    <span key={h} className="rounded-full border border-cream/25 bg-white/5 px-2.5 py-1 text-[0.7rem] backdrop-blur-sm">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </button>
      </TiltCard>
    </div>
  );
}

export default function PhysioServices() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // cards rise out of a tilted plane, rippling outward from the featured card
        gsap.from("[data-reveal]", {
          y: 90,
          rotateX: -24,
          z: -120,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: { each: 0.07, from: "start" },
          scrollTrigger: { trigger: ".physio-grid", start: "top 80%" },
        });
        gsap.to(".physio-orb", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="physiotherapy" className="relative overflow-hidden bg-cream py-28 md:py-36">
      <div aria-hidden className="physio-orb pointer-events-none absolute -right-40 top-10 size-[560px] rounded-full bg-mist blur-3xl" />
      <div aria-hidden className="physio-orb pointer-events-none absolute -left-52 top-1/2 size-[480px] rounded-full bg-blush/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-clay">Physiotherapy</p>
            <SplitHeading lines={["Physiotherapy that", "gets you *moving.*"]} className="text-[clamp(2.6rem,5.6vw,4.8rem)] text-ink" />
          </div>
          <div className="lg:col-span-5">
            <p className="leading-relaxed text-muted">
              From stroke recovery to a stubborn frozen shoulder, {physio.length} focused services led by {clinic.founder} and team. Tap any card for what it treats and what to expect.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
              {[
                { icon: Home, label: "Home visits" },
                { icon: UserRound, label: "Male & female physios" },
                { icon: HeartPulse, label: clinic.hoursBadge },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-ink/10">
                  <Icon className="size-3.5 text-clay" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="physio-grid mt-14 grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 sm:[grid-auto-flow:dense] lg:auto-rows-[250px] lg:grid-cols-4"
          style={{ perspective: 1600 }}
        >
          {physio.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
