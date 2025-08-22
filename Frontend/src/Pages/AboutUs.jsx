import React from "react";
import AboutUsHeroSection from "../Components/AboutUs/AboutUsHeroSection";

const AboutPage = () => {
  return (
    <div className="font-sans text-gray-800">
      <AboutUsHeroSection />
      {/* Banner */}
      {/* <div className="relative bg-blue-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">About Us</h1>
        <p className="text-lg">
          Learn more about our mission, vision, team, and leadership.
        </p>
      </div> */}

      {/* Our Mission */}
      {/* <section className="py-12 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-center text-gray-600">
          Our mission is to provide top-quality travel and religious tourism
          services, ensuring every journey is meaningful and seamless for our
          clients.
        </p>
      </section> */}

      {/* Our Vision */}
      {/* <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Vision</h2>
        <p className="max-w-3xl mx-auto text-center text-gray-600">
          We envision becoming the most trusted and respected name in the travel
          industry, especially in providing safe and spiritually enriching Umrah
          and Hajj experiences.
        </p>
      </section> */}

      {/* Our Team */}
      {/* <section className="py-12 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-10 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Ali", "Fatima", "Usman"].map((name, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-6 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300" />
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm text-gray-500">Team Member Role</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Affiliations */}
      {/* <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Affiliations
        </h2>
        <p className="max-w-3xl mx-auto text-center text-gray-600 mb-10">
          We are proud to be affiliated with:
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-center">
          <div className="bg-blue-100 px-6 py-3 rounded-lg shadow">
            Government of Pakistan
          </div>
          <div className="bg-green-100 px-6 py-3 rounded-lg shadow">
            Ministry of Religious Affairs
          </div>
          <div className="bg-yellow-100 px-6 py-3 rounded-lg shadow">
            IATA Certified Agency
          </div>
        </div>
      </section> */}

      {/* About CEO */}
      {/* <section className="py-16 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-10">
          About Our CEO
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
          <img
            src="https://via.placeholder.com/200"
            alt="CEO"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-bold mb-2">Mr. Muhammad Bilal</h3>
            <p className="text-gray-700">
              With over 15 years of experience in the travel and religious
              tourism industry, our CEO brings unmatched leadership and passion
              to the company. His dedication to client satisfaction and service
              excellence drives our success every day.
            </p>
          </div>
        </div>
      </section>*/}
    </div>
  );
};

export default AboutPage;
