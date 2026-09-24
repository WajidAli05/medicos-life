import { px } from "./images";
import { profile } from "./data";

// Shared service copy. Prices, a few images and locale-specific wording come from the active
// profile (src/lib/data), so the demo and the real clinic can differ without duplicating content.

export type ServiceCategory = "physio" | "aesthetic";

export type Service = {
  id: string;
  category: ServiceCategory;
  title: string;
  /** one line under the title */
  tagline: string;
  /** a short paragraph for the detail view */
  about: string;
  helps: string[];
  expect: string[];
  duration: string;
  sessions: string;
  from: string;
  img: string;
  /** bento sizing for the physio grid */
  size?: "xl" | "wide" | "tall";
};

const physioBase: Service[] = [
  {
    id: "stroke",
    category: "physio",
    title: "Stroke & Neuro Rehab",
    tagline: "Regain movement, balance and independence",
    about:
      "Structured neurological rehabilitation after a stroke, nerve injury or Bell's palsy. We retrain movement patterns, rebuild strength on the weaker side and guide families on safe care at home.",
    helps: ["Weakness or paralysis on one side", "Walking, balance and falls", "Hand function and grip", "Bell's palsy and facial weakness", "Spasticity and stiff muscles", "Parkinson's and nerve injuries"],
    expect: ["A detailed neuro assessment", "Task-based training for daily activities", "Mirror therapy and muscle stimulation", "A home plan your family can follow"],
    duration: "60 min",
    sessions: "2–3 a week, reviewed monthly",
    from: "Rs 4,000",
    img: px(7551627, 1400),
    size: "xl",
  },
  {
    id: "frozen-shoulder",
    category: "physio",
    title: "Frozen Shoulder",
    tagline: "Get your full reach back, without the night pain",
    about:
      "Frozen shoulder (adhesive capsulitis) stiffens the joint and makes simple tasks like combing hair or reaching a shelf painful. It is especially common with diabetes. Gentle, progressive treatment restores movement.",
    helps: ["Stiff, painful shoulder", "Pain lying on that side at night", "Diabetes-related shoulder stiffness", "Rotator cuff strain and impingement"],
    expect: ["Joint mobilisation and stretching", "Heat and electrotherapy for pain", "Graded strengthening", "Simple home exercises"],
    duration: "45 min",
    sessions: "Usually 8–12 sessions",
    from: "Rs 3,000",
    img: px(4506169, 1100),
  },
  {
    id: "neck",
    category: "physio",
    title: "Neck Pain & Cervical Care",
    tagline: "For stiff necks, cervical pain and tension headaches",
    about:
      "Long hours on phones and laptops, cervical spondylosis and stress all load the neck. We ease pain quickly, then correct the posture and muscle habits that keep bringing it back.",
    helps: ["Cervical spondylosis", "Stiff neck and muscle spasm", "Pain or tingling into the arm", "Tension headaches", "'Text neck' from screens"],
    expect: ["Manual therapy and traction", "Posture and desk set-up advice", "Deep neck strengthening", "Pain-relief modalities where needed"],
    duration: "45 min",
    sessions: "Often 4–8 sessions",
    from: "Rs 3,000",
    img: px(7298882, 1100),
  },
  {
    id: "back",
    category: "physio",
    title: "Back Pain & Sciatica",
    tagline: "Lumbar pain, disc problems and pain down the leg",
    about:
      "From a sudden 'catch' while lifting to years of low back ache, we find the source and treat it: disc bulges, sciatica, muscle strain or poor movement habits.",
    helps: ["Lower back pain and stiffness", "Disc bulge or herniation", "Sciatica and leg pain", "Upper back and posture pain", "Pain during pregnancy"],
    expect: ["Assessment of spine and hips", "Manual therapy and decompression", "Core stabilisation exercises", "Safe lifting and sitting coaching"],
    duration: "45 min",
    sessions: "Often 6–10 sessions",
    from: "Rs 3,000",
    img: px(20860586, 1400),
    size: "wide",
  },
  {
    id: "knee",
    category: "physio",
    title: "Knee Pain & Arthritis",
    tagline: "Climb stairs and sit comfortably again",
    about:
      "Knee osteoarthritis is one of the most common problems we see, along with ligament and meniscus injuries. Strengthening the muscles around the knee reduces pain and protects the joint.",
    helps: ["Knee osteoarthritis", "Pain on stairs, squatting or sitting on the floor", "ACL and meniscus injuries", "Swelling and stiffness", "Runner's knee"],
    expect: ["Pain relief with electrotherapy", "Quad and hip strengthening", "Balance and gait training", "Weight and activity advice"],
    duration: "45 min",
    sessions: "Often 8–12 sessions",
    from: "Rs 3,000",
    img: px(20860609, 1100),
  },
  {
    id: "sports",
    category: "physio",
    title: "Sports Injury Rehab",
    tagline: "Football, gym, running and racket-sport injuries",
    about:
      "Milestone-based rehab that gets you back to your sport stronger, whether it's a sprained ankle, an overhead-throwing shoulder or an ACL reconstruction.",
    helps: ["Ankle and knee sprains", "Muscle strains and tears", "Tennis and golfer's elbow", "ACL and ligament rehab", "Return-to-sport testing"],
    expect: ["Injury assessment", "Hands-on treatment and taping", "Progressive strength and agility work", "A clear return-to-play plan"],
    duration: "45–60 min",
    sessions: "Depends on the injury",
    from: "Rs 3,500",
    img: px(13907447, 1100),
    size: "tall",
  },
  {
    id: "post-surgery",
    category: "physio",
    title: "Post-Surgical Rehab",
    tagline: "After knee, hip, shoulder or spine surgery",
    about:
      "The weeks after an operation decide how well you recover. We follow your surgeon's protocol and progress you safely, from first steps to full function.",
    helps: ["Knee and hip replacement", "ACL reconstruction", "Fracture recovery", "Spine surgery", "Shoulder repair"],
    expect: ["Swelling and pain control", "Restoring range of motion", "Gait and balance training", "Strength back to normal activity"],
    duration: "60 min",
    sessions: "Usually 6–12 weeks",
    from: "Rs 4,000",
    img: px(20860595, 1100),
  },
  {
    id: "cupping",
    category: "physio",
    title: "Cupping & Dry Needling",
    tagline: "Release tight muscles and trigger points",
    about:
      "Clinical dry cupping and dry needling release knotted muscles and trigger points, used alongside exercise for faster relief.",
    helps: ["Muscle knots and trigger points", "Neck and shoulder tension", "Sports muscle tightness", "Chronic back pain"],
    expect: ["Assessment of trigger points", "Sterile, single-use needles", "Dry cupping with medical cups", "Stretching and exercise follow-up"],
    duration: "30–45 min",
    sessions: "Usually 3–6 sessions",
    from: "Rs 3,500",
    img: px(8312830, 1100),
  },
  {
    id: "electro",
    category: "physio",
    title: "Electrotherapy & Pain Relief",
    tagline: "TENS, ultrasound and heat therapy",
    about:
      "Modern pain-relief modalities to calm acute pain and inflammation, so you can move and exercise comfortably while the underlying problem is treated.",
    helps: ["Acute and chronic pain", "Nerve pain and carpal tunnel", "Muscle spasm", "Arthritis flare-ups"],
    expect: ["TENS and interferential current", "Therapeutic ultrasound", "Heat and cold therapy", "Combined with exercise"],
    duration: "30 min",
    sessions: "Alongside your treatment plan",
    from: "Rs 2,500",
    img: px(30483049, 1100),
  },
  {
    id: "home",
    category: "physio",
    title: "Home Physiotherapy",
    tagline: "A qualified physiotherapist at your doorstep",
    about:
      "For patients who can't easily travel: elderly patients, stroke survivors and people recovering from surgery. Home visits are available across the city, with male and female physiotherapists.",
    helps: ["Elderly and bed-bound patients", "Stroke and paralysis care", "Post-operative recovery", "Mobility and fall prevention"],
    expect: ["Assessment in your home", "Exercises using what you have at home", "Carer and family guidance", "Flexible timings, 7 days a week"],
    duration: "60 min",
    sessions: "As needed",
    from: "Rs 5,000",
    img: px(7235063, 1400),
    size: "wide",
  },
];

