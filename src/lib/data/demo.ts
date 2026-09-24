import { px } from "../images";
import type { SiteProfile } from "./types";

/**
 * DEMO PROFILE — used for the public sale listing.
 * Everything here is invented: clinic name, address, phone, staff and reviews are sample
 * content for showing the design. No real business details appear in this profile.
 */
export const demoProfile: SiteProfile = {
  clinic: {
    name: "Aurelia",
    descriptor: "Physio & Aesthetic Clinic",
    founder: "James Whitfield, MSc PT",
    motto: ["Move", "Heal", "Glow"],
    logo: null,
    phone: "020 7946 0121",
    phoneIntl: "+442079460121",
    whatsapp: "https://wa.me/442079460121",
    address: "12 Wren Street, Holborn, London WC1X 0HB",
    area: "Holborn, London",
    city: "London",
    rating: 4.9,
    mapsUrl: "https://www.google.com/maps/search/physiotherapy+clinic+Holborn+London",
    mapsEmbed: "https://www.google.com/maps?q=Wren+Street,+Holborn,+London&z=15&output=embed",
    hours: [
      ["Mon – Fri", "8:00 – 20:00"],
      ["Saturday", "9:00 – 17:00"],
      ["Home visits", "By appointment"],
    ],
    hoursShort: "Mon – Sat, 8:00 – 20:00",
    hoursBadge: "6 days a week",
  },

  highlightStat: { value: 16, suffix: "", label: "Treatments under one roof" },

  teamNote: "Chartered physiotherapists and registered doctors, each with a decade or more of specialist experience.",
  founderPhoto: px(20860585, 800),
  founderAvatar: px(20860585, 160),
  team: [
    { name: "James Whitfield, MSc PT", role: "Founder & Lead Physiotherapist", img: px(20860585, 800) },
    { name: "Dr. Eleanor Hayes", role: "Medical Director, Aesthetics", img: px(7904457, 800) },
    { name: "Dr. Sophie Bennett", role: "Aesthetic Physician", img: px(8459997, 800) },
    { name: "Daniel Cole, MSc", role: "Sports Rehab Specialist", img: px(32115957, 800) },
  ],
  heroAvatars: [px(20860585, 160), px(7904457, 160), px(8459997, 160)],

  journey: [
    { step: "01", title: "Listen", text: "An unhurried consultation. We hear your story, your goals and what has not worked before.", img: px(4506074, 1000) },
    { step: "02", title: "Assess", text: "Movement screening, skin analysis and clear diagnostics, explained in plain language.", img: px(5793917, 1000) },
    { step: "03", title: "Treat", text: "Hands-on care and proven technology, at the clinic or in the comfort of your home.", img: px(7581575, 1000) },
    { step: "04", title: "Sustain", text: "A home exercise plan, check-ins and progress tracking, so the results last.", img: px(4506073, 1000) },
  ],

  images: { approachMain: px(7789616, 1200), approachInset: px(6810869, 800), aestheticIntro: px(4586721, 400) },

  faqs: [
    {
      q: "Do I need a GP referral to book physiotherapy?",
      a: "No. You can book directly. If you have reports, X-rays or an MRI, please bring them along so we can plan your treatment.",
    },
    {
      q: "Do you treat stroke and neurological patients at home?",
      a: "Yes. Our physiotherapists visit homes across the city for stroke, elderly and post-surgery patients, and guide family members on safe daily care.",
    },
    {
      q: "Is laser hair removal safe for my skin tone?",
      a: "Yes, when the settings are matched to your skin type. We carry out a patch test and assessment first, and adjust treatment to protect against burns or pigmentation.",
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
      q: "How do I book?",
      a: "Use the booking form, or call the clinic during opening hours. We'll confirm your appointment the same day.",
    },
  ],

  // Sample reviews written for the demo. Not real customer feedback.
  reviews: [
    { author: "Charlotte Mills", rating: 5, date: "2026-09-12", text: "Two years of back pain and I had given up. Eight sessions in, I'm running again. They treated me like a person, not a case number." },
    { author: "Tom Bradley", rating: 5, date: "2026-09-02", text: "After ACL surgery I was nervous. The plan was built week by week and I was back on the pitch a month ahead of schedule." },
    { author: "Priya Shah", rating: 5, date: "2026-08-21" },
    { author: "Rebecca Doyle", rating: 5, date: "2026-08-04", text: "The HydraFacial is my monthly reset. Calm, spotless clinic and genuinely caring staff." },
    { author: "Michael Osei", rating: 4, date: "2026-07-26", text: "Very professional. Booking was easy and the frozen shoulder work made a real difference." },
    { author: "Hannah Clarke", rating: 5, date: "2026-07-15", text: "Laser hair removal done properly, with a patch test and a proper explanation first. Six sessions and the results are excellent." },
    { author: "Daniel Fisher", rating: 5, date: "2026-06-30" },
    { author: "Aisha Rahman", rating: 5, date: "2026-06-18", text: "They visited my father at home after his stroke. Punctual, patient and so respectful with him." },
    { author: "Oliver Grant", rating: 4, date: "2026-06-02", text: "Great sports rehab. Clear milestones so you always know where you are." },
    { author: "Sofia Romano", rating: 5, date: "2026-05-20", text: "PRP for hair thinning. Honest advice about what it could and couldn't do, which I appreciated." },
  ],
  reviewTotal: 128,
  reviewsEyebrow: "Patient reviews",
  reviewsNote: "Sample reviews, shown to demonstrate the design.",
  reviewsUrl: "https://www.google.com/maps/search/physiotherapy+clinic+Holborn+London",

  services: {
    stroke: { from: "£85" },
    "frozen-shoulder": { from: "£65" },
    neck: { from: "£60" },
    back: { from: "£60" },
    knee: { from: "£60" },
    sports: { from: "£70" },
    "post-surgery": { from: "£75", img: px(20860595, 1100) },
    cupping: { from: "£55" },
    electro: { from: "£45" },
    home: { from: "£95", img: px(7235063, 1400) },
    "laser-hair": { from: "£90 / area", img: px(3985354, 1600) },
    prp: { from: "£250" },
    prgf: { from: "£350" },
    glutathione: { from: "£120" },
    hydrafacial: { from: "£140" },
    hifu: { from: "£450" },
  },
};
