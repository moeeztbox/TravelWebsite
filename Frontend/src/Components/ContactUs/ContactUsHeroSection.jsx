import React, { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import gsap from "gsap";
import AboutHeroImage from "../../Assets/Images/aboutus images/about-hero.jpg";


const ContactUsHeroSection = () => {
  const containerRef = useRef(null);
  const iconSectionRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    // Initial state
    gsap.set(
      [containerRef.current, iconSectionRef.current, titleRef.current],
      { opacity: 0, y: 30 }
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
        { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(1.8)" },
        0.75
      )
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.05);
  }, []);

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.9) 100%), url(${AboutHeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
  className="h-[65vh] flex items-center justify-center relative overflow-hidden"
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/30 z-1" />
      {/* Sparkles */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-2">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
              animationDelay: `${Math.random()}s`,
              boxShadow: `0 0 6px rgba(217, 119, 6, 0.6), 0 0 12px rgba(217, 119, 6, 0.4)`,
            }}
          />
        ))}
      </div>
      {/* Main Content */}
      <div
        ref={containerRef}
        className="relative z-10 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 w-full"
        style={{ opacity: 0, transform: 'translateY(30px)' }}
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Icon and Lines */}
          <div
            ref={iconSectionRef}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            {/* Left line */}
            <div
              ref={leftLineRef}
              className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-10 sm:w-16 md:w-24"
              style={{ transform: 'scaleX(0)' }}
            />
            {/* Icon */}
            <div ref={iconRef} style={{ opacity: 0, transform: 'scale(0) rotate(180deg)' }}>
              <Mail className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-600 flex-shrink-0" />
            </div>
            {/* Right line */}
            <div
              ref={rightLineRef}
              className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-10 sm:w-16 md:w-24"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          {/* Title */}
          <div ref={titleRef} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[110%] mb-4 sm:mb-6 px-2 text-white">
              <span className="text-white ">Get in </span>
              <span className="text-yellow-600">Touch</span>
            </h1>
          </div>
        </div>
      </div>
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60"></div>
      </div>
    </section>
  );
};

export default ContactUsHeroSection;
