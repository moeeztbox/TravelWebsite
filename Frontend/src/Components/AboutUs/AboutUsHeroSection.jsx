import React, { useEffect, useRef } from "react";
import { Users } from "lucide-react"; // ✅ import icon
import AboutHeroImage from "../../Assets/Images/aboutus images/about-hero.jpg";

const AboutUsHeroSection = () => {
  const titleRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const animateElement = (element, delay, duration, targetOpacity = 1) => {
      if (!element) return;

      setTimeout(() => {
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        element.style.opacity = targetOpacity;
        element.style.transform = "translateY(0px)";
      }, delay);
    };

    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translateY(30px)";
    }

    if (overlayRef.current) {
      overlayRef.current.style.opacity = "1";
      overlayRef.current.style.pointerEvents = "auto";
    }

    animateElement(overlayRef.current, 0, 1000, 0);
    setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = "none";
      }
    }, 1000);

    animateElement(titleRef.current, 200, 700);
  }, []);

  return (
    <section className="relative h-[80vh] flex flex-col overflow-hidden">
      {/* Overlay for fade-in */}
      <div ref={overlayRef} className="absolute inset-0 z-20"></div>

      {/* Background Image */}
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

      {/* Golden sparkles */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 space-y-4">
        {/* ✅ Icon with golden lines */}
        <div className="flex items-center justify-center gap-4 w-full max-w-md">
          {/* Left line */}
          <div className="flex-1 h-[2px] bg-yellow-600"></div>

          {/* Icon */}
          <Users className="w-12 h-12 text-yellow-500 opacity-90" />

          {/* Right line */}
          <div className="flex-1 h-[2px] bg-yellow-600"></div>
        </div>

        {/* ✅ Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-2xl leading-tight"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="text-white">
            Who <span className="text-yellow-600">We</span> Are
          </span>
        </h1>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-transparent opacity-70"></div>
      </div>
    </section>
  );
};

export default AboutUsHeroSection;
