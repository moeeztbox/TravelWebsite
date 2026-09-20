"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ContactUsHeroSection from "../../components/contact-us/ContactUsHeroSection";
import InquiryForm from "../../components/contact-us/InquiryForm";
import ComplainForm from "../../components/contact-us/ComplainForm";
import UrgentContact from "../../components/contact-us/UrgentContact";
import Reviews from "../../components/contact-us/Reviews";

function ContactUsInner() {
  const [activeForm, setActiveForm] = useState("inquiry");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Arriving from a "Book Your ..." button elsewhere on the site: make sure
  // the Inquiry tab is selected and smoothly scroll down to it, then clear
  // the query params so a later refresh of this page doesn't repeat the scroll.
  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (!scrollTo) return;
    if (searchParams.get("form") === "inquiry") setActiveForm("inquiry");

    const id = window.setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    router.replace(pathname);

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

export default function ContactUs() {
  return (
    <Suspense fallback={null}>
      <ContactUsInner />
    </Suspense>
  );
}
