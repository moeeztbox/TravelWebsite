import type { Metadata } from "next";
import { pageMetadata } from "../../utils/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Explore Al Buraq Global Travel & Tours services for Umrah and Hajj pilgrims: hotels, transport, visa processing, and ticketing.",
  path: "/services",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
