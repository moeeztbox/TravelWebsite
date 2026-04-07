import { useState } from "react";

const inputClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";
const selectClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";

function Transportation() {
  const [serviceType, setServiceType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [tripType, setTripType] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [extras, setExtras] = useState({
    child: false,
    wheelchair: false,
    flighttrack: false,
  });

  const [touched, setTouched] = useState({
    serviceType: false,
    vehicleType: false,
    tripType: false,
    pickup: false,
    dropoff: false,
    pickupDate: false,
    pickupTime: false,
  });

  const toggleExtra = (key) =>
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));

  const SectionTitle = ({ icon, title }) => (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-xl font-bold text-stone-700 tracking-tight">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent" />
    </div>
  );

  const Counter = ({ label, value, onChange, min = 1 }) => (
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

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFieldValid = (field, value) => {
    if (!touched[field]) return true;
    return value && value.toString().trim() !== "";
  };

  const isFormValid = () => {
    if (
      !serviceType ||
      !vehicleType ||
      !tripType ||
      !pickup ||
      !dropoff ||
      !pickupDate ||
      !pickupTime
    )
      return false;
    return true;
  };

  const serviceOptions = [
    { val: "airport", label: "✈️ Airport Transfer" },
    { val: "intercity", label: "🚌 Makkah ↔ Madinah" },
    { val: "ziyarat", label: "🕌 Ziyarat Tour" },
    { val: "haram", label: "🕋 Haram Shuttle" },
  ];

  const vehicleOptions = [
    "Economy Car (1–3 pax)",
    "SUV / MPV (1–6 pax)",
    "Mini Bus (7–14 pax)",
    "Bus (15–30 pax)",
  ];

  return (
    <div>
      <SectionTitle icon="🚌" title="Transportation" />

      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Service Type <span className="text-amber-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {serviceOptions.map(({ val, label }) => (
            <button
              key={val}
              onClick={() => {
                setServiceType(val);
                setTouched((prev) => ({ ...prev, serviceType: true }));
              }}
              className={`py-3 px-3 rounded-xl border text-sm font-semibold transition text-center ${
                serviceType === val
                  ? "bg-amber-500 text-white border-amber-500 shadow-md"
                  : touched.serviceType && !serviceType
                    ? "border-red-300 bg-red-50 text-stone-600"
                    : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {touched.serviceType && !serviceType && (
          <p className="text-xs text-red-500 mt-1">
            Please select a service type
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Vehicle Type <span className="text-amber-500">*</span>
          </label>
          <select
            className={`${selectClass} ${
              touched.vehicleType && !vehicleType
                ? "border-red-300 bg-red-50"
                : ""
            }`}
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            onBlur={() => handleBlur("vehicleType")}
          >
            <option value="" disabled>
              Select vehicle type
            </option>
            {vehicleOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          {touched.vehicleType && !vehicleType && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Trip Type <span className="text-amber-500">*</span>
          </label>
          <div className="flex gap-5 mt-2.5">
            {[
              { val: "oneway", label: "One Way" },
              { val: "round", label: "Round Trip" },
            ].map(({ val, label }) => (
              <label
                key={val}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div
                  onClick={() => {
                    setTripType(val);
                    setTouched((prev) => ({ ...prev, tripType: true }));
                  }}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    tripType === val
                      ? "border-amber-500 bg-amber-500"
                      : touched.tripType && !tripType
                        ? "border-red-300 bg-red-50"
                        : "border-stone-300 bg-white"
                  }`}
                >
                  {tripType === val && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    tripType === val
                      ? "text-amber-600"
                      : touched.tripType && !tripType
                        ? "text-red-500"
                        : "text-stone-500"
                  }`}
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
          {touched.tripType && !tripType && (
            <p className="text-xs text-red-500 mt-1">Please select trip type</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Pickup Location <span className="text-amber-500">*</span>
          </label>
          <input
            className={`${inputClass} ${
              touched.pickup && !pickup ? "border-red-300 bg-red-50" : ""
            }`}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onBlur={() => handleBlur("pickup")}
            placeholder="Airport, Hotel or Address"
          />
          {touched.pickup && !pickup && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Drop-off Location <span className="text-amber-500">*</span>
          </label>
          <input
            className={`${inputClass} ${
              touched.dropoff && !dropoff ? "border-red-300 bg-red-50" : ""
            }`}
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            onBlur={() => handleBlur("dropoff")}
            placeholder="Hotel or Address"
          />
          {touched.dropoff && !dropoff && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Pickup Date <span className="text-amber-500">*</span>
          </label>
          <input
            type="date"
            className={`${inputClass} ${
              touched.pickupDate && !pickupDate
                ? "border-red-300 bg-red-50"
                : ""
            }`}
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            onBlur={() => handleBlur("pickupDate")}
            min={new Date().toISOString().split("T")[0]}
          />
          {touched.pickupDate && !pickupDate && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Pickup Time <span className="text-amber-500">*</span>
          </label>
          <input
            type="time"
            className={`${inputClass} ${
              touched.pickupTime && !pickupTime
                ? "border-red-300 bg-red-50"
                : ""
            }`}
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            onBlur={() => handleBlur("pickupTime")}
          />
          {touched.pickupTime && !pickupTime && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
        <Counter
          label="Passengers"
          value={passengers}
          onChange={setPassengers}
        />
      </div>

      <div className="h-px bg-gradient-to-r from-amber-100 via-stone-200 to-transparent my-5" />

      <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
        Special Requirements
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-1">
        {[
          { key: "child", label: "Child Seat Required" },
          { key: "wheelchair", label: "Wheelchair Accessible" },
          { key: "flighttrack", label: "Flight Tracking" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => toggleExtra(key)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition shrink-0 ${
                extras[key]
                  ? "bg-amber-500 border-amber-500"
                  : "border-stone-300 bg-white"
              }`}
            >
              {extras[key] && (
                <span className="text-white text-xs font-black">✓</span>
              )}
            </div>
            <span className="text-sm text-stone-600">{label}</span>
          </label>
        ))}
      </div>

      {touched.serviceType &&
        touched.vehicleType &&
        touched.tripType &&
        touched.pickup &&
        touched.dropoff &&
        touched.pickupDate &&
        touched.pickupTime &&
        !isFormValid() && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>Please fill in all required fields before searching.</span>
            </p>
          </div>
        )}

      <button
        disabled={!isFormValid()}
        className={`w-full mt-6 py-4 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg transition-all duration-200 ${
          isFormValid()
            ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-200 cursor-pointer"
            : "bg-stone-300 cursor-not-allowed opacity-60"
        }`}
      >
        🔍 Search Transportation
      </button>
    </div>
  );
}

export default Transportation;
