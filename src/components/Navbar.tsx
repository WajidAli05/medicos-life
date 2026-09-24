"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { clinic, nav } from "@/lib/content";
import { WATERMARKS } from "@/lib/site";
import { BANNER_H } from "./demo/DemoBanner";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 600 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ top: WATERMARKS ? BANNER_H : 0 }}
        className="fixed inset-x-0 z-50 px-4 pt-4 md:px-6"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-6 ${
            solid
              ? "bg-cream/85 text-ink shadow-[0_10px_40px_-20px_rgb(29_40_38/0.35)] ring-1 ring-ink/5 backdrop-blur-xl"
              : "text-cream"
          }`}
        >
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium opacity-80 transition hover:opacity-100 after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${clinic.phoneIntl}`}
              className="hidden items-center gap-2 px-3 text-sm font-medium opacity-80 hover:opacity-100 xl:flex"
            >
              <Phone className="size-4" /> {clinic.phone}
            </a>
            <span className="hidden md:block">
              <Button href="#book" variant={solid ? "dark" : "light"}>
                Book a visit
              </Button>
            </span>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full ring-1 ring-current/20 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            style={{ top: WATERMARKS ? BANNER_H : 0 }}
            className="fixed inset-x-0 bottom-0 z-40 flex flex-col justify-end bg-evergreen px-6 pb-12 text-cream lg:hidden"
          >
            <ul className="space-y-1">
              {nav.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <a href={n.href} onClick={() => setOpen(false)} className="display block py-1 text-5xl">
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4">
              <span onClick={() => setOpen(false)}>
                <Button href="#book" variant="clay">
                  Book a visit
                </Button>
              </span>
              <a href={`tel:${clinic.phoneIntl}`} className="text-sm opacity-70">
                {clinic.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
