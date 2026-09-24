import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { clinic } from "@/lib/content";
import { DEMO, owner } from "@/lib/site";
import DemoBanner, { BANNER_H } from "@/components/demo/DemoBanner";
import Watermark from "@/components/demo/Watermark";
import DemoGuards from "@/components/demo/DemoGuards";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${clinic.name} | ${clinic.descriptor}, ${clinic.city}`,
  ...(clinic.logo ? { icons: { icon: clinic.logo, apple: clinic.logo } } : {}),
  // a demo listing should never be indexed or outrank the buyer's own site
  ...(DEMO ? { robots: { index: false, follow: false, nocache: true } } : {}),
  authors: DEMO ? [{ name: owner.name }] : undefined,
  description:
    `${clinic.name}: doctor-led aesthetics and expert physiotherapy under one calm roof in ${clinic.area}. Stroke rehab, back and knee pain, sports injury rehab, laser hair removal, HydraFacial, PRP and HIFU. Home visits available.`,
};

export const viewport: Viewport = {
  themeColor: "#f7f2eb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Browser extensions (Grammarly, ColorZilla, password managers…) inject attributes on
    // <html>/<body> before React hydrates; suppress the resulting attribute-only warnings.
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className={`grain${DEMO ? " demo-mode" : ""}`} style={DEMO ? { paddingTop: BANNER_H } : undefined} suppressHydrationWarning>
        {DEMO && (
          <>
            {/* ownership notice kept in the page source as well as on screen */}
            <div hidden aria-hidden data-owner={owner.name} data-copyright={`© ${owner.year} ${owner.name}. ${owner.notice}`} />
            <DemoBanner />
            <Watermark />
            <DemoGuards />
          </>
        )}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
