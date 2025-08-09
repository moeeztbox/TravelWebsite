import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Heart, Menu, X, Home, Users, BookOpen, Info, Newspaper, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about-us", icon: Users },
  { label: "Contact", path: "/about-us", icon: BookOpen },
  { label: "Booking", path: "/booking", icon: Info },
  { label: "Packages", path: "/packages", icon: Newspaper },
  { label: "Blogs", path: "/blogs", icon: Newspaper },
  { label: "Services", path: "/services", icon: Phone },
];

const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="relative after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 after:origin-center hover:after:w-full after:translate-x-[-50%]"
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;

    gsap.set(nav, { y: -60, opacity: 0 });

    gsap.to(nav, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    ScrollTrigger.create({
      start: 80,
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: "#ffffff",
          color: "#000000",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          duration: 0.3,
        });
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: "transparent",
          color: "#ffffff",
          boxShadow: "none",
          duration: 0.3,
        });
      },
    });
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest("#mobileSidebar") && !e.target.closest("#menuToggle")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        role="navigation"
        className="navbar fixed top-0 left-0 w-full z-50 text-white bg-transparent"
      >
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between px-6 md:px-10 py-4 lg:py-6">
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl sm:text-3xl font-semibold tracking-wide"
            >
              Kun Foundation
            </Link>
          </div>

          <ul className="hidden lg:flex gap-4 xl:gap-8 mx-6 text-sm xl:text-base font-medium whitespace-nowrap">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <NavLink to={path}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 xl:gap-6">
            <span className="hidden lg:inline text-sm xl:text-base whitespace-nowrap">
              Call Us:{" "}
              <a
                href="https://wa.me/923164396658?text=Hello%2C%20I%20would%20like%20to%20get%20in%20touch%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-dashed hover:text-green-500 transition-colors"
              >
                +92 3164396658
              </a>
            </span>

            <Link 
              to="/donate"
              className="hidden sm:inline"
            >
              <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 text-sm xl:text-base flex items-center gap-2 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-md">
                <Heart size={18} className="transition-transform group-hover:rotate-[8deg]" />
                Make A Donation
              </button>
            </Link>

            <div id="menuToggle" className="lg:hidden z-[70]">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[80] lg:hidden transition-opacity" />
      )}

      <aside
        id="mobileSidebar"
        className={`fixed top-0 right-0 w-[260px] sm:w-[300px] h-full bg-white shadow-lg z-[999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-start px-6 py-6 text-gray-800 space-y-5">
          {NAV_LINKS.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={handleMobileLinkClick}
              className="flex items-center gap-3 text-base font-light hover:text-red-500 transition-all"
            >
              <Icon size={18} className="text-gray-500" />
              <span>{label}</span>
            </Link>
          ))}

          <hr className="w-full border-gray-200" />

          <a
            href="https://wa.me/923164396658?text=Hello%2C%20I%20would%20like%20to%20get%20in%20touch%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light text-gray-600 underline underline-offset-4 decoration-dashed hover:text-green-600 transition"
          >
            +92 3164396658
          </a>

          <Link 
            to="/donate" 
            onClick={handleMobileLinkClick}
            className="pt-2"
          >
            <button className="bg-red-500 text-white px-5 py-2 text-sm rounded hover:bg-red-600 transition">
              <Heart size={16} className="inline mr-1" />
              Donate
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
}
