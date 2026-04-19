import { useState, useEffect, useRef } from "react";
import AmadeusService from "./AmadeusService";

const LocationInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  label,
  inputClass,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search locations as user types
  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    onChange(e); // Update parent component

    if (inputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    console.log("Searching for:", inputValue);
    const results = await AmadeusService.searchLocations(inputValue);
    console.log("Results received:", results);
    setSuggestions(results);
    setLoading(false);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    // Set the display value (with IATA code in parentheses)
    onChange({ target: { value: suggestion.label.split(" - ")[0] } });
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
        {label} <span className="text-amber-500">*</span>
      </label>
      <input
        type="text"
        className={`${inputClass} ${touched && error ? "border-red-300 bg-red-50" : ""}`}
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete="off"
      />

      {/* Loading indicator */}
      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-stone-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-amber-50 cursor-pointer border-b border-stone-100 last:border-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="font-medium text-stone-700">
                {suggestion.label}
              </div>
              <div className="text-xs text-stone-400">
                {suggestion.type === "AIRPORT" ? "Airport" : "City"} ·{" "}
                {suggestion.country}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions &&
        suggestions.length === 0 &&
        value.length >= 2 &&
        !loading && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-stone-200 rounded-xl shadow-2xl p-4 text-center text-stone-400">
            No cities or airports found
          </div>
        )}

      {touched && error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default LocationInput;
