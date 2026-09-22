"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { team } from "@/lib/content";
import SplitHeading from "./ui/SplitHeading";
import TiltCard from "./ui/TiltCard";
import Button from "./ui/Button";

export default function Team() {
  return (
    <section id="team" className="bg-cream py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6 text-clay">The people</p>
            <SplitHeading
              lines={["Clinicians who", "*actually listen.*"]}
              className="text-[clamp(2.5rem,5.5vw,4.6rem)] text-ink"
            />
          </div>
          <p className="max-w-sm leading-relaxed text-muted">
            DPT-qualified physiotherapists and PMDC-registered doctors. Male and female clinicians available, at the clinic or at home.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1400 }}>
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 80, rotateX: 25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={i % 2 ? "lg:mt-16" : ""}
            >
              <TiltCard max={8}>
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-4xl bg-sand">
                  <Image
                    src={m.img}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    style={{ objectPosition: m.pos ?? "50% 50%" }}
                    className="object-cover grayscale-[35%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <figcaption
                    className="absolute inset-x-3 bottom-3 rounded-3xl bg-cream/90 p-4 backdrop-blur-md"
                    style={{ transform: "translateZ(50px)" }}
                  >
                    <p className="display text-xl">{m.name}</p>
                    <p className="text-xs text-muted">{m.role}</p>
                  </figcaption>
                </figure>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button href="#book">Meet the full team</Button>
        </div>
      </div>
    </section>
  );
}
