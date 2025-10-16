import React, { useState } from "react";
import ContactUsHeroSection from "../Components/ContactUs/ContactUsHeroSection";
import InquiryForm from "../Components/ContactUs/InquiryForm";
import ComplainForm from "../Components/ContactUs/ComplainForm";
import UrgentContact from "../Components/ContactUs/UrgentContact";

function ContactUs() {
  const [activeForm, setActiveForm] = useState("inquiry");

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Hero Section */}
      <ContactUsHeroSection />

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setActiveForm("inquiry")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeForm === "inquiry"
            ? "bg-yellow-600 text-white border-1 shadow-lg hover:bg-yellow-700 hover:scale-[1.05]"
            : "bg-white text-gray-700 border-1 border-yellow-600 hover:scale-[1.05]"
            }`}
        >
          Inquiry Form
        </button>

        <button
          onClick={() => setActiveForm("complain")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeForm === "complain"
            ? "bg-yellow-600 text-white border-1 shadow-lg hover:bg-yellow-700 hover:scale-[1.05]"
            : "bg-white text-gray-700 border-1 border-yellow-600 hover:scale-[1.05]"
            }`}
        >
          Complain Form
        </button>
      </div>

      {/* Form & Urgent Contact Side by Side */}
      <div className="mx-auto mt-10 flex flex-col gap-8 md:flex-row md:gap-12 w-full max-w-7xl px-2 sm:px-4">
        {/* Form Section */}
        <div className="w-full md:w-2/3 lg:w-3/5 mb-8 md:mb-0 flex-1">
          {activeForm === "inquiry" ? <InquiryForm /> : <ComplainForm />}
        </div>
        {/* Urgent Contact Section */}
        <div className="w-full py-6 md:w-1/3 lg:w-1/4 flex-shrink-0">
          <UrgentContact />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;