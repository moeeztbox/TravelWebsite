import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// Exact accordion markup/animation/behavior originally in FaqSection.jsx,
// extracted so it can be reused for any filtered list of FAQs without any
// change to its design, spacing, or transitions.
export default function FaqAccordion({ faqs, initialVisible = 5, step = 3 }) {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const answerRefs = useRef({});

  useEffect(() => {
    setOpenFAQ(null);
    setVisibleCount(initialVisible);
  }, [faqs, initialVisible]);

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
    setVisibleCount((prev) => Math.min(prev + step, faqs.length));
  };

  return (
    <div className="space-y-3">
      {faqs.slice(0, visibleCount).map((faq, faqIndex) => {
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
      {visibleCount < faqs.length && (
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
  );
}
