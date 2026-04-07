import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Filter,
  ShieldCheck,
  CalendarClock,
  X,
} from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import {
  adminListBookings,
  adminSetBookingStatus,
  adminSetPaymentStatus,
  adminScheduleJourney,
} from "../Services/adminService";
import { getApiOrigin } from "../utils/apiOrigin";

function userLabel(user) {
  if (!user) return "Unknown user";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name ? `${name} (${user.email})` : user.email || "Unknown user";
}

export default function AdminBookings() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [scheduleFor, setScheduleFor] = useState(null);
  const [startAt, setStartAt] = useState("");
  const origin = getApiOrigin();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await adminListBookings(statusFilter);
      setBookings(rows);
    } catch (e) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const b of bookings) {
      const key = b.user?._id || b.user?.email || "unknown";
      if (!map.has(key)) map.set(key, { user: b.user, bookings: [] });
      map.get(key).bookings.push(b);
    }
    return Array.from(map.values());
  }, [bookings]);

  const setStatus = async (id, status) => {
    setBusyId(id);
    try {
      await adminSetBookingStatus(id, status);
      toast.success(`Booking ${status}`);
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const verifyPayment = async (id) => {
    setBusyId(id);
    try {
      await adminSetPaymentStatus(id, "verified");
      toast.success("Payment marked verified");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const failPayment = async (id) => {
    setBusyId(id);
    try {
      await adminSetPaymentStatus(id, "rejected");
      toast.success("Payment marked failed");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const schedule = async (id) => {
    if (!startAt) return;
    setBusyId(id);
    try {
      await adminScheduleJourney(id, new Date(startAt).toISOString());
      toast.success("Journey scheduled");
      setScheduleFor(null);
      setStartAt("");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Schedule failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminLayout
      title="Bookings"
      subtitle="All bookings stay visible here. Approve/reject, verify payment, then schedule Umrah start."
      headerRight={
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 mr-1">
            <Filter className="h-4 w-4" />
            Status
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>
      }
    >
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-6 py-16 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-rose-500 mx-auto" />
          </div>
        ) : grouped.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm px-6 py-14 text-center text-zinc-500">
            No bookings found.
          </div>
        ) : (
          grouped.map((g) => (
            <div
              key={g.user?._id || g.user?.email || "unknown"}
              className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-zinc-100">
                <div className="text-sm font-semibold text-zinc-900">
                  {userLabel(g.user)}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  Draft bookings: {g.bookings.length}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50/80">
                      <th className="px-4 py-3 font-medium text-zinc-600">
                        Package
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
                      <th className="px-4 py-3 font-medium text-zinc-600">
                        Payment
                      </th>
                      <th className="px-4 py-3 font-medium text-zinc-600 w-44">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.bookings.map((b) => {
                        const hasVisa = Boolean(b.documents?.visaPdf);
                        const hasOther = Boolean(b.documents?.otherPdf);
                        const hasReceipt = Boolean(b.payment?.receiptPdf);
                        const docsSubmitted = hasVisa && hasOther && hasReceipt;
                        const awaitingDocs =
                          b.status === "approved" && !docsSubmitted;
                        const canVerify =
                          b.status === "approved" &&
                          b.payment?.status === "verifying" &&
                          docsSubmitted;
                        return (
                      <tr
                        key={b._id}
                        className="border-b border-zinc-50 hover:bg-zinc-50/50"
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-zinc-900">
                            {b.packageTitle}
                          </div>
                          <div className="text-xs text-zinc-500 font-mono mt-0.5">
                            {b.packageId}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-zinc-600">
                          {b.packagePrice || "—"}
                        </td>
                        <td className="px-4 py-3 text-zinc-600">
                          {b.packageDuration || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              b.status === "approved"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : b.status === "rejected"
                                  ? "bg-red-50 text-red-700 border border-red-100"
                                  : "bg-amber-50 text-amber-800 border border-amber-100"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              b.payment?.status === "verified"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : b.payment?.status === "verifying"
                                  ? "bg-amber-50 text-amber-800 border border-amber-100"
                                  : b.payment?.status === "rejected"
                                    ? "bg-red-50 text-red-700 border border-red-100"
                                    : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                            }`}
                          >
                            {b.payment?.status || "none"}
                          </span>
                          <div className="text-xs text-zinc-500 space-x-2">
                            {hasVisa ? (
                              <a
                                className="hover:underline text-rose-700"
                                href={`${origin}${b.documents.visaPdf}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Visa PDF
                              </a>
                            ) : (
                              <span className="text-zinc-400">Visa: missing</span>
                            )}
                            {hasOther ? (
                              <a
                                className="hover:underline text-rose-700"
                                href={`${origin}${b.documents.otherPdf}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Other PDF
                              </a>
                            ) : (
                              <span className="text-zinc-400">Other: missing</span>
                            )}
                            {hasReceipt ? (
                              <a
                                className="hover:underline text-rose-700"
                                href={`${origin}${b.payment.receiptPdf}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Receipt
                              </a>
                            ) : (
                              <span className="text-zinc-400">Receipt: missing</span>
                            )}
                          </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {b.status === "approved" &&
                            b.payment?.status === "verified" &&
                            b.journey?.startAt ? (
                              <div className="min-w-[200px]">
                                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold">
                                  Approved
                                  <span className="text-emerald-700/70 font-medium">
                                    • Starts{" "}
                                    {new Date(b.journey.startAt).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            ) : null}
                            <button
                              type="button"
                              disabled={
                                busyId === b._id ||
                                b.status !== "pending" ||
                                (b.status === "approved" &&
                                  b.payment?.status === "verified" &&
                                  b.journey?.startAt)
                              }
                              onClick={() => setStatus(b._id, "approved")}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-60"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Approve
                            </button>
                            <button
                              type="button"
                              disabled={busyId === b._id}
                              onClick={() => setStatus(b._id, "rejected")}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-60"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </button>
                            {awaitingDocs ? (
                              <span className="text-[11px] text-zinc-500">
                                Waiting for user documents
                              </span>
                            ) : null}
                            {canVerify ? (
                              <button
                                type="button"
                                disabled={busyId === b._id}
                                onClick={() => verifyPayment(b._id)}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 disabled:opacity-60"
                              >
                                <ShieldCheck className="h-4 w-4" />
                                Verify
                              </button>
                            ) : null}
                            {b.status === "approved" &&
                            b.payment?.status === "verifying" &&
                            docsSubmitted ? (
                              <button
                                type="button"
                                disabled={busyId === b._id}
                                onClick={() => failPayment(b._id)}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-700 text-white text-xs font-semibold hover:bg-red-800 disabled:opacity-60"
                              >
                                <XCircle className="h-4 w-4" />
                                Fail
                              </button>
                            ) : null}
                            {b.status === "approved" &&
                            b.payment?.status === "verified" ? (
                              <button
                                type="button"
                                disabled={busyId === b._id}
                                onClick={() => {
                                  setScheduleFor(b._id);
                                  setStartAt(
                                    b.journey?.startAt
                                      ? new Date(b.journey.startAt)
                                          .toISOString()
                                          .slice(0, 16)
                                      : ""
                                  );
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 disabled:opacity-60"
                              >
                                <CalendarClock className="h-4 w-4" />
                                {b.journey?.startAt ? "Reschedule" : "Start date"}
                              </button>
                            ) : null}
                          </div>
                          {b.status === "approved" && !docsSubmitted ? (
                            <p className="text-[11px] text-zinc-500 mt-2">
                              Waiting for: visa PDF, other PDF, and payment receipt.
                            </p>
                          ) : null}
                        </td>
                      </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      {scheduleFor ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white border border-zinc-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  Schedule Umrah start
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  This will move the user into the User Statuses tab.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setScheduleFor(null)}
                className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <label className="block text-xs font-medium text-zinc-600">
                Start date & time
              </label>
              <input
                type="datetime-local"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setScheduleFor(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={busyId === scheduleFor || !startAt}
                  onClick={() => schedule(scheduleFor)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-60"
                >
                  Save schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}

