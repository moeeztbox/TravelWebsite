import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Flight from "../Components/Booking/Flight";
import Hotel from "../Components/Booking/Hotel";
import Visa from "../Components/Booking/Visa";
import Transportation from "../Components/Booking/Transportation";
import { useAuth } from "../Context/AuthContext";
import { ArrowLeft } from "lucide-react";

export default function BookingApp() {
  const [activeTab, setActiveTab] = useState("flights");
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [registerPromptOpen, setRegisterPromptOpen] = useState(false);

  const tabs = [
    { id: "flights", label: "Flights", icon: "✈️" },
    { id: "hotels", label: "Hotels", icon: "🏨" },
    { id: "visa", label: "Visa", icon: "📋" },
    { id: "transport", label: "Transportation", icon: "🚌" },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requested = params.get("tab");
    if (!requested) return;
    if (tabs.some((t) => t.id === requested)) {
      setActiveTab(requested);
    }
  }, [location.search]);

  const openRegisterPrompt = () => setRegisterPromptOpen(true);

  const renderActiveSection = () => {
    switch (activeTab) {
      case "flights":
        return <Flight />;
      case "hotels":
        return (
          <Hotel
            isAuthenticated={isAuthenticated}
            onRequireRegister={openRegisterPrompt}
          />
        );
      case "visa":
        return (
          <Visa
            isAuthenticated={isAuthenticated}
            onRequireRegister={openRegisterPrompt}
          />
        );
      case "transport":
        return (
          <Transportation
            isAuthenticated={isAuthenticated}
            onRequireRegister={openRegisterPrompt}
          />
        );
      default:
        return <Flight />;
    }
  };

  return (
    <div className="min-h-screen mt-34 bg-stone-100">
      {registerPromptOpen ? (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="register-prompt-title"
          onClick={() => setRegisterPromptOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="register-prompt-title"
              className="text-lg sm:text-xl font-bold text-gray-900"
            >
              Please register yourself for booking
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              You can browse booking options, but you need an account to place a
              booking request.
            </p>
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setRegisterPromptOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setRegisterPromptOpen(false);
                  navigate("/register", {
                    state: { from: "/booking" },
                  });
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-500 transition-colors"
              >
                Register yourself
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="max-w-5xl mx-auto px-4 -mt-5 pb-16">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/");
          }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 px-3 py-2 rounded-xl transition mb-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>

        {/* Tab Navigation */}
        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border border-stone-200 mb-5 overflow-x-auto">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                activeTab === id
                  ? "bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-md shadow-amber-200"
                  : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
              }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-6 md:p-8">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}
