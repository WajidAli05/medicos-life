"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { Hand, RotateCcw } from "lucide-react";
import type { MapPoint } from "@/lib/anatomy";
import SplitHeading from "../ui/SplitHeading";
import type { MapState } from "./MapContext";
import PointDetails from "./PointDetails";
import SceneBoundary from "./SceneBoundary";
import type { SceneKind, TurnTo } from "./AnatomyScene";

const AnatomyScene = dynamic(() => import("./AnatomyScene"), { ssr: false });

type View = { label: string; angle: number };

type Props = {
  id: string;
  kind: SceneKind;
  eyebrow: string;
  title: string[];
  intro: string;
  points: MapPoint[];
  filters: readonly string[];
  /** camera angle for a point when it's picked from the list */
  angleFor: (p: MapPoint) => number;
  views: View[];
  dark?: boolean;
  credit?: React.ReactNode;
};

export default function AnatomySection({ id, kind, eyebrow, title, intro, points, filters, angleFor, views, dark, credit }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [floating, setFloating] = useState(true);
  const [turnTo, setTurnTo] = useState<TurnTo>(null);
  const [failed, setFailed] = useState(false);

  // load the 3D only as the section approaches, and pause rendering when it's off-screen
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setMounted(true), { rootMargin: "600px 0px" });
    const seen = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { rootMargin: "80px 0px" });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setFloating(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const turn = (angle: number) => setTurnTo((prev) => ({ angle, nonce: (prev?.nonce ?? 0) + 1 }));
  const pick = (p: MapPoint) => {
    setActive(active === p.id ? null : p.id);
    turn(angleFor(p));
  };

  const state: MapState = useMemo(
    () => ({ points, active, hovered, filter, floating, accent: "#e0442f", setActive, setHovered }),
    [points, active, hovered, filter, floating],
  );
  const activeIndex = points.findIndex((p) => p.id === active);

  const t = dark
    ? { section: "bg-pine text-cream", muted: "text-cream/65", chip: "ring-cream/20 hover:bg-white/10", chipOn: "bg-cream text-pine", row: "hover:bg-white/5", rowOn: "bg-white/10", panel: "bg-[radial-gradient(ellipse_at_50%_35%,#2f5a52_0%,#1b3a35_55%,#132a26_100%)]", btn: "bg-white/10 hover:bg-white/20 text-cream" }
    : { section: "bg-cream text-ink", muted: "text-muted", chip: "ring-ink/15 hover:bg-ink/5", chipOn: "bg-evergreen text-cream", row: "hover:bg-ink/[0.04]", rowOn: "bg-blush/50", panel: "bg-[radial-gradient(ellipse_at_50%_40%,#fbf3ec_0%,#efd6c8_60%,#e6c3b1_100%)]", btn: "bg-white/70 hover:bg-white text-ink" };

  return (
    <section id={id} className={`relative overflow-hidden py-24 md:py-32 ${t.section}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ---- copy + list ---- */}
        <div className="lg:col-span-4 lg:pt-6">
          <p className={`eyebrow mb-6 ${dark ? "text-blush" : "text-clay"}`}>{eyebrow}</p>
          <SplitHeading lines={title} accentClass={dark ? "text-blush" : "text-clay"} className="text-[clamp(2.4rem,4.6vw,4rem)]" />
          <p className={`mt-6 max-w-md leading-relaxed ${t.muted}`}>{intro}</p>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter areas">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`relative rounded-full px-4 py-2 text-xs font-semibold ring-1 transition ${filter === f ? `${t.chipOn} ring-transparent` : t.chip}`}
              >
                {f}
              </button>
            ))}
          </div>

          <ol className="mt-6 grid grid-cols-2 gap-1 lg:grid-cols-1">
            {points.map((p, i) => {
              const off = filter !== "All" && !p.tags.includes(filter);
              const on = active === p.id || hovered === p.id;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => pick(p)}
                    onPointerEnter={() => setHovered(p.id)}
                    onPointerLeave={() => setHovered(null)}
                    className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${on ? t.rowOn : t.row} ${off ? "opacity-35" : ""}`}
                  >
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold transition ${on ? "bg-[#e0442f] text-white" : dark ? "bg-white/10" : "bg-ink/5"}`}>
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{p.label}</span>
                      <span className={`hidden truncate text-xs lg:block ${t.muted}`}>{p.teaser}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ---- 3D stage ---- */}
        <div className="lg:col-span-8">
          <div ref={panel} className={`relative h-[560px] overflow-hidden rounded-5xl md:h-[720px] lg:h-[820px] ${t.panel}`}>
            {/* decorative orbit lines */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className={`absolute left-1/2 top-1/2 size-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border ${dark ? "border-cream/5" : "border-ink/5"}`} />
              <div className={`absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${dark ? "border-cream/10" : "border-ink/10"}`} />
            </div>

            {mounted && (
              <SceneBoundary onError={() => setFailed(true)}>
                <AnatomyScene kind={kind} state={state} running={running} turnTo={turnTo} dark={dark} />
              </SceneBoundary>
            )}

            <div className={`pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs backdrop-blur ${dark ? "bg-white/10" : "bg-white/60"}`}>
              <Hand className="size-3.5" />
              <span className="hidden sm:inline">Drag to rotate · tap a red point</span>
              <span className="sm:hidden">Drag · tap</span>
            </div>

            <div className="absolute right-4 top-4 flex gap-1.5">
              {views.map((v) => (
                <button key={v.label} onClick={() => turn(v.angle)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur transition ${t.btn}`}>
                  {v.label}
                </button>
              ))}
              <button onClick={() => { setActive(null); turn(0); }} aria-label="Reset view" className={`grid size-8 place-items-center rounded-full backdrop-blur transition ${t.btn}`}>
                <RotateCcw className="size-3.5" />
              </button>
            </div>

            {credit && <div className={`absolute bottom-3 right-5 text-[0.62rem] ${t.muted}`}>{credit}</div>}
          </div>

          {/* mobile / tablet: details slide in beneath the model */}
          <AnimatePresence mode="wait">
            {(!floating || failed) && activeIndex >= 0 && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, rotateX: -12 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`mt-4 rounded-4xl p-6 ${dark ? "bg-white/5 ring-1 ring-cream/10" : "bg-white shadow-xl shadow-ink/5"}`}
              >
                <PointDetails point={points[activeIndex]} index={activeIndex} onClose={() => setActive(null)} tone={dark ? "dark" : "light"} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
