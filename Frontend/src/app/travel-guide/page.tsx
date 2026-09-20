import type { Metadata } from "next";
import TravelPage from "../../components/guide/TravelPage";
import { pageMetadata } from "../../utils/pageMetadata";
import { breadcrumbSchema } from "../../utils/breadcrumbSchema";

export const metadata: Metadata = pageMetadata({
  title: "Travel Guide",
  description:
    "Essential travel information, preparation tips, and journey planning for pilgrims heading to Saudi Arabia.",
  path: "/travel-guide",
});

const breadcrumbData = breadcrumbSchema([
  { name: "Guide", path: "/guidance" },
  { name: "Travel Guide", path: "/travel-guide" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <TravelPage />
    </>
  );
}
