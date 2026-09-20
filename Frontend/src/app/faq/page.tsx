"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroSection from "../../components/faq/HeroSection";
import FAQSection from '../../components/faq/FaqSection';
import GoBackButton from "../../components/common/GoBackButton";

function FAQ() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(overlayRef.current, { opacity: 1, pointerEvents: 'auto' });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      pointerEvents: 'none'
    });
  }, []);

  return (
    <div className="relative">
      {/* Page-specific overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-10"
      ></div>

      {/* Only the page content fades in */}
      <div className="relative z-0">

        <HeroSection />
        <FAQSection/>
      </div>
    </div>
  );
}

export default FAQ;
