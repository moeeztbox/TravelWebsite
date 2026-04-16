import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useScrollLock } from "../Hooks/useScrollLock";
import { Pencil, Trash2, Plus, X, Loader2, Star } from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import {
  adminCreatePackage,
  adminListPackages,
  adminUpdatePackage,
  adminDeletePackage,
} from "../Services/adminService";
import { HIGHLIGHT_ICON_MAP } from "../constants/packageHighlightIcons";

const ICON_OPTIONS = Object.keys(HIGHLIGHT_ICON_MAP);
const JOURNEY_STAGE_OPTIONS = [
  ["scheduled", "Scheduled"],
  ["flight_takeoff", "Flight takeoff"],
  ["jeddah_airport", "Jeddah airport"],
  ["in_jeddah", "In Jeddah"],
  ["ziyarat", "Ziyarat"],
  ["in_madinah", "In Madinah"],
  ["in_makkah", "In Makkah"],
  ["makkah_airport", "Makkah airport"],
  ["return_flight", "Return flight"],
  ["completed", "Completed"],
];

function emptyForm() {
  return {
    packageId: "",
    order: 0,
    title: "",
    subtitle: "",
    price: "PKR ",
    duration: "0 Days",
    badge: "",
    image: "",
    active: true,
    featured: false,
    services: {
      ziyarat: false,
      transport: false,
      visa: false,
      ticket: false,
      hotel: false,
    },
    journeyStages: [],
    highlights: [
      { iconKey: "map-pin", text: "" },
      { iconKey: "hotel", text: "" },
    ],
  };
}

function pkgToForm(pkg) {
  return {
    packageId: pkg.packageId ?? "",
    order: pkg.order ?? 0,
    title: pkg.title ?? "",
    subtitle: pkg.subtitle ?? "",
    price: String(pkg.price ?? "").trim() || "PKR ",
    duration: String(pkg.duration ?? "").trim() || "0 Days",
    badge: pkg.badge ?? "",
    image: pkg.image ?? "",
    active: pkg.active !== false,
    featured: Boolean(pkg.featured),
    services: {
      ziyarat: Boolean(pkg.services?.ziyarat),
      transport: Boolean(pkg.services?.transport),
      visa: Boolean(pkg.services?.visa),
      ticket: Boolean(pkg.services?.ticket),
      hotel: Boolean(pkg.services?.hotel),
    },
    journeyStages: Array.isArray(pkg.journeyStages) ? pkg.journeyStages : [],
    highlights:
      Array.isArray(pkg.highlights) && pkg.highlights.length > 0
        ? pkg.highlights.map((h) => ({
            iconKey: h.iconKey || "map-pin",
            text: h.text || "",
          }))
        : [{ iconKey: "map-pin", text: "" }],
  };
}

