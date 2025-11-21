import React from "react";

function BookingPolicy() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Booking Policy</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      {/* Introduction */}
      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our booking policy ensures smooth reservation processes and clear guidelines for all travel arrangements, providing a seamless experience from selection to confirmation.
        </p>
      </section>

      {/* Booking Process & Requirements */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Booking Process & Requirements</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          The booking process involves selecting services and preferred dates, providing accurate passenger details, completing payment confirmation, and receiving booking confirmation email. All bookings require valid identification documents, complete passenger information, and payment method verification to ensure security and compliance.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          We accept various payment methods including credit/debit cards, bank transfers, and digital wallets through our secure payment gateway. Bookings are confirmed only after successful payment processing, with instant confirmation for online bookings, 24 hours for manual processing, and up to 48 hours for special requests.
        </p>
      </section>

      {/* Support & Assistance */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Support & Assistance</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          For booking assistance and inquiries, our dedicated support team is available 24/7 to help with any questions or special requirements. You'll receive email confirmation within 24 hours of payment processing, detailing your reservation and next steps.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Contact our booking support team at bookings@company.com or +1 (555) 123-4567 for immediate assistance. Our comprehensive support ensures that all your travel arrangements are handled efficiently and according to your preferences, with transparent communication throughout the booking journey.
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

export default BookingPolicy;