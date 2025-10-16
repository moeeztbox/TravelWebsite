import React, { useState, useEffect, useRef } from "react";

// Emoji icons matching FeaturedPackages exactly
const icons = {
  hotel: () => <span className="w-4 h-4 inline-block">🏨</span>,
  plane: () => <span className="w-4 h-4 inline-block">✈️</span>,
  shield: () => <span className="w-4 h-4 inline-block">🛡️</span>,
  users: () => <span className="w-4 h-4 inline-block">👥</span>,
  car: () => <span className="w-4 h-4 inline-block">🚗</span>,
  map: () => <span className="w-4 h-4 inline-block">📍</span>,
  calendar: () => <span className="w-3 h-3 inline-block">📅</span>,
  arrow: () => <span className="w-4 h-4 inline-block">➡️</span>,
  close: () => <span className="w-6 h-6 inline-block">✕</span>,
};

// Helper to build highlights array from packageData
function getHighlights(packageData) {
  const highlights = [];
  if (packageData.hotel) highlights.push({ icon: icons.hotel, text: packageData.hotel });
  if (packageData.transport) highlights.push({ icon: icons.car, text: packageData.transport });
  if (packageData.ziyarat) highlights.push({ icon: icons.map, text: `Ziyarat: ${packageData.ziyarat}` });
  if (packageData.visa) highlights.push({ icon: icons.shield, text: `Visa: ${packageData.visa}` });
  if (packageData.makkah) highlights.push({ icon: icons.map, text: `Makkah: ${packageData.makkah}` });
  if (packageData.madinah) highlights.push({ icon: icons.map, text: `Madinah: ${packageData.madinah}` });
  return highlights;
}

