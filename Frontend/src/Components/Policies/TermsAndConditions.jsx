import React from "react";

function TermsAndConditions() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      {/* Introduction */}
      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          These terms govern your use of our services. By accessing our platform, you agree to comply with these conditions and all applicable laws and regulations.
        </p>
      </section>

      {/* User Agreement & Responsibilities */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">User Agreement & Responsibilities</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          By using our services, you accept these terms and conditions in full. You are responsible for maintaining the security of your account and ensuring all information provided is accurate and current. Users must meet eligibility requirements and verify they have the legal capacity to enter into binding agreements.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          You have the right to access services, cancel bookings, modify reservations, submit complaints, request data access, and expect privacy protection. These rights come with the responsibility to use our platform lawfully and in accordance with these terms.
        </p>
      </section>

      {/* Service Terms & Intellectual Property */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Service Terms & Intellectual Property</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our services are provided "as is" and we reserve the right to modify or discontinue services at our discretion with appropriate notice. Service availability is not guaranteed and may be subject to maintenance periods. All content, trademarks, and intellectual property on our platform are protected by copyright laws.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Users are granted a limited license to access and use our services. Reproduction, distribution, or commercial exploitation of our content without permission is strictly prohibited. We maintain ownership of all platform content, technology, and branding elements.
        </p>
      </section>

      {/* Prohibited Activities & Legal */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Prohibited Activities & Legal</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users are prohibited from engaging in fraudulent activities, misrepresentation, unauthorized access attempts, hacking, service misuse, sharing illegal content, or commercial exploitation without permission. Any violation of these prohibitions may result in account termination and legal action.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For legal inquiries, contact us at legal@company.com or +1 (555) 123-4572 during business hours (Mon-Fri: 9AM-6PM EST). We handle documentation requests and legal matters promptly while maintaining transparency in all our operations and communications.
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

export default TermsAndConditions;