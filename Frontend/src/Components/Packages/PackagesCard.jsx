import React from "react";
import { Link } from "react-router-dom";
import { FaHotel, FaBus, FaPassport, FaMosque, FaCity } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import AboutHeroImage from "../../Assets/Images/aboutus images/about-hero.jpg";

function PackagesCard({ packageData }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative">
      {/* Days Badge */}
      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
        {packageData.days}
      </div>

      {/* Image */}
      <img
        src={AboutHeroImage}
        alt={packageData.title}
        className="w-full h-40 object-cover"
      />

      {/* Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {packageData.title}
        </h3>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-gray-600 text-sm">
          <p className="flex items-center gap-2">
            <FaHotel className="text-blue-500" /> {packageData.hotel}
          </p>
          <p className="flex items-center gap-2">
            <MdTour className="text-green-500" /> {packageData.ziyarat}
          </p>
          <p className="flex items-center gap-2">
            <FaBus className="text-purple-500" /> {packageData.transport}
          </p>
          <p className="flex items-center gap-2">
            <FaPassport className="text-red-500" /> {packageData.visa}
          </p>
          <p className="flex items-center gap-2">
            <FaCity className="text-orange-500" /> {packageData.makkah}
          </p>
          <p className="flex items-center gap-2">
            <FaMosque className="text-teal-500" /> {packageData.madinah}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-lg font-bold text-green-600">
            {packageData.price}
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
              Book Now
            </button>
            <Link
              to="/package-details"
              className="px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-lg hover:bg-gray-300 transition"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackagesCard;
