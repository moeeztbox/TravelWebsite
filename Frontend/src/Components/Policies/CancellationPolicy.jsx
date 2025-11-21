import React from "react";

function CancellationPolicy() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Cancellation Policy</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      {/* Introduction */}
      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our cancellation policy provides clear guidelines for modifying or canceling your bookings with applicable fees and timelines to ensure fair and transparent processing.
        </p>
      </section>

      {/* Cancellation Terms & Process */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cancellation Terms & Process</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Cancellations made 24+ hours before service qualify for full refund, 6-24 hours before receive 50% refund, and less than 6 hours receive no refund. The cancellation process involves submitting an online request, receiving confirmation, and refund processing within 7-10 days. Processing fees, special event bookings, and customized packages are non-refundable.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Modifications include date changes with a $25 fee, service upgrades with no fee, downgrades with a 10% fee, and name changes with a $15 fee. Emergency situations such as medical emergencies may qualify for exceptions with proper documentation submitted to our support team.
        </p>
      </section>

      {/* Refund Timeline & Support */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Refund Timeline & Support</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Refund processing times vary by payment method: credit card refunds take 5-7 business days, bank transfers take 7-10 business days, and digital wallet refunds are processed within 1-3 business days. All refund timelines begin from the date of cancellation confirmation.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For cancellation assistance and emergency exceptions, contact our support team at cancellations@company.com or +1 (555) 123-4568 during extended hours (Mon-Sun: 8AM-10PM EST). We review all emergency situations with proper documentation and aim to provide compassionate solutions for unforeseen circumstances.
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

export default CancellationPolicy;