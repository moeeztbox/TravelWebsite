/** Matches the Mongoose `journeyStages` enum in Backend/models/packageModel.js. */
export type JourneyStage =
  | "scheduled"
  | "flight_takeoff"
  | "jeddah_airport"
  | "in_jeddah"
  | "ziyarat"
  | "in_madinah"
  | "in_makkah"
  | "makkah_airport"
  | "return_flight"
  | "completed";

/** Keys accepted by `constants/packageHighlightIcons.ts`'s icon map. */
export type HighlightIconKey =
  | "hotel"
  | "plane"
  | "shield"
  | "users"
  | "star"
  | "car"
  | "clock"
  | "map-pin"
  | "calendar";

export interface PackageHighlight {
  iconKey: string;
  text: string;
}

export interface PackageServices {
  ziyarat?: boolean;
  transport?: boolean;
  visa?: boolean;
  ticket?: boolean;
  hotel?: boolean;
}

/** A package as returned by GET /api/packages and GET /api/admin/packages. */
export interface Package {
  _id?: string;
  packageId: string;
  order?: number;
  title: string;
  subtitle?: string;
  price: string;
  duration: string;
  badge?: string;
  image?: string;
  highlights?: PackageHighlight[];
  services?: PackageServices;
  journeyStages?: JourneyStage[];
  active?: boolean;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Body accepted by POST/PATCH /api/packages(/:packageId) (admin). */
export interface PackageWritePayload {
  packageId: string;
  title: string;
  order?: number;
  subtitle?: string;
  price?: string;
  duration?: string;
  badge?: string;
  image?: string;
  highlights?: PackageHighlight[];
  services?: PackageServices;
  journeyStages?: JourneyStage[];
  active?: boolean;
  featured?: boolean;
}

/**
 * A package-shaped object as it appears loosely on cards/hero sections that
 * predate the Backend's canonical field names (legacy fallbacks such as
 * `packageTitle`/`packagePrice`/`days`). Kept distinct from `Package` so call
 * sites that only ever see the real API shape stay strict.
 */
export interface PackageLike extends Partial<Package> {
  id?: string | number;
  packageTitle?: string;
  packageSubtitle?: string;
  packagePrice?: string;
  packageDuration?: string;
  packageImage?: string;
  days?: string;
}

/** Normalized booking payload built by `toBookingPayload()`. */
export interface BookingPayload {
  packageId: string;
  packageTitle: string;
  packageSubtitle: string;
  packagePrice: string;
  packageDuration: string;
  packageImage: string;
  badge: string;
}
