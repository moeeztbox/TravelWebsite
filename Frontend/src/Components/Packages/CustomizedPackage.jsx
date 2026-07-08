import { useMemo, useState, useRef, useEffect } from "react";
import { api, formatAxiosError } from "../../Services/authService";
import { useAuth } from "../../Context/AuthContext";
import { sanitizeDigits, validateCommonFields } from "../../utils/formValidation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Hotel,
  Plus,
  Minus,
  Info,
  ChevronDown,
  Sparkles,
  Send,
  Star,
} from "lucide-react";

function formatPkr(n) {
  const num = Number(n) || 0;
  return `PKR ${num.toLocaleString()}`;
}

function clampInt(value, min, max) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function CustomizePackage() {
  const { user, isAuthenticated } = useAuth();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({});

  // Passenger counts state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [form, setForm] = useState(() => ({
    fullName:
      [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() || "",
    city: user?.city || "",
    phone: user?.phone || "",
    startDate: "",
    arrivalDate: "",
    hotelCategory: 3,
    email: user?.email || "",
    packageType: "customize",
    notes: "",
  }));

  // Handle click outside passenger dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPassengerDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalPassengers = useMemo(() => {
    return adults + children + infants;
  }, [adults, children, infants]);

  const passengerSummaryString = useMemo(() => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
    if (children > 0) parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? "s" : ""}`);
    return parts.join(", ") || "0 Passengers";
  }, [adults, children, infants]);

  const estimate = useMemo(() => {
    const base = 185000; // roughly matches Economy Umrah price
    const pax = clampInt(totalPassengers, 0, 100);
    const cat = clampInt(form.hotelCategory, 1, 5);
    const hotelMultiplier =
      cat === 1
        ? 0.9
        : cat === 2
          ? 1
          : cat === 3
            ? 1.15
            : cat === 4
              ? 1.35
              : 1.6;
    const total = Math.round(base * hotelMultiplier * pax);
    return { base, passengers: pax, hotelMultiplier, total };
  }, [totalPassengers, form.hotelCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((p) => ({ ...p, phone: sanitizeDigits(value) }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setErrors({});

    // Require all fields except notes
    if (!form.fullName.trim()) {
      setStatus({ type: "error", message: "Full Name is required." });
      return;
    }
    if (!form.email.trim()) {
      setStatus({ type: "error", message: "Email Address is required." });
      return;
    }
    if (!form.phone.trim()) {
      setStatus({ type: "error", message: "Phone Number is required." });
      return;
    }
    if (!form.city.trim()) {
      setStatus({ type: "error", message: "City is required." });
      return;
    }
    if (!form.startDate) {
      setStatus({ type: "error", message: "Departure Date is required." });
      return;
    }
    if (!form.arrivalDate) {
      setStatus({ type: "error", message: "Arrival Date is required." });
      return;
    }

    if (new Date(form.arrivalDate) < new Date(form.startDate)) {
      setStatus({ type: "error", message: "Arrival date (return date) cannot be before departure date." });
      return;
    }

    if (totalPassengers <= 0) {
      setStatus({ type: "error", message: "Please select at least 1 passenger to continue." });
      return;
    }

    if (totalPassengers > 100) {
      setStatus({ type: "error", message: "Total passengers cannot exceed 100." });
      return;
    }

    const commonErrors = validateCommonFields({
      name: form.fullName,
      email: form.email,
      phone: form.phone,
    });
    if (Object.keys(commonErrors).length > 0) {
      setErrors(commonErrors);
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setSending(true);
    try {
      const breakdown = `${adults} Adults, ${children} Children, ${infants} Infants`;
      const originalNotes = form.notes.trim();

      // Format details for the email message body
      const emailMessage = `
--- Custom Package Inquiry ---
Full Name: ${form.fullName.trim()}
Email Address: ${form.email.trim()}
Phone Number: ${form.phone.trim()}
City: ${form.city.trim()}

Package Type: ${form.packageType === "group" ? "Group Package" : "Customize Package"}
Departure Date (Arrival at Destination): ${form.startDate}
Arrival Date (Return Date): ${form.arrivalDate}

Passengers Breakdown:
- Adults: ${adults}
- Children: ${children}
- Infants: ${infants}
Total Passengers: ${totalPassengers}

Hotel Category Preference: ${form.hotelCategory} Star

Additional Request:
${originalNotes || "No additional request."}

