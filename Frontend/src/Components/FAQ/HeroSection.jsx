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

        // Initial state
        gsap.set(
            [containerRef.current, iconSectionRef.current, titleRef.current, subtitleRef.current, badgeRef.current],
            { opacity: 0, y: 30 }
        );
        gsap.set([leftLineRef.current, rightLineRef.current], { scaleX: 0 });
        gsap.set(leftLineRef.current, { transformOrigin: "right center" });
        gsap.set(rightLineRef.current, { transformOrigin: "left center" });
        gsap.set(iconRef.current, { scale: 0, rotation: 180, opacity: 0 });

        // Faster GSAP sequence
        tl.to(containerRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0)
            .to(iconSectionRef.current, { opacity: 1, y: 0, duration: 0.45 }, 0.15)
            .to(leftLineRef.current, { scaleX: 1, duration: 0.5 }, 0.3)
            .to(rightLineRef.current, { scaleX: 1, duration: 0.5 }, 0.3)
            .to(
                iconRef.current,
                { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(1.8)" },
                0.75
            )
            .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.05)
            .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.4)
            .to(badgeRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 1.75);
    }, []);

    return (
        <div
            style={{
                backgroundImage: "url('/saim.png')",
                backgroundSize: "100%",
                backgroundPosition: "50% 40%",
            }}
            className="h-[85vh] flex items-center justify-center relative"
        >
            {/* Black overlay */}
            <div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1}} />
            <div className="text-gray-800 w-full h-full relative flex items-center justify-center" style={{zIndex: 2}}>
                {/* Sparkles - CSS animated, no GSAP */}
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

                {/* Main Content */}
                <div
                    ref={containerRef}
                    className="relative z-10 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8"
                >
                    <div className="text-center max-w-6xl mx-auto">
                        {/* Icon and Lines */}
                        <div
                            ref={iconSectionRef}
                            className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-6"
                        >
                            {/* Left line */}
                            <div
                                ref={leftLineRef}
                                className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
                            />
                            {/* Icon */}
                            <div ref={iconRef}>
                                <HelpCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-600 flex-shrink-0" />
                            </div>
                            {/* Right line */}
                            <div
                                ref={rightLineRef}
                                className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
                            />
                        </div>

                        {/* Title */}
                        <div ref={titleRef}>
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight leading-[110%] mb-3 xs:mb-4 sm:mb-6 px-2 text-white">
                                <span className="text-white">Frequently Asked </span>
                                <span className="text-yellow-600 block xs:inline">Questions</span>
                            </h1>
                        </div>

                        {/* Subtitle */}
                        {/* <div ref={subtitleRef}>
                            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs xs:max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 xs:px-2 sm:px-0">
                                Find answers to common questions about your sacred journey to
                                the Holy Land
                            </p>
                        </div> */}

                        {/* Badge */}
                        {/* <div
                            ref={badgeRef}
                            className="mt-4 xs:mt-6 sm:mt-8"
                            style={{ transform: "translateY(20px) scale(0.9)" }}
                        >
                            <div className="inline-flex items-center gap-1.5 xs:gap-2 bg-yellow-600/10 border border-yellow-600/30 rounded-full px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 hover:bg-yellow-600/20 transition-colors duration-300 text-center">
                                <Shield className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                                <span className="text-yellow-600 font-medium text-xs xs:text-sm sm:text-base whitespace-nowrap">
                                    Expert Guidance Available 24/7
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}