import React, { useState } from "react";
import ContactUsHeroSection from "../Components/ContactUs/ContactUsHeroSection";
import InquiryForm from "../Components/ContactUs/InquiryForm";
import ComplainForm from "../Components/ContactUs/ComplainForm";
import CustomerReview from "../Components/ContactUs/CustomerReview";
import UrgentContact from "../Components/ContactUs/UrgentContact"; // ✅ Import Urgent Contact

function ContactUs() {
  const [activeForm, setActiveForm] = useState("inquiry"); // default: inquiry

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <ContactUsHeroSection />

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setActiveForm("inquiry")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeForm === "inquiry"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Inquiry Form
        </button>

        <button
          onClick={() => setActiveForm("complain")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeForm === "complain"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Complain Form
        </button>
      </div>

      {/* Form Section */}
      <div className="max-w-5xl mx-auto mt-6">
        {activeForm === "inquiry" ? <InquiryForm /> : <ComplainForm />}
      </div>

      {/* Customer Review Section */}
      <CustomerReview />

      {/* Urgent Contact Section */}
      <UrgentContact />
    </div>
  );
}

export default ContactUs;
