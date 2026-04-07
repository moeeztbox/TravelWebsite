import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Send
} from "lucide-react";

const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

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
    { to: "/faq", label: "FAQ's" },
  ];

  const services = [
    { to: "/services/umrah", label: "Umrah Packages" },
    { to: "/services/hajj", label: "Transportation" },
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

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Stay Connected */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-xl mb-4">Stay Connected to Al Buraq</h3>
              <p className="text-gray-400 text-sm">Get the latest updates on packages, offers, and travel tips.</p>

              {/* Social Icons */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-yellow-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-110"
                    aria-label={label}
                  >
                    <Icon size={16} className="text-gray-300 hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - Newsletter Subscribe */}
            <div className="flex-1 w-full md:max-w-xl">
              <h3 className="text-white font-semibold text-xl mb-4">Subscribe to Our Newsletter</h3>
              <div className="relative">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-400/50 transition-all duration-300 pr-36"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    {subscribed ? (
                      <span>Subscribed!</span>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-3 px-1">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 px-6 pb-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info + Payment */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://placehold.co/48x48/FCD34D/000000?text=AB"
                    alt="Al Buraq International Logo"
                    className="w-full h-full object-contain scale-125 drop-shadow-sm rounded-full"
                  />
                </div>
                <span className="font-semibold text-white">
                  <span className="text-yellow-400 text-md">Al Buraq</span><br />
                  <span className="text-gray-400 text-sm">Global</span>
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for Hajj, Umrah, and Global Travel Services. Experience a journey rich with comfort, care, and excellence.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-wrap gap-2">
              {['VISA', 'MC', 'MEEZAN'].map((method) => (
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
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
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
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Our Services</h3>
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
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-gray-400 hover:translate-x-0.5 transition-transform duration-200">
                <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Al Buraq Global Travel & Tours pvt ltd.<br />Lahore, Pakistan</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400 hover:translate-x-0.5 transition-transform duration-200">
                <Phone size={16} className="text-yellow-400 flex-shrink-0" />
                <span>+92 327 3276060</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400 hover:translate-x-0.5 transition-transform duration-200">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <span>info@alburaqtours.com</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Our Location</h3>
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
        <div className="border-t border-gray-700/50 mt-16 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 Al Buraq Global. All rights reserved.
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
