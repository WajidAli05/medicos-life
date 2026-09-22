"use client";

import { useRef } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { px } from "@/lib/content";
import SplitHeading from "./ui/SplitHeading";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";

const are = [
  "One clinician who knows your story",
  "Evidence-based, measurable plans",
  "Subtle, natural aesthetic results",
  "Female clinicians on request",
];
const arent = [
  "Conveyor-belt 20 minute appointments",
  "Upselling packages you don't need",
  "The 'overdone' look",
  "Treating symptoms, ignoring causes",
];

export default function Approach() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".approach-img-a",
          { yPercent: 12 },
          { yPercent: -12, ease: "none", scrollTrigger: { trigger: root.current, scrub: true } },
        );
        gsap.fromTo(
          ".approach-img-b",
          { yPercent: 6, rotate: 6 },
          { yPercent: -6, rotate: -2, ease: "none", scrollTrigger: { trigger: root.current, scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="approach" className="relative bg-cream py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <div className="approach-img-a relative aspect-[4/5] w-[85%] overflow-hidden rounded-5xl">
            <Image src={px(14797760, 1200)} alt="A physiotherapist explaining spine health to a patient" fill sizes="(min-width:1024px) 35vw, 85vw" className="object-cover" />
          </div>
          <div className="approach-img-b absolute -bottom-10 right-0 w-[48%]">
            <TiltCard max={14} className="aspect-[3/4]">
              <div className="relative h-full overflow-hidden rounded-4xl ring-8 ring-cream">
                <Image src={px(35576577, 800)} alt="A smiling woman with healthy, glowing skin" fill sizes="25vw" className="object-cover object-top" />
              </div>
            </TiltCard>
          </div>
          <div className="absolute -left-2 top-10 animate-float rounded-2xl bg-white px-5 py-4 shadow-xl shadow-ink/10 md:-left-6">
            <p className="display text-4xl text-evergreen">24/7</p>
            <p className="text-xs text-muted">care in I-8 Markaz,
              <br />
              Islamabad</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <p className="eyebrow mb-6 text-clay">Our approach</p>
          <SplitHeading
            lines={["Two disciplines,", "*one philosophy:*", "you, at your best."]}
            className="text-[clamp(2.5rem,5.5vw,4.6rem)] text-ink"
          />
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
            How you move and how you feel in your skin are deeply connected. Our physiotherapists and aesthetic doctors work side by side, so every plan considers the whole of you.
          </p>

          <Reveal className="mt-12 grid gap-5 sm:grid-cols-2">
            <div data-reveal className="rounded-4xl bg-evergreen p-7 text-cream">
              <p className="eyebrow mb-5 text-sage">What we are</p>
              <ul className="space-y-3.5">
                {are.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.95rem]">
                    <Check className="mt-0.5 size-4 shrink-0 text-blush" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal className="rounded-4xl bg-sand p-7">
              <p className="eyebrow mb-5 text-muted">What we are not</p>
              <ul className="space-y-3.5">
                {arent.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.95rem] text-ink/75">
                    <X className="mt-0.5 size-4 shrink-0 text-clay" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
