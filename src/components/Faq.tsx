"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { clinic, faqs } from "@/lib/content";
import SplitHeading from "./ui/SplitHeading";
import Reveal from "./ui/Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6 text-clay">Good to know</p>
          <SplitHeading lines={["Questions,", "*answered.*"]} className="text-[clamp(2.5rem,5.5vw,4.6rem)] text-ink" />
          <p className="mt-6 max-w-sm leading-relaxed text-muted">
            Can&apos;t find what you need? Call us on{" "}
            <a className="font-semibold text-evergreen underline decoration-clay/50 underline-offset-4" href={`tel:${clinic.phoneIntl}`}>
              {clinic.phone}
            </a>{" "}
            or{" "}
            <a className="font-semibold text-evergreen underline decoration-clay/50 underline-offset-4" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
            . A real person always answers, day or night.
          </p>
        </div>

        <Reveal className="lg:col-span-7" stagger={0.06} y={30}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} data-reveal className="border-b border-ink/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="display text-xl md:text-2xl">{f.q}</span>
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                      isOpen ? "rotate-45 bg-evergreen text-cream" : "ring-1 ring-ink/15"
                    }`}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
