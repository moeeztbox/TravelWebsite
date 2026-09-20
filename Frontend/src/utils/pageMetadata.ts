import type { Metadata } from "next";

const siteName = "Al Buraq Global Travel & Tours";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Site-relative path this page canonically lives at, e.g. "/about-us". */
  path: string;
  /** Set true for pages that should not be indexed (admin/login/etc). */
  noIndex?: boolean;
  image?: string;
  /**
   * The root layout applies a "%s | Al Buraq Global Travel & Tours" template
   * to any plain-string title a page sets. Set true only for the homepage,
   * whose title IS the site name — templating it would double it up.
   */
  isHomePage?: boolean;
}

/**
 * Consistent per-page title/description/canonical/OG/Twitter metadata.
 * Next.js does not auto-derive openGraph/twitter fields from a page's own
 * title/description — without this, every route's social preview falls
 * back to the root layout's generic site-wide OG tags.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex,
  image,
  isHomePage,
}: PageMetadataInput): Metadata {
  const images = image ? [image] : ["/favicon.png"];
  return {
    title: isHomePage ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: path,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}
