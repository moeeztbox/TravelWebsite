import { useCallback, useEffect, useState } from "react";
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

function emptyTransportForm() {
  return {
    key: "",
    title: "",
    description: "",
    priceLabel: "",
    priceAmount: "",
    serviceTypes: [],
    vehicleTypes: [],
    active: true,
  };
}

function emptyVisaForm() {
  return {
    key: "",
    title: "",
    description: "",
    priceLabel: "",
    priceAmount: "",
    tier: "standard",
    visaTypes: [],
    active: true,
  };
}

function transportDocToForm(doc) {
  return {
    key: doc.key ?? "",
    title: doc.title ?? "",
    description: doc.description ?? "",
    priceLabel: doc.priceLabel ?? "",
    priceAmount:
      doc.priceAmount !== undefined && doc.priceAmount !== null
        ? String(doc.priceAmount)
        : "",
    serviceTypes: Array.isArray(doc.serviceTypes) ? [...doc.serviceTypes] : [],
    vehicleTypes: Array.isArray(doc.vehicleTypes) ? [...doc.vehicleTypes] : [],
    active: doc.active !== false,
  };
}

function visaDocToForm(doc) {
  return {
    key: doc.key ?? "",
    title: doc.title ?? "",
    description: doc.description ?? "",
    priceLabel: doc.priceLabel ?? "",
    priceAmount:
      doc.priceAmount !== undefined && doc.priceAmount !== null
        ? String(doc.priceAmount)
        : "",
    tier: doc.tier === "premium" ? "premium" : "standard",
    visaTypes: Array.isArray(doc.visaTypes) ? [...doc.visaTypes] : [],
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
    const payload = {
      key: tForm.key.trim(),
      title: tForm.title.trim(),
      description: tForm.description.trim(),
      priceLabel: tForm.priceLabel.trim(),
      priceAmount: Number(tForm.priceAmount) || 0,
      serviceTypes: tForm.serviceTypes,
      vehicleTypes: tForm.vehicleTypes,
      active: tForm.active,
    };
    if (!payload.key || !payload.title) {
      toast.error("Key and title are required");
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
    const payload = {
      key: vForm.key.trim(),
      title: vForm.title.trim(),
      description: vForm.description.trim(),
      priceLabel: vForm.priceLabel.trim(),
      priceAmount: Number(vForm.priceAmount) || 0,
      tier: vForm.tier,
      visaTypes: vForm.visaTypes,
      active: vForm.active,
    };
    if (!payload.key || !payload.title) {
      toast.error("Key and title are required");
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
                    {editingId ? (
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{tForm.key}</p>
                    ) : null}
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
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">
                      Key <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      value={tForm.key}
                      onChange={(e) => setTForm((f) => ({ ...f, key: e.target.value }))}
                      placeholder="e.g. tr-air-econ"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      value={tForm.title}
                      onChange={(e) => setTForm((f) => ({ ...f, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">
                      Description
                    </label>
                    <textarea
                      className={`${inputClass} min-h-[80px]`}
                      value={tForm.description}
                      onChange={(e) =>
                        setTForm((f) => ({ ...f, description: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Price label
                      </label>
                      <input
                        className={inputClass}
                        value={tForm.priceLabel}
                        onChange={(e) =>
                          setTForm((f) => ({ ...f, priceLabel: e.target.value }))
                        }
                        placeholder="PKR 2,800 / pax"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Price amount (PKR / pax)
                      </label>
                      <input
                        type="number"
                        min={0}
                        className={inputClass}
                        value={tForm.priceAmount}
                        onChange={(e) =>
                          setTForm((f) => ({ ...f, priceAmount: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <fieldset>
                    <legend className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Service types (empty = any)
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_TYPE_CHOICES.map(({ val, label }) => (
                        <label
                          key={val}
                          className="inline-flex items-center gap-2 text-sm text-zinc-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={tForm.serviceTypes.includes(val)}
                            onChange={() =>
                              setTForm((f) => ({
                                ...f,
                                serviceTypes: toggleMember(f.serviceTypes, val),
                              }))
                            }
                            className="rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Vehicle types (empty = any)
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {VEHICLE_TYPE_CHOICES.map((val) => (
                        <label
                          key={val}
                          className="inline-flex items-center gap-2 text-sm text-zinc-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={tForm.vehicleTypes.includes(val)}
                            onChange={() =>
                              setTForm((f) => ({
                                ...f,
                                vehicleTypes: toggleMember(f.vehicleTypes, val),
                              }))
                            }
                            className="rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span className="max-w-[200px] truncate">{val}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
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
                    {editingId ? (
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{vForm.key}</p>
                    ) : null}
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
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">
                      Key <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      value={vForm.key}
                      onChange={(e) => setVForm((f) => ({ ...f, key: e.target.value }))}
                      placeholder="e.g. visa-umrah-std"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      value={vForm.title}
                      onChange={(e) => setVForm((f) => ({ ...f, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">
                      Description
                    </label>
                    <textarea
                      className={`${inputClass} min-h-[80px]`}
                      value={vForm.description}
                      onChange={(e) =>
                        setVForm((f) => ({ ...f, description: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Price label
                      </label>
                      <input
                        className={inputClass}
                        value={vForm.priceLabel}
                        onChange={(e) =>
                          setVForm((f) => ({ ...f, priceLabel: e.target.value }))
                        }
                        placeholder="USD 90 / person"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        Price amount (USD / person)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        className={inputClass}
                        value={vForm.priceAmount}
                        onChange={(e) =>
                          setVForm((f) => ({ ...f, priceAmount: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">
                      Tier
                    </label>
                    <select
                      className={inputClass}
                      value={vForm.tier}
                      onChange={(e) => setVForm((f) => ({ ...f, tier: e.target.value }))}
                    >
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                  <fieldset>
                    <legend className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Visa categories
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {VISA_TYPE_CHOICES.map(({ val, label }) => (
                        <label
                          key={val}
                          className="inline-flex items-center gap-2 text-sm text-zinc-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={vForm.visaTypes.includes(val)}
                            onChange={() =>
                              setVForm((f) => ({
                                ...f,
                                visaTypes: toggleMember(f.visaTypes, val),
                              }))
                            }
                            className="rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
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
