import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import AppShell from "../components/layout/AppShell";
import LenisInit from "../components/layout/LenisInit";
import { getSiteUrl } from "../utils/siteUrl";

const siteName = "Al Buraq Global Travel & Tours";
const siteDescription =
  "Al Buraq Global Travel & Tours offers Umrah and Hajj packages, guided Ziyarat, and full pilgrimage travel planning and support.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: { icon: "/favicon.png" },
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    images: ["/favicon.png"],
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
    images: ["/favicon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const siteUrl = getSiteUrl();

// Only real, already-publicly-displayed business facts (see src/components/layout/Footer.tsx)
// — no invented ratings, hours, or reviews.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/favicon.png`,
      image: `${siteUrl}/favicon.png`,
      telephone: "+92-327-3276060",
      email: "info@alburaqtours.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plaza No. 54, Block A Commercial Area, Eden City, DHA Phase 8",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div id="google_translate_element" style={{ display: "none" }} />

        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: "en",
                  includedLanguages: "en,ur,ar",
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                "google_translate_element",
              );
            }
          `}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-hide" strategy="afterInteractive">
          {`
            window.addEventListener("load", function () {
              setTimeout(() => {
                const frames = document.querySelectorAll(
                  ".goog-te-banner-frame, .goog-te-menu-frame",
                );
                frames.forEach((f) => (f.style.display = "none"));
                document.body.style.top = "0px";
              }, 1000);
            });

            function hideGoogleTranslateElements() {
              const gtBanner = document.querySelector(".goog-te-banner-frame");
              const skiptranslate = document.querySelector(".skiptranslate");
              if (gtBanner) gtBanner.style.display = "none";
              if (skiptranslate) skiptranslate.style.display = "none";
              document.body.style.top = "0px";
            }

            let tries = 0;
            const interval = setInterval(() => {
              hideGoogleTranslateElements();
              tries++;
              if (tries > 10) clearInterval(interval);
            }, 500);

            window.addEventListener("load", hideGoogleTranslateElements);
          `}
        </Script>

        <AppShell>{children}</AppShell>

        <LenisInit />
      </body>
    </html>
  );
}
