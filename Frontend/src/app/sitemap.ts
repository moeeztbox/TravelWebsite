import type { MetadataRoute } from "next";
import { fetchPackagesServer } from "../services/packageService";
import { getSiteUrl } from "../utils/siteUrl";

const routes = [
  "",
  "/about-us",
  "/packages",
  "/services",
  "/faq",
  "/policies",
  "/contact-us",
  "/guidance",
  "/umrah-guide",
  "/ziyarat-guide",
  "/travel-guide",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  // Best-effort: if the backend is unreachable, the sitemap still serves the
  // static routes rather than failing the whole request.
  let packageEntries: MetadataRoute.Sitemap = [];
  try {
    const packages = await fetchPackagesServer();
    packageEntries = packages
      .filter((p) => p.packageId)
      .map((p) => ({
        url: `${siteUrl}/packages/${encodeURIComponent(p.packageId)}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      }));
  } catch {
    packageEntries = [];
  }

  return [...staticEntries, ...packageEntries];
}
