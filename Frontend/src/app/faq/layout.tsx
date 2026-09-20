import type { Metadata } from "next";
import { pageMetadata } from "../../utils/pageMetadata";
import { GENERAL_FAQS } from "../../data/faqData";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about Umrah and Hajj packages, bookings, and travel with Al Buraq Global Travel & Tours.",
  path: "/faq",
});

// Mirrors exactly the "General Questions" Q&As shown by default on page
// load (see FaqSection.tsx's initial activeCategory state) — the only set
// genuinely visible without interaction, so the only one it's accurate to
// mark up as FAQPage structured data.
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GENERAL_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {children}
    </>
  );
}
