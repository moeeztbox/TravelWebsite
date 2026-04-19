import React, { useEffect, useRef, useState } from "react";
import AboutHeroImage from "../../Assets/Images/aboutus images/about-hero.jpg";

function PackagesHeroSection() {
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

    [
      titleRef.current,
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

    animateElement(overlayRef.current, 0, 1000, 0);
    setTimeout(() => {
      if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
    }, 1000);

    animateElement(titleRef.current, 200, 600);
  }, []);

  return (
    <section className="relative h-[80vh] flex flex-col overflow-hidden mb-12">
      <div ref={overlayRef} className="absolute inset-0 z-20"></div>

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

      <div className="absolute inset-0 opacity-40">
        {[...Array(12)].map((_, i) => (
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

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl"
          >
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Packages
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center space-y-6">
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60"></div>
      </div>
    </section>
  );
}

export default PackagesHeroSection;