Estimated Package Price: ${formatPkr(estimate.total)}
`;

      // Call the contact inquiry email sending endpoint directly
      await api.post("/contact", {
        type: "inquiry",
        userEmail: form.email.trim(),
        userName: form.fullName.trim(),
        message: emailMessage,
      });

      setStatus({ type: "success", message: "Your email has been sent to our company." });
      setAdults(1);
      setChildren(0);
      setInfants(0);
      setForm((p) => ({
        ...p,
        startDate: "",
        arrivalDate: "",
        hotelCategory: 3,
        packageType: "customize",
        notes: "",
      }));
    } catch (err) {
      setStatus({ type: "error", message: formatAxiosError(err) });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-16 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        {/* Top Header Card */}
        <div className="relative bg-gradient-to-r from-yellow-600 to-yellow-500 p-8 text-center text-white select-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/20 via-transparent to-transparent opacity-60"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md p-3.5 rounded-2xl mb-4 border border-white/20">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Want to Customize Your Package?
            </h2>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-8">
          {status.message ? (
            <div
              className={`flex items-start gap-3 text-sm rounded-2xl p-4 border animate-in fade-in slide-in-from-top-2 duration-200 ${
                status.type === "success"
                  ? "text-green-800 bg-green-50/80 border-green-200"
                  : "text-red-800 bg-red-50/80 border-red-200"
              }`}
              role="alert"
            >
              <Info className={`w-5 h-5 shrink-0 mt-0.5 ${status.type === "success" ? "text-green-600" : "text-red-600"}`} />
              <div>
                <span className="font-bold">{status.type === "success" ? "Success!" : "Notice"}</span>
                <p className="mt-0.5 font-medium leading-relaxed">{status.message}</p>
              </div>
            </div>
          ) : null}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Muhammad Ali"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`w-full border rounded-xl pl-11 pr-4 py-3 bg-white text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-yellow-500 focus:ring-yellow-500/20 ${
                    errors.name ? "border-red-400 focus:ring-red-200" : "border-gray-300 hover:border-gray-400"
                  }`}
                  required
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. ali@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border rounded-xl pl-11 pr-4 py-3 bg-white text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-yellow-500 focus:ring-yellow-500/20 ${
                    errors.email ? "border-red-400 focus:ring-red-200" : "border-gray-300 hover:border-gray-400"
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-semibold mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Phone className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. 03001234567"
                  value={form.phone}
                  onChange={handleChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`w-full border rounded-xl pl-11 pr-4 py-3 bg-white text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-yellow-500 focus:ring-yellow-500/20 ${
                    errors.phone ? "border-red-400 focus:ring-red-200" : "border-gray-300 hover:border-gray-400"
                  }`}
                  required
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs font-semibold mt-1">{errors.phone}</p>
              )}
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Lahore"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 hover:border-gray-400 rounded-xl pl-11 pr-4 py-3 bg-white text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500/20"
                  required
                />
              </div>
            </div>

            {/* Package Type (Segment Control Tab) */}
            <div className="space-y-1.5">
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                Package Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 p-1.5 bg-gray-100 rounded-xl select-none">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, packageType: "customize" }))}
                  className={`py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                    form.packageType === "customize"
                      ? "bg-white text-yellow-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Customize Package
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, packageType: "group" }))}
                  className={`py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                    form.packageType === "group"
                      ? "bg-white text-yellow-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Group Package
                </button>
              </div>
            </div>

            {/* Passengers Selector (Airline style) */}
            <div className="relative" ref={dropdownRef}>
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2 mb-1.5">
                Passengers <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                className="w-full flex items-center justify-between border border-gray-300 hover:border-gray-400 rounded-xl px-4 py-3 bg-white text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500/20"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">
                    {passengerSummaryString}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showPassengerDropdown ? "transform rotate-180" : ""}`} />
              </button>

              {showPassengerDropdown && (
                <div className="absolute left-0 right-0 z-30 mt-2 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-gray-100 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">Adults</p>
                      <p className="text-xs text-gray-500">Age 9+ years</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(0, adults - 1))}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition active:scale-90 ${
                          adults <= 0 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        disabled={adults <= 0}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-bold text-gray-800">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition active:scale-90"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">Children</p>
                      <p className="text-xs text-gray-500">Age 2–9 years</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition active:scale-90 ${
                          children <= 0 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        disabled={children <= 0}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-bold text-gray-800">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition active:scale-90"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">Infants</p>
                      <p className="text-xs text-gray-500">Age 0–2 years</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setInfants(Math.max(0, infants - 1))}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition active:scale-90 ${
                          infants <= 0 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        disabled={infants <= 0}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-bold text-gray-800">{infants}</span>
                      <button
                        type="button"
                        onClick={() => setInfants(infants + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition active:scale-90"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Done Button */}
                  <div className="pt-2.5 border-t border-gray-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowPassengerDropdown(false)}
                      className="text-xs font-extrabold text-yellow-600 hover:text-yellow-700 px-3.5 py-2 rounded-lg hover:bg-yellow-50 transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Departure Date */}
            <div className="space-y-1.5">
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                Departure Date <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 hover:border-gray-400 rounded-xl pl-11 pr-4 py-3 bg-white text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500/20"
                  required
                />
              </div>
            </div>

            {/* Arrival Date */}
            <div className="space-y-1.5">
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                Arrival Date (Return Date) <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  name="arrivalDate"
                  value={form.arrivalDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 hover:border-gray-400 rounded-xl pl-11 pr-4 py-3 bg-white text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500/20"
                  required
                />
              </div>
            </div>

            {/* Hotel Type Cards */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                <Hotel className="w-4 h-4 text-yellow-600" />
                Hotel Category Preference <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 select-none">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, hotelCategory: star }))}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 ${
                      form.hotelCategory === star
                        ? "border-yellow-500 bg-yellow-50/20 text-yellow-700 shadow-md scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300 bg-white text-gray-500 hover:text-gray-700 hover:scale-[1.01]"
                    }`}
                  >
                    <div className="flex gap-0.5 mb-1.5 justify-center">
                      {Array.from({ length: star }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <span className="text-xs font-extrabold">{star} Star</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Request Notes */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
                Additional Request
              </label>
              <textarea
                name="notes"
                placeholder="Write any additional requirements, preferences, or comments..."
                value={form.notes}
                onChange={handleChange}
                className="w-full border border-gray-300 hover:border-gray-400 rounded-xl px-4 py-3 bg-white text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500/20"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={sending}
              className="md:col-span-2 w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 text-base"
            >
              {sending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Request...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Request Custom Package
                </>
              )}
            </button>

            {/* Informational Note */}
            <div className="md:col-span-2 flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <Info className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Note:</strong> Our team will review your request and contact you as soon as possible via your provided email address or phone number.
              </p>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomizePackage;
