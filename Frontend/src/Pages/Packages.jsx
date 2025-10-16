import React from "react";
import PackagesHeroSection from "../Components/Packages/PackagesHeroSection";
import CustomizePackage from "../Components/Packages/CustomizedPackage";
import PackagesCard from "../Components/Packages/PackagesCard";
import packagesData from "../Components/Packages/PackagesData";

function Packages() {
  return (
    <div>
      <PackagesHeroSection />

      {/* Packages Grid */}
      <PackagesCard/>
        {/* {packagesData.map((pkg, index) => (
        ))}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      </div> */}

      <CustomizePackage />
    </div>
  );
}

export default Packages;
