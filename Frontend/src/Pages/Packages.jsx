import React, { useEffect } from "react";
import PackagesHeroSection from "../Components/Packages/PackagesHeroSection";
import CustomizePackage from "../Components/Packages/CustomizedPackage";
import PackagesGrid from "../Components/Packages/PackagesCard";

function Packages() {
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div>
      <PackagesHeroSection />

      {/* Packages Grid */}
      <PackagesGrid limit={3} showViewAll />

      {/* Customize section at bottom */}
      <CustomizePackage />
    </div>
  );
}

export default Packages;
