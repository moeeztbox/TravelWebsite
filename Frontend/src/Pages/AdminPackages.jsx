import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import { fetchPackages } from "../services/packageService";
import {
  adminCreatePackage,
  adminUpdatePackage,
  adminDeletePackage,
} from "../Services/adminService";
import { HIGHLIGHT_ICON_MAP } from "../constants/packageHighlightIcons";

const ICON_OPTIONS = Object.keys(HIGHLIGHT_ICON_MAP);

function emptyForm() {
  return {
    packageId: "",
    order: 0,
    title: "",
    subtitle: "",
    price: "",
    duration: "",
    badge: "",
    image: "",
    active: true,
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
    price: pkg.price ?? "",
    duration: pkg.duration ?? "",
    badge: pkg.badge ?? "",
    image: pkg.image ?? "",
    active: pkg.active !== false,
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
  const [openMenuId, setOpenMenuId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const packages = await fetchPackages();
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

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = (pkg) => {
    setEditingId(pkg.packageId);
    setForm(pkgToForm(pkg));
    setModalOpen(true);
    setOpenMenuId(null);
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add package
          </button>
        }
      >
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/80">
                  <th className="px-4 py-3 font-medium text-zinc-600 whitespace-nowrap">
                    Order
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-600">
                    Package ID
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-600">
                    Title
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-600">
                    Price
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-600">
                    Duration
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-600">
                    Status
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-600 w-12">
                    {" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-rose-500 mx-auto" />
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-zinc-500"
                    >
                      No packages yet. Click &quot;Add package&quot; to create
                      one.
                    </td>
                  </tr>
                ) : (
                  list.map((pkg) => (
                    <tr
                      key={pkg.packageId}
                      className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-zinc-700 whitespace-nowrap">
                        {pkg.order ?? "—"}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-800 max-w-[140px] truncate">
                        {pkg.packageId}
                      </td>
                      <td className="px-4 py-3 text-zinc-900 font-medium max-w-[200px] truncate">
                        {pkg.title}
                      </td>
                      <td className="px-4 py-3 text-zinc-600 whitespace-nowrap">
                        {pkg.price || "—"}
                      </td>
                      <td className="px-4 py-3 text-zinc-600">
                        {pkg.duration || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            pkg.active !== false
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                          }`}
                        >
                          {pkg.active !== false ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-2 py-2 relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((id) =>
                              id === pkg.packageId ? null : pkg.packageId
                            )
                          }
                          className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100"
                          aria-label="Actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === pkg.packageId ? (
                          <div className="absolute right-2 top-10 z-20 w-40 rounded-xl bg-white border border-zinc-200 shadow-lg py-1">
                            <button
                              type="button"
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                              onClick={() => openEdit(pkg)}
                            >
                              <Pencil className="h-4 w-4" />
                              Edit
                            </button>
                            <button
                              type="button"
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                              onClick={() => {
                                setOpenMenuId(null);
                                setDeleteTarget(pkg.packageId);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>

      {modalOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-zinc-200">
            <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-zinc-900">
                {editingId ? "Edit package" : "New package"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-zinc-600">
                    Package ID (slug) *
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm disabled:bg-zinc-50"
                    value={form.packageId}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, packageId: e.target.value }))
                    }
                    disabled={!!editingId}
                    required
                    placeholder="e.g. economy-umrah"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600">
                    Sort order
                  </label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                    value={form.order}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        order: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600">
                    Active
                  </label>
                  <label className="mt-2 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, active: e.target.checked }))
                      }
                      className="rounded border-zinc-300 text-rose-500 focus:ring-rose-500"
                    />
                    <span className="text-sm text-zinc-700">Show on site</span>
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-zinc-600">
                    Title *
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-zinc-600">
                    Subtitle
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                    value={form.subtitle}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subtitle: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600">
                    Price
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600">
                    Duration
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                    value={form.duration}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, duration: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600">
                    Badge
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                    value={form.badge}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, badge: e.target.value }))
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-zinc-600">
                    Image URL
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                    value={form.image}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, image: e.target.value }))
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-zinc-600">
                    Highlights (icon + text; empty lines ignored)
                  </label>
                  <button
                    type="button"
                    onClick={addHighlightRow}
                    className="text-xs text-rose-600 font-medium hover:underline"
                  >
                    + Add row
                  </button>
                </div>
                <div className="space-y-2">
                  {form.highlights.map((h, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <select
                        value={h.iconKey}
                        onChange={(e) =>
                          updateHighlight(i, "iconKey", e.target.value)
                        }
                        className="rounded-xl border border-zinc-200 px-2 py-2 text-xs shrink-0 max-w-[120px]"
                      >
                        {ICON_OPTIONS.map((k) => (
                          <option key={k} value={k}>
                            {k}
                          </option>
                        ))}
                      </select>
                      <input
                        className="flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                        value={h.text}
                        onChange={(e) =>
                          updateHighlight(i, "text", e.target.value)
                        }
                        placeholder="Highlight text"
                      />
                      {form.highlights.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => removeHighlightRow(i)}
                          className="p-2 text-zinc-400 hover:text-red-500"
                          aria-label="Remove row"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  {editingId ? "Save changes" : "Create package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900">
              Delete package?
            </h3>
            <p className="text-sm text-zinc-600 mt-2">
              This removes{" "}
              <span className="font-mono text-zinc-800">{deleteTarget}</span>{" "}
              from the database. This cannot be undone.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
