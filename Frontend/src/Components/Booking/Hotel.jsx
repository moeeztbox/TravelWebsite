import { useState } from "react";

const inputClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";
const selectClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";

function Hotel() {
  const [city, setCity] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [stars, setStars] = useState("");
  const [roomType, setRoomType] = useState("");
  const [meal, setMeal] = useState("");

  // Validation states
  const [touched, setTouched] = useState({
    city: false,
    checkin: false,
    checkout: false,
    stars: false,
    roomType: false,
    meal: false,
  });

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
    if (!city || !checkin || !checkout || !stars || !roomType || !meal)
      return false;

    // Check if checkout date is after checkin date
    if (checkin && checkout && new Date(checkout) <= new Date(checkin))
      return false;

    return true;
  };

  return (
    <div>
      <SectionTitle icon="🏨" title="Hotel Search" />

      {/* City Selection */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
          City <span className="text-amber-500">*</span>
        </label>
        <div className="flex gap-3">
          {[
            { val: "makkah", label: "🕋 Makkah" },
            { val: "madinah", label: "🕌 Madinah" },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => {
                setCity(val);
                setTouched((prev) => ({ ...prev, city: true }));
              }}
              className={`px-6 py-2.5 rounded-xl border text-sm font-semibold transition ${
                city === val
                  ? "bg-amber-500 text-white border-amber-500 shadow-md"
                  : touched.city && !city
                    ? "border-red-300 bg-red-50 text-stone-600"
                    : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {touched.city && !city && (
          <p className="text-xs text-red-500 mt-1">Please select a city</p>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-amber-100 via-stone-200 to-transparent my-5" />

      {/* Dates & Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Check-in <span className="text-amber-500">*</span>
          </label>
          <input
            type="date"
            className={`${inputClass} ${
              touched.checkin && !checkin ? "border-red-300 bg-red-50" : ""
            }`}
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            onBlur={() => handleBlur("checkin")}
          />
          {touched.checkin && !checkin && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Check-out <span className="text-amber-500">*</span>
          </label>
          <input
            type="date"
            className={`${inputClass} ${
              touched.checkout && !checkout ? "border-red-300 bg-red-50" : ""
            }`}
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            onBlur={() => handleBlur("checkout")}
            min={checkin}
          />
          {touched.checkout && !checkout && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
          {touched.checkout &&
            checkout &&
            checkin &&
            new Date(checkout) <= new Date(checkin) && (
              <p className="text-xs text-red-500 mt-1">
                Check-out must be after check-in
              </p>
            )}
        </div>
        <Counter label="Rooms" value={rooms} onChange={setRooms} min={1} />
        <Counter label="Guests" value={guests} onChange={setGuests} min={1} />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Star Rating <span className="text-amber-500">*</span>
          </label>
          <select
            className={`${selectClass} ${
              touched.stars && !stars ? "border-red-300 bg-red-50" : ""
            }`}
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            onBlur={() => handleBlur("stars")}
          >
            <option value="" disabled>
              Select star rating
            </option>
            {["Any Rating", "5 Star ★★★★★", "4 Star ★★★★", "3 Star ★★★"].map(
              (s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ),
            )}
          </select>
          {touched.stars && !stars && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Room Type <span className="text-amber-500">*</span>
          </label>
          <select
            className={`${selectClass} ${
              touched.roomType && !roomType ? "border-red-300 bg-red-50" : ""
            }`}
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            onBlur={() => handleBlur("roomType")}
          >
            <option value="" disabled>
              Select room type
            </option>
            {[
              "Any Room",
              "Standard Room",
              "Deluxe Room",
              "Suite",
              "Family Room",
            ].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {touched.roomType && !roomType && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Meal Plan <span className="text-amber-500">*</span>
          </label>
          <select
            className={`${selectClass} ${
              touched.meal && !meal ? "border-red-300 bg-red-50" : ""
            }`}
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            onBlur={() => handleBlur("meal")}
          >
            <option value="" disabled>
              Select meal plan
            </option>
            {[
              "Room Only",
              "Breakfast Included",
              "Half Board",
              "Full Board",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {touched.meal && !meal && (
            <p className="text-xs text-red-500 mt-1">Required field</p>
          )}
        </div>
      </div>

      {/* Validation Summary */}
      {touched.city &&
        touched.checkin &&
        touched.checkout &&
        touched.stars &&
        touched.roomType &&
        touched.meal &&
        !isFormValid() && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>
                Please fill in all required fields correctly before searching.
              </span>
            </p>
          </div>
        )}

      {/* Search Button */}
      <button
        disabled={!isFormValid()}
        className={`w-full mt-6 py-4 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg transition-all duration-200 ${
          isFormValid()
            ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-200 cursor-pointer"
            : "bg-stone-300 cursor-not-allowed opacity-60"
        }`}
      >
        🔍 Search Hotels
      </button>
    </div>
  );
}

export default Hotel;
