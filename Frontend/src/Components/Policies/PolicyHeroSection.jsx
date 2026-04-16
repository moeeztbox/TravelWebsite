import React, { useEffect, useRef, useState } from "react";
import AboutHeroImage from "../../Assets/Images/aboutus images/about-hero.jpg";
import { useNavigate } from "react-router-dom";

function PolicyHeroSection() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const welcomeRef = useRef(null);
  const bookingRef = useRef(null);
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const animateElement = (element, delay, duration, targetOpacity = 1) => {
      if (!element) return;

      setTimeout(() => {
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        element.style.opacity = targetOpacity;
        element.style.transform = "translateY(0px)";
      }, delay);
    };

    // Set initial states
    [
      titleRef.current,
      welcomeRef.current,
      bookingRef.current,
      buttonRef.current,
    ].forEach((el) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
      }
    });

    if (overlayRef.current) {
      overlayRef.current.style.opacity = "1";
      overlayRef.current.style.pointerEvents = "auto";
    }

    // Start animations
    setAnimationStarted(true);

    // Overlay fade out
    animateElement(overlayRef.current, 0, 1000, 0);
    setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = "none";
      }
    }, 1000);

    // Content animations
    animateElement(titleRef.current, 200, 600);
    animateElement(welcomeRef.current, 500, 600);
    animateElement(bookingRef.current, 800, 600);
    animateElement(buttonRef.current, 1100, 600);
  }, []);

  const handleBookNow = () => {
    navigate("/booking");
  };

  return (
    <section className="relative h-[80vh] flex flex-col overflow-hidden">
      {/* Dark overlay for fade-in */}
      <div ref={overlayRef} className="absolute inset-0 z-20"></div>

      {/* Background Image with mosque */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, 
      rgba(0, 0, 0, 0.85) 0%, 
      rgba(0, 0, 0, 0.75) 50%, 
      rgba(0, 0, 0, 0.9) 100%), 
      url(${AboutHeroImage})`,
        }}
      ></div>

      {/* Additional dark overlay */}
      <div className="absolute inset-0"></div>

      {/* Golden sparkles */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Top Center - About Us Title */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Policies
            </span>
          </h1>
        </div>

        {/* Content - All Left Aligned */}
        <div className="flex flex-col items-start justify-center px-8 md:px-16 lg:px-20 space-y-6">
          {/* Welcome Text - Left Aligned */}
          <div className="max-w-2xl">
            <p
              ref={welcomeRef}
              className="text-base sm:text-lg md:text-xl text-yellow-300 drop-shadow-lg font-light leading-relaxed text-left"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              This Image and text is needed to be changed just temporary image
              added.
            </p>
          </div>

          {/* Booking Section - Left Aligned */}
          <div className="flex flex-col items-start space-y-3">
            <h2
              ref={bookingRef}
              className="text-xl sm:text-2xl md:text-2xl font-semibold text-white drop-shadow-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Add Policies into navbar
            </h2>

            <div ref={buttonRef}>
              <button
                onClick={handleBookNow}
                className="group px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-md text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 active:scale-95 cursor-pointer"
                style={{
                  fontFamily: "Inter, sans-serif",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <span className="flex items-center gap-2">
                  Book Now
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60"></div>
      </div>
    </section>
  );
}

export default PolicyHeroSection;
