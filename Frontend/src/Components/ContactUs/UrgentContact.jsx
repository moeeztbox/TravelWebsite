import React from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"; // icons

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
            <MessageCircle className="text-yellow-600" size={20} />
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md lg:text-[14px] hover:underline"
            >
              +92 300 1234567 (WhatsApp)
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="text-yellow-600" size={20} />
            <a href="tel:+923001234567" className="text-md lg:text-[14px] hover:underline">
              +92 300 1234567
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-yellow-600" size={20} />
            <a
              href="mailto:support@example.com"
              className="text-md hover:underline"
            >
              support@example.com
            </a>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <MapPin className="text-yellow-600" size={28} />
            <span className="text-md lg:text-[14px]">
              Office #12, Main Boulevard, Lahore, Pakistan
            </span>
          </div>
        </div>

        {/* Map Embed */}
        <div className="mt-10">
          <iframe
            title="office-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.672664687032!2d74.41268219999999!3d31.5880231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190fe1a1fea88d%3A0x5eaa9ea9c6d3fb17!2sEhsan%20Traders!5e0!3m2!1sen!2s!4v1759326513829!5m2!1sen!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default UrgentContact;
