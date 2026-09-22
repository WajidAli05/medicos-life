"use client";

import { bodyFilters, bodyPoints, faceFilters, facePoints, type BodyPoint, type FacePoint } from "@/lib/anatomy";
import AnatomySection from "./AnatomySection";

const DIR_ANGLE = { front: 0, back: Math.PI, left: Math.PI / 2, right: -Math.PI / 2 };

export function BodyMap() {
  return (
    <AnatomySection
      id="body-map"
      kind="body"
      dark
      eyebrow="Interactive body map · Physiotherapy"
      title={["Where does", "it *hurt?*"]}
      intro="Spin the model and tap a red point to see the kind of pain people feel there, what usually causes it, and how we treat it."
      points={bodyPoints}
      filters={bodyFilters}
      angleFor={(p) => DIR_ANGLE[(p as BodyPoint).dir]}
      views={[
        { label: "Front", angle: 0 },
        { label: "Back", angle: Math.PI },
      ]}
    />
  );
}

export function FaceMap() {
  return (
    <AnatomySection
      id="face-map"
      kind="face"
      eyebrow="Interactive face map · Aesthetics"
      title={["Your skin,", "*mapped.*"]}
      intro="Explore common concerns across the face. Tap a point to learn what you might notice, why it happens, and the gentle, doctor-led options we offer."
      points={facePoints}
      filters={faceFilters}
      angleFor={(p) => ((p as FacePoint).uv[0] - 0.5) * 1.6}
      views={[
        { label: "Left", angle: -0.9 },
        { label: "Front", angle: 0 },
        { label: "Right", angle: 0.9 },
      ]}
      credit={
        <>
          Head scan by{" "}
          <a className="underline" href="https://www.ir-ltd.net/" target="_blank" rel="noopener noreferrer">
            Lee Perry-Smith / Infinite-Realities
          </a>{" "}
          (CC BY 3.0)
        </>
      }
    />
  );
}
