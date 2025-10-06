import React from "react";
import AboutUsHeroSection from "../Components/AboutUs/AboutUsHeroSection";

import OurMission from "../Components/AboutUs/OurMission";
import OurVision from "../Components/AboutUs/OurVision";
import AboutCEO from "../Components/AboutUs/AboutCEO"; // ✅ CEO Section
import OurTeam from "../Components/AboutUs/OurTeam"; // ✅ Import Our Team Section
import Partners from "../Components/AboutUs/Partners"; // ✅ Import Partners Section

function AboutPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <AboutUsHeroSection />

      {/* Mission & Vision Section */}
      <section className="max-w-auto bg-[#f5f7f8] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Divider Line */}
          <div className="hidden md:block absolute left-1/2 top-20 h-76 w-0.5 bg-yellow-600"></div>

          {/* Our Mission */}
          <div className="pr-6 p-8 ">
            <OurMission />
          </div>

          {/* Our Vision */}
          <div className="pl-6  p-8 ">
            <OurVision />
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <AboutCEO />

      {/* Our Team Section */}
      <OurTeam />

      {/* Partners Section */}
      <Partners />
    </div>
  );
}

export default AboutPage;
