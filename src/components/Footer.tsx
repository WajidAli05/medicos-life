import { clinic, nav } from "@/lib/content";
import Logo from "./ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Expert physiotherapy and doctor-led aesthetics in I-8 Markaz, Islamabad, led by {clinic.founder}. Open 24 hours, with home visits across the city.
            </p>
            <p className="eyebrow mt-6 text-clay">{clinic.motto.join(" · ")}</p>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-muted">Explore</p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-clay">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-muted">Follow</p>
            <ul className="space-y-2.5">
              {["Instagram", "Facebook", "TikTok", "LinkedIn"].map((s) => (
                <li key={s}>
                  <a href="#" className="hover:text-clay">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-5 text-muted">Visit</p>
            <p className="leading-relaxed">{clinic.address}</p>
            <a href={`tel:${clinic.phoneIntl}`} className="mt-3 block text-evergreen underline decoration-clay/40 underline-offset-4">
              {clinic.phone}
            </a>
            <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-muted hover:text-clay">
              Get directions →
            </a>
          </div>
        </div>

        <p aria-hidden className="display mt-20 select-none whitespace-nowrap text-center text-[16vw] leading-[0.85] text-evergreen/90 xl:text-[14rem]">
          Medicos <em className="text-clay">Life</em>
        </p>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-muted md:flex-row">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <a href="#" className="hover:text-ink">Complaints policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
