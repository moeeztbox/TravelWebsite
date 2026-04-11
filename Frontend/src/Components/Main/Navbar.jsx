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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserCircle } from "lucide-react";
import LanguageSwitcher from "../../Services/Languages/LanguageSwitcher";
import { useAuth } from "../../Context/AuthContext";

export default function NavbarDemo() {
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();
  const [bookingGateOpen, setBookingGateOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Packages", link: "/packages" },
    { name: "Booking", link: "/booking", requiresAuth: true },
    { name: "Services", link: "/services" },
    { name: "FAQ", link: "/faq" },
    { name: "Stories", link: "/stories" },
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

  const displayName =
    user?.firstName || user?.lastName
      ? [user.firstName, user.lastName].filter(Boolean).join(" ").trim()
      : user?.email?.split("@")[0] || "Account";

  const handleLogout = () => {
    signOut();
    setIsMobileMenuOpen(false);
    navigate("/", { replace: true });
  };

  const openBookingGate = () => setBookingGateOpen(true);

  return (
    <div className="relative w-full">
      {bookingGateOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-gate-title"
          onClick={() => setBookingGateOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="booking-gate-title"
              className="text-lg sm:text-xl font-bold text-gray-900"
            >
              Sign in required
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              For booking you should register yourself first. Create an account to continue, or
              cancel to stay on the site.
            </p>
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setBookingGateOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setBookingGateOpen(false);
                  navigate("/register");
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-yellow-600 text-white font-semibold hover:bg-yellow-500 transition-colors"
              >
                Register yourself
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems}
            isAuthenticated={isAuthenticated}
            onAuthRequiredClick={openBookingGate}
          />

          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <LanguageSwitcher />

            {isAuthenticated ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/dashboard"
                  title="Your dashboard"
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-yellow-700 hover:bg-yellow-50 transition-colors"
                >
                  <UserCircle
                    className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="hidden sm:inline max-w-[140px] lg:max-w-[180px] truncate text-sm lg:text-base font-semibold">
                    {displayName}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 lg:px-5 py-2 rounded-lg text-sm lg:text-base font-semibold border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-50 transition-colors whitespace-nowrap"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </NavBody>

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
              isAuthenticated={isAuthenticated}
              onAuthRequiredClick={() => {
                setIsMobileMenuOpen(false);
                openBookingGate();
              }}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex w-full flex-col gap-3 pt-4 border-t border-white/10">
              <div className="px-4 sm:px-6 py-3">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-100"
                    >
                      <UserCircle className="w-10 h-10 shrink-0" />
                      <div className="min-w-0 text-left">
                        <p className="text-xs text-amber-200/80">Signed in</p>
                        <p className="font-semibold truncate">{displayName}</p>
                      </div>
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-center font-semibold py-3 rounded-xl border-2 border-amber-400/50 text-amber-100 hover:bg-white/10 transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                ) : (
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
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="flex-1 text-center justify-center font-semibold py-2.5 sm:py-3 text-sm sm:text-base bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                    >
                      Get Started
                    </NavbarButton>
                  </div>
                )}
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
