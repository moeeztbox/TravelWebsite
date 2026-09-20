import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "../../utils/pageMetadata";
import AboutUsHeroSection from "../../components/about-us/AboutUsHeroSection";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about Al Buraq Global Travel & Tours — our mission, vision, leadership, and the team behind your Umrah and Hajj journey.",
  path: "/about-us",
});

import OurMission from "../../components/about-us/OurMission";
import OurVision from "../../components/about-us/OurVision";
import AboutCEO from "../../components/about-us/AboutCEO"; // ✅ CEO Section
import OurTeam from "../../components/about-us/OurTeam"; // ✅ Import Our Team Section
import Partners from "../../components/about-us/Partners"; // ✅ Import Partners Section
import GoBackButton from "../../components/common/GoBackButton";

function AboutPage() {
  return (
    <div className="font-sans text-gray-800">

      <AboutUsHeroSection />

      <section className="max-w-auto bg-[#f5f7f8] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 relative">
          <div className="hidden md:block absolute left-1/2 top-20 h-76 w-0.5 bg-yellow-600"></div>

          <div className="pr-6 p-8 ">
            <OurMission />
          </div>

          <div className="pl-6  p-8 ">
            <OurVision />
          </div>
        </div>
      </section>

      <AboutCEO />

      <OurTeam />

      <Partners />
    </div>
  );
}

export default AboutPage;
