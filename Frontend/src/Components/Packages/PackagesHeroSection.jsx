import React, { useEffect, useRef, useState } from "react";
import AboutHeroImage from "../../Assets/Images/aboutus images/about-hero.jpg";

function PackagesHeroSection() {
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

    setAnimationStarted(true);

    animateElement(overlayRef.current, 0, 1000, 0);
    setTimeout(() => {
      if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
    }, 1000);

    animateElement(titleRef.current, 200, 600);
    animateElement(welcomeRef.current, 500, 600);
    animateElement(bookingRef.current, 800, 600);
    animateElement(buttonRef.current, 1100, 600);
  }, []);

  return (
    <section className="relative h-[80vh] flex flex-col overflow-hidden mb-12">
      {/* Dark overlay */}
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

      {/* Sparkles */}
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

      {/* Content */}
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
          <p
            ref={welcomeRef}
            className="text-lg md:text-xl text-yellow-300 drop-shadow-lg font-light leading-relaxed text-center max-w-2xl"
          >
            Choose from our carefully crafted Umrah & Hajj packages or customize
            one to suit your needs.
          </p>

          <h2
            ref={bookingRef}
            className="text-xl font-semibold text-white drop-shadow-lg"
          >
            Want to Book a Journey?
          </h2>

          <div ref={buttonRef}>
            <button className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-md text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 active:scale-95">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60"></div>
      </div>
    </section>
  );
}

export default PackagesHeroSection;
