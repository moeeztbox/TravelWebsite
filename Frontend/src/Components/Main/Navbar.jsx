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
import { useAuth } from "../../Context/AuthContext";
import { getBitmojiAvatarUrl } from "../../constants/bitmoji";

export default function NavbarDemo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, signOut } = useAuth();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Packages", link: "/packages" },

    { name: "Services", link: "/services" },
    { name: "FAQ", link: "/faq" },

    { name: "Policies", link: "/policies" },
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

  useScrollLock(Boolean(isMobileMenuOpen || mobileAccountOpen));

  const closeMobileAccount = () => setMobileAccountOpen(false);

  // Keep avatar URL consistent with UserDashboard (seed order matters).
  const avatarSeed = user?._id || user?.email || "";
  const avatarIndex = Number.isFinite(Number(user?.bitmojiIndex))
    ? Number(user.bitmojiIndex)
    : 0;
  const avatarUrl = user ? getBitmojiAvatarUrl(avatarIndex, avatarSeed) : "";

  const handleLogout = () => {
    signOut();
    setIsMobileMenuOpen(false);
    setMobileAccountOpen(false);
    setDesktopAccountOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} isAuthenticated={isAuthenticated} />

          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDesktopAccountOpen((o) => !o)}
                    className={[
                      "flex items-center justify-center rounded-lg p-1.5 transition-colors outline-none",
                      location.pathname.startsWith("/admin")
                        ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300/60"
                        : "text-yellow-700 hover:bg-yellow-50",
                    ].join(" ")}
                    aria-expanded={desktopAccountOpen}
                    aria-haspopup="menu"
                    aria-label="Account menu"
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white ring-1 ring-amber-200 object-cover"
                      />
                    ) : (
                      <UserCircle
                        className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
                        strokeWidth={1.5}
                      />
                    )}
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
                            onClick={() => {
                              setDesktopAccountOpen(false);
                            }}
                            className={[
                              "block px-4 py-2.5 text-sm font-medium transition-colors",
                              location.pathname.startsWith("/admin")
                                ? "bg-amber-50 text-amber-950"
                                : "text-stone-700 hover:bg-amber-50/80",
                            ].join(" ")}
                          >
                            Admin panel
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
              </div>
            ) : (
              <></>
            )}
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileAccountOpen((o) => !o);
                      setIsMobileMenuOpen(false);
                    }}
                    className={[
                      "flex items-center justify-center rounded-xl p-1.5 transition-colors outline-none",
                      mobileAccountOpen || location.pathname.startsWith("/admin")
                        ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300/70"
                        : "text-yellow-700 hover:bg-yellow-50",
                    ].join(" ")}
                    aria-expanded={mobileAccountOpen}
                    aria-haspopup="menu"
                    aria-label="Account menu"
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white ring-1 ring-amber-200 object-cover"
                      />
                    ) : (
                      <UserCircle
                        className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
                        strokeWidth={1.5}
                      />
                    )}
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
                          onClick={() => {
                            closeMobileAccount();
                          }}
                          className={[
                            "block px-4 py-2.5 text-sm font-medium",
                            location.pathname.startsWith("/admin")
                              ? "bg-amber-50 text-amber-950"
                              : "text-stone-700 hover:bg-amber-50/80",
                          ].join(" ")}
                        >
                          Admin panel
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
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
