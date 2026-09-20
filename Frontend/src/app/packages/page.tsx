import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "../../utils/pageMetadata";
import PackagesHeroSection from "../../components/packages/PackagesHeroSection";
import CustomizePackage from "../../components/packages/CustomizedPackage";
import PackagesGrid from "../../components/packages/PackagesCard";

export const metadata: Metadata = pageMetadata({
  title: "Umrah & Hajj Packages",
  description:
    "Browse Umrah and Hajj packages from Al Buraq Global Travel & Tours, or customize your own package to fit your budget and dates.",
  path: "/packages",
});

function Packages() {
  return (
    <div>
      <PackagesHeroSection />

      {/* Packages Grid */}
      <div id="packages-grid">
        <PackagesGrid limit={6} showViewAll />
      </div>

      {/* Customize section at bottom */}
      <CustomizePackage />
    </div>
  );
}

export default Packages;
