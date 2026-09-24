export type Clinic = {
  name: string;
  descriptor: string;
  founder: string;
  motto: string[];
  /** image path, or null to use the built-in SVG mark */
  logo: string | null;
  phone: string;
  phoneIntl: string;
  whatsapp: string;
  address: string;
  area: string;
  city: string;
  rating: number;
  mapsUrl: string;
  mapsEmbed: string;
  hours: string[][];
  /** short opening line, e.g. "Open 24 hours" */
  hoursShort: string;
  /** badge label, e.g. "Open 24/7" */
  hoursBadge: string;
};

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO, approximate
  text?: string;
};

export type ServiceOverride = {
  img?: string;
  from?: string;
  tagline?: string;
  about?: string;
  helps?: string[];
};

export type SiteProfile = {
  clinic: Clinic;
  /** second tile in the stats row */
  highlightStat: { value: number; suffix: string; label: string; decimals?: number };
  /** line under the team heading */
  teamNote: string;
  founderPhoto: string;
  founderAvatar: string;
  founderPos?: string;
  team: { name: string; role: string; img: string; pos?: string }[];
  heroAvatars: string[];
  journey: { step: string; title: string; text: string; img: string }[];
  images: { approachMain: string; approachInset: string; aestheticIntro: string };
  faqs: { q: string; a: string }[];
  reviews: Review[];
  /** total shown next to the rating (Google counts everything, including star-only ratings) */
  reviewTotal: number;
  reviewsUrl: string;
  /** per-service price / image / copy overrides, keyed by service id */
  services: Record<string, ServiceOverride>;
};
