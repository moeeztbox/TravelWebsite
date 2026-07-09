import React from "react";
import { Phone, Mail, MapPin } from "lucide-react"; // icons
import { FaWhatsapp } from "react-icons/fa";
import MapFrame from "../Common/MapFrame";

function UrgentContact() {
  return (
    <div className="bg-white py-8 rounded-2xl shadow-2xl  px-2 sm:py-10 sm:px-4 md:py-12 md:px-6">
      <div className="max-w-xl mx-auto w-full">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          Urgent Contact
        </h2>

        {/* Contact Info List - single column */}
        <div className="flex flex-col gap-6 text-gray-700">
          {/* WhatsApp */}
          <div className="flex items-center gap-3">
            <FaWhatsapp className="text-yellow-600" size={22} />
            <a
              href="https://wa.me/923273276060"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md lg:text-[14px] hover:underline"
            >
              +92 327 3276060
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="text-yellow-600" size={20} />
            <a
              href="tel:+923212340008"
              className="text-md lg:text-[14px] hover:underline"
            >
              +92 321 2340008
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-yellow-600" size={20} />
            <a
              href="mailto:info@alburaqtours.com"
              className="text-md hover:underline"
            >
              info@alburaqtours.com
            </a>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <MapPin className="text-yellow-600" size={28} />
            <span className="text-md lg:text-[14px]">
              PLAZA NO.54 BLOCK A COMMERCIAL AREA, EDEN CITY, DHA PHASE 8,
              LAHORE.
            </span>
          </div>
        </div>

        {/* Map Embed */}
        <div className="mt-10">
          <MapFrame
            title="office-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.521976112091!2d74.43219827625492!3d31.509820747661994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f9963fd5e79%3A0x650b30303ede56c!2sAl%20Buraq%20Global%20Travel%20%26%20Tours!5e0!3m2!1sen!2s!4v1783615492880!5m2!1sen!2s"
            height="300"
          />
        </div>
      </div>
    </div>
  );
}

export default UrgentContact;
