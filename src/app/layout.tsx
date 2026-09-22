import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
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
  title: "Medicos Life | Aesthetic & Physio Clinic, Islamabad",
  icons: { icon: "/brand/medicos-life.webp", apple: "/brand/medicos-life.webp" },
  description:
    "Medicos Life by Dr Abdur Rahman PT. Doctor-led aesthetics and expert physiotherapy under one calm roof. Sports injury rehab, back pain, skin rejuvenation and natural-looking injectables in I-8 Markaz, Islamabad. Open 24 hours, home visits available.",
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
      <body className="grain" suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
