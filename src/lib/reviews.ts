// Google reviews for "Aesthetic and Physio Clinic", I-8 Markaz (Medicos Life).
// Snapshot taken from the Google Business listing on 22 Sep 2026, sorted by "Newest".
// Google shows relative dates ("5 months ago"), so `date` is approximate to the month.
// To refresh: add new reviews to this list. Only the newest MAX_REVIEWS are ever shown.

export const MAX_REVIEWS = 20;

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Aesthetic+and+Physio+Clinic/@33.6675526,73.0742321,17z/data=!4m8!3m7!1s0x38df97e1c69fc485:0x978d6c78c70f2235!8m2!3d33.6675526!4d73.0742321!9m1!1b1";

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO, approximate
  text?: string;
};

const all: Review[] = [
  { author: "Aalia", rating: 5, date: "2026-09-15" },
  { author: "Tufail Khattak", rating: 5, date: "2026-08-25", text: "Highly Recommended and well mannered" },
  {
    author: "Utman khail",
    rating: 5,
    date: "2026-06-22",
    text: "To be honest, he is one of the best physiotherapist in Islamabad. I'm really satisfied with his services especially how he managed my cervical pain.",
  },
  { author: "noreen akram", rating: 5, date: "2026-04-22", text: "One of the best therapist in twin city. Highly recommended" },
  { author: "Khaan", rating: 4, date: "2026-04-21" },
  {
    author: "Aliza Malik",
    rating: 5,
    date: "2026-04-20",
    text: "Very professional and caring physiotherapist. The treatment was effective and the clinic environment is clean and comfortable.",
  },
  { author: "Khusboo Shakeel", rating: 5, date: "2026-04-19", text: "Highly recommend for home visits" },
  { author: "maria ali", rating: 5, date: "2026-04-18", text: "Best experience." },
  { author: "Haseeb Ilyas", rating: 5, date: "2026-04-17", text: "I personally visited him and got benifit from his treatment for my neck pain" },
  { author: "Hamza Ali", rating: 4, date: "2026-03-22", text: "best services" },
  { author: "Rizoo Khan", rating: 5, date: "2026-03-21" },
  { author: "Asad Ali", rating: 5, date: "2026-03-20" },
];

/** The newest reviews, never more than MAX_REVIEWS */
export const reviews: Review[] = [...all].sort((a, b) => b.date.localeCompare(a.date)).slice(0, MAX_REVIEWS);

export const reviewStats = {
  // Google's own overall figures for the listing
  rating: 4.8,
  total: all.length,
};

/** "noreen akram" → "Noreen A." (first name + initial) */
export function displayName(author: string) {
  const [first, ...rest] = author.trim().split(/\s+/);
  const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);
  return rest.length ? `${cap(first)} ${rest[rest.length - 1].charAt(0).toUpperCase()}.` : cap(first);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** Deterministic (no locale / clock) so server and client render identically */
export function monthYear(iso: string) {
  const [y, m] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}
