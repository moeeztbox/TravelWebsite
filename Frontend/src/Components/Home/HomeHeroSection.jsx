import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const HomeHeroSection = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const lineRef = useRef(null);
  const overlayRef = useRef(null);
  const primaryButtonRef = useRef(null);
  const secondaryButtonRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 50,
    });
    gsap.set(buttonsRef.current, { opacity: 0, y: 50 });
    gsap.set(lineRef.current, { width: 0 });
    gsap.set(overlayRef.current, { opacity: 1, pointerEvents: "auto" });

    // Timeline for loading animation
    const tl = gsap.timeline();

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        pointerEvents: "none",
      },
      0
    )
      .to(
        titleRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0
      )
      .to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.4
      )
      .to(
        lineRef.current,
        { width: "220px", duration: 0.7, ease: "power3.out" },
        0.6
      )
      .to(
        descriptionRef.current,
        { opacity: 0.5, y: 0, duration: 0.5, ease: "power3.out" },
        0.8
      )
      .to(
        buttonsRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        1
      );

    // Subtle button hover animations
    const pb = primaryButtonRef.current;
    const sb = secondaryButtonRef.current;

    if (pb) {
      pb.style.transformOrigin = "center";

      pb.addEventListener("mouseenter", () => {
        gsap.to(pb, {
          scale: 1.02,
          boxShadow:
            "0 8px 20px rgba(250, 204, 21, 0.25), 0 4px 12px rgba(250, 204, 21, 0.15)",
          filter: "brightness(1.05)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      pb.addEventListener("mouseleave", () => {
        gsap.to(pb, {
          scale: 1,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          filter: "brightness(1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      pb.addEventListener("mousedown", () => {
        gsap.to(pb, {
          scale: 0.98,
          duration: 0.1,
          ease: "power2.out",
        });
      });

      pb.addEventListener("mouseup", () => {
        gsap.to(pb, {
          scale: 1.02,
          duration: 0.15,
          ease: "power2.out",
        });
      });
    }

    if (sb) {
      sb.style.transformOrigin = "center";

      sb.addEventListener("mouseenter", () => {
        gsap.to(sb, {
          scale: 1.02,
          boxShadow:
            "0 0 15px rgba(250, 204, 21, 0.2), inset 0 0 10px rgba(250, 204, 21, 0.05)",
          filter: "brightness(1.08)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      sb.addEventListener("mouseleave", () => {
        gsap.to(sb, {
          scale: 1,
          boxShadow: "0 0 0 rgba(250, 204, 21, 0)",
          filter: "brightness(1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      sb.addEventListener("mousedown", () => {
        gsap.to(sb, {
          scale: 0.98,
          duration: 0.1,
          ease: "power2.out",
        });
      });

      sb.addEventListener("mouseup", () => {
        gsap.to(sb, {
          scale: 1.02,
          duration: 0.15,
          ease: "power2.out",
        });
      });
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-end overflow-hidden">
      {/* Dark overlay for fade-in */}
      <div ref={overlayRef} className="absolute inset-0 bg-black z-20"></div>

      {/* Background Image with Smoother Blending */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, 
    rgba(15, 15, 15, 0.75) 0%, 
    rgba(0, 0, 0, 0.7) 50%, 
    rgba(10, 10, 10, 0.8) 100%), 
    url('./src/Assets/Images/home images/kaaba3.jpg')`,
        }}
      ></div>

      {/* Blueish and Gold Gradient Overlay with narrowed stops */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
                        rgba(30, 58, 138, 0.08) 0%, 
                        rgba(59, 130, 246, 0.05) 15%, 
                        rgba(0, 0, 0, 0.02) 50%, 
                        rgba(251, 191, 36, 0.05) 85%, 
                        rgba(245, 158, 11, 0.08) 100%)`,
        }}
      ></div>

      {/* Additional smooth blending overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30"></div>

      {/* Slightly lighter dark overlay (~15% opacity) */}
      <div className="absolute inset-0 bg- opacity-[0] pointer-events-none"></div>

      {/* Bottom overlay for smoother transitions */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-40"></div>
      </div>

      {/* Blue and Gold Sparkles */}
      <div className="absolute inset-0 opacity-30">
        {/* Blue sparkles on left side */}
        <div
          className="absolute top-[18%] left-[14%] w-1 h-1 bg-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute top-[31%] left-[27%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "1.8s" }}
        ></div>
        <div
          className="absolute top-[47%] left-[8%] w-1 h-1 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: "2.7s" }}
        ></div>
        <div
          className="absolute top-[64%] left-[23%] w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "0.9s" }}
        ></div>
        <div
          className="absolute bottom-[22%] left-[11%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "3.4s" }}
        ></div>
        <div
          className="absolute top-[71%] left-[19%] w-1 h-1 crounded-full animate-ping opacity-50"
          style={{ animationDelay: "1.1s" }}
        ></div>
        <div
          className="absolute top-[39%] left-[6%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "2.2s" }}
        ></div>

        {/* Gold sparkles on right side */}
        <div
          className="absolute top-[26%] right-[19%] w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.7s" }}
        ></div>
        <div
          className="absolute top-[43%] right-[31%] w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-[28%] right-[17%] w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"
          style={{ animationDelay: "2.9s" }}
        ></div>
        <div
          className="absolute top-[13%] right-[9%] w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "0.4s" }}
        ></div>
        <div
          className="absolute bottom-[15%] right-[24%] w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"
          style={{ animationDelay: "3.1s" }}
        ></div>
        <div
          className="absolute top-[58%] right-[12%] w-1 h-1 bg-yellow-500 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "1.7s" }}
        ></div>
        <div
          className="absolute top-[81%] right-[28%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-12 pb-24 mb-16 md:px-20 md:pb-32">
        <div className="max-w-5xl -ml-2 md:ml-16">
          {/* Company Name - All in one line */}
          <h1
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 md:mb-6 leading-tight drop-shadow-2xl"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: "600" }}
          >
            <span className="text-white">Al </span>
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Buraq
            </span>
            <span className="text-white"> </span>
            <span
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white tracking-wide align-baseline"
              style={{ fontWeight: "600" }}
            >
              Pilgrim
            </span>
          </h1>

          {/* Decorative Line */}
          <div
            ref={lineRef}
            className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-transparent mb-4 md:mb-6 rounded-full shadow-lg shadow-yellow-400/20"
          ></div>

          {/* Tagline */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-200 mb-3 md:mb-4 font-light drop-shadow-lg"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: "300" }}
          >
            <span className="sm:hidden">Sacred Journeys</span>
            <span className="hidden sm:inline">
              Your Gateway to Sacred Journeys
            </span>
          </p>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="text-gray-300 mb-8 md:mb-12 text-sm sm:text-base leading-relaxed max-w-2xl opacity-70 italic drop-shadow-md"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}
          >
            <span className="sm:hidden">
            We offer trusted and hassle-free Umrah Packages, ensuring your comfort. Our team ensures complete guidance from departure to return.
            </span>
            <span className="hidden sm:inline">
            We offer trusted and hassle-free Umrah Packages, ensuring your comfort. Our team ensures complete guidance from departure to return.
            </span>
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 md:gap-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <button
              ref={primaryButtonRef}
              type="button"
              onClick={() => navigate("/booking")}
              className="px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-lg tracking-wide drop-shadow-lg text-sm sm:text-base cursor-pointer"
              style={{ fontWeight: "600" }}
            >
              Book Now
            </button>
            
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60"></div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