// Modal Dialog Component
function PackageDialog({ packageData, isOpen, onClose }) {
  const dialogRef = useRef(null);
  const contentRef = useRef(null);
  const highlights = getHighlights(packageData);

  // Robust scroll lock for modal
  useEffect(() => {
    if (isOpen) {
      // Save scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      // Hide navbar (if it has a high z-index)
      const navbar = document.querySelector('.navbar-z');
      if (navbar) navbar.style.zIndex = '1';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      // Restore navbar z-index
      const navbar = document.querySelector('.navbar-z');
      if (navbar) navbar.style.zIndex = '';
      window.scrollTo(0, Math.abs(parseInt(scrollY || '0')));
    }
    return () => {
      // Clean up in case modal is unmounted
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      const navbar = document.querySelector('.navbar-z');
      if (navbar) navbar.style.zIndex = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center px-4 py-8"
      style={{
        background: 'radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #b1b1b1 100%)',
      }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative flex flex-col bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden w-full max-w-4xl max-h-[95vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 100000 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          {icons.close()}
        </button>

        {/* Image Section - Fixed */}
        <div className="w-full h-64 overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={packageData.image || "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800"}
            alt={packageData.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section - Properly Scrollable */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto"
          style={{ 
            maxHeight: 'calc(95vh - 16rem)',
          }}
        >
          <div className="p-6">
            {/* Title and Badge */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 mr-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {packageData.title}
                </h2>
                <p className="text-lg text-gray-600">
                  {packageData.subtitle || "Complete Umrah Package"}
                </p>
              </div>
              <span className="bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0">
                {packageData.badge || packageData.days}
              </span>
            </div>

            {/* Price and Duration */}
            <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-500 mb-1">Package Price</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-[#C9A227] to-[#DAB83D] bg-clip-text text-transparent">
                  {packageData.price}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Duration</p>
                <div className="flex items-center gap-2">
                  {icons.calendar()}
                  <span className="text-xl font-semibold text-gray-900">
                    {packageData.days || packageData.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Package Details</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Experience the journey of a lifetime with our carefully curated package. 
                This comprehensive Umrah package includes everything you need for a spiritual 
                and comfortable pilgrimage to the holy cities of Makkah and Madinah.
              </p>
            </div>

            {/* Package Highlights */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gradient-to-r from-[#C9A227]/5 to-[#DAB83D]/5 p-4 rounded-xl border border-[#C9A227]/20"
                  >
                    <span className="text-2xl flex-shrink-0">{highlight.icon()}</span>
                    <span className="text-gray-700 font-medium">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Now Button */}
            <button
              className="w-full bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 mb-2"
            >
              <span>Book This Package Now</span>
              {icons.arrow()}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Package Card Component
function PackagesCard({ packageData }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const highlights = getHighlights(packageData).slice(0, 2);

  return (
    <>
      <div 
        className="group relative h-full cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl border border-gray-100 hover:border-[#C9A227]/30 transition-all duration-500 hover:scale-101 h-full">
          
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={packageData.image || "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600"}
              alt={packageData.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                {packageData.badge || packageData.days || "Package"}
              </span>
            </div>
            {/* Plus Icon Button */}
            <button className="absolute bottom-2 right-2 p-2 bg-white hover:bg-gray-50 rounded-lg shadow-md transition-colors">
              <span className="text-xl">+</span>
            </button>
          </div>

          {/* Content Section */}
          <div className="p-5 bg-gradient-to-b from-white to-[#C9A227]/5 flex flex-col h-[calc(100%-12rem)]">
            
            {/* Title & Subtitle */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                {packageData.title}
              </h3>
              <p className="text-xs font-medium text-gray-600">
                {packageData.subtitle || "Complete Umrah Package"}
              </p>
            </div>

            {/* Price & Duration */}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xl font-bold bg-gradient-to-r from-[#C9A227] to-[#DAB83D] bg-clip-text text-transparent">
                {packageData.price}
              </span>
              <div className="flex items-center gap-1 text-gray-600 text-xs">
                {icons.calendar()}
                <span>{packageData.days || packageData.duration}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-1.5 mb-4 text-sm flex-grow">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-600">
                  <span className="text-[#C9A227] flex-shrink-0">{highlight.icon()}</span>
                  <span className="break-words">{highlight.text}</span>
                </div>
              ))}
            </div>

            {/* Book Now Button */}
            <button
              className="w-full bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white font-semibold py-3 px-5 rounded-lg text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-auto"
              onClick={(e) => {
                e.stopPropagation();
                setIsDialogOpen(true);
              }}
            >
              <span>Book Now</span>
              {icons.arrow()}
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Modal */}
      <PackageDialog
        packageData={packageData}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <style jsx global>{`
        /* Ensure navbar goes behind modal when modal is open */
        .navbar-z { z-index: 40 !important; }
      `}</style>
    </>
  );
}

// Demo with PackagesData
const PackagesData = [
  {
    title: "Umrah Silver Package",
    subtitle: "Perfect for Budget-Conscious Pilgrims",
    hotel: "5 Star Hotel",
    transport: "AC Bus",
    ziyarat: "Included",
    visa: "Included",
    makkah: "7 Nights",
    madinah: "8 Nights",
    price: "PKR 120,000",
    days: "15 Days",
    badge: "Budget Friendly",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800"
  },
  {
    title: "Umrah Gold Package",
    subtitle: "Luxury Experience for Sacred Journey",
    hotel: "Luxury Hotel",
    transport: "Private Car",
    ziyarat: "Included",
    visa: "Included",
    makkah: "5 Nights",
    madinah: "5 Nights",
    price: "PKR 200,000",
    days: "10 Days",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1564769610725-4f5d15d6a94e?w=800"
  },
  {
    title: "Umrah Economy Package",
    subtitle: "Extended Stay for Complete Experience",
    hotel: "3 Star Hotel",
    transport: "AC Bus",
    ziyarat: "Optional",
    visa: "Not Included",
    makkah: "10 Nights",
    madinah: "10 Nights",
    price: "PKR 90,000",
    days: "20 Days",
    badge: "Extended Stay",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800"
  },
];

export default function PackagesDemo() {
  return (
    <section className="relative bg-white overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201,162,39,0.12) 1px, transparent 0)`,
          backgroundSize: "60px 60px"
        }}
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-50" />

      {/* Main Content */}
      <div className="py-12 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
              Featured <span className="text-[#C9A227]">Packages</span>
            </h2>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent w-24" />
              <div className="w-1.5 h-1.5 bg-[#C9A227] rounded-full" />
              <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent w-24" />
            </div>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Carefully curated packages for every pilgrim's sacred journey
            </p>
          </div>

          {/* Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PackagesData.map((pkg, index) => (
              <PackagesCard key={index} packageData={pkg} />
            ))}
          </div>

          {/* Custom Package CTA */}
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-6 text-lg">
              Need a custom package? We're here to help create your perfect journey.
            </p>
            <button
              className="bg-gradient-to-r from-white to-[#C9A227]/10 border-2 border-[#C9A227] text-[#C9A227] hover:bg-gradient-to-r hover:from-[#C9A227] hover:to-[#DAB83D] hover:text-white hover:border-[#DAB83D] px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Request Custom Package
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}