"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, OrbitControls, useProgress } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import BodyModel from "./BodyModel";
import FaceModel from "./FaceModel";
import { MapContext, type MapState } from "./MapContext";

export type SceneKind = "body" | "face";

const CONFIG = {
  body: { camera: [0, 1.0, 4.6] as const, target: [0, 0.92, 0] as const, fov: 34, azimuth: [-Infinity, Infinity] as const, floorY: 0 },
  face: { camera: [0, 0.5, 3.5] as const, target: [0, 0.42, 0] as const, fov: 30, azimuth: [-1.25, 1.25] as const, floorY: -1.08 },
};

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-current">
        <div className="h-1 w-40 overflow-hidden rounded-full bg-current/15">
          <div className="h-full rounded-full bg-[#e0442f] transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="eyebrow whitespace-nowrap text-[0.6rem] opacity-70">Loading 3D model · {Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

/** Exposes a camera "reset / turn to" API to the DOM controls outside the canvas */
export type TurnTo = { angle: number; nonce: number } | null;

function CameraRig({ kind, turnTo }: { kind: SceneKind; turnTo: TurnTo }) {
  const get = useThree((s) => s.get);
  const raf = useRef(0);
  useEffect(() => {
    const controls = get().controls as OrbitControlsImpl | null;
    if (!controls || turnTo === null) return;
    const from = controls.getAzimuthalAngle();
    let to = turnTo.angle;
    // shortest way round
    while (to - from > Math.PI) to -= Math.PI * 2;
    while (to - from < -Math.PI) to += Math.PI * 2;
    const [minA, maxA] = CONFIG[kind].azimuth;
    to = THREE.MathUtils.clamp(to, minA, maxA);
    const start = performance.now();
    cancelAnimationFrame(raf.current);
    // damping would lag behind the tween, so drive the angle directly while turning
    controls.enableDamping = false;
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 900);
      const e = 1 - Math.pow(1 - k, 3);
      controls.setAzimuthalAngle(from + (to - from) * e);
      controls.update();
      if (k < 1) raf.current = requestAnimationFrame(step);
      else controls.enableDamping = true;
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf.current);
      controls.enableDamping = true;
    };
  }, [get, turnTo, kind]);
  return null;
}

/**
 * Mobile: while the details sheet covers the lower part of the window, shift the rendered view
 * up (camera view offset) so the model stays visible above the sheet. Markers follow automatically.
 */
function ViewLift({ lift }: { lift: boolean }) {
  const amount = useRef(0);
  useFrame(({ camera, size }, dt) => {
    const cam = camera as THREE.PerspectiveCamera;
    const target = lift ? 1 : 0;
    if (target === 0 && amount.current === 0) return;
    amount.current = THREE.MathUtils.damp(amount.current, target, 6, dt);
    if (target === 0 && amount.current < 0.002) {
      amount.current = 0;
      cam.clearViewOffset();
      return;
    }
    cam.setViewOffset(size.width, size.height, 0, amount.current * size.height * 0.27, size.width, size.height);
  });
  return null;
}

type Props = { kind: SceneKind; state: MapState; running: boolean; turnTo: TurnTo; dark?: boolean; lift?: boolean };

export default function AnatomyScene({ kind, state, running, turnTo, dark, lift = false }: Props) {
  const cfg = CONFIG[kind];
  // the idle spin pauses while someone drags, hovers or reads a card, and resumes after a quiet spell
  const [spin, setSpin] = useState(true);
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(idle.current), []);
  const autoRotate = spin && running && !state.active && !state.hovered;

  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [...cfg.camera], fov: cfg.fov, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      onPointerMissed={() => state.setActive(null)}
      className={`anatomy-canvas ${dark ? "text-cream" : "text-ink"}`}
    >
      {/* the context is re-provided so it survives the canvas boundary */}
      <MapContext.Provider value={state}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[2.5, 4, 3]} intensity={1.6} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={1.2} color="#f0a58a" />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 3, 3]} scale={[6, 2, 1]} />
          <Lightformer intensity={1.2} color="#f6c7b3" position={[-4, 1, 1]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} />
          <Lightformer intensity={1.5} color="#a9bfa8" position={[4, 1, -2]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} />
          <Lightformer form="ring" intensity={2} position={[0, 2, -4]} scale={2} />
        </Environment>

        <Suspense fallback={<Loader />}>
          {kind === "body" ? <BodyModel /> : <FaceModel />}
        </Suspense>

        <ContactShadows position={[0, cfg.floorY, 0]} opacity={dark ? 0.55 : 0.35} scale={4} blur={2.6} far={2.5} color={dark ? "#000000" : "#6b4a3a"} />
        {kind === "body" && (
          <mesh rotation-x={-Math.PI / 2} position={[0, 0.002, 0]}>
            <ringGeometry args={[0.95, 0.965, 128]} />
            <meshBasicMaterial color="#e0442f" transparent opacity={0.45} />
          </mesh>
        )}

        <OrbitControls
          makeDefault
          target={[...cfg.target]}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          autoRotate={autoRotate}
          autoRotateSpeed={kind === "body" ? 0.9 : 0}
          minPolarAngle={Math.PI / 2 - 0.35}
          maxPolarAngle={Math.PI / 2 + 0.15}
          minAzimuthAngle={cfg.azimuth[0]}
          maxAzimuthAngle={cfg.azimuth[1]}
          onStart={() => {
            setSpin(false);
            clearTimeout(idle.current);
          }}
          onEnd={() => {
            idle.current = setTimeout(() => setSpin(true), 6000);
          }}
        />
        <CameraRig kind={kind} turnTo={turnTo} />
        <ViewLift lift={lift} />
      </MapContext.Provider>
    </Canvas>
  );
}
