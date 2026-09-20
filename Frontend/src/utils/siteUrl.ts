/** The production site origin, no trailing slash. Falls back to the local
 *  dev server when NEXT_PUBLIC_SITE_URL isn't set (see .env.example). */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
}
