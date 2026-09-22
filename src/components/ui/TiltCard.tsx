"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
};

/** Pointer-driven 3D tilt with a soft light glare. Children can use translateZ for parallax depth. */
export default function TiltCard({ children, className = "", max = 10, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const cfg = { stiffness: 180, damping: 18, mass: 0.6 };
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), cfg);
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), cfg);
  const gx = useTransform(x, [0, 1], [0, 100]);
  const gy = useTransform(y, [0, 1], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.28), transparent 55%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full will-change-transform"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          />
        )}
      </motion.div>
    </div>
  );
}
