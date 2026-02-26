import { useState } from "react";

const inputClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";
const selectClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";

export default function VisaSection() {
  const [visaType, setVisaType] = useState("");
  const [nationality, setNationality] = useState("");
  const [duration, setDuration] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [massar, setMassar] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Validation states
  const [touched, setTouched] = useState({
    visaType: false,
    nationality: false,
    duration: false,
    massar: false,
    passengers: false,
  });

  const visaNames = {
    umrah: "Umrah Visa",
    hajj: "Hajj Visa",
    visit: "Visit Visa",
    transit: "Transit Visa",
  };

  const visaFees = {
    umrah: { withMassar: 130, withoutMassar: 90 },
    hajj: { withMassar: 180, withoutMassar: 140 },
    visit: { withMassar: 110, withoutMassar: 75 },
    transit: { withMassar: 70, withoutMassar: 45 },
  };

  const SectionTitle = ({ icon, title }) => (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-xl font-bold text-stone-700 tracking-tight">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent" />
    </div>
  );

  const Counter = ({ label, value, onChange, min = 0 }) => (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
        {label}
      </label>
      <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white h-[46px]">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-11 h-full bg-stone-50 hover:bg-amber-50 text-amber-500 text-xl font-bold"
        >
          −
        </button>
        <span className="flex-1 text-center text-sm font-bold text-stone-700">
          {value}
        </span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-11 h-full bg-stone-50 hover:bg-amber-50 text-amber-500 text-xl font-bold"
        >
          +
        </button>
      </div>
    </div>
  );

  const ResultCard = ({
    title,
    badge,
    price,
    description,
    selected,
    onSelect,
  }) => (
    <div
      onClick={onSelect}
      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 mb-3 ${
        selected
          ? "border-amber-400 bg-amber-50 shadow-md"
          : "border-stone-200 bg-white hover:border-amber-300 hover:shadow-md"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-stone-800 text-lg">{title}</h4>
          <p className="text-sm text-stone-500 mt-1">{description}</p>
          <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-amber-600">{price}</p>
          <p className="text-xs text-stone-400">per person</p>
        </div>
        <button
          className={`px-5 py-2 rounded-lg text-sm font-semibold border transition ${
            selected
              ? "bg-amber-500 text-white border-amber-500"
              : "border-amber-400 text-amber-600 hover:bg-amber-50"
          }`}
        >
          {selected ? "✓ Selected" : "Select"}
        </button>
      </div>
    </div>
  );

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFieldValid = (field, value) => {
    if (!touched[field]) return true;
    return value && value.toString().trim() !== "";
  };

  const hasPassengers = () => {
    return adults > 0 || children > 0 || infants > 0;
  };

  const isFormValid = () => {
    if (!visaType || !nationality || !duration || !massar) return false;
    if (!hasPassengers()) return false;
    return true;
  };

  const handleSearch = () => {
    if (isFormValid()) {
      setShowResults(true);
    }
  };

  const totalPax = adults + children + infants;
  const feePerPerson =
    massar === "with"
      ? visaFees[visaType]?.withMassar || 0
      : visaFees[visaType]?.withoutMassar || 0;
  const totalPrice = feePerPerson * totalPax;

  // Passenger summary for display
  const passengerSummary = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
    if (children > 0)
      parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? "s" : ""}`);

    if (parts.length === 0) return "No passengers selected";
    return parts.join(", ");
  };

  return (
    <div>
      <SectionTitle icon="📋" title="Visa Application" />

      {/* Visa Type / Nationality / Duration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Visa Type <span className="text-amber-500">*</span>
          </label>
          <select
            className={`${selectClass} ${
              touched.visaType && !visaType ? "border-red-300 bg-red-50" : ""
            }`}
            value={visaType}
            onChange={(e) => setVisaType(e.target.value)}
            onBlur={() => handleBlur("visaType")}
          >
            <option value="" disabled>
              Select visa type
            </option>
            {Object.entries(visaNames).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          {touched.visaType && !visaType && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Nationality <span className="text-amber-500">*</span>
          </label>
          <select
            className={`${selectClass} ${
              touched.nationality && !nationality
                ? "border-red-300 bg-red-50"
                : ""
            }`}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            onBlur={() => handleBlur("nationality")}
          >
            <option value="" disabled>
              Select nationality
            </option>
            {["Pakistani", "Indian", "Bangladeshi", "Egyptian", "Other"].map(
              (n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ),
            )}
          </select>
          {touched.nationality && !nationality && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Duration of Stay <span className="text-amber-500">*</span>
          </label>
          <select
            className={`${selectClass} ${
              touched.duration && !duration ? "border-red-300 bg-red-50" : ""
            }`}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            onBlur={() => handleBlur("duration")}
          >
            <option value="" disabled>
              Select duration
            </option>
            {["15 Days", "30 Days", "45 Days", "90 Days"].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {touched.duration && !duration && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-amber-100 via-stone-200 to-transparent my-5" />

      {/* Passenger Counters - Now with validation */}
      <div className="mb-2">
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Passengers <span className="text-amber-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <Counter label="Adults" value={adults} onChange={setAdults} min={0} />
          <Counter label="Children" value={children} onChange={setChildren} />
          <Counter label="Infants" value={infants} onChange={setInfants} />
        </div>
        {touched.passengers && !hasPassengers() && (
          <p className="text-xs text-red-500 -mt-3 mb-2">
            At least one passenger required
          </p>
        )}
        <p className="text-xs text-stone-400 mt-1">{passengerSummary()}</p>
      </div>

      <div className="h-px bg-gradient-to-r from-amber-100 via-stone-200 to-transparent my-5" />

      {/* Massar Selection */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Massar Registration <span className="text-amber-500">*</span>
        </label>
        <div className="flex gap-3">
          {[
            { val: "with", label: "✅ With Massar" },
            { val: "without", label: "❌ Without Massar" },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => {
                setMassar(val);
                setTouched((prev) => ({ ...prev, massar: true }));
              }}
              className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition ${
                massar === val
                  ? "bg-amber-500 text-white border-amber-500 shadow"
                  : touched.massar && !massar
                    ? "border-red-300 bg-red-50 text-stone-600"
                    : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {touched.massar && !massar && (
          <p className="text-xs text-red-500 mt-1">
            Please select Massar option
          </p>
        )}
        <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2 items-start">
          <span className="text-base shrink-0">ℹ️</span>
          <p className="text-xs text-stone-500 leading-relaxed">
            Massar is Saudi Arabia's pilgrim tracking system. It is mandatory
            for all Hajj pilgrims.
          </p>
        </div>
      </div>

      {/* Validation Summary */}
      {touched.visaType &&
        touched.nationality &&
        touched.duration &&
        touched.massar &&
        touched.passengers &&
        !isFormValid() && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>Please fill in all required fields before searching.</span>
            </p>
          </div>
        )}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={!isFormValid()}
        className={`w-full mt-5 py-4 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg transition-all duration-200 ${
          isFormValid()
            ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-200 cursor-pointer"
            : "bg-stone-300 cursor-not-allowed opacity-60"
        }`}
      >
        🔍 Search Visa Options
      </button>

      {/* Visa Results - Only shown after search when form is valid */}
      {showResults && isFormValid() && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-stone-700">
              Available Visa Options
            </h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
              2 options found
            </span>
          </div>

          {/* Standard Visa Option */}
          <ResultCard
            title={`${visaNames[visaType]} - Standard`}
            description={`For ${nationality} travelers · ${duration} stay · ${totalPax} passenger${totalPax > 1 ? "s" : ""}`}
            badge={massar === "with" ? "With Massar ✓" : "Without Massar"}
            price={`$${visaFees[visaType][massar === "with" ? "withMassar" : "withoutMassar"] * totalPax}`}
          />

          {/* Premium Visa Option */}
          <ResultCard
            title={`${visaNames[visaType]} - Premium`}
            description={`Fast track processing · Priority support · ${duration} stay`}
            badge={
              massar === "with"
                ? "With Massar + Priority"
                : "Priority Processing"
            }
            price={`$${(visaFees[visaType][massar === "with" ? "withMassar" : "withoutMassar"] + 30) * totalPax}`}
          />

          {/* Summary Note */}
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm text-blue-800 flex items-center gap-2">
              <span>ℹ️</span>
              <span>
                Showing sample visa options. Actual prices and availability may
                vary.
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
