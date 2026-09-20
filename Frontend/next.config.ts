import type { NextConfig } from "next";

/**
 * Backend origin for the /api and /uploads rewrites below. Derived from
 * NEXT_PUBLIC_API_URL (stripping the trailing /api) so the same env var used
 * by src/services/authService.ts drives this too — never hardcode a
 * production backend host here. In development with no env var set, this
 * falls back to the local backend on port 5000; in production with no env
 * var set, the rewrites are simply omitted rather than silently pointing at
 * localhost.
 */
const apiOrigin =
  (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/api\/?$/, "") ||
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000");

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    // Exact hosts only — these are all fixed, non-admin-controlled images
    // referenced directly in the source (Unsplash stock photography, three
    // payment-badge icons in the footer). Deliberately excludes any host
    // used for admin-entered package images or other arbitrary user input —
    // see the image-optimization audit notes for why those stay plain <img>.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "iconlogovector.com" },
      { protocol: "https", hostname: "www.pngmart.com" },
      { protocol: "https", hostname: "images.icon-icons.com" },
    ],
  },
  async rewrites() {
    if (!apiOrigin) return [];
    return [
      { source: "/api/:path*", destination: `${apiOrigin}/api/:path*` },
      { source: "/uploads/:path*", destination: `${apiOrigin}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
