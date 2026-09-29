"use client";

import React, { useEffect, useRef } from "react";
import AboutHeroImage from "../../assets/Images/aboutus images/about-hero.jpg";
import { seededRandom } from "../../utils/deterministicRandom";

function PolicyHeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateElement = (
      element: HTMLElement | null,
      delay: number,
      duration: number,
      targetOpacity: number = 1
    ) => {
      if (!element) return;

      setTimeout(() => {
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        element.style.opacity = String(targetOpacity);
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
      url(${AboutHeroImage.src})`,
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
              top: `${(seededRandom(i * 4) * 80 + 10).toFixed(2)}%`,
              left: `${(seededRandom(i * 4 + 1) * 80 + 10).toFixed(2)}%`,
              animationDelay: `${(seededRandom(i * 4 + 2) * 3).toFixed(2)}s`,
              animationDuration: `${(2 + seededRandom(i * 4 + 3) * 2).toFixed(2)}s`,
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

          </div>

          {/* Booking Section - Left Aligned */}

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
