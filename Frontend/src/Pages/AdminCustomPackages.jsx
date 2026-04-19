import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Filter, Loader2, CheckCircle2, XCircle, X, Trash2 } from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import { api } from "../Services/authService";
import { useScrollLock } from "../Hooks/useScrollLock";

function userLabel(user, fallbackEmail) {
  if (user) {
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
    return name ? `${name} (${user.email})` : user.email || "Unknown user";
  }
  return fallbackEmail || "Unknown user";
}

function formatPkr(n) {
  const num = Number(n) || 0;
  return `PKR ${num.toLocaleString()}`;
}

export default function AdminCustomPackages() {
  /** Default "all" so approving a request does not make it vanish (it leaves "pending"). */
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [editFor, setEditFor] = useState(null);
  const [extraAmount, setExtraAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [adminNote, setAdminNote] = useState("");

  useScrollLock(Boolean(editFor));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/custom-packages", {
        params: { status: statusFilter },
      });
      setRequests(data.requests ?? []);
    } catch {
      toast.error("Failed to load custom package requests");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  /** After the user accepts, the booking lives under Bookings — hide converted rows here. */
  const visibleRequests = useMemo(
    () => (requests ?? []).filter((r) => !r.bookingId),
    [requests]
  );

  useEffect(() => {
    load();
  }, [load]);

  const setStatusQuick = async (id, status) => {
    setBusyId(id);
    try {
      await api.patch(`/admin/custom-packages/${id}`, { status });
      toast.success(`Request ${status}`);
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const openApprove = (r) => {
    setEditFor(r);
    const base = Math.round(Number(r.estimate?.total) || 0);
    const extraStr =
      r.adminExtra?.amount != null ? String(r.adminExtra.amount) : "";
    setExtraAmount(extraStr);
    if (r.adminTotal?.amount != null) {
      setTotalAmount(String(r.adminTotal.amount));
    } else {
      const ex = extraStr === "" ? 0 : Number(extraStr);
      setTotalAmount(String(base + (Number.isFinite(ex) ? Math.round(ex) : 0)));
    }
    setAdminNote(r.adminNote || "");
  };

  const handleExtraChange = (e) => {
    const v = e.target.value;
    setExtraAmount(v);
    if (!editFor) return;
    const base = Math.round(Number(editFor.estimate?.total) || 0);
    const extraNum = v === "" ? 0 : Number(v);
    if (v !== "" && !Number.isFinite(extraNum)) return;
    setTotalAmount(String(base + (Number.isFinite(extraNum) ? Math.round(extraNum) : 0)));
  };

  const saveApprove = async () => {
    if (!editFor) return;
    setBusyId(editFor._id);
    try {
      await api.patch(`/admin/custom-packages/${editFor._id}`, {
        status: "approved",
        extraAmount: extraAmount === "" ? undefined : Number(extraAmount),
        totalAmount: totalAmount === "" ? undefined : Number(totalAmount),
        adminNote,
      });
      toast.success("Offer saved. Waiting for the user to accept or decline.");
      setEditFor(null);
      setStatusFilter("approved");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Approve failed");
    } finally {
      setBusyId(null);
    }
  };

  const deleteUserDeclined = async (id) => {
    setBusyId(id);
    try {
      await api.delete(`/admin/custom-packages/${id}`);
      toast.success("Removed from list");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Remove failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout
      title="Custom Packages"
      subtitle="Approved requests stay here until the user accepts or declines. After they accept, the package appears under Bookings → Approved only."
      headerRight={
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 mr-1">
            <Filter className="h-4 w-4" />
            Status
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved (awaiting user or declined)</option>
            <option value="rejected">Rejected</option>
            <option value="all">All open (excludes converted)</option>
          </select>
        </div>
      }
    >
      {loading ? (
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-6 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500 mx-auto" />
        </div>
      ) : visibleRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-6 py-14 text-center text-zinc-500">
          {requests.length > 0 ? (
            <>
              <p className="text-zinc-700 font-medium">
                No open custom requests in this view.
              </p>
              <p className="text-sm mt-2">
                Accepted packages are listed only under{" "}
                <span className="font-semibold text-zinc-800">Bookings → Approved</span>.
              </p>
            </>
          ) : (
            "No custom package requests found."
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {visibleRequests.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 truncate">
                    {r.fullName} · {r.hotelCategory}★ · {r.passengers} pax
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {userLabel(r.user, r.email)} • {r.city || "—"} •{" "}
                    {r.startDate ? new Date(r.startDate).toLocaleDateString() : "—"}
                  </p>
                  {r.notes ? (
                    <p className="text-sm text-zinc-700 mt-3 whitespace-pre-wrap">
                      {r.notes}
                    </p>
                  ) : null}
                  {r.estimate?.total ? (
                    <p className="text-xs text-zinc-500 mt-3">
                      Estimate: <span className="font-semibold">{formatPkr(r.estimate.total)}</span>
                    </p>
                  ) : null}
                  {r.status === "approved" && r.adminTotal?.amount ? (
                    <p className="text-xs text-emerald-800 mt-2">
                      Final:{" "}
                      <span className="font-semibold">
                        {formatPkr(r.adminTotal.amount)}
                      </span>{" "}
                      {r.adminExtra?.amount ? (
                        <span className="text-zinc-500">
                          (Extra {formatPkr(r.adminExtra.amount)})
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                  {r.status === "approved" &&
                  !r.bookingId &&
                  r.userProposalStatus !== "rejected" ? (
                    <p className="text-xs text-sky-800 mt-2">
                      Waiting for the user to accept or decline your offer.
                    </p>
                  ) : null}
                  {r.status === "approved" &&
                  !r.bookingId &&
                  r.userProposalStatus === "rejected" ? (
                    <p className="text-xs text-amber-900 font-medium mt-2">
                      The user has rejected this offer.
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-2 justify-end">
                  <span className="text-xs px-2.5 py-1 rounded-full border border-zinc-200 text-zinc-600">
                    {r.status}
                    {r.status === "approved" && r.userProposalStatus === "rejected"
                      ? " · user declined"
                      : ""}
                  </span>
                  <button
                    type="button"
                    disabled={busyId === r._id}
                    onClick={() => openApprove(r)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-60"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {r.status === "approved" ? "Update offer" : "Approve"}
                  </button>
                  <button
                    type="button"
                    disabled={busyId === r._id}
                    onClick={() => setStatusQuick(r._id, "rejected")}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-60"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </button>
                  {r.status === "approved" &&
                  r.userProposalStatus === "rejected" &&
                  !r.bookingId ? (
                    <button
                      type="button"
                      disabled={busyId === r._id}
                      onClick={() => deleteUserDeclined(r._id)}
                      title="Remove from list"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-600 text-xs font-semibold hover:bg-red-50 hover:text-red-700 hover:border-red-200 disabled:opacity-60"
                      aria-label="Remove from list"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editFor ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-zinc-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  Approve custom package
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {editFor.fullName} · {editFor.hotelCategory}★ ·{" "}
                  {editFor.passengers} pax
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditFor(null)}
                className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {editFor?.estimate != null && editFor.estimate.total != null ? (
                <p className="text-xs text-zinc-500">
                  System estimate:{" "}
                  <span className="font-semibold text-zinc-700">
                    {formatPkr(editFor.estimate.total)}
                  </span>
                  . Final total fills automatically as estimate + extra (you can still edit the
                  total).
                </p>
              ) : null}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-600">
                    Extra amount (PKR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={extraAmount}
                    onChange={handleExtraChange}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="e.g. 15000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600">
                    Final total (PKR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    placeholder="e.g. 250000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-600">
                  Note to user (optional)
                </label>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  placeholder="Any extra details for the user..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditFor(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={busyId === editFor._id}
                  onClick={saveApprove}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-60"
                >
                  Save approval
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}

