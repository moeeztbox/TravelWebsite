import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContactUsHeroSection from "../Components/ContactUs/ContactUsHeroSection";
import InquiryForm from "../Components/ContactUs/InquiryForm";
import ComplainForm from "../Components/ContactUs/ComplainForm";
import UrgentContact from "../Components/ContactUs/UrgentContact";
import Reviews from "../Components/ContactUs/Reviews";

function ContactUs() {
  const [activeForm, setActiveForm] = useState("inquiry");
  const location = useLocation();
  const navigate = useNavigate();

  // Arriving from a "Book Your ..." button elsewhere on the site: make sure
  // the Inquiry tab is selected and smoothly scroll down to it, then clear
  // the nav state so a later refresh of this page doesn't repeat the scroll.
  useEffect(() => {
    if (!location.state?.scrollTo) return;
    if (location.state.form === "inquiry") setActiveForm("inquiry");

    const id = window.setTimeout(() => {
      document
        .getElementById(location.state.scrollTo)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);

    navigate(location.pathname, { replace: true, state: null });

    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      <ContactUsHeroSection />

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

      <div
        id="inquiry-form-section"
        className="mx-auto mt-10 flex flex-col gap-8 md:flex-row md:gap-12 w-full max-w-7xl px-2 sm:px-4"
      >
        <div className="w-full md:w-2/3 lg:w-3/5 mb-8 md:mb-0 flex-1">
          {activeForm === "inquiry" ? <InquiryForm /> : <ComplainForm />}
        </div>
        <div className="w-full py-6 md:w-1/3 lg:w-1/4 flex-shrink-0">
          <UrgentContact />
        </div>
      </div>

      <Reviews />
    </div>
  );
}

export default ContactUs;
