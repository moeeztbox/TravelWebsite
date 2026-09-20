import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { fetchPackageByIdServer } from "../../../services/packageService";
import { getHighlights, serviceBadges, journeyChain } from "../../../utils/packageDisplay";
import { breadcrumbSchema } from "../../../utils/breadcrumbSchema";
import type { Package } from "../../../types/package";

interface PageProps {
  params: Promise<{ packageId: string }>;
}

/**
 * A natural 1–2 sentence description built only from real fields on the
 * package — title, subtitle, duration, price, and (when present) its own
 * highlights. Always leads with the title: several seeded packages
 * (four/five-star, Ramadan special) share an identical subtitle/duration/
 * price/highlights set in the database, so the title is the one field
 * guaranteed to differ and keep descriptions from being duplicates.
 */
function buildDescription(pkg: Package): string {
  const { title, subtitle, duration, price } = pkg;
  const firstHighlight = (pkg.highlights ?? [])
    .map((h) => h?.text?.trim())
    .find((t): t is string => Boolean(t));

  const parts = [subtitle ? `${title} — ${subtitle}.` : `${title}.`];
  if (duration) parts.push(`${duration} itinerary.`);
  if (firstHighlight) parts.push(`Highlights include ${firstHighlight}.`);
  if (price) parts.push(`From ${price}.`);

  if (parts.length <= 1) {
    return `${title} — Umrah and Hajj travel package from Al Buraq Global Travel & Tours.`;
  }
  return parts.join(" ");
}

/** Extracts a plain numeric amount + 3-letter currency code from a price
 *  string like "PKR 185,000" — never guesses a value it can't read off the
 *  real field, so structured data is only emitted when it's actually valid. */
function parsePriceForSchema(price?: string): { amount: string; currency: string } | null {
  if (!price) return null;
  const digits = price.replace(/[^\d.]/g, "");
  if (!digits) return null;
  const currencyMatch = price.match(/[A-Z]{3}/);
  return { amount: digits, currency: currencyMatch ? currencyMatch[0] : "PKR" };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { packageId } = await params;
  const pkg = await fetchPackageByIdServer(packageId);

  if (!pkg) {
    return { title: "Package Not Found" };
  }

  const description = buildDescription(pkg);
  const canonicalPath = `/packages/${encodeURIComponent(pkg.packageId)}`;

  return {
    title: pkg.title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "website",
      title: pkg.title,
      description,
      images: pkg.image ? [pkg.image] : undefined,
      url: canonicalPath,
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.title,
      description,
      images: pkg.image ? [pkg.image] : undefined,
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { packageId } = await params;
  const pkg = await fetchPackageByIdServer(packageId);

  if (!pkg) {
    notFound();
  }

  const highlights = getHighlights(pkg);
  const services = serviceBadges(pkg.services);
  const journey = journeyChain(pkg);
  const priceInfo = parsePriceForSchema(pkg.price);
  const description = buildDescription(pkg);
  const displayImage =
    pkg.image || "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800";

  const canonicalPath = `/packages/${encodeURIComponent(pkg.packageId)}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description,
    image: displayImage,
    provider: {
      "@type": "TravelAgency",
      name: "Al Buraq Global Travel & Tours",
    },
    ...(priceInfo
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: priceInfo.currency,
            price: priceInfo.amount,
          },
        }
      : {}),
  };

  const breadcrumbData = breadcrumbSchema([
    { name: "Packages", path: "/packages" },
    { name: pkg.title, path: canonicalPath },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Packages
        </Link>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            {/* pkg.image is an admin-entered URL — can point to any host, so
                `unoptimized` renders it as-is rather than requiring an
                open-ended domain allowlist in next.config.ts. */}
            <Image
              src={displayImage}
              alt={pkg.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <div>
            {pkg.badge ? (
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-3">
                {pkg.badge}
              </span>
            ) : null}

            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
              {pkg.title}
            </h1>
            {pkg.subtitle ? (
              <p className="text-lg text-stone-600 mb-4">{pkg.subtitle}</p>
            ) : null}

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                <p className="text-xs font-medium text-stone-600">Price</p>
                <p className="text-lg font-semibold text-amber-800 mt-1">
                  {pkg.price || "—"}
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                <p className="text-xs font-medium text-stone-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Duration
                </p>
                <p className="text-lg font-semibold text-stone-800 mt-1">
                  {pkg.duration || "—"}
                </p>
              </div>
            </div>

            {services.length > 0 ? (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-stone-900 mb-2">
                  What&apos;s Included
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li
                      key={s.key}
                      className="inline-flex items-center gap-1.5 text-sm text-stone-700 bg-stone-100 rounded-full px-3 py-1"
                    >
                      <s.Icon className="w-3.5 h-3.5" />
                      {s.label}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {highlights.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-stone-900 mb-4">Highlights</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-stone-700">
                  <h.icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  {h.text}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {journey ? (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-stone-900 mb-4">Journey</h2>
            <p className="text-stone-700">{journey}</p>
          </div>
        ) : null}

        <div className="mt-12 pt-6 border-t border-stone-200">
          <p className="text-sm text-stone-500 mb-3">
            Want to see what&apos;s included in more detail, or have a question
            before booking?{" "}
            <Link
              href="/services"
              className="text-amber-700 hover:text-amber-900 font-medium underline underline-offset-4"
            >
              Explore our services
            </Link>{" "}
            or{" "}
            <Link
              href="/contact-us"
              className="text-amber-700 hover:text-amber-900 font-medium underline underline-offset-4"
            >
              contact our team
            </Link>
            .
          </p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900"
          >
            View all Umrah &amp; Hajj packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
