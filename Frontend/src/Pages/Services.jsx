import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroServices from "../Components/Services/HeroServices";
import ServicesSec from '../Components/Services/ServicesSec';

function Services() {
  const overlayRef = useRef(null);

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
        className="absolute inset-0 bg-black z-10 pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Only the page content fades in */}
      <div className="relative z-0">
        <HeroServices />
        <ServicesSec />
      </div>
    </div>
  );
}

export default Services;