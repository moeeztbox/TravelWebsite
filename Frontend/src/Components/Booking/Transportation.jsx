import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  getTransportationOptions,
  createTransportationBooking,
} from "../../Services/transportationService";

const inputClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";
const selectClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";

function filterOptions(options, serviceType, vehicleType) {
  if (!options?.length) return [];
  return options.filter((o) => {
    const s =
      !o.serviceTypes?.length || o.serviceTypes.includes(serviceType);
    const v =
      !o.vehicleTypes?.length || o.vehicleTypes.includes(vehicleType);
    return s && v;
  });
}

function Transportation() {
  const [options, setOptions] = useState([]);
  const [loadingOpts, setLoadingOpts] = useState(true);
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

  const [showResults, setShowResults] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getTransportationOptions();
        if (!cancelled) setOptions(list);
      } catch {
        toast.error("Could not load transportation options");
      } finally {
        if (!cancelled) setLoadingOpts(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-11 h-full bg-stone-50 hover:bg-amber-50 text-amber-500 text-xl font-bold"
        >
          −
        </button>
        <span className="flex-1 text-center text-sm font-bold text-stone-700">
          {value}
        </span>
        <button
          type="button"
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

  const matched = useMemo(
    () => filterOptions(options, serviceType, vehicleType),
    [options, serviceType, vehicleType]
  );

  const handleSearch = () => {
    if (!isFormValid()) {
      Object.keys(touched).forEach((k) =>
        setTouched((p) => ({ ...p, [k]: true }))
      );
      toast.error("Fill all required fields");
      return;
    }
    if (!matched.length) {
      toast.error("No options for this combination — try another vehicle.");
      setShowResults(false);
      return;
    }
    setShowResults(true);
    setSelectedOpt(null);
  };

  const handleBookNow = async () => {
    if (!selectedOpt) {
      toast.error("Select an option first");
      return;
    }
    setSubmitting(true);
    try {
      await createTransportationBooking({
        selectedOption: {
          optionId: selectedOpt.key || selectedOpt._id,
          title: selectedOpt.title,
          description: selectedOpt.description,
        },
        form: {
          serviceType,
          vehicleType,
          tripType,
          pickup,
          dropoff,
          pickupDate,
          pickupTime,
          passengers,
          extras,
        },
      });
      toast.success("Transportation request submitted. Await admin approval.");
      setConfirmOpen(false);
      setShowResults(false);
      setSelectedOpt(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SectionTitle icon="🚌" title="Transportation" />

      {loadingOpts ? (
        <p className="text-sm text-stone-500 mb-4">Loading options…</p>
      ) : null}

      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Service Type <span className="text-amber-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {serviceOptions.map(({ val, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => {
                setServiceType(val);
                setTouched((prev) => ({ ...prev, serviceType: true }));
              }}
              className={`py-3 px-3 rounded-xl border text-sm font-semibold transition text-center ${
                serviceType === val
                  ? "bg-amber-500 text-white border-amber-500 shadow-md"
                  : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Vehicle Type <span className="text-amber-500">*</span>
          </label>
          <select
            className={selectClass}
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
                <button
                  type="button"
                  onClick={() => {
                    setTripType(val);
                    setTouched((prev) => ({ ...prev, tripType: true }));
                  }}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    tripType === val
                      ? "border-amber-500 bg-amber-500"
                      : "border-stone-300 bg-white"
                  }`}
                >
                  {tripType === val ? (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  ) : null}
                </button>
                <span className="text-sm font-medium text-stone-500">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Pickup Location <span className="text-amber-500">*</span>
          </label>
          <input
            className={inputClass}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onBlur={() => handleBlur("pickup")}
            placeholder="Airport, Hotel or Address"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Drop-off Location <span className="text-amber-500">*</span>
          </label>
          <input
            className={inputClass}
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            onBlur={() => handleBlur("dropoff")}
            placeholder="Hotel or Address"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Pickup Date <span className="text-amber-500">*</span>
          </label>
          <input
            type="date"
            className={inputClass}
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            onBlur={() => handleBlur("pickupDate")}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Pickup Time <span className="text-amber-500">*</span>
          </label>
          <input
            type="time"
            className={inputClass}
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            onBlur={() => handleBlur("pickupTime")}
          />
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
            <button
              type="button"
              onClick={() => toggleExtra(key)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition shrink-0 ${
                extras[key]
                  ? "bg-amber-500 border-amber-500"
                  : "border-stone-300 bg-white"
              }`}
            >
              {extras[key] ? (
                <span className="text-white text-xs font-black">✓</span>
              ) : null}
            </button>
            <span className="text-sm text-stone-600">{label}</span>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSearch}
        disabled={!isFormValid()}
        className={`w-full mt-6 py-4 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg transition-all duration-200 ${
          isFormValid()
            ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-200 cursor-pointer"
            : "bg-stone-300 cursor-not-allowed opacity-60"
        }`}
      >
        🔍 Search Transportation
      </button>

      {showResults && matched.length > 0 ? (
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-bold text-stone-800">
            Available options
          </h3>
          {matched.map((o) => {
            const unit = Number(o.priceAmount) || 0;
            const totalPkr = Math.round(unit * passengers);
            return (
            <button
              key={o._id || o.key}
              type="button"
              onClick={() => setSelectedOpt(o)}
              className={`w-full text-left p-5 rounded-2xl border transition ${
                selectedOpt?.key === o.key || selectedOpt?._id === o._id
                  ? "border-amber-400 bg-amber-50 shadow-md"
                  : "border-stone-200 bg-white hover:border-amber-300"
              }`}
            >
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <h4 className="font-bold text-stone-900">{o.title}</h4>
                  <p className="text-sm text-stone-500 mt-1">{o.description}</p>
                  <p className="text-xs text-stone-400 mt-1">
                    PKR {unit.toLocaleString()} per passenger × {passengers}{" "}
                    pax
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-amber-600">
                    PKR {totalPkr.toLocaleString()}
                  </p>
                  <p className="text-xs text-stone-500">total</p>
                </div>
              </div>
            </button>
            );
          })}

          <button
            type="button"
            disabled={!selectedOpt}
            onClick={() => setConfirmOpen(true)}
            className="w-full mt-2 py-3 rounded-xl bg-stone-900 text-white font-semibold disabled:opacity-50"
          >
            Continue to booking
          </button>
        </div>
      ) : null}

      {confirmOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tr-confirm-title"
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-stone-200">
            <h3
              id="tr-confirm-title"
              className="text-lg font-bold text-stone-900"
            >
              Confirm your transportation booking
            </h3>
            <p className="text-sm text-stone-600 mt-2">
              We will send this request to the admin for approval. After
              approval you can pay from your dashboard — no extra documents
              needed.
            </p>
            {selectedOpt ? (
              <div className="mt-4 rounded-xl bg-stone-50 px-3 py-2 text-sm">
                <p className="font-semibold text-stone-800">{selectedOpt.title}</p>
                <p className="text-amber-700 font-medium">
                  PKR{" "}
                  {(
                    Math.round(
                      (Number(selectedOpt.priceAmount) || 0) * passengers
                    )
                  ).toLocaleString()}{" "}
                  ({passengers} pax × PKR{" "}
                  {(Number(selectedOpt.priceAmount) || 0).toLocaleString()})
                </p>
              </div>
            ) : null}
            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-800 font-medium"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold disabled:opacity-60"
                onClick={handleBookNow}
              >
                {submitting ? "Submitting…" : "Book now"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Transportation;
