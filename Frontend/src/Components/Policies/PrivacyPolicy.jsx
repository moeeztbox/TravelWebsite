import React from "react";

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Privacy Policy</h1>
        <p className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="w-12 h-0.5 bg-amber-500 mt-1"></div>
      </div>

      {/* Introduction */}
      <section className="mb-3">
        <p className="text-gray-700 text-sm leading-relaxed">
          We protect your privacy and secure your personal information. This policy explains how we collect, use, and safeguard your data.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-3">
          {/* Information We Collect */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Information We Collect</h2>
            <div className="space-y-2">
              <div>
                <h3 className="font-medium text-gray-700 text-sm mb-1">Personal Data:</h3>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• Account & booking details</li>
                  <li>• Contact information</li>
                  <li>• Communication records</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 text-sm mb-1">Technical Data:</h3>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• IP address & device info</li>
                  <li>• Usage analytics</li>
                  <li>• Cookies & tracking data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">How We Use Data</h2>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <span>Process bookings & provide services</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <span>Send updates & communications</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <span>Improve user experience</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <span>Marketing (with consent)</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {/* Data Sharing */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Data Sharing</h2>
            <div className="bg-amber-50 rounded p-2">
              <p className="text-amber-800 text-xs">
                We don't sell your data. We may share with service providers or when required by law.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Rights</h2>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Access</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Correction</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Deletion</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Objection</span>
              </div>
            </div>
          </section>

          {/* Security & Contact */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Security & Contact</h2>
            <div className="space-y-1.5">
              <p className="text-gray-700 text-xs">
                We use SSL encryption and security measures to protect your data.
              </p>
              <div className="text-gray-600 text-xs space-y-0.5">
                <div className="flex items-center space-x-1">
                  <span>📧</span>
                  <span>privacy@company.com</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>📞</span>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Policy Updates</h2>
            <div className="bg-yellow-50 rounded p-2">
              <p className="text-yellow-800 text-xs">
                We may update this policy. Changes will be posted here with updated dates.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-4 pt-3">
        <p className="text-gray-500 text-xs text-center">
          Effective {new Date().toLocaleDateString()} | Your Company Name
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;