// Content + placement for the interactive body and face maps.
// Body points anchor to a Mixamo bone and are projected onto the skin by raycasting
// along `dir`. Face points use normalised (x, y) coordinates across the head's front.

export const MODEL_BASE = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r170/examples/models/gltf/";
export const BODY_MODEL = `${MODEL_BASE}Xbot.glb`;
export const FACE_MODEL = `${MODEL_BASE}LeePerrySmith/LeePerrySmith.glb`;

export type Dir = "front" | "back" | "left" | "right";

export type MapPoint = {
  id: string;
  label: string;
  /** short line shown on hover */
  teaser: string;
  /** "What it feels like" */
  pain: string[];
  /** "Possible reasons" */
  causes: string[];
  /** how the clinic helps */
  care: string;
  /** booking form treatment to preselect */
  treatment: string;
  tags: string[];
};

export type BodyPoint = MapPoint & { bone: string; dir: Dir; offset?: [number, number, number] };
export type FacePoint = MapPoint & { uv: [number, number]; dir?: Dir };

export const bodyFilters = ["All", "Neuro", "Sports", "Desk & posture", "Age-related", "After surgery"] as const;

export const bodyPoints: BodyPoint[] = [
  {
    id: "stroke",
    label: "Stroke & neuro",
    bone: "mixamorigHead",
    dir: "front",
    offset: [0, 0.07, 0],
    teaser: "Weakness, paralysis and balance after a stroke",
    pain: ["Weakness or heaviness on one side", "Poor balance and falls", "Stiff, tight muscles (spasticity)", "Difficulty using the hand", "Facial weakness (Bell's palsy)"],
    causes: ["Stroke (blocked or bleeding blood vessel in the brain)", "Nerve injury or Bell's palsy", "Parkinson's and other neurological conditions", "High blood pressure and diabetes as risk factors"],
    care: "Neuro-rehabilitation: task training, balance work, mirror therapy and muscle stimulation, at the clinic or at home.",
    treatment: "Stroke & Neuro Rehab",
    tags: ["Neuro", "Age-related"],
  },
  {
    id: "neck",
    label: "Neck",
    bone: "mixamorigNeck",
    dir: "front",
    teaser: "Stiff neck, cervical pain, tension headaches",
    pain: ["Stiffness when turning", "Dull, constant ache", "Pain spreading to shoulders", "Tension headaches"],
    causes: ["Long hours looking down at phones or laptops", "Cervical spondylosis or disc strain", "Sleeping in an awkward position", "Stress and muscle tension"],
    care: "Manual therapy, posture correction and a desk-friendly home exercise plan.",
    treatment: "Neck Pain & Cervical Care",
    tags: ["Desk & posture", "Age-related"],
  },
  {
    id: "shoulder",
    label: "Shoulder",
    bone: "mixamorigLeftArm",
    dir: "front",
    offset: [0.07, 0.01, 0],
    teaser: "Frozen shoulder, rotator cuff, impingement",
    pain: ["Sharp pain lifting the arm", "Night pain lying on that side", "Stiffness and loss of reach", "Clicking or catching"],
    causes: ["Rotator cuff strain or tear", "Frozen shoulder (common with diabetes)", "Repetitive overhead work or bowling", "Rounded, slouched posture"],
    care: "Frozen-shoulder mobilisation, heat and electrotherapy, then graded strengthening to restore full reach.",
    treatment: "Frozen Shoulder",
    tags: ["Sports", "Age-related"],
  },
  {
    id: "upper-back",
    label: "Upper back",
    bone: "mixamorigSpine2",
    dir: "back",
    teaser: "Knots between the shoulder blades",
    pain: ["Burning between shoulder blades", "Tight, knotted muscles", "Ache after long sitting"],
    causes: ["Slouching at a desk or while driving", "Weak postural muscles", "Carrying heavy bags on one shoulder"],
    care: "Soft-tissue release, thoracic mobility work and posture retraining.",
    treatment: "Back Pain & Sciatica",
    tags: ["Desk & posture"],
  },
  {
    id: "elbow",
    label: "Elbow",
    bone: "mixamorigRightForeArm",
    dir: "front",
    teaser: "Tennis and golfer's elbow",
    pain: ["Pain gripping or lifting", "Tenderness on the outer or inner elbow", "Weak grip"],
    causes: ["Repetitive gripping, typing or mouse use", "Racket sports and gym work", "Sudden increase in workload"],
    care: "Progressive tendon loading, manual therapy and grip retraining.",
    treatment: "Sports Injury Rehab",
    tags: ["Sports", "Desk & posture"],
  },
  {
    id: "wrist",
    label: "Wrist & hand",
    bone: "mixamorigLeftHand",
    dir: "front",
    offset: [-0.04, 0, 0],
    teaser: "Carpal tunnel, tingling, sprains",
    pain: ["Tingling or numb fingers", "Pain worse at night", "Weakness dropping things"],
    causes: ["Carpal tunnel syndrome", "Long hours typing or on the phone", "Falls onto an outstretched hand", "Pregnancy-related swelling"],
    care: "TENS and ultrasound for pain, nerve gliding and strengthening for daily tasks.",
    treatment: "Electrotherapy & Pain Relief",
    tags: ["Desk & posture"],
  },
  {
    id: "lower-back",
    label: "Lower back",
    bone: "mixamorigSpine",
    dir: "back",
    offset: [0, -0.03, 0],
    teaser: "Lumbar pain, disc problems",
    pain: ["Deep ache across the lower back", "Sharp pain bending or lifting", "Stiffness in the morning"],
    causes: ["Disc bulge or herniation", "Lifting with poor technique", "Long hours of sitting", "Weak core muscles"],
    care: "Manual therapy, core stabilisation and safe lifting coaching.",
    treatment: "Back Pain & Sciatica",
    tags: ["Desk & posture", "Age-related"],
  },
  {
    id: "sciatica",
    label: "Hip & sciatica",
    bone: "mixamorigLeftUpLeg",
    dir: "back",
    offset: [0, -0.06, 0],
    teaser: "Pain shooting down the leg",
    pain: ["Shooting pain down the back of the leg", "Pins and needles", "Buttock pain when sitting"],
    causes: ["Sciatic nerve irritation from a lumbar disc", "Piriformis tightness", "Prolonged sitting on hard surfaces"],
    care: "Neural mobilisation, glute strengthening and spinal decompression exercises.",
    treatment: "Back Pain & Sciatica",
    tags: ["Desk & posture", "Age-related"],
  },
  {
    id: "hip",
    label: "Hip",
    bone: "mixamorigRightUpLeg",
    dir: "front",
    offset: [-0.07, -0.02, 0],
    teaser: "Arthritis, groin strain, bursitis",
    pain: ["Groin or outer-hip ache", "Stiffness getting out of a car", "Pain on stairs"],
    causes: ["Hip osteoarthritis", "Groin strain in football or cricket", "Bursitis from overuse", "After hip replacement"],
    care: "Joint mobilisation, progressive strengthening and gait retraining.",
    treatment: "Post-Surgical Rehab",
    tags: ["Age-related", "After surgery", "Sports"],
  },
  {
    id: "knee",
    label: "Knee",
    bone: "mixamorigLeftLeg",
    dir: "front",
    offset: [0, 0.02, 0],
    teaser: "ACL, meniscus, arthritis",
    pain: ["Pain on stairs or squatting", "Swelling after activity", "Giving way or locking", "Grinding sensation"],
    causes: ["Knee osteoarthritis (very common after 45)", "ACL or meniscus injury", "Runner's knee from overuse", "After knee replacement surgery"],
    care: "Quad and hip strengthening, balance work and a milestone-based return to sport.",
    treatment: "Knee Pain & Arthritis",
    tags: ["Sports", "Age-related", "After surgery"],
  },
  {
    id: "ankle",
    label: "Ankle & foot",
    bone: "mixamorigRightFoot",
    dir: "front",
    offset: [0, 0.02, 0],
    teaser: "Sprains, plantar fasciitis, flat feet",
    pain: ["Heel pain with the first steps in the morning", "Swelling after a twist", "Ache after standing all day"],
    causes: ["Ankle sprain in sport", "Plantar fasciitis", "Flat feet or unsupportive footwear", "Weight gain or long standing hours"],
    care: "Balance and proprioception training, taping and footwear guidance.",
    treatment: "Sports Injury Rehab",
    tags: ["Sports", "Age-related"],
  },
];

