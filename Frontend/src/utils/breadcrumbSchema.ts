import { getSiteUrl } from "./siteUrl";

interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList JSON-LD for a page's real navigational hierarchy. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${siteUrl}${c.path}`,
      })),
    ],
  };
}
