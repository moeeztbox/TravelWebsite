import React from "react";
import HomeHeroSection from "../Components/Home/HomeHeroSection";
import TimelineSection from "../Components/Home/TimelineSection";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import Reviews from "../Components/Home/Reviews";
import WhatWeOffer from "../Components/Home/WhatWeOffer";
import InquireNow from "../Components/Home/InquireNow";
import FeaturedPackages from "../Components/Home/FeaturedPackages";

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
