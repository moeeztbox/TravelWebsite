import type { Metadata } from "next";
import { pageMetadata } from "../../utils/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Policies",
  description:
    "Privacy policy, refund policy, and terms & conditions for Al Buraq Global Travel & Tours.",
  path: "/policies",
});

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
