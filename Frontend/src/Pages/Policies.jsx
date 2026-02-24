import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PolicyHeroSection from "../Components/Policies/PolicyHeroSection";
import BookingPolicy from "../Components/Policies/BookingPolicy";
import CancellationPolicy from "../Components/Policies/CancellationPolicy";
import Disclaimer from "../Components/Policies/Disclaimer";
import PrivacyPolicy from "../Components/Policies/PrivacyPolicy";
import RefundPolicy from "../Components/Policies/RefundPolicy";
import TermsAndConditions from "../Components/Policies/TermsAndConditions";
import PaymentPolicy from "../Components/Policies/PaymentPolicy";
import UserResponsibilities from "../Components/Policies/UserResponsibilities";

function Policies() {
  const [activePolicy, setActivePolicy] = useState("privacy");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("down");
  const contentRef = useRef(null);
  const policyRefs = useRef({});
  const location = useLocation();

  const policies = [
    { id: "privacy", label: "Privacy Policy", component: PrivacyPolicy },
    { id: "terms", label: "Terms & Conditions", component: TermsAndConditions },
    { id: "refund", label: "Refund Policy", component: RefundPolicy },
    { id: "booking", label: "Booking Policy", component: BookingPolicy },
    {
      id: "cancellation",
      label: "Cancellation Policy",
      component: CancellationPolicy,
    },
    { id: "payment", label: "Payment Policy", component: PaymentPolicy },
    {
      id: "responsibilities",
      label: "User Responsibilities",
      component: UserResponsibilities,
    },
    { id: "disclaimer", label: "Disclaimer", component: Disclaimer },
  ];

  const getPolicyIndex = (policyId) => {
    return policies.findIndex((policy) => policy.id === policyId);
  };

  const scrollToPolicy = (policyId) => {
    const element = policyRefs.current[policyId];
    const container = contentRef.current;

    if (element && container) {
      const elementPosition = element.getBoundingClientRect().top;
      const containerPosition = container.getBoundingClientRect().top;

      const offset = elementPosition - containerPosition + container.scrollTop;

      container.scrollTo({
        top: offset - 20,
        behavior: "smooth",
      });
    }
  };
  const handlePolicyChange = (policyId) => {
    if (policyId === activePolicy || isAnimating) return;

    const currentIndex = getPolicyIndex(activePolicy);
    const newIndex = getPolicyIndex(policyId);
    const direction = newIndex < currentIndex ? "up" : "down";

    setAnimationDirection(direction);
    setIsAnimating(true);
    setActivePolicy(policyId);

    setTimeout(() => {
      scrollToPolicy(policyId);
    }, 50);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (location.hash) {
      const policyId = location.hash.replace("#", "");
      if (policies.some((policy) => policy.id === policyId)) {
        handlePolicyChange(policyId);
      }
    }
  }, [location]);

  // Set ref for each policy component
  const setPolicyRef = (policyId, element) => {
    if (element) {
      policyRefs.current[policyId] = element;
    }
  };

  const getAnimationClasses = (policyId) => {
    if (policyId !== activePolicy) return "";

    if (isAnimating) {
      return animationDirection === "up"
        ? "opacity-0 -translate-y-8 scale-95"
        : "opacity-0 translate-y-8 scale-95";
    }
    return "opacity-100 translate-y-0 scale-100";
  };

  return (
    <div className="min-h-screen bg-[#F5F7F8]">
      <PolicyHeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  Our Policies
                </h3>
              </div>
              <ul className="p-4 space-y-1">
                {policies.map((policy, index) => {
                  const currentIndex = getPolicyIndex(activePolicy);
                  const isAbove = index < currentIndex;
                  const isBelow = index > currentIndex;

                  return (
                    <li key={policy.id} className="relative">
                      <button
                        onClick={() => handlePolicyChange(policy.id)}
                        className={`group relative w-full text-left px-2 py-3 text-sm font-medium transition-all duration-300 overflow-hidden ${
                          activePolicy === policy.id
                            ? "text-amber-600 font-semibold bg-amber-50 rounded-lg"
                            : "text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg"
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

                        <span
                          className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 ease-in-out ${
                            activePolicy === policy.id
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Main Content Area - Scrollable Container */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div
                ref={contentRef}
                onWheel={(e) => {
                  const el = contentRef.current;
                  if (!el) return;

                  const isScrollingDown = e.deltaY > 0;
                  const isAtBottom =
                    el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
                  const isAtTop = el.scrollTop <= 0;

                  if (
                    (isScrollingDown && !isAtBottom) ||
                    (!isScrollingDown && !isAtTop)
                  ) {
                    e.stopPropagation();
                  }
                }}
                className="p-8 h-[70vh] overflow-y-auto scroll-smooth"
              >
                <div className="space-y-8">
                  {policies.map((policy) => {
                    const PolicyComponent = policy.component;
                    return (
                      <div
                        key={policy.id}
                        ref={(el) => setPolicyRef(policy.id, el)}
                        className={`scroll-mt-4 transition-all duration-300 transform ${
                          policy.id === activePolicy
                            ? getAnimationClasses(policy.id)
                            : ""
                        }`}
                      >
                        <div className="mb-4">
                          <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-amber-500 pl-4">
                            {policy.label}
                          </h2>
                          <div className="w-16 h-1 bg-amber-500 mt-2 ml-4"></div>
                        </div>
                        <div className="prose max-w-none">
                          <PolicyComponent />
                        </div>
                        {policy.id !== policies[policies.length - 1].id && (
                          <div className="mt-8 pt-8 border-b border-gray-200"></div>
                        )}
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
