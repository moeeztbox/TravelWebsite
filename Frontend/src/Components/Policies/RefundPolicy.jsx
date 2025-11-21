import React from "react";

function RefundPolicy() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      {/* Introduction */}
      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our refund policy ensures fair and transparent processing of reimbursement requests according to service terms and applicable regulations.
        </p>
      </section>

      {/* Refund Eligibility & Process */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Refund Eligibility & Process</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Refunds are eligible for cancellations within policy terms, service provider cancellations, documented service failures, duplicate payments, and technical errors on our platform. The refund process begins with submitting an online request, followed by confirmation email, review and approval, and finally refund processing initiation.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Refunds are typically processed to the original payment method, though travel credits/vouchers or bank transfers may be available upon request. Processing and service fees, third-party provider charges, special request fees, insurance premiums, and gift card purchases are generally non-refundable.
        </p>
      </section>

      {/* Processing Timeline & Support */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Processing Timeline & Support</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          The refund timeline includes request submission (1-2 days), approval review (2-3 days), processing (7-10 business days), and bank transfer if applicable (additional 2-3 days). We strive to process all valid refund requests promptly while ensuring proper verification and compliance.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For refund assistance, contact our support team at refunds@company.com or +1 (555) 123-4571 during business hours (Mon-Fri: 8AM-8PM EST). Our online refund portal is available for convenient request submission and tracking, providing transparent communication throughout the process.
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

export default RefundPolicy;