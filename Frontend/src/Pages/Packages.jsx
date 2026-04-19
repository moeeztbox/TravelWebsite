import React from "react";
import PackagesHeroSection from "../Components/Packages/PackagesHeroSection";
import CustomizePackage from "../Components/Packages/CustomizedPackage";
import PackagesGrid from "../Components/Packages/PackagesCard";

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
