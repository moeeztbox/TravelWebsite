import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useScrollLock } from "../Hooks/useScrollLock";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import {
  adminListTransportationOptionsCatalog,
  adminCreateTransportationOption,
  adminUpdateTransportationOption,
  adminDeleteTransportationOption,
  adminListVisaOptionsCatalog,
  adminCreateVisaOption,
  adminUpdateVisaOption,
  adminDeleteVisaOption,
} from "../Services/adminService";

/** Must match `Transportation.jsx` filter values */
const SERVICE_TYPE_CHOICES = [
  { val: "airport", label: "Airport Transfer" },
  { val: "intercity", label: "Makkah ↔ Madinah" },
  { val: "ziyarat", label: "Ziyarat Tour" },
  { val: "haram", label: "Haram Shuttle" },
];

const VEHICLE_TYPE_CHOICES = [
  "Economy Car (1–3 pax)",
  "SUV / MPV (1–6 pax)",
  "Mini Bus (7–14 pax)",
  "Bus (15–30 pax)",
];

const VISA_TYPE_CHOICES = [
  { val: "umrah", label: "Umrah" },
  { val: "hajj", label: "Hajj" },
  { val: "visit", label: "Visit" },
  { val: "transit", label: "Transit" },
];

const NATIONALITY_CHOICES = ["Pakistani", "Indian", "Bangladeshi", "Egyptian", "Other"];

const TRIP_TYPE_CHOICES = [
  { val: "oneway", label: "One Way" },
  { val: "round", label: "Round Trip" },
];

const PASSENGER_TYPE_CHOICES = [
  { val: "adult", label: "Adult" },
  { val: "child", label: "Child" },
  { val: "infant", label: "Infant" },
];

// Simple admin-side FX rate for display/conversion.
// If you want this live, we can later fetch from a backend settings endpoint.
const USD_TO_PKR = 280;

const DURATION_CHOICES = [
  { val: 15, label: "15 Days" },
  { val: 30, label: "30 Days" },
  { val: 45, label: "45 Days" },
  { val: 90, label: "90 Days" },
];