export const faceFilters = ["All", "Lift & tighten", "Tone & glow", "Hair"] as const;

export const facePoints: FacePoint[] = [
  {
    id: "hairline",
    label: "Hairline & hair thinning",
    uv: [0.5, 0.97],
    teaser: "Hair fall, thinning crown, receding hairline",
    pain: ["More hair on the pillow or comb", "Widening parting", "Receding temples"],
    causes: ["Genetics and hormones", "Stress, illness or low iron", "PCOS and post-pregnancy hair fall"],
    care: "PRP or PRGF scalp therapy to wake up follicles and thicken existing hair.",
    treatment: "PRP Therapy",
    tags: ["Hair"],
  },
  {
    id: "forehead",
    label: "Forehead & brows",
    uv: [0.5, 0.8],
    teaser: "Forehead lines and heavy brows",
    pain: ["Lines across the forehead", "Brows that sit lower than before", "A tired look"],
    causes: ["Collagen loss with age", "Repeated expressions", "Sun exposure"],
    care: "HIFU brow and forehead lift, stimulating new collagen with no needles or downtime.",
    treatment: "HIFU",
    tags: ["Lift & tighten"],
  },
  {
    id: "crows-feet",
    label: "Crow's feet",
    uv: [0.24, 0.6],
    teaser: "Fine lines around the outer eyes",
    pain: ["Fine lines when smiling", "Crepey outer-eye skin"],
    causes: ["Smiling and squinting", "Thin skin around the eyes", "UV damage"],
    care: "PRP skin rejuvenation to improve texture and fine lines naturally.",
    treatment: "PRP Therapy",
    tags: ["Lift & tighten", "Tone & glow"],
  },
  {
    id: "under-eye",
    label: "Under-eye",
    uv: [0.63, 0.555],
    teaser: "Dark circles and tired eyes",
    pain: ["Dark circles", "Hollow, tired look", "Crepey under-eye skin"],
    causes: ["Genetics and thin skin", "Poor sleep and dehydration", "Pigmentation"],
    care: "Under-eye PRP or PRGF to brighten and strengthen delicate skin.",
    treatment: "PRGF Therapy",
    tags: ["Tone & glow"],
  },
  {
    id: "cheeks",
    label: "Cheeks & skin tone",
    uv: [0.29, 0.47],
    teaser: "Pigmentation, melasma and dullness",
    pain: ["Uneven patches or melasma", "Sun tan that won't fade", "Dull, tired complexion"],
    causes: ["Strong sun and heat", "Hormonal changes", "Post-acne marks"],
    care: "Glutathione therapy for an even, brighter tone, with HydraFacial to refresh the surface.",
    treatment: "Glutathione Therapy",
    tags: ["Tone & glow"],
  },
  {
    id: "nose",
    label: "Nose & T-zone",
    uv: [0.5, 0.49],
    teaser: "Blackheads, open pores, oiliness",
    pain: ["Blackheads and congestion", "Enlarged pores", "Shiny T-zone"],
    causes: ["Excess oil production", "Humidity and pollution", "Heavy makeup"],
    care: "HydraFacial deep cleansing with painless extraction and pore-refining serums.",
    treatment: "HydraFacial",
    tags: ["Tone & glow"],
  },
  {
    id: "upper-lip",
    label: "Upper lip",
    uv: [0.5, 0.41],
    teaser: "Unwanted facial hair",
    pain: ["Visible upper-lip hair", "Irritation from threading or waxing", "Regrowth within days"],
    causes: ["Genetics", "Hormonal changes and PCOS", "Frequent threading thickening regrowth"],
    care: "Laser hair removal for long-term reduction, set for desi skin tones.",
    treatment: "Laser Hair Removal",
    tags: ["Hair"],
  },
  {
    id: "smile-lines",
    label: "Smile lines",
    uv: [0.66, 0.38],
    teaser: "Nasolabial folds and sagging",
    pain: ["Lines from nose to mouth", "Cheeks sitting lower", "Deeper folds when tired"],
    causes: ["Loss of collagen and elasticity", "Weight changes", "Sun damage"],
    care: "HIFU lifting to firm the mid-face and soften folds, gradually and naturally.",
    treatment: "HIFU",
    tags: ["Lift & tighten"],
  },
  {
    id: "jaw",
    label: "Jawline & acne",
    uv: [0.29, 0.25],
    teaser: "Sagging jawline, breakouts and scars",
    pain: ["Soft or sagging jawline", "Double chin", "Hormonal breakouts and scars"],
    causes: ["Ageing and skin laxity", "Hormones (e.g. PCOS)", "Picking and past acne"],
    care: "HIFU to define the jaw; HydraFacial and PRGF for breakouts and scars.",
    treatment: "HIFU",
    tags: ["Lift & tighten", "Tone & glow"],
  },
  {
    id: "chin",
    label: "Chin & facial hair",
    uv: [0.5, 0.17],
    teaser: "Chin hair and ingrown hairs",
    pain: ["Coarse chin hairs", "Ingrown hairs and bumps", "Dark shadow after shaving"],
    causes: ["Hormonal changes and PCOS", "Genetics", "Frequent shaving or plucking"],
    care: "Laser hair removal, a course of quick sessions for smooth, lasting results.",
    treatment: "Laser Hair Removal",
    tags: ["Hair"],
  },
];