export default function AdminPackages() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const modalScrollRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const packages = await adminListPackages();
      setList([...packages].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch (e) {
      toast.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useScrollLock(Boolean(modalOpen || deleteTarget));

  // React onWheel is passive; when body is scroll-locked, wheel won't scroll the modal.
  // Use a native wheel listener (passive:false) to keep modal scrolling smooth.
  useEffect(() => {
    if (!modalOpen) return undefined;
    const el = modalScrollRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      el.scrollTop += e.deltaY;
      e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      el.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, [modalOpen]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (pkg) => {
    setEditingId(pkg.packageId);
    setForm(pkgToForm(pkg));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const updateHighlight = (index, field, value) => {
    setForm((f) => {
      const highlights = [...f.highlights];
      highlights[index] = { ...highlights[index], [field]: value };
      return { ...f, highlights };
    });
  };

  const addHighlightRow = () => {
    setForm((f) => ({
      ...f,
      highlights: [...f.highlights, { iconKey: "map-pin", text: "" }],
    }));
  };

  const removeHighlightRow = (index) => {
    setForm((f) => {
      if (f.highlights.length <= 1) return f;
      const highlights = f.highlights.filter((_, i) => i !== index);
      return { ...f, highlights };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const highlights = form.highlights
      .map((h) => ({
        iconKey: h.iconKey || "map-pin",
        text: (h.text || "").trim(),
      }))
      .filter((h) => h.text.length > 0);

    const payload = {
      packageId: form.packageId.trim(),
      order: Number(form.order) || 0,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      price: form.price.trim(),
      duration: form.duration.trim(),
      badge: form.badge.trim(),
      image: form.image.trim(),
      active: form.active,
      featured: Boolean(form.featured),
      services: {
        ziyarat: Boolean(form.services?.ziyarat),
        transport: Boolean(form.services?.transport),
        visa: Boolean(form.services?.visa),
        ticket: Boolean(form.services?.ticket),
        hotel: Boolean(form.services?.hotel),
      },
      journeyStages: Array.isArray(form.journeyStages)
        ? form.journeyStages.filter(Boolean)
        : [],
      highlights,
    };

    if (!payload.packageId || !payload.title) {
      toast.error("Package ID and title are required");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const { packageId, ...rest } = payload;
        await adminUpdatePackage(editingId, rest);
        toast.success("Package updated");
      } else {
        await adminCreatePackage(payload);
        toast.success("Package created");
      }
      closeModal();
      await load();
    } catch (err) {
      const msg = err.response?.data?.message || "Save failed";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await adminDeletePackage(deleteTarget);
      toast.success("Package deleted");
      setDeleteTarget(null);
      await load();
    } catch (err) {
      const msg = err.response?.data?.message || "Delete failed";
      toast.error(msg);
    }
  };

  return (
    <>
      <AdminLayout
        title="Packages"
        subtitle="Create, edit, or remove packages stored in MongoDB."
        headerRight={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 active:scale-95 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add package</span>
          </button>
        }
      >
        {/* Table card */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/80">
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide whitespace-nowrap w-16">
                    Order
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                    Package ID
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                    Title
                  </th>
              
<th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden sm:table-cell">
  Featured
</th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden sm:table-cell">
                    Price
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">
                    Duration
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-2 py-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-20 text-center">
                      <Loader2 className="h-7 w-7 animate-spin text-amber-400 mx-auto" />
                      <p className="mt-3 text-xs text-zinc-400">Loading packages…</p>
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                          <Plus className="h-5 w-5 text-zinc-400" />
                        </div>
                        <p className="text-sm text-zinc-500">No packages yet.</p>
                        <button
                          type="button"
                          onClick={openCreate}
                          className="text-sm text-amber-500 font-medium hover:underline"
                        >
                          Create your first package
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  list.map((pkg) => (
                    <tr
                      key={pkg.packageId}
                      className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/60 transition-colors"
                    >
                      <td className="px-4 py-3.5 text-zinc-500 text-xs font-mono">
                        {pkg.order ?? "—"}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-zinc-700 max-w-[130px] truncate">
                        {pkg.packageId}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-900 font-medium max-w-[220px]">
                        <div className="flex items-center gap-2 min-w-0">
                          
                          <span className="truncate">{pkg.title}</span>
                        </div>
                      </td>

<td className="px-4 py-3.5 hidden sm:table-cell">
  {pkg.featured ? (
    <Star
      className="h-4 w-4 text-amber-500 fill-amber-400"
      aria-label="Featured"
      title="Featured"
    />
  ) : (
    <span className="text-zinc-300 text-xs">—</span>
  )}
</td>
                      <td className="px-4 py-3.5 text-zinc-500 whitespace-nowrap hidden sm:table-cell text-sm">
                        {pkg.price || "—"}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-500 hidden md:table-cell text-sm">
                        {pkg.duration || "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            pkg.active !== false
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                              : "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200"
                          }`}
                        >
                          {pkg.active !== false ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEdit(pkg)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                            aria-label={`Edit ${pkg.packageId}`}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(pkg.packageId)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            aria-label={`Delete ${pkg.packageId}`}
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
          </div>

          {/* Table footer */}
          {list.length > 0 && !loading && (
            <div className="px-4 py-2.5 border-t border-zinc-100 bg-zinc-50/50">
              <p className="text-xs text-zinc-400">
                {list.length} package{list.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </AdminLayout>

      {/* ── Create / Edit Modal ── */}
      {modalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-[101] overflow-hidden overflow-x-hidden">
            <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6">
              <div
                className="
                  relative bg-white rounded-2xl shadow-2xl
                  w-full max-w-lg
                  flex flex-col
                  border border-zinc-200
                "
                style={{ maxHeight: "calc(100dvh - 2rem)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-zinc-100 px-5 py-4 flex items-center justify-between rounded-t-2xl flex-shrink-0">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-900 leading-tight">
                      {editingId ? "Edit package" : "New package"}
                    </h2>
                    {editingId && (
                      <p className="text-xs text-zinc-400 mt-0.5 font-mono">{editingId}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors flex-shrink-0"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Scrollable form body */}
                <div
                  className="overflow-y-auto overscroll-contain"
                  style={{ WebkitOverflowScrolling: "touch" }}
                  ref={modalScrollRef}
                >
                  <form onSubmit={handleSubmit} className="p-5 space-y-5">

                    {/* Section: Identity */}
                    <fieldset className="space-y-3">
                      <legend className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Identity
                      </legend>
                      <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1">
                          Package ID (slug) *
                        </label>
                        <input
                          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                          value={form.packageId}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, packageId: e.target.value }))
                          }
                          disabled={!!editingId}
                          required
                          placeholder="e.g. economy-umrah"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-zinc-600 mb-1">
                            Sort order
                          </label>
                          <input
                            type="number"
                            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                            value={form.order}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, order: e.target.value }))
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-zinc-600 mb-1">
                            Visibility
                          </label>
                          <label className="flex items-center gap-2.5 h-[38px] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={form.active}
                              onChange={(e) =>
                                setForm((f) => ({ ...f, active: e.target.checked }))
                              }
                              className="h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-500"
                            />
                            <span className="text-sm text-zinc-700">Show on site</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1">
                          Featured
                        </label>
                        <label className="flex items-center gap-2.5 h-[38px] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(form.featured)}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, featured: e.target.checked }))
                            }
                            className="h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-sm text-zinc-700">
                            Show in featured section
                          </span>
                        </label>
                      </div>
                    </fieldset>

                    {/* Divider */}
                    <hr className="border-zinc-100" />

                    {/* Section: Content */}
                    <fieldset className="space-y-3">
                      <legend className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Content
                      </legend>
                      <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1">
                          Title *
                        </label>
                        <input
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                          value={form.title}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, title: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1">
                          Subtitle
                        </label>
                        <input
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                          value={form.subtitle}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, subtitle: e.target.value }))
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-zinc-600 mb-1">
                            Price
                          </label>
                          <div className="flex items-center rounded-xl border border-zinc-200 bg-white focus-within:ring-2 focus-within:ring-amber-500/30 focus-within:border-amber-400 transition-colors">
                            <div className="px-3 py-2 text-sm font-semibold text-zinc-600 border-r border-zinc-200">
                              PKR
                            </div>
                            <input
                              inputMode="numeric"
                              className="w-full rounded-xl bg-white px-3 py-2 text-sm text-zinc-800 focus:outline-none"
                              value={String(form.price || "").replace(/^PKR\s*/i, "")}
                              onChange={(e) => {
                                const raw = e.target.value;
                                const digits = raw.replace(/[^\d,]/g, "");
                                setForm((f) => ({ ...f, price: `PKR ${digits}` }));
                              }}
                              placeholder="e.g. 85,000"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-zinc-600 mb-1">
                            Duration
                          </label>
                          <div className="flex items-center rounded-xl border border-zinc-200 bg-white focus-within:ring-2 focus-within:ring-amber-500/30 focus-within:border-amber-400 transition-colors">
                            <input
                              inputMode="numeric"
                              className="w-full rounded-xl bg-white px-3 py-2 text-sm text-zinc-800 focus:outline-none"
                              value={String(form.duration || "")
                                .replace(/days?/i, "")
                                .trim()}
                              onChange={(e) => {
                                const n = e.target.value.replace(/[^\d]/g, "");
                                setForm((f) => ({
                                  ...f,
                                  duration: `${n || 0} Days`,
                                }));
                              }}
                              placeholder="e.g. 14"
                            />
                            <div className="px-3 py-2 text-sm font-semibold text-zinc-600 border-l border-zinc-200">
                              Days
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-zinc-600 mb-1">
                            Badge
                          </label>
                          <input
                            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                            value={form.badge}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, badge: e.target.value }))
                            }
                            placeholder="e.g. Most popular"
                          />
                        </div>
                        <div>
                          {/* spacer */}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1">
                          Image URL
                        </label>
                        <input
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                          value={form.image}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, image: e.target.value }))
                          }
                          placeholder="https://..."
                        />
                      </div>
                    </fieldset>

                    {/* Divider */}
                    <hr className="border-zinc-100" />

                    {/* Section: Services */}
                    <fieldset className="space-y-2">
                      <legend className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Services included
                      </legend>
                      <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                        {[
                          ["ziyarat", "Ziyarat"],
                          ["transport", "Transport"],
                          ["visa", "Visa"],
                          ["ticket", "Ticket"],
                          ["hotel", "Hotel"],
                        ].map(([key, label]) => (
                          <label
                            key={key}
                            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 cursor-pointer transition-colors ${
                              form.services?.[key]
                                ? "border-amber-200 bg-amber-50/60"
                                : "border-zinc-200 bg-zinc-50 hover:bg-white"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={Boolean(form.services?.[key])}
                              onChange={(e) =>
                                setForm((f) => ({
                                  ...f,
                                  services: {
                                    ...(f.services || {}),
                                    [key]: e.target.checked,
                                  },
                                }))
                              }
                              className="h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-500"
                            />
                            <span className="text-sm text-zinc-700">{label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {/* Divider */}
                    <hr className="border-zinc-100" />

                    {/* Section: Journey stages */}
                    <fieldset className="space-y-2">
                      <legend className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Package includes (journey)
                      </legend>
                      <p className="text-xs text-zinc-400">
                        These will be shown on the package card like: Flight takeoff → In Madinah → In Makkah → Return flight.
                      </p>
                      <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                        {JOURNEY_STAGE_OPTIONS.map(([id, label]) => {
                          const checked = Array.isArray(form.journeyStages)
                            ? form.journeyStages.includes(id)
                            : false;
                          return (
                            <label
                              key={id}
                              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 cursor-pointer transition-colors ${
                                checked
                                  ? "border-amber-200 bg-amber-50/60"
                                  : "border-zinc-200 bg-zinc-50 hover:bg-white"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) =>
                                  setForm((f) => {
                                    const current = Array.isArray(f.journeyStages)
                                      ? f.journeyStages
                                      : [];
                                    const next = e.target.checked
                                      ? Array.from(new Set([...current, id]))
                                      : current.filter((x) => x !== id);
                                    return { ...f, journeyStages: next };
                                  })
                                }
                                className="h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-500"
                              />
                              <span className="text-sm text-zinc-700">{label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    {/* Divider */}
                    <hr className="border-zinc-100" />

                    {/* Section: Highlights */}
                    <fieldset className="space-y-2">
                      <div className="flex items-center justify-between">
                        <legend className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Highlights
                        </legend>
                        <button
                          type="button"
                          onClick={addHighlightRow}
                          className="text-xs text-amber-500 font-medium hover:text-amber-700 hover:underline transition-colors"
                        >
                          + Add row
                        </button>
                      </div>
                      <p className="text-xs text-zinc-400">Empty rows are ignored on save.</p>
                      <div className="space-y-2">
                        {form.highlights.map((h, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <select
                              value={h.iconKey}
                              onChange={(e) =>
                                updateHighlight(i, "iconKey", e.target.value)
                              }
                              className="rounded-xl border border-zinc-200 bg-white px-2 py-2 text-xs flex-shrink-0 w-28 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                            >
                              {ICON_OPTIONS.map((k) => (
                                <option key={k} value={k}>
                                  {k}
                                </option>
                              ))}
                            </select>
                            <input
                              className="flex-1 min-w-0 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                              value={h.text}
                              onChange={(e) =>
                                updateHighlight(i, "text", e.target.value)
                              }
                              placeholder="Highlight text"
                            />
                            {form.highlights.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeHighlightRow(i)}
                                className="p-1.5 text-zinc-300 hover:text-red-400 transition-colors flex-shrink-0"
                                aria-label="Remove row"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </fieldset>

                  
                    <div className="sticky bottom-0 -mx-5 -mb-5 px-5 py-4 bg-white/95 backdrop-blur-sm border-t border-zinc-100 flex justify-end gap-2 rounded-b-2xl mt-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 active:scale-95 disabled:opacity-60 transition-all"
                      >
                        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                        {editingId ? "Save changes" : "Create package"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Delete confirm ── */}
      {deleteTarget && (
        <>
          <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-[2px]" />
          <div className="fixed inset-0 z-[111] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-zinc-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 leading-tight">
                    Delete package?
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    This removes{" "}
                    <code className="font-mono text-zinc-700 bg-zinc-100 px-1 py-0.5 rounded text-xs">
                      {deleteTarget}
                    </code>{" "}
                    from the database and cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}