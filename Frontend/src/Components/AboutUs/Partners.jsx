import React from "react";
import Marquee from "react-fast-marquee";

const partners = [
  { name: "Emirates", img: "https://cdn.iconscout.com/icon/free/png-256/free-emirates-icon-svg-download-png-282451.png" },
  { name: "Qatar Airways", img: "https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" },
  { name: "Etihad", img: "https://images.seeklogo.com/logo-png/61/1/etihad-airways-logo-png_seeklogo-612893.png" },
  { name: "Saudia", img: "https://iconlogovector.com/uploads/images/2023/11/lg-6562d265e1226-saudia-saudi-arabian-airline.png" },
  { name: "Turkish Airlines", img: "https://1000logos.net/wp-content/uploads/2020/04/Turkish_Airlines_logo.png" },
  { name: "Flydubai", img: "https://download.logo.wine/logo/Flydubai/Flydubai-Logo.wine.png" },
  { name: "Air Arabia", img: "https://download.logo.wine/logo/Air_Arabia/Air_Arabia-Logo.wine.png" },
  { name: "Pakistan International Airlines", img: "https://p1.hiclipart.com/preview/331/251/830/american-flag-background-pakistan-international-airlines-logo-airplane-jinnah-international-airport-boeing-767-flight-flag-carrier-png-clipart.jpg" },
  { name: "SereneAir", img: "https://crystalpng.com/wp-content/uploads/2025/10/serene-air-logo.png" },
  { name: "Airblue", img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/be5dd5100031261.5eff98a5cad4b.png" },
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
              alt={partner.name || `Partner ${idx + 1}`}
              className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {/* {partner.name ? (
              <span className="mt-2 text-xs font-semibold text-gray-600">
                {partner.name}
              </span>
            ) : null} */}
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Partners;
