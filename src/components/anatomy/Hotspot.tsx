"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "motion/react";
import type { MapPoint } from "@/lib/anatomy";
import { useMap } from "./MapContext";
import PointDetails from "./PointDetails";

type Props = {
  point: MapPoint;
  index: number;
  position: THREE.Vector3;
  /** outward direction of the skin at this point, used to hide markers facing away */
  normal: THREE.Vector3;
};

const _world = new THREE.Vector3();
const _n = new THREE.Vector3();
const _toCam = new THREE.Vector3();
const _ndc = new THREE.Vector3();

const CARD_W = 300;
const LINE_X = 70; // horizontal run of the connector
const LINE_Y = 44; // vertical rise of the connector
const REACH = 34 + LINE_X + 6; // marker → card edge

export default function Hotspot({ point, index, position, normal }: Props) {
  const { active, hovered, filter, floating, setActive, setHovered } = useMap();
  const group = useRef<THREE.Group>(null);
  const el = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const knot = useRef<SVGCircleElement>(null);
  const lastKey = useRef<string | null>(null);
  const [side, setSide] = useState<"left" | "right">("right");

  const dimmed = filter !== "All" && !point.tags.includes(filter);
  const isActive = active === point.id;
  const isOpen = floating && (isActive || (hovered === point.id && !active));

  useFrame(({ camera, size }) => {
    if (!group.current || !el.current) return;
    group.current.getWorldPosition(_world);
    _n.copy(normal).transformDirection(group.current.parent!.matrixWorld);
    _toCam.copy(camera.position).sub(_world).normalize();
    const facing = _n.dot(_toCam);
    // fade markers out as they turn away from the viewer
    const vis = THREE.MathUtils.clamp((facing + 0.05) / 0.3, 0, 1);
    el.current.style.opacity = String(vis * (dimmed ? 0.25 : 1));
    el.current.style.pointerEvents = vis > 0.5 ? "auto" : "none";
    if (vis < 0.2 && isActive) setActive(null);

    if (!isOpen) return;
    // open the card toward whichever side has room, and keep it inside the canvas vertically
    _ndc.copy(_world).project(camera);
    const sx = ((_ndc.x + 1) / 2) * size.width;
    const sy = ((1 - _ndc.y) / 2) * size.height;
    // pick the side with room; when neither fits, shorten the connector so the card stays in view
    const roomR = size.width - 14 - CARD_W - sx;
    const roomL = sx - 14 - CARD_W;
    const nextSide = roomR >= REACH ? "right" : roomL >= REACH ? "left" : roomR >= roomL ? "right" : "left";
    if (nextSide !== side) setSide(nextSide);
    const gap = Math.round(THREE.MathUtils.clamp(nextSide === "right" ? roomR : roomL, 30, REACH));

    // placement is written straight to the DOM (no React re-render per frame)
    if (!card.current) return;
    const h = card.current.offsetHeight || 460;
    const top = Math.round(THREE.MathUtils.clamp(sy - LINE_Y - h * 0.3, 14, Math.max(14, size.height - h - 14)) - sy);
    const key = `${top}|${nextSide}|${gap}`;
    if (key === lastKey.current) return;
    lastKey.current = key;
    const d = nextSide === "right" ? 1 : -1;
    // the connector meets the card within its upper part
    const joinY = THREE.MathUtils.clamp(-LINE_Y, top + 24, top + 120);
    const elbow = Math.min(34, gap - 12);
    card.current.style.top = `${top}px`;
    card.current.style.left = `${nextSide === "right" ? gap : -(gap + CARD_W)}px`;
    card.current.style.transformOrigin = `${nextSide === "right" ? "left" : "right"} ${joinY - top}px`;
    path.current?.setAttribute("d", `M ${d * 14} ${Math.sign(joinY) * 8} L ${d * elbow} ${joinY} L ${d * (gap - 6)} ${joinY}`);
    knot.current?.setAttribute("cx", String(d * (gap - 6)));
    knot.current?.setAttribute("cy", String(joinY));
  });

  // re-measure whenever the card opens
  useEffect(() => {
    if (!isOpen) lastKey.current = null;
  }, [isOpen]);

  const dx = side === "right" ? 1 : -1;
  const joinY = -LINE_Y; // initial geometry; refined every frame above

  return (
    <group ref={group} position={position}>
      <Html zIndexRange={isOpen ? [60, 50] : [40, 0]} style={{ pointerEvents: "none" }}>
        <div ref={el} className="relative" style={{ transition: "opacity .25s" }}>
          <button
            type="button"
            aria-label={`${point.label}: ${point.teaser}`}
            aria-expanded={isOpen}
            onPointerEnter={() => setHovered(point.id)}
            onPointerLeave={() => setHovered(null)}
            onClick={(e) => {
              e.stopPropagation();
              setActive(isActive ? null : point.id);
            }}
            className="hotspot absolute -left-[15px] -top-[15px] grid size-[30px] cursor-pointer place-items-center"
            data-active={isActive || hovered === point.id}
          >
            <span className="hotspot-ring" />
            <span className="hotspot-ring [animation-delay:1s]" />
            <span className="hotspot-core">{index + 1}</span>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div key="card" className="pointer-events-none absolute left-0 top-0" initial="hidden" animate="show" exit="hidden">
                {/* connector: dot → elbow → card */}
                <svg
                  className="absolute overflow-visible"
                  style={{ left: 0, top: 0 }}
                  width={1}
                  height={1}
                  aria-hidden
                >
                  <motion.path
                    ref={path}
                    d={`M ${dx * 14} ${Math.sign(joinY) * 8} L ${dx * 34} ${joinY} L ${dx * (34 + LINE_X)} ${joinY}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="text-blush"
                    variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                  <motion.circle
                    ref={knot}
                    cx={dx * (34 + LINE_X)}
                    cy={joinY}
                    r={3}
                    className="fill-blush"
                    variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
                    transition={{ delay: 0.35 }}
                  />
                </svg>

                <motion.div
                  ref={card}
                  className="pointer-events-auto absolute w-[300px] rounded-3xl bg-cream/95 p-5 shadow-[0_30px_70px_-20px_rgb(0_0_0/0.55)] ring-1 ring-ink/5 backdrop-blur-xl"
                  style={{
                    left: side === "right" ? REACH : -(REACH + CARD_W),
                    top: -200,
                  }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, rotateY: dx * -25, filter: "blur(6px)" },
                    show: { opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  onPointerEnter={() => setHovered(point.id)}
                  onPointerLeave={() => setHovered(null)}
                >
                  <PointDetails point={point} index={index} onClose={isActive ? () => setActive(null) : undefined} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Html>
    </group>
  );
}
