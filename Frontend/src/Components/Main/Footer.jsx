import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 px-6 pb-6">
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* 1. Company Info + Socials + Payment */}
        <div>
          <img
            src="/logo.png"
            alt="Al Burak International"
            className="w-32 mb-4"
          />
          <p className="text-sm mb-4">
            Trusted travel partner for Hajj, Umrah, and international tours.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mb-4">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-white">
              <FaTiktok />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
          </div>
          {/* Partner Logos / Payment Logos */}
          <img
            src="/assets/payments.png"
            alt="Payment Methods"
            className="w-40 mt-2"
          />
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/packages" className="hover:text-white">
                Packages
              </Link>
            </li>
            <li>
              <Link to="/booking" className="hover:text-white">
                Booking
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/services/umrah" className="hover:text-white">
                Umrah Packages
              </Link>
            </li>
            <li>
              <Link to="/services/hajj" className="hover:text-white">
                Hajj Packages
              </Link>
            </li>
            <li>
              <Link to="/services/visa" className="hover:text-white">
                Visa Processing
              </Link>
            </li>
            <li>
              <Link to="/services/tours" className="hover:text-white">
                International Tours
              </Link>
            </li>
            <li>
              <Link to="/services/ticketing" className="hover:text-white">
                Air Ticketing
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2">
            📍 Al Burak International, Karachi, Pakistan
          </p>
          <p className="text-sm mb-2">📞 +92 300 1234567</p>
          <p className="text-sm mb-4">✉️ info@alburakinternational.com</p>
        </div>

        {/* 5. Map */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Location</h3>
          <div className="w-full h-32 md:h-40 lg:h-44 overflow-hidden rounded-lg">
            <iframe
              title="Company Location"
              src="https://maps.google.com/maps?q=karachi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="rounded-md border-none"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
}
