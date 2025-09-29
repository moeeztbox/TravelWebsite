import React from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"; // icons

function UrgentContact() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
          Urgent Contact
        </h2>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          {/* WhatsApp */}
          <div className="flex items-center gap-3">
            <MessageCircle className="text-green-600" size={28} />
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:underline"
            >
              +92 300 1234567 (WhatsApp)
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="text-blue-600" size={28} />
            <a href="tel:+923001234567" className="text-lg hover:underline">
              +92 300 1234567
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-orange-600" size={28} />
            <a
              href="mailto:support@example.com"
              className="text-lg hover:underline"
            >
              support@example.com
            </a>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <MapPin className="text-red-600" size={28} />
            <span className="text-lg">
              Office #12, Main Boulevard, Lahore, Pakistan
            </span>
          </div>
        </div>

        {/* Map Embed */}
        <div className="mt-10">
          <iframe
            title="office-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21751.63592759714!2d74.3092439!3d31.5203696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190fdd6b9fefcb%3A0x6ff7f97c773a0d45!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1691234567890!5m2!1sen!2s"
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
