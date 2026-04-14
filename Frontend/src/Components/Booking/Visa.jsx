import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useScrollLock } from "../../Hooks/useScrollLock";
import { getVisaOptions, createVisaRequestApi } from "../../Services/visaRequestService";

const inputClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";
const selectClass =
  "w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm transition";

const visaNames = {
  umrah: "Umrah Visa",
  hajj: "Hajj Visa",
  visit: "Visit Visa",
  transit: "Transit Visa",
};

function filterVisaOptions(options, visaType) {
  if (!options?.length || !visaType) return [];
  return options.filter((o) => o.visaTypes?.includes(visaType));
}

export default function VisaSection() {
  const [options, setOptions] = useState([]);
  const [loadingOpts, setLoadingOpts] = useState(true);
  const [visaType, setVisaType] = useState("");
  const [nationality, setNationality] = useState("");
  const [duration, setDuration] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [massar, setMassar] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useScrollLock(confirmOpen);

  const [touched, setTouched] = useState({
    visaType: false,
    nationality: false,
    duration: false,
    massar: false,
    passengers: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getVisaOptions();
        if (!cancelled) setOptions(list);
      } catch {
        toast.error("Could not load visa options");
      } finally {
        if (!cancelled) setLoadingOpts(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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

  const hasPassengers = () => adults > 0 || children > 0 || infants > 0;

  const isFormValid = () => {
    if (!visaType || !nationality || !duration || !massar) return false;
    if (!hasPassengers()) return false;
    return true;
  };

  const handleSearch = () => {
    setTouched((prev) => ({
      ...prev,
      visaType: true,
      nationality: true,
      duration: true,
      massar: true,
      passengers: true,
    }));
    if (!isFormValid()) {
      toast.error("Fill all required fields");
      return;
    }
    const m = filterVisaOptions(options, visaType);
    if (!m.length) {
      toast.error("No visa packages for this type yet.");
      setShowResults(false);
      return;
    }
    setShowResults(true);
    setSelectedOpt(null);
  };

  const totalPax = adults + children + infants;

  const matched = useMemo(
    () => filterVisaOptions(options, visaType),
    [options, visaType]
  );

  const passengerSummary = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
    if (children > 0)
      parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? "s" : ""}`);
    if (parts.length === 0) return "No passengers selected";
    return parts.join(", ");
  };

  const handleBookNow = async () => {
    if (!selectedOpt) {
      toast.error("Select an option");
      return;
    }
    setSubmitting(true);
    try {
      await createVisaRequestApi({
        selectedOption: {
          optionId: selectedOpt.key || selectedOpt._id,
          title: selectedOpt.title,
          description: selectedOpt.description,
          priceLabel: `USD ${selectedOpt.priceAmount * totalPax} total`,
          priceAmount: selectedOpt.priceAmount * totalPax,
          tier: selectedOpt.tier,
        },
        form: {
          visaType,
          nationality,
          duration,
          adults,
          children,
          infants,
          massar,
        },
      });
      toast.success("Visa request submitted. Await admin approval.");
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
      <SectionTitle icon="📋" title="Visa Application" />

      {loadingOpts ? (
        <p className="text-sm text-stone-500 mb-4">Loading options…</p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Visa Type <span className="text-amber-500">*</span>
          </label>
          <select
            className={selectClass}
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
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Nationality <span className="text-amber-500">*</span>
          </label>
          <select
            className={selectClass}
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
              )
            )}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
            Duration of Stay <span className="text-amber-500">*</span>
          </label>
          <select
            className={selectClass}
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
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-amber-100 via-stone-200 to-transparent my-5" />

      <div className="mb-2">
        <label className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Passengers <span className="text-amber-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <Counter label="Adults" value={adults} onChange={setAdults} min={0} />
          <Counter label="Children" value={children} onChange={setChildren} />
          <Counter label="Infants" value={infants} onChange={setInfants} />
        </div>
        <p className="text-xs text-stone-400 mt-1">{passengerSummary()}</p>
      </div>

      <div className="h-px bg-gradient-to-r from-amber-100 via-stone-200 to-transparent my-5" />

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
              type="button"
              onClick={() => {
                setMassar(val);
                setTouched((prev) => ({ ...prev, massar: true }));
              }}
              className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition ${
                massar === val
                  ? "bg-amber-500 text-white border-amber-500 shadow"
                  : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
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

      {showResults && matched.length > 0 && isFormValid() ? (
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-stone-700">
              Available Visa Options
            </h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
              {matched.length} option{matched.length !== 1 ? "s" : ""}
            </span>
          </div>
          {matched.map((o) => (
            <button
              key={o._id || o.key}
              type="button"
              onClick={() => setSelectedOpt(o)}
              className={`w-full text-left p-5 rounded-2xl border cursor-pointer transition mb-3 ${
                selectedOpt?.key === o.key || selectedOpt?._id === o._id
                  ? "border-amber-400 bg-amber-50 shadow-md"
                  : "border-stone-200 bg-white hover:border-amber-300"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-stone-800 text-lg">{o.title}</h4>
                  <p className="text-sm text-stone-500 mt-1">{o.description}</p>
                  <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full capitalize">
                    {o.tier || "standard"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-600">
                    USD {o.priceAmount * totalPax}
                  </p>
                  <p className="text-xs text-stone-400">
                    {totalPax} traveller{totalPax !== 1 ? "s" : ""} ·{" "}
                    {visaNames[visaType]}
                  </p>
                </div>
              </div>
            </button>
          ))}

          <button
            type="button"
            disabled={!selectedOpt}
            onClick={() => setConfirmOpen(true)}
            className="w-full py-3 rounded-xl bg-stone-900 text-white font-semibold disabled:opacity-50"
          >
            Continue to request
          </button>
        </div>
      ) : null}

      {confirmOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-stone-200">
            <h3 className="text-lg font-bold text-stone-900">
              Confirm your visa request
            </h3>
            <p className="text-sm text-stone-600 mt-2">
              Admin will review your request. After approval you can pay from
              your dashboard — receipt only, no extra documents required.
            </p>
            {selectedOpt ? (
              <div className="mt-4 rounded-xl bg-stone-50 px-3 py-2 text-sm">
                <p className="font-semibold text-stone-800">{selectedOpt.title}</p>
                <p className="text-amber-700 font-medium">
                  Est. USD {selectedOpt.priceAmount * totalPax} for {totalPax}{" "}
                  traveller{totalPax !== 1 ? "s" : ""}
                </p>
              </div>
            ) : null}
            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-xl border border-stone-300"
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
