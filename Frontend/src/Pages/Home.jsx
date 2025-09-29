import React from "react";
import HomeHeroSection from "../Components/Home/HomeHeroSection";
import TimelineSection from "../Components/Home/TimelineSection";
import FeaturedPackages from "../Components/Home/FeaturedPackages";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import Reviews from "../Components/Home/Reviews";
import WhatWeOffer from "../Components/Home/WhatWeOffer";
import InquireNow from "../Components/Home/InquireNow";

const HomePage = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Banner */}
      <HomeHeroSection />

      {/* What We Offer Section*/}
      <WhatWeOffer />
      {/* Packages Section*/}
      <FeaturedPackages />
      {/* Why Choose Us Section*/}
      <WhyChooseUs />

      

      {/* Reviews Section*/}
      <Reviews />

      {/* Timeline Section*/}
      <TimelineSection />

      {/* Inquire Section*/}
      <InquireNow />





      {/* Visas We Offer */}
      {/* <section className="py-12 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Visas We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Umrah Visa", "Hajj Visa", "Visit Visa"].map((type, i) => (
            <div
              key={i}
              className="bg-white shadow-md p-6 rounded-lg text-center"
            >
              <h3 className="text-xl font-bold mb-2">{type}</h3>
              <p className="text-sm text-gray-600">
                Fast processing and expert handling of {type.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Makkah Hotels */}
      {/* <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Makkah Hotels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-lg text-center shadow"
            >
              <div className="h-40 bg-gray-300 rounded mb-4" />
              <h3 className="font-bold">Hotel {i} Makkah</h3>
              <p className="text-sm text-gray-600">
                Located near Haram with top facilities.
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Madinah Hotels */}
      {/* <section className="py-12 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Madinah Hotels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg text-center shadow">
              <div className="h-40 bg-gray-300 rounded mb-4" />
              <h3 className="font-bold">Hotel {i} Madinah</h3>
              <p className="text-sm text-gray-600">
                Close to Masjid-e-Nabwi with premium amenities.
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Services */}
      {/* <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Our Services
        </h2>
        <div className="flex flex-wrap justify-center gap-10 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-700">10K+</h3>
            <p>Clients Served</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-700">98%</h3>
            <p>Satisfaction Rate</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-600">24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </section> */}

      {/* Subscribe */}
      {/* <section className="bg-indigo-900 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-6">
          Stay updated on our latest offers and travel tips.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-l px-4 py-2 w-64 text-gray-800"
          />
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-r">
            Subscribe
          </button>
        </div>
      </section> */}

      {/* Travel Guide */}
      {/* <section className="py-12 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Travel Guide
        </h2>
        <p className="max-w-3xl mx-auto text-center text-gray-600">
          Explore our expertly crafted travel guides to make your journey smooth
          and spiritual.
        </p>
      </section> */}

      {/* Offers */}
      {/* <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Latest Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 shadow rounded-lg text-center">
              <div className="h-32 bg-gray-200 mb-4" />
              <h3 className="font-bold">Offer {i}</h3>
              <p className="text-sm text-gray-600">
                Get 10% off on early booking!
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="text-blue-600 underline">View More Offers</button>
        </div>
      </section> */}

      {/* Reviews */}
      {/* <section className="py-12 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Client Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {["Ahmed", "Ayesha"].map((name, i) => (
            <div key={i} className="bg-white p-6 rounded shadow">
              <p className="text-gray-700 italic">
                "Fantastic service, highly recommend!"
              </p>
              <div className="mt-2 text-sm text-gray-500">- {name}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="text-blue-600 underline">See All Reviews</button>
        </div>
      </section> */}

      {/* Inquire Now */}
      {/* <section className="py-12 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-4">Have a Question?</h2>
        <p className="mb-6 text-gray-600">
          Send us your inquiry and our team will get back to you soon.
        </p>
        <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800">
          Inquire Now
        </button>
      </section> */}

      {/* Packages */}
      {/* <section className="py-12 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Our Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {["Simple Package", "Featured Package"].map((pkg, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-bold mb-2">{pkg}</h3>
              <p className="text-sm text-gray-600">
                Includes visa, transport, hotel stay and guided services for
                your spiritual journey.
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Team Members */}
      {/* <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Explore Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Zain", "Sara", "Imran"].map((member, i) => (
            <div key={i} className="bg-white shadow rounded-xl p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300" />
              <h3 className="text-xl font-semibold">{member}</h3>
              <p className="text-sm text-gray-500 text-bold">Team Roles</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
