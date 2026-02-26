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
import LanguageSwitcher from "../../Services/Languages/LanguageSwitcher";

export default function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Packages", link: "/packages" },
    { name: "Booking", link: "/booking" },
    { name: "Services", link: "/services" },
    { name: "FAQ", link: "/faq" },
    {
      name: "Guide",
      link: "/guidance",
      subItems: [
        { name: "Umrah", link: "/umrah-guide" },
        { name: "Hajj", link: "/coming-soon" },
        { name: "Travel", link: "/travel-guide" },
        { name: "Ziyarat", link: "/ziyarat-guide" },
      ],
    },
    { name: "About", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
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
            {/* 🌐 Language Switcher */}
            <LanguageSwitcher />

            <NavbarButton
              variant="secondary"
              to="/login"
              className="px-4 lg:px-6 xl:px-8 py-2 lg:py-2.5 xl:py-3.5 text-sm lg:text-base xl:text-lg"
            >
              Login
            </NavbarButton>

            <NavbarButton
              variant="primary"
              to="/register"
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

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <NavItems
              items={navItems}
              isMobile={true}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex w-full flex-col gap-3 pt-4 border-t border-white/10">
              <div className="px-4 sm:px-6 py-3">
                <div className="flex gap-2 sm:gap-3">
                  <NavbarButton
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="secondary"
                    className="flex-1 text-center justify-center font-medium py-2.5 sm:py-3 text-sm sm:text-base border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800 transition-all duration-200"
                  >
                    Login
                  </NavbarButton>

                  <NavbarButton
                    to="/book-call"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="flex-1 text-center justify-center font-semibold py-2.5 sm:py-3 text-sm sm:text-base bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                  >
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
