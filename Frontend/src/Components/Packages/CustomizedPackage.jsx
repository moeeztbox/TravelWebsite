import { useMemo, useState } from "react";
import { api, formatAxiosError } from "../../Services/authService";
import { useAuth } from "../../Context/AuthContext";

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
  const [form, setForm] = useState(() => ({
    fullName:
      [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() || "",
    city: user?.city || "",
    phone: user?.phone || "",
    passengers: 1,
    startDate: "",
    hotelCategory: 3,
    email: user?.email || "",
    packageType: "customize",
    notes: "",
  }));

  const estimate = useMemo(() => {
    // Simple, predictable pricing (you can tweak later)
    const base = 185000; // roughly matches your Economy Umrah price
    const pax = clampInt(form.passengers, 1, 20);
    const cat = clampInt(form.hotelCategory, 2, 5);
    const hotelMultiplier = cat === 2 ? 1 : cat === 3 ? 1.15 : cat === 4 ? 1.35 : 1.6;
    const total = Math.round(base * hotelMultiplier * pax);
    return { base, passengers: pax, hotelMultiplier, total };
  }, [form.passengers, form.hotelCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!isAuthenticated) {
      setStatus({ type: "error", message: "Please login first to submit a custom package request." });
      return;
    }

    setSending(true);
    try {
      await api.post("/custom-packages", {
        fullName: form.fullName.trim(),
        city: form.city.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        passengers: clampInt(form.passengers, 1, 20),
        startDate: form.startDate,
        hotelCategory: clampInt(form.hotelCategory, 2, 5),
        packageType: form.packageType === "group" ? "group" : "customize",
        notes: form.notes.trim(),
        estimate,
      });

      setStatus({ type: "success", message: "Request submitted. Admin will review it soon." });
      setForm((p) => ({ ...p, passengers: 1, startDate: "", hotelCategory: 3, packageType: "customize", notes: "" }));
    } catch (err) {
      setStatus({ type: "error", message: formatAxiosError(err) });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mb-12">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Want to Customize Package?
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {status.message ? (
          <div
            className={`md:col-span-2 text-sm rounded-lg px-3 py-2 border ${
              status.type === "success"
                ? "text-green-700 bg-green-50 border-green-200"
                : "text-red-700 bg-red-50 border-red-200"
            }`}
            role="alert"
          >
            {status.message}
          </div>
        ) : null}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Mobile No"
          value={form.phone}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="passengers"
          placeholder="Passengers"
          min="1"
          max="20"
          value={form.passengers}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="hotelCategory"
          value={form.hotelCategory}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="2">2 Star</option>
          <option value="3">3 Star</option>
          <option value="4">4 Star</option>
          <option value="5">5 Star</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="packageType"
          value={form.packageType}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="group">Group</option>
          <option value="customize">Customize</option>
        </select>

        <textarea
          name="notes"
          placeholder="Any Other Request"
          value={form.notes}
          onChange={handleChange}
          className="md:col-span-2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />

        <div className="md:col-span-2 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Estimated total (preview)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-700">
            <div>
              <p className="text-xs text-gray-500">Base</p>
              <p className="font-semibold">{formatPkr(estimate.base)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Passengers</p>
              <p className="font-semibold">{estimate.passengers}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-semibold">{formatPkr(estimate.total)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            This is only an estimate. Admin may adjust the final amount after review.
          </p>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {sending ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}

export default CustomizePackage;
