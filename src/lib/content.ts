import { profile } from "./data";

export { px } from "./images";

export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/6111051/6111051-hd_1920_1080_25fps.mp4";
// Posters are the first frame of each video, so nothing "jumps" when playback starts
export const HERO_POSTER = "/hero-poster.jpg";
export const BOOKING_VIDEO =
  "https://videos.pexels.com/video-files/8343371/8343371-hd_1280_720_25fps.mp4";
export const BOOKING_POSTER = "/booking-poster.jpg";

export const clinic = profile.clinic;
export const team = profile.team;
export const teamNote = profile.teamNote;
export const journey = profile.journey;
export const faqs = profile.faqs;
export const sectionImages = profile.images;
export const HERO_AVATARS = profile.heroAvatars;
export const FOUNDER_PHOTO = profile.founderPhoto;
export const FOUNDER_AVATAR = profile.founderAvatar;

export const nav = [
  { label: "Physio", href: "#physiotherapy" },
  { label: "Aesthetics", href: "#aesthetics" },
  { label: "Body map", href: "#body-map" },
  { label: "Face map", href: "#face-map" },
  { label: "Reviews", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];

export const stats = [
  { value: profile.clinic.rating, suffix: "★", label: "Rating on Google", decimals: 1 },
  profile.highlightStat,
  { value: 2, suffix: "-in-1", label: "Physio & aesthetics, one roof" },
  { value: 1, suffix: "-to-1", label: "Same clinician, every visit" },
];
