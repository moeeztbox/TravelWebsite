import React, { useEffect, useRef } from "react";
import { HelpCircle, Shield } from "lucide-react";
import gsap from "gsap";

export default function FAQHeroSection() {
  const containerRef = useRef(null);
  const iconSectionRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    gsap.set(
      [
        containerRef.current,
        iconSectionRef.current,
        titleRef.current,
        subtitleRef.current,
        badgeRef.current,
      ],
      { opacity: 0, y: 30 },
    );
    gsap.set([leftLineRef.current, rightLineRef.current], { scaleX: 0 });
    gsap.set(leftLineRef.current, { transformOrigin: "right center" });
    gsap.set(rightLineRef.current, { transformOrigin: "left center" });
    gsap.set(iconRef.current, { scale: 0, rotation: 180, opacity: 0 });

    tl.to(containerRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0)
      .to(iconSectionRef.current, { opacity: 1, y: 0, duration: 0.45 }, 0.15)
      .to(leftLineRef.current, { scaleX: 1, duration: 0.5 }, 0.3)
      .to(rightLineRef.current, { scaleX: 1, duration: 0.5 }, 0.3)
      .to(
        iconRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.45,
          ease: "back.out(1.8)",
        },
        0.75,
      )
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.05)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.4)
      .to(
        badgeRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.4 },
        1.75,
      );
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url('/Masjid_al-Haram_hero.png')",
        backgroundSize: "100%",
        backgroundPosition: "50% 40%",
      }}
      className="h-[85vh] flex items-center justify-center relative"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 1,
        }}
      />
      <div
        className="text-gray-800 w-full h-full relative flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <div className="absolute inset-0 opacity-8 sm:opacity-12 pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-600 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
                animationDelay: `${Math.random()}s`,
                boxShadow: `0 0 6px rgba(217, 119, 6, 0.6), 0 0 12px rgba(217, 119, 6, 0.4)`,
              }}
            />
          ))}
        </div>

        <div
          ref={containerRef}
          className="relative z-10 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8"
        >
          <div className="text-center max-w-6xl mx-auto">
            <div
              ref={iconSectionRef}
              className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-6"
            >
              <div
                ref={leftLineRef}
                className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
              />
              <div ref={iconRef}>
                <HelpCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-600 flex-shrink-0" />
              </div>
              <div
                ref={rightLineRef}
                className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
              />
            </div>

            <div ref={titleRef}>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight leading-[110%] mb-3 xs:mb-4 sm:mb-6 px-2 text-white">
                <span className="text-white">Your </span>
                <span className="text-yellow-600">Trusted</span>
                <span className="text-white"> Partner for Haj & Umrah</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
