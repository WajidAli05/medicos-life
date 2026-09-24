"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { BOOKING_POSTER, BOOKING_VIDEO, clinic } from "@/lib/content";
import { aesthetic, physio } from "@/lib/services";
import SplitHeading from "./ui/SplitHeading";

const field =
  "w-full rounded-2xl border border-cream/20 bg-white/10 px-4 py-3.5 text-cream placeholder:text-cream/50 outline-none transition focus:border-blush focus:bg-white/15";

export default function Booking() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  // The body and face maps hand over a treatment + note via a "clinic:book" event
  useEffect(() => {
    const onBook = (e: Event) => {
      const { treatment, message } = (e as CustomEvent<{ treatment: string; message: string }>).detail;
      setSent(false);
      requestAnimationFrame(() => {
        const f = form.current;
        if (!f) return;
        (f.elements.namedItem("treatment") as HTMLSelectElement).value = treatment;
        (f.elements.namedItem("message") as HTMLTextAreaElement).value = message.charAt(0).toUpperCase() + message.slice(1);
        (f.elements.namedItem("name") as HTMLInputElement).focus({ preventScroll: true });
      });
    };
    window.addEventListener("clinic:book", onBook);
    return () => window.removeEventListener("clinic:book", onBook);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // the panel rises from a tilted plane to face the visitor
        gsap.fromTo(
          ".book-panel",
          { rotateX: 22, scale: 0.9, y: 80 },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 20%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  // No backend needed: the request is handed to the clinic's WhatsApp with the details pre-filled.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `Hello, I'd like to book an appointment at ${clinic.name}.`,
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Treatment: ${f.get("treatment") || "Not sure yet"}`,
      `Visit: ${f.get("visit")}`,
      f.get("message") ? `Details: ${f.get("message")}` : "",
    ].filter(Boolean);
    window.open(`${clinic.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    setSent(true);
  };

  return (
    <section ref={root} id="book" className="bg-cream px-3 pb-3 md:px-5 md:pb-5" style={{ perspective: 1600 }}>
      <div className="book-panel relative origin-bottom overflow-hidden rounded-5xl bg-pine text-cream will-change-transform">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          src={BOOKING_VIDEO}
          poster={BOOKING_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pine via-pine/85 to-evergreen/60" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-6 text-blush">Book a visit</p>
            <SplitHeading
              lines={["Your first step", "starts *here.*"]}
              accentClass="text-blush"
              className="text-[clamp(2.6rem,6vw,5.2rem)]"
            />
            <p className="mt-6 max-w-md leading-relaxed text-cream/75">
              Tell us what you need and we&apos;ll confirm a time on WhatsApp. {clinic.hoursShort}, and home visits can be arranged across {clinic.city}.
            </p>

            <ul className="mt-12 space-y-5 text-cream/85">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-blush" />
                <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blush">
                  {clinic.address}
                </a>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-blush" />
                <a href={`tel:${clinic.phoneIntl}`} className="hover:text-blush">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-blush" />
                <span className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1">
                  {clinic.hours.map(([d, h]) => (
                    <span key={d} className="contents">
                      <span>{d}</span>
                      <span className="text-cream/60">{h}</span>
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            <div className="mt-10 overflow-hidden rounded-3xl ring-1 ring-cream/15">
              <iframe
                title={`Map to ${clinic.name}, ${clinic.address}`}
                src={clinic.mapsEmbed}
                className="h-56 w-full grayscale-[40%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="glass rounded-4xl p-6 md:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, rotateY: -60 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <CheckCircle2 className="size-14 text-blush" />
                  <p className="display mt-6 text-4xl">Thank you.</p>
                  <p className="mt-3 max-w-xs text-cream/75">WhatsApp should have opened with your details. Just press send and we&apos;ll confirm your time.</p>
                </motion.div>
              ) : (
                <motion.form ref={form} key="form" exit={{ opacity: 0, rotateY: 60 }} onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs text-cream/70">Full name</span>
                      <input required name="name" autoComplete="name" className={field} placeholder="Ayesha Khan" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-cream/70">Phone</span>
                      <input required name="phone" type="tel" autoComplete="tel" className={field} placeholder="03XX XXXXXXX" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block text-xs text-cream/70">Where would you like to be seen?</span>
                    <select name="visit" className={`${field} appearance-none`} defaultValue={`At the clinic (${clinic.area})`}>
                      <option className="text-ink">{`At the clinic (${clinic.area})`}</option>
                      <option className="text-ink">Home visit</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-cream/70">Treatment</span>
                    <select name="treatment" className={`${field} appearance-none`} defaultValue="">
                      <option value="" disabled className="text-ink">
                        Choose a treatment
                      </option>
                      <optgroup label="Physiotherapy" className="text-ink">
                        {physio.map((t) => (
                          <option key={t.title}>{t.title}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Aesthetics" className="text-ink">
                        {aesthetic.map((t) => (
                          <option key={t.title}>{t.title}</option>
                        ))}
                      </optgroup>
                      <option className="text-ink">Not sure yet, advise me</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-cream/70">Anything we should know?</span>
                    <textarea name="message" rows={3} className={`${field} resize-none`} placeholder="E.g. knee pain for 3 weeks, or prep before a wedding" />
                  </label>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-clay py-4 font-semibold text-white transition hover:bg-[#b3704f]"
                  >
                    <MessageCircle className="mr-2 inline size-5 -translate-y-px" />
                    Book on WhatsApp
                  </button>
                  <p className="text-center text-xs text-cream/50">Prefer to talk? Call {clinic.phone}.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
