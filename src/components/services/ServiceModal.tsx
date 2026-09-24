"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CalendarClock, Check, Clock, MessageCircle, Repeat, X } from "lucide-react";
import { clinic } from "@/lib/content";
import { allServices, type Service } from "@/lib/services";
import { setScrollLocked } from "../SmoothScroll";
import { WATERMARKS } from "@/lib/site";
import { DemoTag } from "../demo/Watermark";

type Ctx = { open: (id: string) => void };
const ServiceCtx = createContext<Ctx>({ open: () => {} });
export const useServiceModal = () => useContext(ServiceCtx);

export function ServiceModalProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const open = useCallback((next: string) => setId(next), []);
  const close = useCallback(() => setId(null), []);
  const service = allServices.find((s) => s.id === id) ?? null;

  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    setScrollLocked(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [id, close]);

  return (
    <ServiceCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>{service && <Sheet key={service.id} service={service} onClose={close} />}</AnimatePresence>
    </ServiceCtx.Provider>
  );
}

function Sheet({ service: s, onClose }: { service: Service; onClose: () => void }) {
  const aesthetic = s.category === "aesthetic";

  const book = () => {
    onClose();
    window.dispatchEvent(new CustomEvent("clinic:book", { detail: { treatment: s.title, message: "" } }));
    setTimeout(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }), 250);
  };
  const whatsapp = `${clinic.whatsapp}?text=${encodeURIComponent(`Assalam o Alaikum, I'd like to know more about ${s.title} at ${clinic.name}.`)}`;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`svc-${s.id}-title`}
    >
      <motion.button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#0d1a18]/70 backdrop-blur-md"
      />

      <motion.article
        data-lenis-prevent
        initial={{ y: 80, rotateX: 18, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, rotateX: 0, scale: 1, opacity: 1 }}
        exit={{ y: 60, rotateX: 10, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1400 }}
        className="relative grid max-h-[92svh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-t-5xl bg-cream text-ink shadow-2xl md:grid-cols-[1fr_1.1fr] md:overflow-hidden md:rounded-5xl"
      >
        {/* image */}
        <div className="relative h-64 overflow-hidden md:h-auto md:min-h-[620px]">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={s.img} alt={s.title} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover" priority />
          </motion.div>
          <div className={`absolute inset-0 bg-gradient-to-t ${aesthetic ? "from-[#2a1c19]/90" : "from-pine/90"} via-transparent to-transparent`} />
          {WATERMARKS && <DemoTag className="left-6 top-6" />}
          <div className="absolute inset-x-6 bottom-6 text-cream md:inset-x-8 md:bottom-8">
            <p className="eyebrow text-blush">{aesthetic ? "Aesthetics" : "Physiotherapy"}</p>
            <motion.h2
              id={`svc-${s.id}-title`}
              className="display mt-2 text-4xl md:text-5xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {s.title}
            </motion.h2>
            <p className="mt-2 text-sm text-cream/80">{s.tagline}</p>
          </div>
        </div>

        {/* details */}
        <div className="relative p-6 md:overflow-y-auto md:p-10" data-lenis-prevent>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-white ring-1 ring-ink/10 transition hover:rotate-90 md:right-6 md:top-6"
          >
            <X className="size-4" />
          </button>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            className="space-y-7 pr-2"
          >
            <motion.p variants={item} className="max-w-md pr-10 leading-relaxed text-muted">
              {s.about}
            </motion.p>

            <motion.div variants={item} className="grid grid-cols-3 gap-2">
              {[
                { icon: Clock, label: "Session", value: s.duration },
                { icon: Repeat, label: "Course", value: s.sessions },
                { icon: CalendarClock, label: "From", value: s.from },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl bg-white p-3 ring-1 ring-ink/5">
                  <Icon className="size-4 text-clay" />
                  <p className="mt-2 text-[0.65rem] uppercase tracking-wider text-muted">{label}</p>
                  <p className="text-sm font-semibold leading-tight">{value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item}>
              <p className="eyebrow text-[0.65rem] text-clay">Helps with</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {s.helps.map((h) => (
                  <li key={h} className="flex gap-2 text-sm">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-evergreen text-cream">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={item}>
              <p className="eyebrow text-[0.65rem] text-clay">What to expect</p>
              <ol className="relative mt-3 space-y-3 border-l border-dashed border-ink/15 pl-5">
                {s.expect.map((e, i) => (
                  <li key={e} className="relative text-sm">
                    <span className="absolute -left-[29px] grid size-4 place-items-center rounded-full bg-clay text-[0.55rem] font-bold text-white">
                      {i + 1}
                    </span>
                    {e}
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={book}
                className="group flex flex-1 items-center justify-between rounded-full bg-clay py-2 pl-5 pr-2 text-sm font-semibold text-white transition hover:bg-[#b3704f]"
              >
                Book {s.title}
                <span className="grid size-9 place-items-center rounded-full bg-white text-clay transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </button>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ring-1 ring-ink/15 transition hover:bg-ink/5"
              >
                <MessageCircle className="size-4" /> Ask on WhatsApp
              </a>
            </motion.div>
            <motion.p variants={item} className="text-[0.7rem] text-muted">
              Prices are indicative. Your plan and cost are confirmed after assessment.
            </motion.p>
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  );
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};
