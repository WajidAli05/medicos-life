import Image from "next/image";
import { clinic } from "@/lib/content";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${className}`} aria-label={`${clinic.name}, ${clinic.descriptor}, home`}>
      <Image
        src={clinic.logo}
        alt=""
        width={44}
        height={44}
        priority
        className="size-11 rounded-full shadow-[0_4px_14px_-4px_rgb(0_0_0/0.45)] ring-1 ring-white/30"
      />
      <span className="whitespace-nowrap leading-none">
        <span className="display block text-[1.3rem]">{clinic.name}</span>
        <span className="eyebrow mt-1 block text-[0.55rem] opacity-70">{clinic.descriptor}</span>
      </span>
    </a>
  );
}
