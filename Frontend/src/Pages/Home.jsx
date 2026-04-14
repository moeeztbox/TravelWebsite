import React, { useEffect } from "react";
import HomeHeroSection from "../Components/Home/HomeHeroSection";
import TimelineSection from "../Components/Home/TimelineSection";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import Reviews from "../Components/Home/Reviews";
import WhatWeOffer from "../Components/Home/WhatWeOffer";
import InquireNow from "../Components/Home/InquireNow";
import { Link } from "react-router-dom";
import FeaturedPackages from "../Components/Home/FeaturedPackages";

const HomePage = () => {
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Banner */}
      <HomeHeroSection />

      {/* What We Offer Section*/}
      <WhatWeOffer />

      {/* Featured packages (only featured=true) */}
      <FeaturedPackages />

      {/* Packages CTA */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-100 bg-gradient-to-r from-[#C9A227]/10 via-white to-[#DAB83D]/10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                Explore our Umrah packages
              </h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                View all packages we’re offering and choose the one that fits your journey.
              </p>
            </div>
            <Link
              to="/packages"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#C9A227] to-[#DAB83D] hover:opacity-95 transition shadow-lg"
            >
              View all packages
            </Link>
          </div>
        </div>
      </section>

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
