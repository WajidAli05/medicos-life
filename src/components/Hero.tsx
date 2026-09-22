"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, Star, CalendarCheck } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { clinic, FOUNDER_AVATAR, HERO_POSTER, HERO_VIDEO, px } from "@/lib/content";
import { reviewStats } from "@/lib/reviews";
import SplitHeading from "./ui/SplitHeading";
import Button from "./ui/Button";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // intro
        gsap.from(".hero-frame", { scale: 1.12, duration: 2.2, ease: "expo.out" });
        gsap.from(".hero-fade", { y: 30, opacity: 0, duration: 1.2, ease: "power3.out", stagger: 0.1, delay: 0.6 });
        gsap.from(".hero-card", {
          y: 80,
          rotateX: -35,
          rotateY: 12,
          opacity: 0,
          duration: 1.6,
          ease: "expo.out",
          delay: 0.9,
          stagger: 0.12,
        });

        // on scroll: the video frame recedes into 3D space, copy lifts away
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        tl.to(".hero-frame", { scale: 0.86, rotateX: 14, yPercent: 8, borderRadius: 48, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: -35, opacity: 0, ease: "none" }, 0)
          .to(".hero-card", { y: -120, ease: "none", stagger: 0.05 }, 0);
      });
    },
    { scope: root },
  );

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[640px] bg-cream" style={{ perspective: 1400 }}>
      <div className="hero-frame absolute inset-0 origin-top overflow-hidden bg-pine will-change-transform">
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine/90 via-pine/35 to-pine/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pine/70 via-transparent to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-10 md:px-8 md:pb-16">
          <div className="hero-copy max-w-3xl text-cream">
            <p className="hero-fade eyebrow mb-6 flex items-center gap-3 text-blush">
              <span className="h-px w-10 bg-blush/70" />
              Physiotherapy · Aesthetics · Wellbeing
            </p>
            <SplitHeading
              as="h1"
              trigger="load"
              delay={0.35}
              lines={["Move *freely.*", "Glow *naturally.*"]}
              accentClass="text-blush"
              className="text-[clamp(3.2rem,9vw,7.8rem)]"
            />
            <p className="hero-fade mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
              Expert physiotherapy and doctor-led aesthetics under one calm roof in I-8 Markaz, Islamabad. Open 24 hours, with home visits when you can&apos;t come to us.
            </p>
            <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
              <Button href="#book" variant="clay">
                Book a consultation
              </Button>
              <Button href="#physiotherapy" variant="ghost" className="text-cream">
                Explore treatments
              </Button>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-28 right-8 hidden flex-col gap-4 lg:flex" style={{ perspective: 900 }}>
            <div className="hero-card glass pointer-events-auto w-72 rounded-3xl p-5 text-cream">
              <div className="flex items-center gap-3">
                <span className="relative grid size-10 place-items-center rounded-full bg-cream text-evergreen">
                  <CalendarCheck className="size-5" />
                  <span className="absolute -right-0.5 -top-0.5 size-3 animate-pulse rounded-full bg-emerald-400 ring-2 ring-pine" />
                </span>
                <div>
                  <p className="text-xs text-cream/70">Open now · 24/7</p>
                  <p className="font-semibold">{clinic.area}</p>
                </div>
              </div>
              <a
                href={clinic.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-2.5 text-sm transition hover:bg-white/20"
              >
                <span className="whitespace-nowrap">Home visits available</span>
                <span className="whitespace-nowrap text-blush">WhatsApp →</span>
              </a>
            </div>
            <div className="hero-card glass pointer-events-auto flex w-72 items-center gap-4 rounded-3xl p-4 text-cream">
              <div className="flex -space-x-3">
                {[FOUNDER_AVATAR, px(5738735, 120), px(36665076, 120)].map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={40}
                    height={40}
                    style={{ objectPosition: "53% 22%" }}
                    className="size-10 rounded-full object-cover ring-2 ring-pine"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-blush">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-cream">{clinic.rating}</span>
                </div>
                <p className="text-xs text-cream/70">{reviewStats.total} reviews on Google</p>
              </div>
            </div>
          </div>

          <button
            onClick={toggle}
            aria-label={playing ? "Pause background video" : "Play background video"}
            className="hero-fade absolute right-5 top-28 grid size-11 place-items-center rounded-full text-cream ring-1 ring-cream/30 backdrop-blur transition hover:bg-white/10 md:right-8"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
