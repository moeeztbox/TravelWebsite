import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import gsap from "gsap";

function PolicyHeroSection() {
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
        backgroundImage: "url('/policies.jpg')",
        backgroundSize: "100%",
        backgroundPosition: "50% 40%",
      }}
      className="h-[85vh] flex items-center justify-center relative"
    >
      {/* Black overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1 }} />
      <div className="text-gray-800 w-full h-full relative flex items-center justify-center" style={{ zIndex: 2 }}>
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
                <span className="text-yellow-600 block xs:inline">Policies</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent opacity-60"></div>
        </div>
      </div>
    </div>
  );
}

// Policy Components (keeping your original styling)
function BookingPolicy() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Booking Policy</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our booking policy ensures smooth reservation processes and clear guidelines for all travel arrangements, providing a seamless experience from selection to confirmation.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Booking Process & Requirements</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          The booking process involves selecting services and preferred dates, providing accurate passenger details, completing payment confirmation, and receiving booking confirmation email. All bookings require valid identification documents, complete passenger information, and payment method verification to ensure security and compliance.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          We accept various payment methods including credit/debit cards, bank transfers, and digital wallets through our secure payment gateway. Bookings are confirmed only after successful payment processing, with instant confirmation for online bookings, 24 hours for manual processing, and up to 48 hours for special requests.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Support & Assistance</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          For booking assistance and inquiries, our dedicated support team is available 24/7 to help with any questions or special requirements. You'll receive email confirmation within 24 hours of payment processing, detailing your reservation and next steps.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Contact our booking support team at bookings@company.com or +1 (555) 123-4567 for immediate assistance. Our comprehensive support ensures that all your travel arrangements are handled efficiently and according to your preferences, with transparent communication throughout the booking journey.
        </p>
      </section>

      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-sm text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

function CancellationPolicy() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Cancellation Policy</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our cancellation policy provides clear guidelines for modifying or canceling your bookings with applicable fees and timelines to ensure fair and transparent processing.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cancellation Terms & Process</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Cancellations made 24+ hours before service qualify for full refund, 6-24 hours before receive 50% refund, and less than 6 hours receive no refund. The cancellation process involves submitting an online request, receiving confirmation, and refund processing within 7-10 days. Processing fees, special event bookings, and customized packages are non-refundable.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Modifications include date changes with a $25 fee, service upgrades with no fee, downgrades with a 10% fee, and name changes with a $15 fee. Emergency situations such as medical emergencies may qualify for exceptions with proper documentation submitted to our support team.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Refund Timeline & Support</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Refund processing times vary by payment method: credit card refunds take 5-7 business days, bank transfers take 7-10 business days, and digital wallet refunds are processed within 1-3 business days. All refund timelines begin from the date of cancellation confirmation.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For cancellation assistance and emergency exceptions, contact our support team at cancellations@company.com or +1 (555) 123-4568 during extended hours (Mon-Sun: 8AM-10PM EST). We review all emergency situations with proper documentation and aim to provide compassionate solutions for unforeseen circumstances.
        </p>
      </section>

      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-sm text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          This disclaimer outlines the limitations of liability and user responsibilities when using our services and website, establishing clear boundaries for service provision and user expectations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Service Limitations & Information Accuracy</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our services may be subject to limitations including third-party service disruptions, force majeure events, technical system failures, user-provided inaccuracies, and scheduled maintenance downtime. We strive for reliable service but cannot guarantee uninterrupted availability or performance in all circumstances.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          All information provided on our platform, including prices, availability, terms, and content, is subject to change without notice. While we endeavor to maintain accurate and current information, users should verify details before making decisions and understand that availability is not guaranteed until booking confirmation is received.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Liability Limitations & External Links</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          We are not liable for indirect damages, lost profits, consequential damages, third-party provider issues, or user negligence and misuse. Our liability is limited to the extent permitted by law, and we assume no responsibility for circumstances beyond our reasonable control or for user actions that violate our terms of service.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Our platform may contain links to third-party websites, external service providers, and partner content. We are not responsible for the content, terms, conditions, or practices of these external entities. Users should review third-party terms and conditions independently before engaging with external services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">User Responsibility & Legal Contact</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users bear responsibility for verifying booking details, checking policy updates regularly, reading terms thoroughly before acceptance, contacting support when clarification is needed, and providing accurate information. Proactive engagement with our platform terms and policies ensures informed decision-making and reduces potential misunderstandings.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For legal inquiries regarding this disclaimer or other legal matters, contact our legal department at legal@company.com or +1 (555) 123-4569 during business hours (Mon-Fri: 9AM-5PM EST). We provide legal guidance to help users understand their rights and responsibilities under our terms of service and applicable laws.
        </p>
      </section>

      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-sm text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

function PaymentPolicy() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Payment Policy</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our payment policy outlines accepted methods, security measures, and transaction procedures for all bookings, ensuring secure and efficient financial transactions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Payment Methods & Security</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          We accept various payment methods including credit/debit cards (Visa, MasterCard, Amex), digital wallets (PayPal, Apple Pay, Google Pay), bank transfers, cryptocurrency for selected services, and mobile payment systems. All transactions are protected by 256-bit SSL encryption, PCI DSS Level 1 compliance, and we do not store payment data on our servers.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Our security measures include two-factor authentication availability and real-time payment verification to ensure your financial information remains protected. We maintain the highest industry standards for payment security and regularly update our systems to address emerging threats and vulnerabilities.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Processing & Fees</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Payments are processed immediately with instant booking confirmation and automatically sent email receipts. Processing timelines vary: credit/debit cards and digital wallets are instant, bank transfers take 1-3 business days, and refund processing requires 7-10 business days. Failed transactions may result in booking cancellation after 24 hours.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Standard processing fees include 2.9% for domestic cards, 3.5% for international cards, and 1.5% for currency conversion. Bank transfers are fee-free, providing a cost-effective payment option for larger transactions. All fees are clearly displayed before transaction completion.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Support & Assistance</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          For payment-related inquiries and technical support, our dedicated payment team is available 24/7 to assist with transaction issues, security concerns, and payment method questions. We provide comprehensive support through multiple channels to ensure smooth payment experiences.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Contact our payment support team at payments@company.com or +1 (555) 123-4570 for immediate assistance. Our secure payment portal offers additional resources and self-service options for managing your payment preferences and resolving common payment issues efficiently.
        </p>
      </section>

      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-sm text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          We protect your privacy and secure your personal information. This policy explains how we collect, use, and safeguard your data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Information Collection & Usage</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          We collect personal data including account and booking details, contact information, and communication records to provide you with our services and process your bookings.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          We also gather technical data such as IP address, device information, usage analytics, and cookies to improve user experience and ensure platform security.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Your information is used to process bookings, provide services, send updates and communications, improve user experience, conduct marketing (with your consent), and provide customer support.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          We do not sell your personal data. We may share information with service providers necessary to deliver our services or when required by law. All data sharing complies with applicable privacy regulations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your Rights & Security</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          You have the right to access your personal data, correct inaccurate information, delete your personal data, object to data processing, and request data portability. To exercise these rights, please contact us using the information below.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          We implement robust security measures including SSL encryption to protect your data from unauthorized access, disclosure, or destruction. Our security protocols are regularly reviewed and updated to maintain the highest protection standards.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          We may update this privacy policy periodically to reflect changes in our practices or legal requirements. Any modifications will be posted on this page with an updated effective date. We encourage you to review this policy regularly.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For privacy-related inquiries or to exercise your rights, contact us at privacy@company.com or +1 (555) 123-4567. We are committed to addressing your concerns promptly and transparently.
        </p>
      </section>

      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-sm text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

function RefundPolicy() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our refund policy ensures fair and transparent processing of reimbursement requests according to service terms and applicable regulations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Refund Eligibility & Process</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Refunds are eligible for cancellations within policy terms, service provider cancellations, documented service failures, duplicate payments, and technical errors on our platform. The refund process begins with submitting an online request, followed by confirmation email, review and approval, and finally refund processing initiation.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Refunds are typically processed to the original payment method, though travel credits/vouchers or bank transfers may be available upon request. Processing and service fees, third-party provider charges, special request fees, insurance premiums, and gift card purchases are generally non-refundable.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Processing Timeline & Support</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          The refund timeline includes request submission (1-2 days), approval review (2-3 days), processing (7-10 business days), and bank transfer if applicable (additional 2-3 days). We strive to process all valid refund requests promptly while ensuring proper verification and compliance.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For refund assistance, contact our support team at refunds@company.com or +1 (555) 123-4571 during business hours (Mon-Fri: 8AM-8PM EST). Our online refund portal is available for convenient request submission and tracking, providing transparent communication throughout the process.
        </p>
      </section>

      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-sm text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

function TermsAndConditions() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          These terms govern your use of our services. By accessing our platform, you agree to comply with these conditions and all applicable laws and regulations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">User Agreement & Responsibilities</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          By using our services, you accept these terms and conditions in full. You are responsible for maintaining the security of your account and ensuring all information provided is accurate and current. Users must meet eligibility requirements and verify they have the legal capacity to enter into binding agreements.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          You have the right to access services, cancel bookings, modify reservations, submit complaints, request data access, and expect privacy protection. These rights come with the responsibility to use our platform lawfully and in accordance with these terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Service Terms & Intellectual Property</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Our services are provided "as is" and we reserve the right to modify or discontinue services at our discretion with appropriate notice. Service availability is not guaranteed and may be subject to maintenance periods. All content, trademarks, and intellectual property on our platform are protected by copyright laws.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Users are granted a limited license to access and use our services. Reproduction, distribution, or commercial exploitation of our content without permission is strictly prohibited. We maintain ownership of all platform content, technology, and branding elements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Prohibited Activities & Legal</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users are prohibited from engaging in fraudulent activities, misrepresentation, unauthorized access attempts, hacking, service misuse, sharing illegal content, or commercial exploitation without permission. Any violation of these prohibitions may result in account termination and legal action.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For legal inquiries, contact us at legal@company.com or +1 (555) 123-4572 during business hours (Mon-Fri: 9AM-6PM EST). We handle documentation requests and legal matters promptly while maintaining transparency in all our operations and communications.
        </p>
      </section>

      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-sm text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

function UserResponsibilities() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">User Responsibilities</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users are responsible for maintaining account security, providing accurate information, and complying with service terms to ensure a safe and efficient experience for all platform users.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Account Security & Information Accuracy</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users must maintain password confidentiality and strength, regularly update passwords, use secure devices and networks, enable two-factor authentication when available, and immediately report any unauthorized access. Account security is a shared responsibility between users and our platform.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Providing accurate and current information is essential, including valid contact details, government-issued identification, precise booking and travel details, emergency contact information, and verified payment methods. All information must be kept up-to-date to ensure smooth service delivery and compliance with travel regulations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">User Conduct & Booking Responsibilities</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users must maintain respectful communication with staff, avoid fraudulent activities, refrain from sharing prohibited content, and not attempt service disruption. Abusive behavior, fraud, or activities that harm other users or disrupt service operations are strictly prohibited and may result in account termination.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Booking responsibilities include thoroughly reviewing all details before confirmation, understanding cancellation policies, meeting travel requirements and deadlines, and carrying necessary documentation. Users should verify all booking information matches their travel needs and ensure they comply with all destination-specific requirements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Compliance & Support</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users must comply with all terms of service, applicable laws and regulations, company policies, ethical standards, privacy guidelines, and security protocols. Adherence to these requirements ensures a safe, legal, and respectful environment for all users and maintains the integrity of our services.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For assistance with responsibilities or compliance questions, contact our support team at support@company.com or +1 (555) 123-4573. We provide 24/7 customer support through multiple channels including live chat and mobile app support to help users understand and fulfill their responsibilities effectively.
        </p>
      </section>

      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-sm text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

function Policies() {
  const [activePolicy, setActivePolicy] = useState("privacy");
  const policyRefs = useRef({});
  const location = useLocation();
  const navRef = useRef(null);
  const navPlaceholderRef = useRef(null);
  const mainRef = useRef(null);
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navStyle, setNavStyle] = useState({});

  const policies = [
    { id: "privacy", label: "Privacy Policy", component: PrivacyPolicy },
    { id: "terms", label: "Terms & Conditions", component: TermsAndConditions },
    { id: "refund", label: "Refund Policy", component: RefundPolicy },
    { id: "booking", label: "Booking Policy", component: BookingPolicy },
    { id: "cancellation", label: "Cancellation Policy", component: CancellationPolicy },
    { id: "payment", label: "Payment Policy", component: PaymentPolicy },
    { id: "responsibilities", label: "User Responsibilities", component: UserResponsibilities },
    { id: "disclaimer", label: "Disclaimer", component: Disclaimer },
  ];

  const scrollToPolicy = (policyId) => {
    const element = policyRefs.current[policyId];
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100; // Offset for sticky header

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handlePolicyChange = (policyId) => {
    if (policyId === activePolicy) return;
    setActivePolicy(policyId);
    scrollToPolicy(policyId);
  };

  useEffect(() => {
    if (location.hash) {
      const policyId = location.hash.replace("#", "");
      if (policies.some((policy) => policy.id === policyId)) {
        handlePolicyChange(policyId);
      }
    }
  }, [location]);

  const setPolicyRef = (policyId, element) => {
    if (element) {
      policyRefs.current[policyId] = element;
    }
  };

  // Scroll-spy for the entire page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for better detection
      
      let currentActive = activePolicy;
      let maxVisibility = 0;
      
      Object.entries(policyRefs.current).forEach(([policyId, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          // Calculate how much of the element is visible
          const visibleHeight = Math.min(elementBottom, scrollPosition + window.innerHeight) - Math.max(elementTop, scrollPosition);
          const visibility = visibleHeight / rect.height;
          
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentActive = policyId;
          }
        }
      });
      
      if (currentActive !== activePolicy && maxVisibility > 0.3) {
        setActivePolicy(currentActive);
        try {
          window.history.replaceState(null, "", `#${currentActive}`);
        } catch (e) {
          // ignore if history API is not available
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePolicy]);

  // Sticky-left nav behavior: fix the nav to the left when the policies content is scrolled
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)'); // lg breakpoint approx

    function recomputeAndCheck() {
      const nav = navRef.current;
      const placeholder = navPlaceholderRef.current;
      const mainEl = mainRef.current;
      if (!nav || !placeholder) return;

      const navRect = placeholder.getBoundingClientRect();

      // The point where nav should become fixed: when top of placeholder reaches 16px from top (sticky top-4)
      const placeholderPageY = navRect.top + window.pageYOffset;
      const triggerPageY = placeholderPageY - 16; // top-4

      // Compute bottom of the main content area (page Y). If mainEl isn't available, fallback to document height.
      const contentTopPageY = mainEl ? (mainEl.getBoundingClientRect().top + window.pageYOffset) : 0;
      const contentBottomPageY = mainEl ? (contentTopPageY + mainEl.offsetHeight) : document.body.scrollHeight;

      // Calculate if nav can be fixed: only if we haven't scrolled past the main content bottom
      const navHeight = navRef.current?.offsetHeight || 0;
      const bufferBelow = 110; // space to avoid overlapping footer or next sections

      const hasSpaceBelow = (window.pageYOffset + navHeight + bufferBelow) < contentBottomPageY;

      const shouldFix = mq.matches && window.pageYOffset >= triggerPageY && hasSpaceBelow;

      if (shouldFix) {
        const left = navRect.left;
        const width = navRect.width;
        setNavStyle({ position: 'fixed', top: '100px', left: `${left}px`, width: `${width}px`, zIndex: 50 });
        setIsNavFixed(true);
      } else {
        setNavStyle({});
        setIsNavFixed(false);
      }
    }

    const onScroll = () => {
      recomputeAndCheck();
    };

    const onResize = () => {
      // recompute stored left/width when window resizes
      recomputeAndCheck();
    };

    // initial compute
    setTimeout(recomputeAndCheck, 50);

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7F8]">
      <PolicyHeroSection />

      {/* Main grid structure - Single scroll version */}
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          {/* Sticky Sidebar Navigation */}
          <nav className="lg:col-span-1 bg-[#F5F7F8] relative">
            {/* placeholder to preserve layout when nav becomes fixed */}
            <div ref={navPlaceholderRef} aria-hidden="true">
              <div style={{height: isNavFixed ? `${navRef.current?.offsetHeight ?? 'auto'}` : 'auto'}} />
            </div>
            <div
              ref={navRef}
              className="pr-4"
              style={isNavFixed ? navStyle : {}}
            >
              <div className="bg-[#F5F7F8] rounded-none">
                <ul className="p-3 space-y-2">
                  {policies.map((policy, index) => {
                    const currentIndex = policies.findIndex(p => p.id === activePolicy);
                    const isAbove = index < currentIndex;
                    const isBelow = index > currentIndex;

                    return (
                      <li key={policy.id}>
                        <button
                          onClick={() => handlePolicyChange(policy.id)}
                          className={`group relative w-full text-left px-3 py-2 text-sm md:text-base font-semibold transition-all duration-300 rounded-md ${
                            activePolicy === policy.id
                              ? "text-amber-600 bg-amber-50 font-semibold"
                              : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{policy.label}</span>
                            {activePolicy === policy.id && (
                              <div className="flex items-center space-x-1">
                                {isAbove && (
                                  <svg
                                    className="w-3 h-3 text-amber-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 15l7-7 7 7"
                                    />
                                  </svg>
                                )}
                                {isBelow && (
                                  <svg
                                    className="w-3 h-3 text-amber-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                )}
                              </div>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="absolute top-[15px] bottom-[150px] right-0 w-[0.5px] pointer-events-none">
              <div className="h-full bg-yellow-500 opacity-80"></div>
            </div>
          </nav>

          {/* Main Content Area - Single scroll for all policies */}
          <main ref={mainRef} className="lg:col-span-5 bg-[#F5F7F8]">
            <div className="bg-[#F5F7F8]">
              <div className="p-8">
                <div className="space-y-12">
                  {policies.map((policy) => {
                    const PolicyComponent = policy.component;
                    return (
                      <div
                        key={policy.id}
                        ref={(el) => setPolicyRef(policy.id, el)}
                        id={policy.id}
                        className="scroll-mt-24"
                      >
                        <PolicyComponent />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Policies;