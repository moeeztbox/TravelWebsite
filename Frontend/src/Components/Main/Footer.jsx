import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

// Mock Link component for demo
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact-us", label: "Contact" },
    { to: "/packages", label: "Packages" },
    { to: "/booking", label: "Booking" },
  ];

  const services = [
    { to: "/services/umrah", label: "Umrah Packages" },
    { to: "/services/hajj", label: "Hajj Packages" },
    { to: "/services/visa", label: "Visa Processing" },
    { to: "/services/tours", label: "International Tours" },
    { to: "/services/ticketing", label: "Air Ticketing" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-300 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Gentle sparkles */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-[15%] left-[10%] w-1 h-1 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-[35%] left-[80%] w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-[60%] left-[20%] w-1 h-1 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className="absolute bottom-[25%] right-[15%] w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-[25%] right-[70%] w-1 h-1 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div
        className="max-w-7xl mx-auto pt-16 px-6 pb-8 relative"
        style={{
          opacity: 1,
          transform: "translateY(0px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info + Socials + Payment */}
          <div className="lg:col-span-1">
            <div
              className="mb-6"
              style={{
                opacity: 1,
                transform: "scale(1)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
                  <img
                    src="./src/Assets/Images/logo/AL-BURAQ.png"
                    alt="Al Burak International Logo"
                    className="w-full h-full object-contain scale-125 drop-shadow-sm"
                  />
                </div>
                <span className="font-semibold text-white">
                  <span className="text-yellow-400 text-md">Al Buraq</span>
                  <br />
                  <span className="text-gray-400 text-sm">International</span>
                </span>
              </div>
            </div>

            <p
              className="text-sm text-gray-400 mb-6 leading-relaxed"
              style={{
                opacity: 1,
                transform: "translateY(0px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              Trusted travel partner for Hajj, Umrah, and international tours.
              Your journey to sacred places begins with us.
            </p>

            {/* Social Icons */}
            <div
              className="flex gap-3 mb-6"
              style={{
                opacity: 1,
                transform: "translateY(0px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              {socialLinks.map(({ icon: Icon, href, label }, index) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-yellow-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  aria-label={label}
                  style={{
                    opacity: 1,
                    transform: "scale(1)",
                    transition: `opacity 0.4s ease-out ${index * 0.1
                      }s, transform 0.4s ease-out ${index * 0.1}s`,
                  }}
                >
                  <Icon
                    size={16}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div
              className="flex flex-wrap gap-2"
              style={{
                opacity: 1,
                transform: "translateY(0px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              {["VISA", "MC", "PayPal"].map((method) => (
                <div
                  key={method}
                  className="px-3 py-1 bg-gray-700/30 border border-gray-600/30 rounded text-xs text-gray-400"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            style={{
              opacity: 1,
              transform: "translateY(0px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <h3 className="text-white font-semibold mb-6 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ to, label }) => (
                <li
                  key={label}
                  className="hover:translate-x-1 transition-transform duration-200"
                >
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            style={{
              opacity: 1,
              transform: "translateY(0px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <h3 className="text-white font-semibold mb-6 text-lg">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map(({ to, label }) => (
                <li
                  key={label}
                  className="hover:translate-x-1 transition-transform duration-200"
                >
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            style={{
              opacity: 1,
              transform: "translateY(0px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <h3 className="text-white font-semibold mb-6 text-lg">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-gray-400 hover:translate-x-0.5 transition-transform duration-200">
                <MapPin
                  size={16}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                <span>
                  Al Burak International
                  <br />
                  Karachi, Pakistan
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400 hover:translate-x-0.5 transition-transform duration-200">
                <Phone size={16} className="text-yellow-400 flex-shrink-0" />
                <span>+92 316 4396658</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400 hover:translate-x-0.5 transition-transform duration-200">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <span>info@alburakinternational.com</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div
            style={{
              opacity: 1,
              transform: "translateY(0px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <h3 className="text-white font-semibold mb-6 text-lg">
              Our Location
            </h3>
            <div className="w-full h-32 md:h-40 lg:h-44 overflow-hidden rounded-lg border border-gray-700/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.672664687032!2d74.41268219999999!3d31.5880231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190fe1a1fea88d%3A0x5eaa9ea9c6d3fb17!2sEhsan%20Traders!5e0!3m2!1sen!2s!4v1759326513829!5m2!1sen!2s"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg border-none filter contrast-90 brightness-90"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="border-t border-gray-700/50 mt-16 pt-8 text-center"
          style={{
            opacity: 1,
            transform: "translateY(0px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            style={{
              opacity: 1,
              transition: "opacity 0.6s ease-out 0.3s",
            }}
          >
            <p className="text-sm text-gray-400">
              © 2025 Al Burak International. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link
                to="/policies#privacy"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/policies#refund"
                className="hover:text-white transition-colors duration-300"
              >
                Refund Policy
              </Link>
              <Link
                to="/policies#terms"
                className="hover:text-white transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
