import { useState, useRef, useEffect } from "react";
import { useFlightSearch } from "../../Hooks/useFlightSearch";
import LocationInput from "../../Services/AmadeusApi/LocationInput";

const inputClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";
const selectClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";

export default function FlightsSection() {
  const [tripType, setTripType] = useState("round");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depDate, setDepDate] = useState("");
  const [retDate, setRetDate] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState("");
  const [airline, setAirline] = useState("");

  const {
    flights,
    loading,
    error,
    selectedFlight,
    searchFlights,
    selectFlight,
    clearResults,
  } = useFlightSearch();

  const [touched, setTouched] = useState({
    from: false,
    to: false,
    depDate: false,
    retDate: false,
    cabinClass: false,
    airline: false,
    passengers: false,
  });

  const [passengerOpen, setPassengerOpen] = useState(false);
  const passengerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (passengerRef.current && !passengerRef.current.contains(e.target)) {
        setPassengerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const swapCities = () => {
    setFrom(to);
    setTo(from);
    clearResults();
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const hasPassengers = () => {
    return adults > 0 || children > 0 || infants > 0;
  };

  const isFormValid = () => {
    if (!from || !to || !depDate || !cabinClass || !airline) return false;
    if (tripType === "round" && !retDate) return false;
    if (!hasPassengers()) return false;
    return true;
  };

  const handleSearch = async () => {
    if (!isFormValid()) return;

    const extractCode = (locationString) => {
      const match = locationString.match(/\(([^)]+)\)/);
      return match ? match[1] : locationString;
    };

    await searchFlights({
      from: extractCode(from),
      to: extractCode(to),
      depDate,
      retDate,
      tripType,
      adults,
      children,
      infants,
      cabinClass,
      airline,
    });
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

  const passengerSummary = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
    if (children > 0)
      parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? "s" : ""}`);

    if (parts.length === 0) return "Select passengers";
    return parts.join(", ");
  };

  const ResultCard = ({ flight, selected, onSelect }) => (
    <div
      onClick={() => onSelect(flight)}
      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 mb-3 ${
        selected
          ? "border-amber-400 bg-amber-50 shadow-md"
          : "border-stone-200 bg-white hover:border-amber-300 hover:shadow-md"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={flight.airline.logo}
              alt={flight.airline.name}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = flight.airline.fallbackLogo;
              }}
            />
            <div>
              <h4 className="font-bold text-stone-800">
                {flight.airline.name}
              </h4>
              <p className="text-xs text-stone-400">{flight.flightNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="text-center">
              <p className="text-lg font-bold text-stone-700">
                {flight.departure.time.time}
              </p>
              <p className="text-xs text-stone-400">
                {flight.departure.airport}
              </p>
              {flight.departure.terminal !== "N/A" && (
                <p className="text-xs text-stone-400">
                  Terminal {flight.departure.terminal}
                </p>
              )}
            </div>

            <div className="flex-1 text-center">
              <p className="text-xs text-stone-400">{flight.duration}</p>
              <div className="relative h-px bg-stone-200 my-2">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-amber-500">
                  ✈️
                </span>
              </div>
              <p className="text-xs text-stone-400">{flight.stops.text}</p>
              {flight.stops.airports.length > 0 && (
                <p className="text-xs text-stone-400">
                  via {flight.stops.airports.join(" → ")}
                </p>
              )}
            </div>

            <div className="text-center">
              <p className="text-lg font-bold text-stone-700">
                {flight.arrival.time.time}
              </p>
              <p className="text-xs text-stone-400">{flight.arrival.airport}</p>
              {flight.arrival.terminal !== "N/A" && (
                <p className="text-xs text-stone-400">
                  Terminal {flight.arrival.terminal}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <span className="text-xs bg-stone-100 px-2 py-1 rounded-full">
              {flight.cabinClass}
            </span>
            <span className="text-xs bg-stone-100 px-2 py-1 rounded-full">
              {flight.baggage}
            </span>
          </div>
        </div>

        <div className="text-right min-w-[120px]">
          <p className="text-xs text-stone-400">Starting from</p>
          <p className="text-2xl font-bold text-amber-600">
            {flight.price.currency} {flight.price.amount.toLocaleString()}
          </p>
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

  return (
    <div>
      <SectionTitle icon="✈️" title="Flight Search" />

      <div className="flex gap-6 mb-5">
        {[
          { val: "round", label: "Round Trip" },
          { val: "oneway", label: "One Way" },
          { val: "multi", label: "Multi-City" },
        ].map(({ val, label }) => (
          <label key={val} className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => {
                setTripType(val);
                clearResults();
              }}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                tripType === val
                  ? "border-amber-500 bg-amber-500"
                  : "border-stone-300 bg-white"
              }`}
            >
              {tripType === val && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span
              className={`text-sm font-medium ${tripType === val ? "text-amber-600" : "text-stone-500"}`}
            >
              {label}
            </span>
          </label>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <LocationInput
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                clearResults();
              }}
              onBlur={() => handleBlur("from")}
              placeholder="e.g., Lahore, Medinah, Jeddah"
              label="From"
              error={touched.from && !from}
              touched={touched.from}
              inputClass={inputClass}
            />
            {touched.from && !from && (
              <p className="text-xs text-red-500 mt-1">Required field</p>
            )}
          </div>

          <button
            onClick={swapCities}
            disabled={!from || !to}
            className={`h-[46px] w-10 rounded-xl border text-lg flex items-center justify-center transition mb-[1px] ${
              from && to
                ? "bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100"
                : "bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed"
            }`}
          >
            ⇄
          </button>

          <div className="flex-1 min-w-[200px]">
            <LocationInput
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                clearResults();
              }}
              onBlur={() => handleBlur("to")}
              placeholder="e.g., Jeddah, Makkah, Medinah"
              label="To"
              error={touched.to && !to}
              touched={touched.to}
              inputClass={inputClass}
            />
            {touched.to && !to && (
              <p className="text-xs text-red-500 mt-1">Required field</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
              Departure Date <span className="text-amber-500">*</span>
            </label>
            <input
              type="date"
              className={`${inputClass} ${
                touched.depDate && !depDate ? "border-red-300 bg-red-50" : ""
              }`}
              value={depDate}
              onChange={(e) => {
                setDepDate(e.target.value);
                clearResults();
              }}
              onBlur={() => handleBlur("depDate")}
            />
            {touched.depDate && !depDate && (
              <p className="text-xs text-red-500 mt-1">Required field</p>
            )}
          </div>

          {tripType === "round" && (
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
                Return Date <span className="text-amber-500">*</span>
              </label>
              <input
                type="date"
                className={`${inputClass} ${
                  touched.retDate && !retDate ? "border-red-300 bg-red-50" : ""
                }`}
                value={retDate}
                onChange={(e) => {
                  setRetDate(e.target.value);
                  clearResults();
                }}
                onBlur={() => handleBlur("retDate")}
              />
              {touched.retDate && !retDate && (
                <p className="text-xs text-red-500 mt-1">Required field</p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
       
          <div className="flex-1 min-w-[200px] relative" ref={passengerRef}>
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
              Passengers <span className="text-amber-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setPassengerOpen(!passengerOpen);
                setTouched((prev) => ({ ...prev, passengers: true }));
              }}
              className={`w-full bg-white border rounded-xl py-3 px-4 text-stone-700 text-sm text-left flex items-center justify-between hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                touched.passengers && !hasPassengers()
                  ? "border-red-300 bg-red-50"
                  : "border-stone-200"
              }`}
            >
              <span className={!hasPassengers() ? "text-stone-400" : ""}>
                {passengerSummary()}
              </span>
              <span
                className={`text-stone-400 transition-transform ${passengerOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>
            {touched.passengers && !hasPassengers() && (
              <p className="text-xs text-red-500 mt-1">
                At least one passenger required
              </p>
            )}

            {passengerOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-stone-200 rounded-2xl shadow-2xl z-50 p-4">
                <div className="flex items-center justify-between py-3 border-b border-stone-100">
                  <div>
                    <p className="text-sm font-semibold text-stone-700">
                      Adults
                    </p>
                    <p className="text-xs text-stone-400">Age 12+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAdults(Math.max(0, adults - 1))}
                      className="w-8 h-8 rounded-full border border-stone-200 bg-stone-50 hover:bg-amber-50 text-amber-500 font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-stone-700">
                      {adults}
                    </span>
                    <button
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full border border-stone-200 bg-stone-50 hover:bg-amber-50 text-amber-500 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-stone-100">
                  <div>
                    <p className="text-sm font-semibold text-stone-700">
                      Children
                    </p>
                    <p className="text-xs text-stone-400">Age 2–11</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full border border-stone-200 bg-stone-50 hover:bg-amber-50 text-amber-500 font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-stone-700">
                      {children}
                    </span>
                    <button
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-full border border-stone-200 bg-stone-50 hover:bg-amber-50 text-amber-500 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-700">
                      Infants
                    </p>
                    <p className="text-xs text-stone-400">Under 2</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      className="w-8 h-8 rounded-full border border-stone-200 bg-stone-50 hover:bg-amber-50 text-amber-500 font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-stone-700">
                      {infants}
                    </span>
                    <button
                      onClick={() => setInfants(infants + 1)}
                      className="w-8 h-8 rounded-full border border-stone-200 bg-stone-50 hover:bg-amber-50 text-amber-500 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setPassengerOpen(false)}
                  className="w-full mt-3 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition"
                >
                  Done · {adults + children + infants} Passenger
                  {adults + children + infants !== 1 ? "s" : ""}
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
              Cabin Class <span className="text-amber-500">*</span>
            </label>
            <select
              className={`${selectClass} ${
                touched.cabinClass && !cabinClass
                  ? "border-red-300 bg-red-50"
                  : ""
              }`}
              value={cabinClass}
              onChange={(e) => {
                setCabinClass(e.target.value);
                clearResults();
              }}
              onBlur={() => handleBlur("cabinClass")}
            >
              <option value="" disabled>
                Select cabin class
              </option>
              {["Economy", "Business", "First Class"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {touched.cabinClass && !cabinClass && (
              <p className="text-xs text-red-500 mt-1">Required field</p>
            )}
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
              Airline <span className="text-amber-500">*</span>
            </label>
            <select
              className={`${selectClass} ${
                touched.airline && !airline ? "border-red-300 bg-red-50" : ""
              }`}
              value={airline}
              onChange={(e) => {
                setAirline(e.target.value);
                clearResults();
              }}
              onBlur={() => handleBlur("airline")}
            >
              <option value="" disabled>
                Select airline
              </option>
              {[
                "Any Airline",
                "PIA",
                "Saudi Airlines",
                "Emirates",
                "Qatar Airways",
                "Air Arabia",
              ].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            {touched.airline && !airline && (
              <p className="text-xs text-red-500 mt-1">Required field</p>
            )}
          </div>
        </div>
      </div>

      {touched.from &&
        touched.to &&
        touched.depDate &&
        touched.cabinClass &&
        touched.airline &&
        touched.passengers &&
        !isFormValid() && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>Please fill in all required fields before searching.</span>
            </p>
          </div>
        )}

      <button
        onClick={handleSearch}
        disabled={!isFormValid() || loading}
        className={`w-full mt-6 py-4 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
          isFormValid() && !loading
            ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-200 cursor-pointer"
            : "bg-stone-300 cursor-not-allowed opacity-60"
        }`}
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Searching...
          </>
        ) : (
          "🔍 Search Flights"
        )}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600 flex items-center gap-2">
            <span>❌</span>
            {error}
          </p>
        </div>
      )}

      {flights.length > 0 && !loading && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-stone-700">
              Available Flights
            </h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
              {flights.length} flights found
            </span>
          </div>

          {flights.map((flight) => (
            <ResultCard
              key={flight.id}
              flight={flight}
              selected={selectedFlight?.id === flight.id}
              onSelect={selectFlight}
            />
          ))}
        </div>
      )}

      {flights.length === 0 &&
        !loading &&
        !error &&
        touched.from &&
        touched.to && (
          <div className="mt-6 p-8 text-center bg-stone-50 rounded-xl border border-stone-200">
            <p className="text-stone-400">
              No flights found. Try different search criteria.
            </p>
          </div>
        )}
    </div>
  );
}
