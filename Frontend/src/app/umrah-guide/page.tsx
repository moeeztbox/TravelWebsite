import type { Metadata } from "next";
import UmrahPage from "../../components/guide/UmrahPage";
import { pageMetadata } from "../../utils/pageMetadata";
import { breadcrumbSchema } from "../../utils/breadcrumbSchema";

export const metadata: Metadata = pageMetadata({
  title: "Umrah Guide",
  description:
    "Complete spiritual guidance for your Umrah journey, with step-by-step rituals and prayers.",
  path: "/umrah-guide",
});

const breadcrumbData = breadcrumbSchema([
  { name: "Guide", path: "/guidance" },
  { name: "Umrah Guide", path: "/umrah-guide" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <UmrahPage />
    </>
  );
}
