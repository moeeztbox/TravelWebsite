"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../../UI/resizable-navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Packages",
      link: "/packages",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "FAQ",
      link: "/faq",
    },
    {
      name: "Guide",
      link: "/journey-guide",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact-us",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <NavbarButton 
              variant="secondary" 
              to="/login"
              className="px-4 lg:px-6 xl:px-8 py-2 lg:py-2.5 xl:py-3.5 text-sm lg:text-base xl:text-lg"
            >
              Login
            </NavbarButton>
            <NavbarButton 
              variant="primary" 
              to="/book-call"
              className="px-4 lg:px-6 xl:px-8 py-2 lg:py-2.5 xl:py-3.5 text-sm lg:text-base xl:text-lg"
            >
              Get Started
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 sm:px-6 py-4 text-base font-semibold text-black border-b border-gray-200 last:border-b-0 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200 relative group"
              >
                {item.name}
                {/* Mobile underline animation */}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-600 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-3 pt-4 border-t border-white/10">
              <div className="px-4 sm:px-6 py-3">
                <div className="flex gap-2 sm:gap-3">
                  <NavbarButton
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="secondary"
                    className="flex-1 text-center justify-center font-medium py-2.5 sm:py-3 text-sm sm:text-base border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800 transition-all duration-200">
                    Login
                  </NavbarButton>
                  <NavbarButton
                    to="/book-call"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="flex-1 text-center justify-center font-semibold py-2.5 sm:py-3 text-sm sm:text-base bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200">
                    Book a call
                  </NavbarButton>
                </div>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}