function slugifyPart(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function emptyTransportForm() {
  return {
    serviceType: "",
    vehicleType: "",
    tripType: "",
    priceLabel: "",
    priceAmount: "",
    passengerType: "adult",
    active: true,
  };
}

function emptyVisaForm() {
  return {
    visaType: "",
    nationality: "",
    durationDays: "",
    priceLabel: "",
    priceAmountPkr: "",
    tier: "standard",
    massar: "",
    passengerType: "adult",
    active: true,
  };
}

function transportDocToForm(doc) {
  return {
    serviceType: Array.isArray(doc.serviceTypes) && doc.serviceTypes.length ? doc.serviceTypes[0] : "",
    vehicleType: Array.isArray(doc.vehicleTypes) && doc.vehicleTypes.length ? doc.vehicleTypes[0] : "",
    tripType: Array.isArray(doc.tripTypes) && doc.tripTypes.length ? doc.tripTypes[0] : "",
    priceLabel: doc.priceLabel ?? "",
    priceAmount:
      doc.priceAmount !== undefined && doc.priceAmount !== null
        ? String(doc.priceAmount)
        : "",
    passengerType:
      doc.passengerType === "adult" ||
      doc.passengerType === "child" ||
      doc.passengerType === "infant"
        ? doc.passengerType
        : "adult",
    active: doc.active !== false,
  };
}

function visaDocToForm(doc) {
  const usd = Number(doc.priceAmount) || 0;
  const pkr = Math.round(usd * USD_TO_PKR);
  return {
    visaType: Array.isArray(doc.visaTypes) && doc.visaTypes.length ? doc.visaTypes[0] : "",
    nationality:
      Array.isArray(doc.nationalities) && doc.nationalities.length ? doc.nationalities[0] : "",
    durationDays:
      doc.durationMinDays !== undefined &&
      doc.durationMinDays !== null &&
      doc.durationMaxDays !== undefined &&
      doc.durationMaxDays !== null &&
      Number(doc.durationMinDays) === Number(doc.durationMaxDays)
        ? String(doc.durationMinDays)
        : "",
    priceLabel: doc.priceLabel ?? "",
    priceAmountPkr: usd ? String(pkr) : "",
    tier: doc.tier === "premium" ? "premium" : "standard",
    massar: doc.massar === "with" || doc.massar === "without" ? doc.massar : "",
    passengerType:
      doc.passengerType === "adult" ||
      doc.passengerType === "child" ||
      doc.passengerType === "infant"
        ? doc.passengerType
        : "adult",
    active: doc.active !== false,
  };
}

function toggleMember(arr, val) {
  const s = new Set(arr);
  if (s.has(val)) s.delete(val);
  else s.add(val);
  return [...s];
}

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400";

export default function AdminServiceOptions() {
  const [tab, setTab] = useState("transport");
  const [transportList, setTransportList] = useState([]);
  const [visaList, setVisaList] = useState([]);
  const [loadingT, setLoadingT] = useState(true);
  const [loadingV, setLoadingV] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalKind, setModalKind] = useState("transport");
  const [editingId, setEditingId] = useState(null);
  const [tForm, setTForm] = useState(emptyTransportForm);
  const [vForm, setVForm] = useState(emptyVisaForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const transportMeta = useMemo(() => {
    const key = [
      "transport",
      tForm.serviceType,
      tForm.vehicleType,
      tForm.tripType,
      tForm.passengerType,
    ]
      .map(slugifyPart)
      .filter(Boolean)
      .join("-");
    const title = [
      "Transportation",
      SERVICE_TYPE_CHOICES.find((x) => x.val === tForm.serviceType)?.label || "",
      tForm.vehicleType || "",
      TRIP_TYPE_CHOICES.find((x) => x.val === tForm.tripType)?.label || "",
      tForm.passengerType ? `(${tForm.passengerType})` : "",
    ]
      .filter(Boolean)
      .join(" - ");
    const price = Number(tForm.priceAmount) || 0;
    const priceLabel = price ? `PKR ${price.toLocaleString()} / pax` : "";
    return { key, title, priceLabel, price };
  }, [
    tForm.serviceType,
    tForm.vehicleType,
    tForm.tripType,
    tForm.passengerType,
    tForm.priceAmount,
  ]);

  const visaMeta = useMemo(() => {
    const pkr = Number(vForm.priceAmountPkr) || 0;
    const usd = pkr > 0 ? Number((pkr / USD_TO_PKR).toFixed(2)) : 0;
    const key = [
      "visa",
      vForm.visaType,
      vForm.nationality,
      vForm.durationDays,
      vForm.massar,
      vForm.passengerType,
      vForm.tier,
    ]
      .map(slugifyPart)
      .filter(Boolean)
      .join("-");
    const title = [
      "Visa",
      VISA_TYPE_CHOICES.find((x) => x.val === vForm.visaType)?.label || "",
      vForm.nationality || "",
      vForm.durationDays ? `${vForm.durationDays} Days` : "",
      vForm.massar === "with"
        ? "With Massar"
        : vForm.massar === "without"
          ? "Without Massar"
          : "",
      vForm.passengerType ? `(${vForm.passengerType})` : "",
      vForm.tier === "premium" ? "Premium" : "Standard",
    ]
      .filter(Boolean)
      .join(" - ");
    const priceLabel =
      pkr && usd
        ? `USD ${usd} / person (PKR ${pkr.toLocaleString()} / person)`
        : "";
    return { key, title, priceLabel, pkr, usd };
  }, [
    vForm.visaType,
    vForm.nationality,
    vForm.durationDays,
    vForm.massar,
    vForm.passengerType,
    vForm.tier,
    vForm.priceAmountPkr,
  ]);

  const loadTransport = useCallback(async () => {
    setLoadingT(true);
    try {
      const options = await adminListTransportationOptionsCatalog();
      setTransportList(options);
    } catch {
      toast.error("Failed to load transportation options");
    } finally {
      setLoadingT(false);
    }
  }, []);

  const loadVisa = useCallback(async () => {
    setLoadingV(true);
    try {
      const options = await adminListVisaOptionsCatalog();
      setVisaList(options);
    } catch {
      toast.error("Failed to load visa options");
    } finally {
      setLoadingV(false);
    }
  }, []);

  useEffect(() => {
    loadTransport();
    loadVisa();
  }, [loadTransport, loadVisa]);

  useScrollLock(Boolean(modalOpen || deleteTarget));

  const openCreate = () => {
    setEditingId(null);
    setModalKind(tab);
    if (tab === "transport") {
      setTForm(emptyTransportForm());
    } else {
      setVForm(emptyVisaForm());
    }
    setModalOpen(true);
  };

  const openEditTransport = (row) => {
    setEditingId(row._id);
    setModalKind("transport");
    setTForm(transportDocToForm(row));
    setModalOpen(true);
  };

  const openEditVisa = (row) => {
    setEditingId(row._id);
    setModalKind("visa");
    setVForm(visaDocToForm(row));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const submitTransport = async (e) => {
    e.preventDefault();
    const { key, title, priceLabel, price } = transportMeta;

    const payload = {
      key,
      title,
      description: "",
      priceLabel,
      priceAmount: price,
      serviceTypes: tForm.serviceType ? [tForm.serviceType] : [],
      vehicleTypes: tForm.vehicleType ? [tForm.vehicleType] : [],
      tripTypes: tForm.tripType ? [tForm.tripType] : [],
      passengerType: tForm.passengerType,
      active: tForm.active,
    };
    if (!tForm.serviceType || !tForm.vehicleType || !tForm.tripType || !tForm.passengerType) {
      toast.error("Please fill all fields");
      return;
    }
    if (!price || price <= 0) {
      toast.error("Enter PKR price per passenger");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await adminUpdateTransportationOption(editingId, payload);
        toast.success("Transportation option updated");
      } else {
        await adminCreateTransportationOption(payload);
        toast.success("Transportation option created");
      }
      closeModal();
      await loadTransport();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const submitVisa = async (e) => {
    e.preventDefault();
    const { key, title, priceLabel, pkr, usd } = visaMeta;

    const payload = {
      key,
      title,
      description: "",
      priceLabel,
      priceAmount: usd,
      tier: vForm.tier,
      visaTypes: vForm.visaType ? [vForm.visaType] : [],
      nationalities: vForm.nationality ? [vForm.nationality] : [],
      durationMinDays: vForm.durationDays ? Number(vForm.durationDays) : "",
      durationMaxDays: vForm.durationDays ? Number(vForm.durationDays) : "",
      massar: vForm.massar,
      passengerType: vForm.passengerType,
      active: vForm.active,
    };
    if (!vForm.visaType || !vForm.nationality || !vForm.durationDays || !vForm.massar || !vForm.passengerType) {
      toast.error("Please fill all fields");
      return;
    }
    if (!pkr || pkr <= 0) {
      toast.error("Enter PKR price per person");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await adminUpdateVisaOption(editingId, payload);
        toast.success("Visa option updated");
      } else {
        await adminCreateVisaOption(payload);
        toast.success("Visa option created");
      }
      closeModal();
      await loadVisa();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.kind === "transport") {
        await adminDeleteTransportationOption(deleteTarget.id);
        toast.success("Transportation option deleted");
        await loadTransport();
      } else {
        await adminDeleteVisaOption(deleteTarget.id);
        toast.success("Visa option deleted");
        await loadVisa();
      }
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const list = tab === "transport" ? transportList : visaList;

  return (
    <>
      <AdminLayout
        title="Transport & visa options"
        subtitle="Manage catalog rows for the Transportation and Visa booking forms (prices, matching rules, visibility)."
        headerRight={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 active:scale-95 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>
              Add {tab === "transport" ? "transportation" : "visa"} option
            </span>
          </button>
        }
      >
        <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-200 pb-1">
          <button
            type="button"
            onClick={() => setTab("transport")}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === "transport"
                ? "border-amber-500 text-amber-900 bg-white"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Transportation
          </button>
          <button
            type="button"
            onClick={() => setTab("visa")}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === "visa"
                ? "border-amber-500 text-amber-900 bg-white"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Visa
          </button>
        </div>

        <p className="text-xs text-zinc-500 mb-4">
          {tab === "transport"
            ? "Price amount is PKR per passenger. Empty service/vehicle lists mean “match any” for that dimension."
            : "Price amount is USD per traveller. Visa types must include the visa category users can select (e.g. umrah, visit)."}
        </p>

        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {tab === "transport" ? (
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/80">
                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                      Key
                    </th>
                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                      Title
                    </th>
                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">
                      Price
                    </th>
                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-2 py-3 w-10" />
                  </tr>
                </thead>
                <tbody>
                  {loadingT ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-16 text-center">
                        <Loader2 className="h-7 w-7 animate-spin text-amber-400 mx-auto" />
                      </td>
                    </tr>
                  ) : transportList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-zinc-500">
                        No transportation options yet.
                      </td>
                    </tr>
                  ) : (
                    transportList.map((row) => (
                      <tr
                        key={row._id}
                        className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/60"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-zinc-700 max-w-[140px] truncate">
                          {row.key}
                        </td>
                        <td className="px-4 py-3 text-zinc-900 font-medium max-w-[200px] truncate">
                          {row.title}
                        </td>
                        <td className="px-4 py-3 text-zinc-600 hidden md:table-cell whitespace-nowrap">
                          {row.priceLabel || `PKR ${row.priceAmount ?? 0}`}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                              row.active !== false
                                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                                : "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200"
                            }`}
                          >
                            {row.active !== false ? "Active" : "Hidden"}
                          </span>
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditTransport(row)}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget({
                                  kind: "transport",
                                  id: row._id,
                                  key: row.key,
                                })
                              }
                              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/80">
                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                      Key
                    </th>
                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                      Title
                    </th>
                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden sm:table-cell">
                      Tier
                    </th>
                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">
                      Price
                    </th>
                    <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-2 py-3 w-10" />
                  </tr>
                </thead>
                <tbody>
                  {loadingV ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-16 text-center">
                        <Loader2 className="h-7 w-7 animate-spin text-amber-400 mx-auto" />
                      </td>
                    </tr>
                  ) : visaList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-zinc-500">
                        No visa options yet.
                      </td>
                    </tr>
                  ) : (
                    visaList.map((row) => (
                      <tr
                        key={row._id}
                        className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/60"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-zinc-700 max-w-[140px] truncate">
                          {row.key}
                        </td>
                        <td className="px-4 py-3 text-zinc-900 font-medium max-w-[200px] truncate">
                          {row.title}
                        </td>
                        <td className="px-4 py-3 text-zinc-600 capitalize hidden sm:table-cell">
                          {row.tier || "standard"}
                        </td>
                        <td className="px-4 py-3 text-zinc-600 hidden md:table-cell whitespace-nowrap">
                          {row.priceLabel || `USD ${row.priceAmount ?? 0}`}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                              row.active !== false
                                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                                : "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200"
                            }`}
                          >
                            {row.active !== false ? "Active" : "Hidden"}
                          </span>
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditVisa(row)}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget({
                                  kind: "visa",
                                  id: row._id,
                                  key: row.key,
                                })
                              }
                              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
          {!(tab === "transport" ? loadingT : loadingV) && list.length > 0 ? (
            <div className="px-4 py-2.5 border-t border-zinc-100 bg-zinc-50/50">
              <p className="text-xs text-zinc-400">
                {list.length} option{list.length !== 1 ? "s" : ""}
              </p>
            </div>
          ) : null}
        </div>
      </AdminLayout>

      {modalOpen && modalKind === "transport" ? (
        <>
          <div
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
            onClick={closeModal}
            aria-hidden
          />
          <div className="fixed inset-0 z-[101] overflow-hidden overflow-x-hidden">
            <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6">
              <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-zinc-200 flex flex-col"
                style={{ maxHeight: "calc(100dvh - 2rem)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 bg-white/95 border-b border-zinc-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-900">
                      {editingId ? "Edit transportation option" : "New transportation option"}
                    </h2>
                    {editingId ? null : (
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Pick the same dropdowns as users. Key/title are auto-generated.
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <form
                  onSubmit={submitTransport}
                  className="px-5 py-4 space-y-4 overflow-y-auto flex-1"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Service type <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputClass}
                        value={tForm.serviceType}
                        onChange={(e) =>
                          setTForm((f) => ({ ...f, serviceType: e.target.value }))
                        }
                        required
                      >
                        <option value="" disabled>
                          Select service type
                        </option>
                        {SERVICE_TYPE_CHOICES.map((s) => (
                          <option key={s.val} value={s.val}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Vehicle type <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputClass}
                        value={tForm.vehicleType}
                        onChange={(e) =>
                          setTForm((f) => ({ ...f, vehicleType: e.target.value }))
                        }
                        required
                      >
                        <option value="" disabled>
                          Select vehicle type
                        </option>
                        {VEHICLE_TYPE_CHOICES.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Trip type <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputClass}
                        value={tForm.tripType}
                        onChange={(e) =>
                          setTForm((f) => ({ ...f, tripType: e.target.value }))
                        }
                        required
                      >
                        <option value="" disabled>
                          Select trip type
                        </option>
                        {TRIP_TYPE_CHOICES.map((t) => (
                          <option key={t.val} value={t.val}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Passenger type
                      </label>
                      <select
                        className={inputClass}
                        value={tForm.passengerType}
                        onChange={(e) =>
                          setTForm((f) => ({ ...f, passengerType: e.target.value }))
                        }
                        required
                      >
                        {PASSENGER_TYPE_CHOICES.map((p) => (
                          <option key={p.val} value={p.val}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Title (auto)
                      </label>
                      <input className={inputClass} value={transportMeta.title} readOnly />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Key (auto)
                      </label>
                      <input className={inputClass} value={transportMeta.key} readOnly />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Price amount (PKR / pax) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        required
                        className={inputClass}
                        value={tForm.priceAmount}
                        onChange={(e) =>
                          setTForm((f) => ({ ...f, priceAmount: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Price label (auto)
                      </label>
                      <input
                        className={inputClass}
                        value={transportMeta.priceLabel}
                        readOnly
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Note: Matching rules are saved exactly like user selections.
                  </p>
                  <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={tForm.active}
                      onChange={(e) =>
                        setTForm((f) => ({ ...f, active: e.target.checked }))
                      }
                      className="rounded border-zinc-300 text-amber-600"
                    />
                    Active (shown on site)
                  </label>
                  <div className="sticky bottom-0 -mx-5 -mb-4 px-5 py-4 bg-white border-t border-zinc-100 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 disabled:opacity-60"
                    >
                      {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                      {editingId ? "Save" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {modalOpen && modalKind === "visa" ? (
        <>
          <div
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
            onClick={closeModal}
            aria-hidden
          />
          <div className="fixed inset-0 z-[101] overflow-hidden overflow-x-hidden">
            <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6">
              <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-zinc-200 flex flex-col"
                style={{ maxHeight: "calc(100dvh - 2rem)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 bg-white/95 border-b border-zinc-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-900">
                      {editingId ? "Edit visa option" : "New visa option"}
                    </h2>
                    {editingId ? null : (
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Pick the same dropdowns as users. Key/title are auto-generated.
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <form
                  onSubmit={submitVisa}
                  className="px-5 py-4 space-y-4 overflow-y-auto flex-1"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Visa type <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputClass}
                        value={vForm.visaType}
                        onChange={(e) =>
                          setVForm((f) => ({ ...f, visaType: e.target.value }))
                        }
                        required
                      >
                        <option value="" disabled>
                          Select visa type
                        </option>
                        {VISA_TYPE_CHOICES.map((v) => (
                          <option key={v.val} value={v.val}>
                            {v.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Nationality <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputClass}
                        value={vForm.nationality}
                        onChange={(e) =>
                          setVForm((f) => ({ ...f, nationality: e.target.value }))
                        }
                        required
                      >
                        <option value="" disabled>
                          Select nationality
                        </option>
                        {NATIONALITY_CHOICES.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Duration <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputClass}
                        value={vForm.durationDays}
                        onChange={(e) =>
                          setVForm((f) => ({ ...f, durationDays: e.target.value }))
                        }
                        required
                      >
                        <option value="" disabled>
                          Select duration
                        </option>
                        {DURATION_CHOICES.map((d) => (
                          <option key={d.val} value={String(d.val)}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Massar <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputClass}
                        value={vForm.massar}
                        onChange={(e) => setVForm((f) => ({ ...f, massar: e.target.value }))}
                        required
                      >
                        <option value="any" disabled>
                          Select massar
                        </option>
                        <option value="with">With Massar</option>
                        <option value="without">Without Massar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Passenger type <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputClass}
                        value={vForm.passengerType}
                        required
                        onChange={(e) =>
                          setVForm((f) => ({ ...f, passengerType: e.target.value }))
                        }
                      >
                        {PASSENGER_TYPE_CHOICES.map((p) => (
                          <option key={p.val} value={p.val}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Tier <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputClass}
                        value={vForm.tier}
                        required
                        onChange={(e) => setVForm((f) => ({ ...f, tier: e.target.value }))}
                      >
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Title (auto)
                      </label>
                      <input
                        className={inputClass}
                        value={visaMeta.title}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Key (auto)
                      </label>
                      <input className={inputClass} value={visaMeta.key} readOnly />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Price amount (PKR / person) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        step="1"
                        className={inputClass}
                        value={vForm.priceAmountPkr}
                        required
                        onChange={(e) =>
                          setVForm((f) => ({ ...f, priceAmountPkr: e.target.value }))
                        }
                      />
                      <p className="text-[11px] text-zinc-400 mt-1">
                        USD auto:{" "}
                        <span className="font-mono text-zinc-600">
                          {(() => {
                            const pkr = Number(vForm.priceAmountPkr) || 0;
                            const usd = pkr > 0 ? (pkr / USD_TO_PKR).toFixed(2) : "0.00";
                            return `USD ${usd}`;
                          })()}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Price label (auto)
                      </label>
                      <input className={inputClass} value={visaMeta.priceLabel} readOnly />
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Note: Matching rules are saved exactly like user selections.
                  </p>
                  <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={vForm.active}
                      onChange={(e) =>
                        setVForm((f) => ({ ...f, active: e.target.checked }))
                      }
                      className="rounded border-zinc-300 text-amber-600"
                    />
                    Active (shown on site)
                  </label>
                  <div className="sticky bottom-0 -mx-5 -mb-4 px-5 py-4 bg-white border-t border-zinc-100 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 disabled:opacity-60"
                    >
                      {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                      {editingId ? "Save" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {deleteTarget ? (
        <>
          <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-[2px]" />
          <div className="fixed inset-0 z-[111] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-zinc-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    Delete{" "}
                    {deleteTarget.kind === "transport"
                      ? "transportation"
                      : "visa"}{" "}
                    option?
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    This removes{" "}
                    <code className="font-mono text-zinc-700 bg-zinc-100 px-1 py-0.5 rounded text-xs">
                      {deleteTarget.key}
                    </code>{" "}
                    from the catalog. Existing user bookings keep their saved
                    copy of the option.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
