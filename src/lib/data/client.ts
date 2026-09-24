import { px } from "../images";
import type { SiteProfile } from "./types";

/**
 * CLIENT PROFILE — the real clinic's details, used only when NEXT_PUBLIC_DEMO=false.
 *
 * ⚠ Before handing this repository to a buyer, delete this file (and the photos in
 * /public/brand and /public/team) so the real clinic's contact details, staff photos and
 * Google reviews are not passed on. `src/lib/data/index.ts` falls back to the demo profile.
 */
export const clientProfile: SiteProfile = {
  clinic: {
    name: "Medicos Life",
    descriptor: "Aesthetic & Physio Clinic",
    founder: "Dr Abdur Rahman PT",
    motto: ["Learn", "Heal", "Inspire"],
    logo: "/brand/medicos-life.webp",
    phone: "0312 0997699",
    phoneIntl: "+923120997699",
    whatsapp: "https://wa.me/923120997699",
    address: "I-8 Markaz, Islamabad 44000, Pakistan",
    area: "I-8 Markaz, Islamabad",
    city: "Islamabad",
    rating: 4.8,
    mapsUrl:
      "https://www.google.com/maps/place/Aesthetic+and+Physio+Clinic/@33.6675526,73.0742321,17z/data=!4m6!3m5!1s0x38df97e1c69fc485:0x978d6c78c70f2235!8m2!3d33.6675526!4d73.0742321",
    mapsEmbed:
      "https://www.google.com/maps?q=Aesthetic+and+Physio+Clinic,+I-8+Markaz,+Islamabad&ll=33.6675526,73.0742321&z=16&output=embed",
    hours: [
      ["Clinic", "Open 24 hours, 7 days"],
      ["Home visits", "By appointment, across Islamabad"],
    ],
    hoursShort: "Open 24 hours, 7 days",
    hoursBadge: "Open 24/7",
  },

  highlightStat: { value: 24, suffix: "/7", label: "Open round the clock" },

  teamNote: "DPT-qualified physiotherapists and PMDC-registered doctors. Male and female clinicians available, at the clinic or at home.",
  founderPhoto: "/team/abdur-rahman-portrait.webp",
  founderAvatar: "/team/abdur-rahman-avatar.webp",
  founderPos: "50% 0%",
  team: [
    { name: "Dr Abdur Rahman, PT", role: "Founder & Lead Physiotherapist", img: "/team/abdur-rahman-portrait.webp", pos: "50% 0%" },
    { name: "Dr. Ayesha Siddiqui", role: "Medical Director, Aesthetics", img: px(5738735, 800) },
    { name: "Dr. Sana Malik, DPT", role: "Women's Health Physiotherapist", img: px(36665076, 800) },
    { name: "Dr. Hamza Qureshi", role: "Aesthetic Physician", img: px(6762869, 800) },
  ],
  heroAvatars: ["/team/abdur-rahman-avatar.webp", px(5738735, 160), px(36665076, 160)],

  journey: [
    { step: "01", title: "Listen", text: "An unhurried consultation. We hear your story, your goals and what has not worked before.", img: px(14558557, 1000) },
    { step: "02", title: "Assess", text: "Movement screening, skin analysis and clear diagnostics, explained in plain language, in Urdu or English.", img: px(14558560, 1000) },
    { step: "03", title: "Treat", text: "Hands-on care and proven technology, at the clinic or in the comfort of your home.", img: px(3997982, 1000) },
    { step: "04", title: "Sustain", text: "A home exercise plan, WhatsApp check-ins and progress tracking, so results last.", img: px(11387453, 1000) },
  ],

  images: { approachMain: px(14797760, 1200), approachInset: px(35576577, 800), aestheticIntro: px(9219044, 400) },

  faqs: [
    {
      q: "Do I need a doctor's referral to book physiotherapy?",
      a: "No. You can book directly. If you have reports, X-rays or an MRI, please bring them along so we can plan your treatment.",
    },
    {
      q: "Do you treat stroke and paralysis patients at home?",
      a: "Yes. Our physiotherapists visit homes across Islamabad for stroke, paralysis, elderly and post-surgery patients, and guide family members on safe daily care.",
    },
    {
      q: "Is laser hair removal safe for desi skin?",
      a: "Yes, when settings are matched to your skin type. We do a patch test and assessment first, and adjust treatment for South Asian skin tones to protect against burns or pigmentation.",
    },
    {
      q: "What's the difference between PRP and PRGF?",
      a: "Both use growth factors from your own blood. PRGF is a more refined preparation with a purer concentration of growth factors, so it's often chosen for stubborn hair loss or deeper skin rejuvenation. We'll advise which suits you.",
    },
    {
      q: "Is glutathione treatment safe?",
      a: "It's given only after a doctor's consultation and suitability check, under medical supervision. We'll explain realistic results, the course length and aftercare.",
    },
    {
      q: "Is there downtime after HIFU or HydraFacial?",
      a: "Usually none. HydraFacial gives an instant glow. After HIFU you may feel mild tenderness for a day or two, and the lift develops gradually over 2–3 months.",
    },
    {
      q: "Are female practitioners available?",
      a: "Yes. You can request a female physiotherapist or practitioner for any appointment, at the clinic or at home.",
    },
    {
      q: "What are your timings?",
      a: "The clinic is open 24 hours, seven days a week. For the quickest booking, call or WhatsApp 0312 0997699.",
    },
  ],

  // Snapshot of the clinic's Google reviews, taken 22 Sep 2026, sorted newest first.
  reviews: [
    { author: "Aalia", rating: 5, date: "2026-09-15" },
    { author: "Tufail Khattak", rating: 5, date: "2026-08-25", text: "Highly Recommended and well mannered" },
    { author: "Utman khail", rating: 5, date: "2026-06-22", text: "To be honest, he is one of the best physiotherapist in Islamabad. I'm really satisfied with his services especially how he managed my cervical pain." },
    { author: "noreen akram", rating: 5, date: "2026-04-22", text: "One of the best therapist in twin city. Highly recommended" },
    { author: "Khaan", rating: 4, date: "2026-04-21" },
    { author: "Aliza Malik", rating: 5, date: "2026-04-20", text: "Very professional and caring physiotherapist. The treatment was effective and the clinic environment is clean and comfortable." },
    { author: "Khusboo Shakeel", rating: 5, date: "2026-04-19", text: "Highly recommend for home visits" },
    { author: "maria ali", rating: 5, date: "2026-04-18", text: "Best experience." },
    { author: "Haseeb Ilyas", rating: 5, date: "2026-04-17", text: "I personally visited him and got benifit from his treatment for my neck pain" },
    { author: "Hamza Ali", rating: 4, date: "2026-03-22", text: "best services" },
    { author: "Rizoo Khan", rating: 5, date: "2026-03-21" },
    { author: "Asad Ali", rating: 5, date: "2026-03-20" },
  ],
  reviewTotal: 12,
  reviewsEyebrow: "Real Google reviews",
  reviewsUrl:
    "https://www.google.com/maps/place/Aesthetic+and+Physio+Clinic/@33.6675526,73.0742321,17z/data=!4m8!3m7!1s0x38df97e1c69fc485:0x978d6c78c70f2235!8m2!3d33.6675526!4d73.0742321!9m1!1b1",

  services: {
    stroke: { from: "Rs 4,000" },
    "frozen-shoulder": { from: "Rs 3,000" },
    neck: { from: "Rs 3,000" },
    back: { from: "Rs 3,000" },
    knee: { from: "Rs 3,000", tagline: "Climb stairs and pray comfortably again" },
    sports: { from: "Rs 3,500", tagline: "Cricket, football, gym and running injuries", about: "Milestone-based rehab that gets you back to your sport stronger, whether it's a sprained ankle from futsal, a bowler's shoulder or an ACL reconstruction." },
    "post-surgery": { from: "Rs 4,000", img: px(14797757, 1100) },
    cupping: { from: "Rs 3,500", about: "Clinical cupping (hijama-style dry cupping) and dry needling release knotted muscles and trigger points, used alongside exercise for faster relief." },
    electro: { from: "Rs 2,500" },
    home: { from: "Rs 5,000", img: px(35011657, 1400), about: "For patients who can't easily travel: elders, stroke survivors and people recovering from surgery. Home visits are available across Islamabad, with male and female physiotherapists." },
    "laser-hair": { from: "Rs 4,000 / area", img: px(11816689, 1600), tagline: "Smooth skin that lasts, safe for desi skin tones", about: "Medical-grade laser targets hair at the root for long-term reduction. Settings are tailored to South Asian skin types to protect your skin while giving effective results." },
    prp: { from: "Rs 12,000" },
    prgf: { from: "Rs 18,000" },
    glutathione: { from: "Rs 6,000" },
    hydrafacial: { from: "Rs 8,000", about: "A multi-step medical facial that deep-cleans pores, gently exfoliates and infuses hydrating serums. Instant glow with zero downtime, the go-to before events and weddings." },
    hifu: { from: "Rs 25,000" },
  },
};
