"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FACE_MODEL, facePoints } from "@/lib/anatomy";
import Hotspot from "./Hotspot";

const HEIGHT = 2.1; // world units the bust is scaled to
// Where the face sits inside the bust's bounding box (fractions of width / height).
// Face-point uv coordinates are relative to this box: (0,0) chin-left → (1,1) hairline-right.
const FACE_BOX = { x: [0.27, 0.73], y: [0.318, 0.961] } as const;

export default function FaceModel() {
  const { scene } = useGLTF(FACE_MODEL);
  const scan = useRef<THREE.Mesh>(null);

  const { model, anchors, bounds } = useMemo(() => {
    const model = scene.clone(true);
    const porcelain = new THREE.MeshPhysicalMaterial({
      color: "#f2e3d8",
      roughness: 0.48,
      sheen: 0.8,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color("#f6c7b3"),
      clearcoat: 0.25,
      clearcoatRoughness: 0.6,
    });
    const meshes: THREE.Mesh[] = [];
    model.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.material = porcelain;
      m.castShadow = true;
      meshes.push(m);
    });

    // normalise: centre at origin, fixed height
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const s = HEIGHT / size.y;
    model.scale.setScalar(s);
    model.position.copy(box.getCenter(new THREE.Vector3()).multiplyScalar(-s));
    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(model);

    // cast rays straight at the face to place each marker on the surface
    const ray = new THREE.Raycaster();
    const back = new THREE.Vector3(0, 0, -1);
    const anchors = facePoints.map((p) => {
      const fx = THREE.MathUtils.lerp(FACE_BOX.x[0], FACE_BOX.x[1], p.uv[0]);
      const fy = THREE.MathUtils.lerp(FACE_BOX.y[0], FACE_BOX.y[1], p.uv[1]);
      const x = THREE.MathUtils.lerp(bounds.min.x, bounds.max.x, fx);
      const y = THREE.MathUtils.lerp(bounds.min.y, bounds.max.y, fy);
      ray.set(new THREE.Vector3(x, y, bounds.max.z + 1), back);
      const hit = ray.intersectObjects(meshes, false)[0];
      const normal = hit?.face
        ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld).lerp(new THREE.Vector3(0, 0, 1), 0.35).normalize()
        : new THREE.Vector3(0, 0, 1);
      const position = hit ? hit.point.addScaledVector(normal, 0.01) : new THREE.Vector3(x, y, bounds.max.z);
      return { position, normal };
    });

    return { model, anchors, bounds };
  }, [scene]);

  // a soft band of light sweeping over the face, like a skin analysis scan
  useFrame(({ clock }) => {
    if (!scan.current) return;
    const t = (Math.sin(clock.elapsedTime * 0.6) + 1) / 2;
    const h = bounds.max.y - bounds.min.y;
    scan.current.position.y = bounds.min.y + h * THREE.MathUtils.lerp(FACE_BOX.y[0] - 0.04, 0.97, t);
  });

  return (
    <group>
      <primitive object={model} />
      <mesh ref={scan} rotation-x={-Math.PI / 2} position-z={0.05}>
        <ringGeometry args={[0.46, 0.475, 96]} />
        <meshBasicMaterial color="#e0442f" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {facePoints.map((p, i) => (
        <Hotspot key={p.id} point={p} index={i} position={anchors[i].position} normal={anchors[i].normal} />
      ))}
    </group>
  );
}

useGLTF.preload(FACE_MODEL);
