import React from "react";

function PaymentPolicy() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Payment Policy</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      {/* Introduction */}
      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our payment policy outlines accepted methods, security measures, and transaction procedures for all bookings, ensuring secure and efficient financial transactions.
        </p>
      </section>

      {/* Payment Methods & Security */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Payment Methods & Security</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          We accept various payment methods including credit/debit cards (Visa, MasterCard, Amex), digital wallets (PayPal, Apple Pay, Google Pay), bank transfers, cryptocurrency for selected services, and mobile payment systems. All transactions are protected by 256-bit SSL encryption, PCI DSS Level 1 compliance, and we do not store payment data on our servers.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Our security measures include two-factor authentication availability and real-time payment verification to ensure your financial information remains protected. We maintain the highest industry standards for payment security and regularly update our systems to address emerging threats and vulnerabilities.
        </p>
      </section>

      {/* Processing & Fees */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Processing & Fees</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Payments are processed immediately with instant booking confirmation and automatically sent email receipts. Processing timelines vary: credit/debit cards and digital wallets are instant, bank transfers take 1-3 business days, and refund processing requires 7-10 business days. Failed transactions may result in booking cancellation after 24 hours.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Standard processing fees include 2.9% for domestic cards, 3.5% for international cards, and 1.5% for currency conversion. Bank transfers are fee-free, providing a cost-effective payment option for larger transactions. All fees are clearly displayed before transaction completion.
        </p>
      </section>

      {/* Support & Assistance */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Support & Assistance</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          For payment-related inquiries and technical support, our dedicated payment team is available 24/7 to assist with transaction issues, security concerns, and payment method questions. We provide comprehensive support through multiple channels to ensure smooth payment experiences.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Contact our payment support team at payments@company.com or +1 (555) 123-4570 for immediate assistance. Our secure payment portal offers additional resources and self-service options for managing your payment preferences and resolving common payment issues efficiently.
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

export default PaymentPolicy;