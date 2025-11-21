import React from "react";

function UserResponsibilities() {
  return (
    <div className="max-w-full mx-auto p-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">User Responsibilities</h1>
        <p className="text-base text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-16 h-[0.5px] bg-amber-400 mt-2"></div>
      </div>

      {/* Introduction */}
      <section className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users are responsible for maintaining account security, providing accurate information, and complying with service terms to ensure a safe and efficient experience for all platform users.
        </p>
      </section>

      {/* Account Security & Information Accuracy */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Account Security & Information Accuracy</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users must maintain password confidentiality and strength, regularly update passwords, use secure devices and networks, enable two-factor authentication when available, and immediately report any unauthorized access. Account security is a shared responsibility between users and our platform.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Providing accurate and current information is essential, including valid contact details, government-issued identification, precise booking and travel details, emergency contact information, and verified payment methods. All information must be kept up-to-date to ensure smooth service delivery and compliance with travel regulations.
        </p>
      </section>

      {/* User Conduct & Booking Responsibilities */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">User Conduct & Booking Responsibilities</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users must maintain respectful communication with staff, avoid fraudulent activities, refrain from sharing prohibited content, and not attempt service disruption. Abusive behavior, fraud, or activities that harm other users or disrupt service operations are strictly prohibited and may result in account termination.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          Booking responsibilities include thoroughly reviewing all details before confirmation, understanding cancellation policies, meeting travel requirements and deadlines, and carrying necessary documentation. Users should verify all booking information matches their travel needs and ensure they comply with all destination-specific requirements.
        </p>
      </section>

      {/* Compliance & Support */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Compliance & Support</h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Users must comply with all terms of service, applicable laws and regulations, company policies, ethical standards, privacy guidelines, and security protocols. Adherence to these requirements ensures a safe, legal, and respectful environment for all users and maintains the integrity of our services.
        </p>
        
        <p className="text-gray-700 text-sm leading-relaxed">
          For assistance with responsibilities or compliance questions, contact our support team at support@company.com or +1 (555) 123-4573. We provide 24/7 customer support through multiple channels including live chat and mobile app support to help users understand and fulfill their responsibilities effectively.
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

export default UserResponsibilities;