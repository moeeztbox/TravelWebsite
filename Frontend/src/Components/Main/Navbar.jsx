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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useScrollLock } from "../../Hooks/useScrollLock";
import { UserCircle } from "lucide-react";
import LanguageSwitcher from "../../Services/Languages/LanguageSwitcher";
import { useAuth } from "../../Context/AuthContext";

export default function NavbarDemo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, signOut } = useAuth();
  const isAdmin = user?.role === "isAdmin";
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
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const [desktopAccountOpen, setDesktopAccountOpen] = useState(false);

  useEffect(() => {
    setMobileAccountOpen(false);
    setDesktopAccountOpen(false);
  }, [location.pathname]);

  useScrollLock(
    Boolean(bookingGateOpen || isMobileMenuOpen || mobileAccountOpen)
  );

  const closeMobileAccount = () => setMobileAccountOpen(false);

  const displayName =
    user?.firstName || user?.lastName
      ? [user.firstName, user.lastName].filter(Boolean).join(" ").trim()
      : user?.email?.split("@")[0] || "Account";

  const handleLogout = () => {
    signOut();
    setIsMobileMenuOpen(false);
    setMobileAccountOpen(false);
    setDesktopAccountOpen(false);
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
                {isAdmin ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDesktopAccountOpen((o) => !o)}
                      className={[
                        "flex items-center justify-center rounded-lg p-1.5 transition-colors outline-none",
                        location.pathname.startsWith("/admin") ||
                          location.pathname === "/dashboard"
                          ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300/60"
                          : "text-yellow-700 hover:bg-yellow-50",
                      ].join(" ")}
                      aria-expanded={desktopAccountOpen}
                      aria-haspopup="menu"
                      aria-label="Account menu"
                    >
                      <UserCircle
                        className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
                        strokeWidth={1.5}
                      />
                    </button>
                    {desktopAccountOpen ? (
                      <>
                        <button
                          type="button"
                          className="fixed inset-0 z-[55]"
                          aria-label="Close account menu"
                          onClick={() => setDesktopAccountOpen(false)}
                        />
                        <div
                          className="absolute right-0 top-full z-[60] pt-1"
                          role="menu"
                          aria-label="Admin account"
                        >
                          <div className="rounded-xl border border-amber-200 bg-white shadow-lg py-1 min-w-[13rem]">
                            <Link
                              to="/admin/packages"
                              role="menuitem"
                              onClick={() => setDesktopAccountOpen(false)}
                              className={[
                                "block px-4 py-2.5 text-sm font-medium transition-colors",
                                location.pathname.startsWith("/admin")
                                  ? "bg-amber-50 text-amber-950"
                                  : "text-stone-700 hover:bg-amber-50/80",
                              ].join(" ")}
                            >
                              Admin panel
                            </Link>
                            <Link
                              to="/dashboard"
                              role="menuitem"
                              onClick={() => setDesktopAccountOpen(false)}
                              className={[
                                "block px-4 py-2.5 text-sm font-medium transition-colors border-t border-stone-100",
                                location.pathname === "/dashboard"
                                  ? "bg-amber-50 text-amber-950"
                                  : "text-stone-700 hover:bg-amber-50/80",
                              ].join(" ")}
                            >
                              Member dashboard
                            </Link>
                            <button
                              type="button"
                              role="menuitem"
                              onClick={handleLogout}
                              className="block w-full text-left border-t border-stone-100 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Log out
                            </button>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDesktopAccountOpen((o) => !o)}
                      className={[
                        "flex items-center rounded-lg transition-colors gap-2 px-2 py-1.5 outline-none",
                        location.pathname.startsWith("/dashboard")
                          ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300/60"
                          : "text-yellow-700 hover:bg-yellow-50",
                      ].join(" ")}
                      aria-expanded={desktopAccountOpen}
                      aria-haspopup="menu"
                      aria-label="Account menu"
                    >
                      <UserCircle
                        className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="hidden sm:inline max-w-[140px] lg:max-w-[180px] truncate text-sm lg:text-base font-semibold">
                        {displayName}
                      </span>
                    </button>
                    {desktopAccountOpen ? (
                      <>
                        <button
                          type="button"
                          className="fixed inset-0 z-[55]"
                          aria-label="Close account menu"
                          onClick={() => setDesktopAccountOpen(false)}
                        />
                        <div
                          className="absolute right-0 top-full z-[60] pt-1"
                          role="menu"
                          aria-label="Your account"
                        >
                          <div className="rounded-xl border border-amber-200 bg-white shadow-lg py-1 min-w-[13rem]">
                            <Link
                              to="/dashboard"
                              role="menuitem"
                              onClick={() => setDesktopAccountOpen(false)}
                              className={[
                                "block px-4 py-2.5 text-sm font-medium transition-colors",
                                location.pathname.startsWith("/dashboard")
                                  ? "bg-amber-50 text-amber-950"
                                  : "text-stone-700 hover:bg-amber-50/80",
                              ].join(" ")}
                            >
                              My Profile
                            </Link>
                            <button
                              type="button"
                              role="menuitem"
                              onClick={handleLogout}
                              className="block w-full text-left border-t border-stone-100 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Log out
                            </button>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                )}
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
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {isAuthenticated ? (
                isAdmin ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileAccountOpen((o) => !o);
                        setIsMobileMenuOpen(false);
                      }}
                      className={[
                        "flex items-center justify-center rounded-xl p-1.5 transition-colors outline-none",
                        mobileAccountOpen ||
                          location.pathname.startsWith("/admin") ||
                          location.pathname === "/dashboard"
                          ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300/70"
                          : "text-yellow-700 hover:bg-yellow-50",
                      ].join(" ")}
                      aria-expanded={mobileAccountOpen}
                      aria-haspopup="menu"
                      aria-label="Account menu"
                    >
                      <UserCircle
                        className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
                        strokeWidth={1.5}
                      />
                    </button>
                    {mobileAccountOpen ? (
                      <>
                        <button
                          type="button"
                          className="fixed inset-0 z-[55]"
                          aria-label="Close account menu"
                          onClick={closeMobileAccount}
                        />
                        <div
                          className="absolute right-0 top-full z-[60] mt-1 min-w-[13rem] rounded-xl border border-amber-200 bg-white py-1 shadow-lg"
                          role="menu"
                        >
                          <Link
                            to="/admin/packages"
                            role="menuitem"
                            onClick={closeMobileAccount}
                            className={[
                              "block px-4 py-2.5 text-sm font-medium",
                              location.pathname.startsWith("/admin")
                                ? "bg-amber-50 text-amber-950"
                                : "text-stone-700 hover:bg-amber-50/80",
                            ].join(" ")}
                          >
                            Admin panel
                          </Link>
                          <Link
                            to="/dashboard"
                            role="menuitem"
                            onClick={closeMobileAccount}
                            className={[
                              "block border-t border-stone-100 px-4 py-2.5 text-sm font-medium",
                              location.pathname === "/dashboard"
                                ? "bg-amber-50 text-amber-950"
                                : "text-stone-700 hover:bg-amber-50/80",
                            ].join(" ")}
                          >
                            Member dashboard
                          </Link>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              handleLogout();
                            }}
                            className="block w-full border-t border-stone-100 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            Log out
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileAccountOpen((o) => !o);
                        setIsMobileMenuOpen(false);
                      }}
                      className={[
                        "flex items-center justify-center rounded-xl p-1.5 transition-colors outline-none",
                        mobileAccountOpen ||
                          location.pathname.startsWith("/dashboard")
                          ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300/70"
                          : "text-yellow-700 hover:bg-yellow-50",
                      ].join(" ")}
                      aria-expanded={mobileAccountOpen}
                      aria-haspopup="menu"
                      aria-label="Account menu"
                    >
                      <UserCircle
                        className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
                        strokeWidth={1.5}
                      />
                    </button>
                    {mobileAccountOpen ? (
                      <>
                        <button
                          type="button"
                          className="fixed inset-0 z-[55]"
                          aria-label="Close account menu"
                          onClick={closeMobileAccount}
                        />
                        <div
                          className="absolute right-0 top-full z-[60] mt-1 min-w-[13rem] rounded-xl border border-amber-200 bg-white py-1 shadow-lg"
                          role="menu"
                        >
                          <Link
                            to="/dashboard"
                            role="menuitem"
                            onClick={closeMobileAccount}
                            className={[
                              "block px-4 py-2.5 text-sm font-medium",
                              location.pathname.startsWith("/dashboard")
                                ? "bg-amber-50 text-amber-950"
                                : "text-stone-700 hover:bg-amber-50/80",
                            ].join(" ")}
                          >
                            My Profile
                          </Link>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              handleLogout();
                            }}
                            className="block w-full border-t border-stone-100 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            Log out
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                )
              ) : null}
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setMobileAccountOpen(false);
                }}
              />
            </div>
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

            {!isAuthenticated ? (
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
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="flex-1 text-center justify-center font-semibold py-2.5 sm:py-3 text-sm sm:text-base bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                    >
                      Get Started
                    </NavbarButton>
                  </div>
                </div>
              </div>
            ) : null}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
