import { DEMO } from "../site";
import { demoProfile } from "./demo";
import { clientProfile } from "./client";
import type { SiteProfile } from "./types";

/**
 * Demo data by default; the real clinic's data only when NEXT_PUBLIC_DEMO=false.
 *
 * To strip the client's details out of the repo, replace the contents of ./client.ts with:
 *   export { demoProfile as clientProfile } from "./demo";
 */
export const profile: SiteProfile = DEMO ? demoProfile : clientProfile;
export type { SiteProfile };
