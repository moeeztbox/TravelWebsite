import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useScrollLock } from "../Hooks/useScrollLock";
import { Check, X, Trash2, Loader2, Star, Eye } from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import {
  adminListReviews,
  adminSetReviewStatus,
  adminDeleteReview,
} from "../Services/adminService";

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function statusBadgeClass(status) {
  if (status === "Approved") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  }
  if (status === "Rejected") {
    return "bg-red-50 text-red-700 ring-1 ring-red-100";
  }
  return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
}

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${
            n <= rating ? "text-amber-500 fill-amber-400" : "text-zinc-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [viewTarget, setViewTarget] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const reviews = await adminListReviews();
      setList(reviews);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useScrollLock(Boolean(deleteTarget || viewTarget));

  const handleSetStatus = async (id, status) => {
    setActingId(id);
    try {
      const updated = await adminSetReviewStatus(id, status);
      setList((prev) => prev.map((r) => (r._id === id ? updated : r)));
      toast.success(`Review ${status.toLowerCase()}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Action failed";
      toast.error(msg);
    } finally {
      setActingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminDeleteReview(deleteTarget);
      setList((prev) => prev.filter((r) => r._id !== deleteTarget));
      toast.success("Review deleted");
      setDeleteTarget(null);
    } catch (err) {
      const msg = err.response?.data?.message || "Delete failed";
      toast.error(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <AdminLayout
        title="Reviews"
        subtitle="Approve, reject, or remove reviews submitted from the Contact Us page."
      >
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/80">
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                    Name
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">
                    Email
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden lg:table-cell">
                    Phone
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                    Review
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">
                    Rating
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide hidden sm:table-cell">
                    Submitted
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
                    <td colSpan={8} className="px-4 py-20 text-center">
                      <Loader2 className="h-7 w-7 animate-spin text-amber-400 mx-auto" />
                      <p className="mt-3 text-xs text-zinc-400">Loading reviews…</p>
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-16 text-center">
                      <p className="text-sm text-zinc-500">No reviews yet.</p>
                    </td>
                  </tr>
                ) : (
                  list.map((r) => (
                    <tr
                      key={r._id}
                      className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/60 transition-colors align-top"
                    >
                      <td className="px-4 py-3.5 text-zinc-900 font-medium max-w-[160px]">
                        <span className="truncate block">{r.fullName}</span>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-600 hidden md:table-cell max-w-[180px]">
                        <span className="truncate block">{r.email}</span>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-600 hidden lg:table-cell whitespace-nowrap">
                        {r.phone}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-700 max-w-[260px]">
                        <p className="line-clamp-2">{r.review}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <RatingStars rating={r.rating} />
                      </td>
                      <td className="px-4 py-3.5 text-zinc-500 text-xs hidden sm:table-cell whitespace-nowrap">
                        {formatDate(r.createdAt)}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusBadgeClass(
                            r.status
                          )}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-2 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewTarget(r)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
                            aria-label={`View full review from ${r.fullName}`}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {r.status === "Pending" ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleSetStatus(r._id, "Approved")}
                                disabled={actingId === r._id}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                aria-label={`Approve review from ${r.fullName}`}
                                title="Approve"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSetStatus(r._id, "Rejected")}
                                disabled={actingId === r._id}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                aria-label={`Reject review from ${r.fullName}`}
                                title="Reject"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(r._id)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            aria-label={`Delete review from ${r.fullName}`}
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

          {list.length > 0 && !loading && (
            <div className="px-4 py-2.5 border-t border-zinc-100 bg-zinc-50/50">
              <p className="text-xs text-zinc-400">
                {list.length} review{list.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </AdminLayout>

      {/* View full review */}
      {viewTarget && (
        <>
          <div
            className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-[2px]"
            data-admin-modal="true"
            aria-hidden="true"
            onClick={() => setViewTarget(null)}
          />
          <div
            className="fixed inset-0 z-[111] flex items-center justify-center p-4"
            data-admin-modal="true"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-view-review-title"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col border border-zinc-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="shrink-0 px-6 py-4 border-b border-zinc-100 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3
                    id="admin-view-review-title"
                    className="text-base font-semibold text-zinc-900 leading-tight"
                  >
                    {viewTarget.fullName}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {viewTarget.email} · {viewTarget.phone}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <RatingStars rating={viewTarget.rating} />
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusBadgeClass(
                        viewTarget.status
                      )}`}
                    >
                      {viewTarget.status}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewTarget(null)}
                  className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden px-6 py-4">
                <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap break-words">
                  {viewTarget.review}
                </p>
              </div>
              <div className="shrink-0 px-6 py-3 border-t border-zinc-100 text-right">
                <p className="text-xs text-zinc-400">
                  Submitted {formatDate(viewTarget.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <>
          <div
            className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-[2px]"
            data-admin-modal="true"
            aria-hidden="true"
          />
          <div
            className="fixed inset-0 z-[111] flex items-center justify-center p-4"
            data-admin-modal="true"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-delete-review-title"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-zinc-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h3
                    id="admin-delete-review-title"
                    className="text-base font-semibold text-zinc-900 leading-tight"
                  >
                    Delete review?
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    This permanently removes this review from the database and
                    cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-60 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 active:scale-95 disabled:opacity-60 transition-all"
                >
                  {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
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
