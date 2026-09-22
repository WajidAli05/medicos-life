"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react";
import { displayName, GOOGLE_REVIEWS_URL, monthYear, reviews, reviewStats } from "@/lib/reviews";
import SplitHeading from "./ui/SplitHeading";

const AVATAR_TONES = ["bg-evergreen", "bg-clay", "bg-[#6f8f7a]", "bg-[#8a5a44]", "bg-[#3e6b64]"];

function Stars({ n, className = "size-4" }: { n: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, k) => (
        <Star key={k} className={`${className} ${k < n ? "fill-[#f5b301] text-[#f5b301]" : "fill-ink/10 text-ink/10"}`} />
      ))}
    </span>
  );
}

function GoogleG({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export default function Testimonials() {
  // written reviews rotate in the 3D carousel; every recent review (incl. star-only) shows in the strip
  const written = reviews.filter((r) => r.text);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const n = written.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || n < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 6000);
    return () => clearInterval(id);
  }, [paused, n]);

  const go = (d: number) => setActive((a) => (a + d + n) % n);

  return (
    <section id="stories" className="relative overflow-hidden bg-blush/50 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <p className="eyebrow mb-6 text-clay">Real Google reviews</p>
          <SplitHeading lines={["In our patients'", "*own words.*"]} className="mx-auto text-[clamp(2.5rem,5.5vw,4.6rem)] text-ink" />

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mt-8 inline-flex items-center gap-4 rounded-full bg-white py-2.5 pl-3 pr-5 shadow-[0_12px_30px_-18px_rgb(29_40_38/0.5)] ring-1 ring-ink/5 transition hover:-translate-y-0.5"
          >
            <span className="grid size-10 place-items-center rounded-full bg-cream">
              <GoogleG />
            </span>
            <span className="text-left">
              <span className="flex items-center gap-2">
                <span className="display text-2xl leading-none">{reviewStats.rating}</span>
                <Stars n={5} className="size-3.5" />
              </span>
              <span className="text-xs text-muted">
                {reviewStats.total} reviews on Google · <span className="font-semibold text-evergreen group-hover:underline">Read them all</span>
              </span>
            </span>
            <ArrowUpRight className="size-4 text-muted transition group-hover:rotate-45" />
          </a>
        </div>

        <div
          className="relative mx-auto mt-14 h-[360px] max-w-3xl md:h-[330px]"
          style={{ perspective: 1600 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {written.map((r, i) => {
            let off = i - active;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const abs = Math.abs(off);
            return (
              <motion.figure
                key={r.author + r.date}
                aria-hidden={off !== 0}
                animate={{
                  x: `${off * (narrow ? 90 : 78)}%`,
                  z: -abs * 320,
                  rotateY: off * -38,
                  opacity: abs > 1 || (narrow && abs > 0) ? 0 : 1 - abs * 0.7,
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: 10 - abs, transformStyle: "preserve-3d" }}
                className="absolute inset-0 flex flex-col justify-between rounded-5xl bg-cream p-8 shadow-[0_40px_80px_-40px_rgb(29_40_38/0.35)] md:p-12"
              >
                <div className="flex items-center justify-between">
                  <Quote className="size-10 fill-clay/20 text-clay" />
                  <Stars n={r.rating} />
                </div>
                <blockquote className="display text-[clamp(1.35rem,2.5vw,1.9rem)] leading-snug">“{r.text}”</blockquote>
                <figcaption className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span className={`grid size-11 place-items-center rounded-full font-semibold text-cream ${AVATAR_TONES[i % AVATAR_TONES.length]}`}>
                      {displayName(r.author)[0]}
                    </span>
                    <span>
                      <span className="block font-semibold">{displayName(r.author)}</span>
                      <span className="text-sm text-muted">{monthYear(r.date)}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <GoogleG className="size-4" /> Google review
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous review" className="grid size-12 place-items-center rounded-full ring-1 ring-ink/20 transition hover:bg-ink hover:text-cream">
            <ArrowLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            {written.map((r, i) => (
              <button
                key={r.author + r.date}
                onClick={() => setActive(i)}
                aria-label={`Show review ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-evergreen" : "w-2 bg-ink/20"}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next review" className="grid size-12 place-items-center rounded-full ring-1 ring-ink/20 transition hover:bg-ink hover:text-cream">
            <ArrowRight className="size-5" />
          </button>
        </div>

        {/* every recent review, including star-only ratings */}
        <div className="mt-16">
          <p className="eyebrow mb-5 text-center text-muted">Latest {reviews.length} ratings</p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {reviews.map((r, i) => (
              <motion.li
                key={r.author + r.date}
                initial={{ opacity: 0, y: 20, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.6 }}
                className="flex items-center gap-2.5 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 ring-1 ring-ink/5"
              >
                <span className={`grid size-7 place-items-center rounded-full text-xs font-semibold text-cream ${AVATAR_TONES[i % AVATAR_TONES.length]}`}>
                  {displayName(r.author)[0]}
                </span>
                <span className="text-sm font-medium">{displayName(r.author)}</span>
                <Stars n={r.rating} className="size-3" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
