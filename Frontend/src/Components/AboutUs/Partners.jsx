import React from "react";
import Marquee from "react-fast-marquee";
import img from "../../Assets/Images/aboutus images/about-hero.jpg";

const airlines = [
  { img: img },
  { img: img },
  { img: img },
  { img: img },
  { img: img },
];

const airlines2 = [
  { img: img },
  { img: img },
  { img: img },
  { img: img },
  { img: img },
];

const Partners = () => {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">Partners</h2>

      {/* First row → right to left */}
      <Marquee gradient={false} speed={50}>
        {[...airlines, ...airlines].map((airline, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center mx-8 w-28 text-center"
          >
            <img src={airline.img} className="h-12 object-contain mb-2" />
          </div>
        ))}
      </Marquee>

      {/* Second row → left to right */}
      <Marquee gradient={false} speed={50} direction="right" className="mt-6">
        {[...airlines2, ...airlines2].map((airline, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center mx-8 w-28 text-center"
          >
            <img src={airline.img} className="h-12 object-contain mb-2" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Partners;
