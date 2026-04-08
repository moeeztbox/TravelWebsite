import { resolveApiBase } from "../services/authService";

/** Origin for static files (/uploads) — strips `/api` from the API base. */
export function getApiOrigin() {
  const base = resolveApiBase();
  if (base === "/api" || base.startsWith("/api")) {
    return typeof window !== "undefined" ? window.location.origin : "";
  }
  return base.replace(/\/api\/?$/, "");
}
