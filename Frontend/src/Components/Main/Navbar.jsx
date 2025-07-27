import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About" },
    { to: "/contact-us", label: "Contact" },
    { to: "/booking", label: "Booking" },
    { to: "/packages", label: "Packages" },
    { to: "/blogs", label: "Blogs" },
    { to: "/services", label: "Services" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">Al Burak International</Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="hover:text-blue-600 transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Login always visible */}
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition text-sm"
          >
            Login
          </Link>

          {/* Hamburger only on mobile */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu: only navLinks */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block py-1 border-b border-gray-200 hover:text-blue-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
