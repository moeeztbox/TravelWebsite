import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function ExtractedFAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5); // show 5 at start
  const answerRefs = useRef({});

  // Flatten all categories into a single FAQ array (no headings)
  const allFaqs = [
      {
      question: "What is the difference between Hajj and Umrah?",
      answer:
        "Hajj is the major pilgrimage performed during specific dates (8-12 Dhul Hijjah), while Umrah can be performed any time throughout the year. Hajj is one of the five pillars of Islam and mandatory for those who are physically and financially able, whereas Umrah is a recommended but not obligatory pilgrimage.",
    },
    {
      question: "How far in advance should I book my pilgrimage?",
      answer:
        "For Hajj, we recommend booking 6-12 months in advance due to limited quotas. For Umrah, booking 2-3 months ahead ensures better accommodation options and competitive prices, though last-minute bookings are often possible.",
    },
    {
      question: "What age restrictions apply for Hajj and Umrah?",
      answer:
        "There are no specific age restrictions, but children under 18 must be accompanied by a guardian. Elderly pilgrims should consult their doctors before traveling. We provide special assistance for senior citizens and families with young children.",
    },
    {
      question: "What documents do I need for Hajj/Umrah visa?",
      answer:
        "You need a valid passport (minimum 6 months validity), recent passport-sized photos, vaccination certificates (meningitis, COVID-19), marriage certificate (for couples), and birth certificates (for children). Our team will guide you through the complete documentation process.",
    },
    {
      question: "How long does visa processing take?",
      answer:
        "Typically 7-15 working days for Umrah visas and 15-30 days for Hajj visas. Our fast-track service can reduce this to 3-7 days for urgent cases with additional fees.",
    },
    {
      question: "What if my visa gets rejected?",
      answer:
        "We offer a 100% money-back guarantee on visa rejection. Our expert team has a 99.8% success rate, and we pre-screen all applications to minimize rejection risks.",
    },
    {
      question: "What is included in your packages?",
      answer:
        "Our packages include visa processing, flights, accommodation near Haram, local transportation, meals, guided tours, 24/7 support, and religious guidance. Specific inclusions vary by package tier (Economy, Standard, Premium, VIP).",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes, we offer flexible payment options including installments over 6-12 months with 0% interest. You can pay via bank transfer, debit/credit cards, or visit our office for cash payments.",
    },
    {
      question: "Can I customize my package?",
      answer:
        "Absolutely! We offer customizable packages to suit your preferences for accommodation level, flight timings, group size, and additional services like private transportation or extended stays.",
    },
    {
      question: "How close are your hotels to the Haram?",
      answer:
        "Our hotels are strategically located within 200-800 meters walking distance from both Masjid al-Haram in Makkah and Masjid an-Nabawi in Madinah. Premium packages offer closer accommodations.",
    },
    {
      question: "What airline do you use for flights?",
      answer:
        "We partner with reputable airlines including Saudi Airlines, PIA, Emirates, and Qatar Airways. Flight options depend on your package selection and departure city.",
    },
    {
      question: "Are meals provided during the journey?",
      answer:
        "Yes, we provide halal meals throughout your stay. Breakfast and dinner are typically included, with options for lunch depending on your package. Special dietary requirements can be accommodated with advance notice.",
    },
    {
      question: "Do you provide guides during the pilgrimage?",
      answer:
        "Yes, our experienced religious guides accompany all groups. They provide step-by-step guidance for rituals, historical insights, and ensure you complete your pilgrimage correctly according to Islamic teachings.",
    },
    {
      question: "What support is available in case of emergencies?",
      answer:
        "We have 24/7 emergency support with local representatives in Saudi Arabia. Our team assists with medical emergencies, lost documents, accommodation issues, and any other urgent needs.",
    },
    {
      question: "Can you help with special needs or disabilities?",
      answer:
        "Yes, we provide special assistance for elderly pilgrims, wheelchair users, and those with medical conditions. This includes priority boarding, accessible accommodations, and dedicated support staff.",
    },
  ];

  const toggleFAQ = (faqIndex) => {
    const id = `faq-${faqIndex}`;
    const isOpening = openFAQ !== id;

    if (isOpening) {
      if (openFAQ !== null) {
        const prevAnswer = answerRefs.current[openFAQ];
        if (prevAnswer) {
          prevAnswer.style.transition = "all 0.3s ease-in-out";
          prevAnswer.style.height = "0px";
          prevAnswer.style.opacity = "0";
        }
        setTimeout(() => {
          setOpenFAQ(id);
          animateOpen(id);
        }, 300);
      } else {
        setOpenFAQ(id);
        setTimeout(() => animateOpen(id), 10);
      }
    } else {
      const currentAnswer = answerRefs.current[id];
      if (currentAnswer) {
        currentAnswer.style.transition = "all 0.3s ease-in-out";
        currentAnswer.style.height = "0px";
        currentAnswer.style.opacity = "0";
      }
      setTimeout(() => setOpenFAQ(null), 300);
    }
  };

  const animateOpen = (id) => {
    const el = answerRefs.current[id];
    if (el) {
      el.style.height = "0px";
      el.style.opacity = "0";
      el.style.transition = "all 0.4s ease-out";
      setTimeout(() => {
        el.style.height = el.scrollHeight + "px";
        el.style.opacity = "1";
      }, 10);
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, allFaqs.length));
  };

  return (
    <div className="bg-[#F5F7F8]"> 
      <div className="text-gray-800 w-full relative">
        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">
          <div className="max-w-5xl mx-auto space-y-3">
            {allFaqs.slice(0, visibleCount).map((faq, faqIndex) => {
              const faqId = `faq-${faqIndex}`;
              const isOpen = openFAQ === faqId;

              return (
                <div
                  key={faqIndex}
                  className="bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-lg overflow-hidden shadow-sm hover:border-yellow-600/30 hover:bg-gray-100/80 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/5"
                >
                  <button
                    onClick={() => toggleFAQ(faqIndex)}
                    className="w-full text-left p-4 sm:p-5 lg:p-6 flex items-center justify-between group hover:bg-gray-100/50 transition-colors duration-300"
                  >
                    <h3 className="text-base sm:text-lg lg:text-xl font-normal text-gray-800 pr-4 leading-relaxed group-hover:text-yellow-600 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 bg-yellow-600/10 p-1.5 rounded border border-yellow-600/20 group-hover:bg-yellow-600/15 transition-all duration-300">
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 transition-all duration-500 ease-out ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    ref={(el) => (answerRefs.current[faqId] = el)}
                    style={{ overflow: "hidden", height: 0, opacity: 0 }}
                  >
                    <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6">
                      <div className="h-px bg-gradient-to-r from-yellow-600/30 via-yellow-600/10 to-transparent mb-3 sm:mb-4" />
                      <div className="bg-gray-100/50 p-3 sm:p-4 rounded border-l-2 border-yellow-600/60 transform transition-all duration-300 hover:bg-gray-100/60">
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* View More Button */}
            {visibleCount < allFaqs.length && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center px-8 py-3 border border-yellow-600 text-base font-medium rounded-full text-yellow-600 bg-white hover:bg-yellow-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  View More Questions
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}