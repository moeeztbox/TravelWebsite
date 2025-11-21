import React from "react";

function Disclaimer() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      {/* Introduction */}
      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          This disclaimer outlines the limitations of liability and user responsibilities when using our services and website, establishing clear boundaries for service provision and user expectations.
        </p>
      </section>

      {/* Service Limitations & Information Accuracy */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Service Limitations & Information Accuracy</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our services may be subject to limitations including third-party service disruptions, force majeure events, technical system failures, user-provided inaccuracies, and scheduled maintenance downtime. We strive for reliable service but cannot guarantee uninterrupted availability or performance in all circumstances.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          All information provided on our platform, including prices, availability, terms, and content, is subject to change without notice. While we endeavor to maintain accurate and current information, users should verify details before making decisions and understand that availability is not guaranteed until booking confirmation is received.
        </p>
      </section>

      {/* Liability Limitations & External Links */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Liability Limitations & External Links</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          We are not liable for indirect damages, lost profits, consequential damages, third-party provider issues, or user negligence and misuse. Our liability is limited to the extent permitted by law, and we assume no responsibility for circumstances beyond our reasonable control or for user actions that violate our terms of service.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Our platform may contain links to third-party websites, external service providers, and partner content. We are not responsible for the content, terms, conditions, or practices of these external entities. Users should review third-party terms and conditions independently before engaging with external services.
        </p>
      </section>

      {/* User Responsibility & Legal Contact */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">User Responsibility & Legal Contact</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users bear responsibility for verifying booking details, checking policy updates regularly, reading terms thoroughly before acceptance, contacting support when clarification is needed, and providing accurate information. Proactive engagement with our platform terms and policies ensures informed decision-making and reduces potential misunderstandings.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For legal inquiries regarding this disclaimer or other legal matters, contact our legal department at legal@company.com or +1 (555) 123-4569 during business hours (Mon-Fri: 9AM-5PM EST). We provide legal guidance to help users understand their rights and responsibilities under our terms of service and applicable laws.
        </p>
      </section>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-sm text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

export default Disclaimer;