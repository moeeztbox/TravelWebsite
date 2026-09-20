import type { Metadata } from "next";
import ZiyaratPage from "../../components/guide/ZiyaratPage";
import { pageMetadata } from "../../utils/pageMetadata";
import { breadcrumbSchema } from "../../utils/breadcrumbSchema";

export const metadata: Metadata = pageMetadata({
  title: "Ziyarat Guide",
  description:
    "Explore holy sites and historical landmarks in Makkah and Madinah with detailed Ziyarat insights.",
  path: "/ziyarat-guide",
});

const breadcrumbData = breadcrumbSchema([
  { name: "Guide", path: "/guidance" },
  { name: "Ziyarat Guide", path: "/ziyarat-guide" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ZiyaratPage />
    </>
  );
}
