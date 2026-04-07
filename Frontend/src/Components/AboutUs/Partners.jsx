import React from "react";
import Marquee from "react-fast-marquee";
import img from "../../Assets/Images/aboutus images/about-hero.jpg";

const partners = [
  { img: img },
  { img: img },
  { img: img },
  { img: img },
  { img: img },
];

const Partners = () => {
  return (
    <section className="py-16 bg-gray-50">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 relative inline-block">
          Our <span className="text-yellow-600">Partners</span>
        </h2>
        <p className="mt-3 text-gray-600 text-sm">
          Trusted by leading airlines and travel brands worldwide.
        </p>
      </div>

      {/* First Row → Right to Left */}
      <Marquee gradient={false} speed={30} pauseOnHover={true}>
        {[...partners, ...partners].map((partner, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center mx-12 w-40 text-center"
          >
            <img
              src={partner.img}
              alt={`Partner ${idx + 1}`}
              className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Partners;
