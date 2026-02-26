import { useState } from "react";
import Flight from "../Components/Booking/Flight";
import Hotel from "../Components/Booking/Hotel";
import Visa from "../Components/Booking/Visa";
import Transportation from "../Components/Booking/Transportation";

export default function BookingApp() {
  const [activeTab, setActiveTab] = useState("flights");

  const tabs = [
    { id: "flights", label: "Flights", icon: "✈️" },
    { id: "hotels", label: "Hotels", icon: "🏨" },
    { id: "visa", label: "Visa", icon: "📋" },
    { id: "transport", label: "Transportation", icon: "🚌" },
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case "flights":
        return <Flight />;
      case "hotels":
        return <Hotel />;
      case "visa":
        return <Visa />;
      case "transport":
        return <Transportation />;
      default:
        return <Flight />;
    }
  };

  return (
    <div className="min-h-screen mt-34 bg-stone-100">
      <div className="max-w-5xl mx-auto px-4 -mt-5 pb-16">
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

        {/* Active Section Card */}
        <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-6 md:p-8">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}
