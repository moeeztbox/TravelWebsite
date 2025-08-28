import React from "react";
import AboutUsHeroSection from "../Components/AboutUs/AboutUsHeroSection";
import StoryBook from "../Components/AboutUs/StoryBook";
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

      {/* Story Book */}
      <StoryBook />

      {/* Mission & Vision Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Divider Line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-300"></div>

          {/* Our Mission */}
          <div className="pr-6">
            <OurMission />
          </div>

          {/* Our Vision */}
          <div className="pl-6">
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
