import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "../utils/pageMetadata";
import HomeHeroSection from "../components/home/HomeHeroSection";
import TimelineSection from "../components/home/TimelineSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Reviews from "../components/home/Reviews";
import WhatWeOffer from "../components/home/WhatWeOffer";
import InquireNow from "../components/home/InquireNow";
import FeaturedPackages from "../components/home/FeaturedPackages";

export const metadata: Metadata = pageMetadata({
  title: "Al Buraq Global Travel & Tours",
  description:
    "Al Buraq Global Travel & Tours offers Umrah and Hajj packages, guided Ziyarat, and full pilgrimage travel planning and support.",
  path: "/",
  isHomePage: true,
});

const HomePage = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Banner */}
      <HomeHeroSection />

      {/* What We Offer Section*/}
      <WhatWeOffer />

      {/* Featured packages (only featured=true) */}
      <FeaturedPackages />

      {/* Why Choose Us Section*/}
      <WhyChooseUs />

      {/* Reviews Section*/}
      <Reviews />

      {/* Inquire Section*/}
      <InquireNow />
    </div>
  );
};

export default HomePage;
