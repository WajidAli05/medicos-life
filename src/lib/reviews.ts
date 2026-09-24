import { profile } from "./data";
import type { Review } from "./data/types";

/** Never show more than this many reviews, however many the profile holds */
export const MAX_REVIEWS = 20;

export const GOOGLE_REVIEWS_URL = profile.reviewsUrl;
export const reviewsEyebrow = profile.reviewsEyebrow;
export const reviewsNote = profile.reviewsNote;
export type { Review };

/** The newest reviews, capped */
export const reviews: Review[] = [...profile.reviews]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, MAX_REVIEWS);

export const reviewStats = {
  rating: profile.clinic.rating,
  total: profile.reviewTotal,
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
