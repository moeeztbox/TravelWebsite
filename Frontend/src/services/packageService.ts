import { api } from "./authService";
import type { Package } from "../types/package";

export async function fetchPackages(): Promise<Package[]> {
  const { data } = await api.get<{ packages: Package[] }>("/packages");
  return data.packages ?? [];
}

/**
 * Absolute API base for server-side fetches (Server Components, sitemap).
 * Unlike `resolveApiBase()` in authService.ts — which can return a relative
 * "/api" for the browser to resolve against its own origin — server-side
 * code has no browser origin to resolve a relative URL against, so this
 * always resolves to an absolute URL, mirroring next.config.ts's rewrite
 * fallback for local dev when NEXT_PUBLIC_API_URL isn't set.
 */
function serverApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (raw) {
    const noTrailing = raw.replace(/\/+$/, "");
    return noTrailing.endsWith("/api") ? noTrailing : `${noTrailing}/api`;
  }
  return process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/api";
}

/** Server-side: all active packages, always fresh (no caching). */
export async function fetchPackagesServer(): Promise<Package[]> {
  const base = serverApiBase();
  if (!base) return [];
  const res = await fetch(`${base}/packages`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.packages ?? [];
}

/** Server-side: one active package by id, always fresh. Null if not found/inactive. */
export async function fetchPackageByIdServer(packageId: string): Promise<Package | null> {
  const base = serverApiBase();
  if (!base) return null;
  const res = await fetch(`${base}/packages/${encodeURIComponent(packageId)}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch package (${res.status})`);
  const data = await res.json();
  return data.package ?? null;
}
