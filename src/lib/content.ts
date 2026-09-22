export const px = (id: string | number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/6111051/6111051-hd_1920_1080_25fps.mp4";
// Posters are the first frame of each video, so nothing "jumps" when playback starts
export const HERO_POSTER = "/hero-poster.jpg";
export const BOOKING_VIDEO =
  "https://videos.pexels.com/video-files/8343371/8343371-hd_1280_720_25fps.mp4";
export const BOOKING_POSTER = "/booking-poster.jpg";

// Details from the clinic's Google Business listing
export const clinic = {
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
  rating: 4.8,
  mapsUrl:
    "https://www.google.com/maps/place/Aesthetic+and+Physio+Clinic/@33.6675526,73.0742321,17z/data=!4m6!3m5!1s0x38df97e1c69fc485:0x978d6c78c70f2235!8m2!3d33.6675526!4d73.0742321",
  mapsEmbed: "https://www.google.com/maps?q=Aesthetic+and+Physio+Clinic,+I-8+Markaz,+Islamabad&ll=33.6675526,73.0742321&z=16&output=embed",
  hours: [
    ["Clinic", "Open 24 hours, 7 days"],
    ["Home visits", "By appointment, across Islamabad"],
  ],
};

export const nav = [
  { label: "Physio", href: "#physiotherapy" },
  { label: "Aesthetics", href: "#aesthetics" },
  { label: "Body map", href: "#body-map" },
  { label: "Face map", href: "#face-map" },
  { label: "Reviews", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];

export const journey = [
  {
    step: "01",
    title: "Listen",
    text: "An unhurried consultation. We hear your story, your goals and what has not worked before.",
    img: px(14558557, 1000),
  },
  {
    step: "02",
    title: "Assess",
    text: "Movement screening, skin analysis and clear diagnostics, explained in plain language, in Urdu or English.",
    img: px(14558560, 1000),
  },
  {
    step: "03",
    title: "Treat",
    text: "Hands-on care and proven technology, at the clinic or in the comfort of your home.",
    img: px(3997982, 1000),
  },
  {
    step: "04",
    title: "Sustain",
    text: "A home exercise plan, WhatsApp check-ins and progress tracking, so results last.",
    img: px(11387453, 1000),
  },
];

export const stats = [
  { value: 4.8, suffix: "★", label: "Rating on Google", decimals: 1 },
  { value: 24, suffix: "/7", label: "Open round the clock" },
  { value: 2, suffix: "-in-1", label: "Physio & aesthetics, one roof" },
  { value: 1, suffix: "-to-1", label: "Same clinician, every visit" },
];

// Crops of /team/abdur-rahman.webp (the original is a wide scene)
export const FOUNDER_PHOTO = "/team/abdur-rahman-portrait.webp";
export const FOUNDER_AVATAR = "/team/abdur-rahman-avatar.webp";

export const team: { name: string; role: string; img: string; pos?: string }[] = [
  { name: "Dr Abdur Rahman, PT", role: "Founder & Lead Physiotherapist", img: FOUNDER_PHOTO, pos: "50% 0%" },
  { name: "Dr. Ayesha Siddiqui", role: "Medical Director, Aesthetics", img: px(5738735, 800) },
  { name: "Dr. Sana Malik, DPT", role: "Women's Health Physiotherapist", img: px(36665076, 800) },
  { name: "Dr. Hamza Qureshi", role: "Aesthetic Physician", img: px(6762869, 800) },
];

export const faqs = [
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
];
