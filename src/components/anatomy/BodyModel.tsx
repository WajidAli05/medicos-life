"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { BODY_MODEL, bodyPoints, type Dir } from "@/lib/anatomy";
import Hotspot from "./Hotspot";

const DIRS: Record<Dir, THREE.Vector3> = {
  front: new THREE.Vector3(0, 0, 1),
  back: new THREE.Vector3(0, 0, -1),
  left: new THREE.Vector3(1, 0, 0),
  right: new THREE.Vector3(-1, 0, 0),
};
const Z = new THREE.Vector3(0, 0, 1);

/** Rotate a bone about a world-space axis, keeping the rest of the rig intact */
function rotateWorld(root: THREE.Object3D, name: string, axis: THREE.Vector3, deg: number) {
  const bone = root.getObjectByName(name);
  if (!bone?.parent) return;
  root.updateMatrixWorld(true);
  const parentQ = bone.parent.getWorldQuaternion(new THREE.Quaternion());
  const q = new THREE.Quaternion().setFromAxisAngle(axis, THREE.MathUtils.degToRad(deg));
  bone.quaternion.premultiply(parentQ.clone().invert().multiply(q).multiply(parentQ));
}

export default function BodyModel() {
  const { scene } = useGLTF(BODY_MODEL);

  const { model, anchors } = useMemo(() => {
    const model = clone(scene);

    // "Star" pose: arms lifted above the T, legs set wide
    rotateWorld(model, "mixamorigLeftArm", Z, 24);
    rotateWorld(model, "mixamorigRightArm", Z, -24);
    rotateWorld(model, "mixamorigLeftForeArm", Z, 6);
    rotateWorld(model, "mixamorigRightForeArm", Z, -6);
    rotateWorld(model, "mixamorigLeftUpLeg", Z, 16);
    rotateWorld(model, "mixamorigRightUpLeg", Z, -16);
    rotateWorld(model, "mixamorigLeftFoot", Z, -10);
    rotateWorld(model, "mixamorigRightFoot", Z, 10);
    model.updateMatrixWorld(true);

    const skin = new THREE.MeshPhysicalMaterial({
      color: "#efe4d8",
      roughness: 0.42,
      clearcoat: 0.5,
      clearcoatRoughness: 0.35,
      sheen: 0.6,
      sheenColor: new THREE.Color("#f3c9b6"),
    });
    const joints = new THREE.MeshStandardMaterial({ color: "#c4805f", roughness: 0.55, metalness: 0.15 });
    const meshes: THREE.SkinnedMesh[] = [];
    model.traverse((o) => {
      const m = o as THREE.SkinnedMesh;
      if (!m.isSkinnedMesh) return;
      m.material = m.name.includes("Joints") ? joints : skin;
      m.castShadow = true;
      m.frustumCulled = false;
      m.computeBoundingSphere();
      meshes.push(m);
    });

    // Project each anchor bone onto the skin along its facing direction
    const ray = new THREE.Raycaster();
    const anchors = bodyPoints.map((p) => {
      const dir = DIRS[p.dir];
      const bone = model.getObjectByName(p.bone);
      const at = bone ? bone.getWorldPosition(new THREE.Vector3()) : new THREE.Vector3();
      if (p.offset) at.add(new THREE.Vector3(...p.offset));
      ray.set(at.clone().addScaledVector(dir, 1), dir.clone().negate());
      const hit = ray.intersectObjects(meshes, false)[0];
      const position = hit ? hit.point.addScaledVector(dir, 0.012) : at.addScaledVector(dir, 0.08);
      return { position, normal: dir.clone() };
    });

    return { model, anchors };
  }, [scene]);

  return (
    <group>
      <primitive object={model} />
      {bodyPoints.map((p, i) => (
        <Hotspot key={p.id} point={p} index={i} position={anchors[i].position} normal={anchors[i].normal} />
      ))}
    </group>
  );
}

useGLTF.preload(BODY_MODEL);
