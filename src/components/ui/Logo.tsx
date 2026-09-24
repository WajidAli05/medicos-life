import Image from "next/image";
import { clinic } from "@/lib/content";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${className}`} aria-label={`${clinic.name}, ${clinic.descriptor}, home`}>
      {clinic.logo ? (
        <Image
          src={clinic.logo}
          alt=""
          width={44}
          height={44}
          priority
          className="size-11 rounded-full shadow-[0_4px_14px_-4px_rgb(0_0_0/0.45)] ring-1 ring-white/30"
        />
      ) : (
        // fallback mark: a leaf that doubles as a spine curve — aesthetics + movement
        <svg viewBox="0 0 40 40" className="size-10" aria-hidden>
          <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeOpacity=".35" />
          <path d="M20 8c7 5 7.5 15 0 24C12.5 23 13 13 20 8Z" fill="#c4805f" />
          <path d="M20 11v19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M20 17l-3.2-2.4M20 21.5l3.4-2.6M20 26l-3-2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}
      <span className="whitespace-nowrap leading-none">
        <span className="display block text-[1.3rem]">{clinic.name}</span>
        <span className="eyebrow mt-1 block text-[0.55rem] opacity-70">{clinic.descriptor}</span>
      </span>
    </a>
  );
}