const aestheticBase: Service[] = [
  {
    id: "laser-hair",
    category: "aesthetic",
    title: "Laser Hair Removal",
    tagline: "Smooth skin that lasts, safe for every skin tone",
    about:
      "Medical-grade laser targets hair at the root for long-term reduction. Settings are tailored to your skin type to protect your skin while giving effective results.",
    helps: ["Face, upper lip and chin", "Underarms and bikini line", "Arms, legs and back", "Ingrown hairs and razor bumps", "PCOS-related facial hair"],
    expect: ["Patch test and skin-type assessment", "Quick sessions with a cooling tip", "Sessions spaced 4–6 weeks apart", "Visible reduction after a few sessions"],
    duration: "15–60 min",
    sessions: "Usually 6–8 sessions",
    from: "Rs 4,000 / area",
    img: px(3985354, 1600),
  },
  {
    id: "prp",
    category: "aesthetic",
    title: "PRP Therapy",
    tagline: "Your own platelets for hair regrowth and glowing skin",
    about:
      "Platelet-Rich Plasma is prepared from a small sample of your own blood and injected where it's needed, stimulating hair follicles and collagen naturally.",
    helps: ["Hair thinning and hair fall", "Receding hairline", "Dull, tired skin", "Under-eye darkness", "Fine lines and acne scars"],
    expect: ["A small blood draw", "Plasma separated in a centrifuge", "Numbing, then precise micro-injections", "Little to no downtime"],
    duration: "45–60 min",
    sessions: "3–4 sessions, a month apart",
    from: "Rs 12,000",
    img: px(6629375, 1600),
  },
  {
    id: "prgf",
    category: "aesthetic",
    title: "PRGF Therapy",
    tagline: "Advanced growth-factor therapy for hair and skin",
    about:
      "Plasma Rich in Growth Factors is a refined, more concentrated evolution of PRP. It delivers a purer dose of growth factors for stronger hair and skin regeneration.",
    helps: ["Stubborn hair loss", "Thinning crown and hairline", "Skin texture and scars", "Deeper rejuvenation than standard PRP"],
    expect: ["Blood draw and PRGF preparation", "Activated growth factors", "Targeted scalp or skin injections", "Back to routine the same day"],
    duration: "60 min",
    sessions: "2–4 sessions",
    from: "Rs 18,000",
    img: px(17869289, 1600),
  },
  {
    id: "glutathione",
    category: "aesthetic",
    title: "Glutathione Therapy",
    tagline: "Brightening, even tone and an antioxidant boost",
    about:
      "Glutathione is the body's master antioxidant. Given as a drip or injection under medical supervision, it helps even out skin tone, reduce dullness and support overall skin health.",
    helps: ["Dull or uneven skin tone", "Pigmentation and sun damage", "Pre-wedding glow", "Antioxidant and wellness support"],
    expect: ["Doctor consultation and suitability check", "Relaxing IV drip or quick injection", "A course tailored to your goals", "Aftercare and sun-protection advice"],
    duration: "30–45 min",
    sessions: "A course of 6–10",
    from: "Rs 6,000",
    img: px(6129691, 1600),
  },
  {
    id: "hydrafacial",
    category: "aesthetic",
    title: "HydraFacial",
    tagline: "Cleanse, extract and hydrate in one glowing session",
    about:
      "A multi-step medical facial that deep-cleans pores, gently exfoliates and infuses hydrating serums. Instant glow with zero downtime, the go-to before events and weddings.",
    helps: ["Blackheads and open pores", "Oily or congested skin", "Dullness and dehydration", "Mild acne and uneven texture"],
    expect: ["Cleanse and gentle peel", "Painless vortex extraction", "Serum infusion and LED", "Glow you can see immediately"],
    duration: "50 min",
    sessions: "Monthly for best results",
    from: "Rs 8,000",
    img: px(12556701, 1600),
  },
  {
    id: "hifu",
    category: "aesthetic",
    title: "HIFU",
    tagline: "Non-surgical lifting and tightening",
    about:
      "High-Intensity Focused Ultrasound reaches the deep support layer of the skin, triggering new collagen. The result is a gradual, natural lift with no needles and no downtime.",
    helps: ["Sagging jawline and jowls", "Double chin", "Forehead and brow lift", "Loose neck skin", "Fine lines and wrinkles"],
    expect: ["Face mapping and gel application", "Focused ultrasound passes", "Mild warmth, no downtime", "Results build over 2–3 months"],
    duration: "60–90 min",
    sessions: "Usually 1, repeat yearly",
    from: "Rs 25,000",
    img: px(4586756, 1600),
  },
];

/** Apply the active profile's price / image / wording overrides */
const withProfile = (list: Service[]): Service[] =>
  list.map((s) => ({ ...s, ...(profile.services[s.id] ?? {}) }));

export const physio = withProfile(physioBase);
export const aesthetic = withProfile(aestheticBase);
export const allServices = [...physio, ...aesthetic];
