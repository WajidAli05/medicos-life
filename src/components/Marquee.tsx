import { Sparkle } from "lucide-react";

const items = [
  "Stroke Rehab",
  "Laser Hair Removal",
  "Frozen Shoulder",
  "HydraFacial",
  "Back & Neck Pain",
  "PRP & PRGF",
  "Knee Pain",
  "HIFU Lifting",
  "Sports Injury Rehab",
  "Glutathione",
  "Home Physiotherapy",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-cream py-6" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="display text-3xl text-ink/80 md:text-4xl">{t}</span>
            <Sparkle className="size-5 text-clay" />
          </span>
        ))}
      </div>
    </div>
  );
}
