import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Loader2, CheckCircle2, XCircle, ShieldCheck,
  CalendarClock, X, Trash2,
} from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import {
  adminListBookings, adminSetBookingStatus, adminSetPaymentStatus,
  adminScheduleJourney, adminDeleteBooking,
} from "../Services/adminService";
import { getApiOrigin } from "../utils/apiOrigin";

function userLabel(user) {
  if (!user) return "Unknown user";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name ? `${name} (${user.email})` : user.email || "Unknown user";
}

export default function AdminBookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [scheduleFor, setScheduleFor] = useState(null);
  const [startAt, setStartAt] = useState("");
  const origin = getApiOrigin();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await adminListBookings("all");
      setBookings(rows);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const grouped = useCallback((rows) => {
    const map = new Map();
    for (const b of rows) {
      const key = b.user?._id || b.user?.email || "unknown";
      if (!map.has(key)) map.set(key, { user: b.user, bookings: [] });
      map.get(key).bookings.push(b);
    }
    return Array.from(map.values());
  }, []);

  const pendingGrouped  = useMemo(() => grouped(bookings.filter(b => b.status === "pending")),  [bookings, grouped]);
  const approvedGrouped = useMemo(() => grouped(bookings.filter(b => b.status === "approved")), [bookings, grouped]);
  const rejectedGrouped = useMemo(() => grouped(bookings.filter(b => b.status === "rejected")), [bookings, grouped]);

  const pendingCount  = useMemo(() => bookings.filter(b => b.status === "pending").length,  [bookings]);
  const approvedCount = useMemo(() => bookings.filter(b => b.status === "approved").length, [bookings]);
  const rejectedCount = useMemo(() => bookings.filter(b => b.status === "rejected").length, [bookings]);
  const totalCount = pendingCount + approvedCount + rejectedCount;

  const setStatus = async (id, status) => {
    setBusyId(id);
    try {
      await adminSetBookingStatus(id, status);
      toast.success(`Booking ${status}`);
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally { setBusyId(null); }
  };

  const verifyPayment = async (id) => {
    setBusyId(id);
    try {
      await adminSetPaymentStatus(id, "verified");
      toast.success("Payment marked verified");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally { setBusyId(null); }
  };

  const failPayment = async (id) => {
    setBusyId(id);
    try {
      await adminSetPaymentStatus(id, "rejected");
      toast.success("Payment marked failed");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally { setBusyId(null); }
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
    } finally { setBusyId(null); }
  };

  const removeRejected = async (id) => {
    setBusyId(id);
    try {
      await adminDeleteBooking(id);
      toast.success("Rejected booking removed");
      await load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Remove failed");
    } finally { setBusyId(null); }
  };

  const BookingCard = ({ b, allowDeleteRejected }) => {
    const hasVisa    = Boolean(b.documents?.visaPdf);
    const hasOther   = Boolean(b.documents?.otherPdf);
    const hasReceipt = Boolean(b.payment?.receiptPdf);
    const docsSubmitted  = hasVisa && hasOther && hasReceipt;
    const awaitingDocs   = b.status === "approved" && !docsSubmitted;
    const canVerify      = b.status === "approved" && b.payment?.status === "verifying" && docsSubmitted;
    const lockStatus     = b.payment?.status === "verified" || Boolean(b.journey?.startAt);
    const fullyScheduled = b.status === "approved" && b.payment?.status === "verified" && b.journey?.startAt;

    const statusColors = {
      approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      pending:  "bg-amber-50 text-amber-800 border-amber-200",
    };
    const payColors = {
      verified:  "bg-emerald-50 text-emerald-700 border-emerald-200",
      verifying: "bg-amber-50 text-amber-800 border-amber-200",
      rejected:  "bg-red-50 text-red-700 border-red-200",
    };

    return (
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100 flex flex-wrap items-start justify-between gap-2 bg-zinc-50/60">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-900 truncate">{b.packageTitle}</p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">{b.packageId}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[b.status] || "bg-zinc-100 text-zinc-600 border-zinc-200"}`}>
              {b.status}
            </span>
            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${payColors[b.payment?.status] || "bg-zinc-100 text-zinc-600 border-zinc-200"}`}>
              {b.payment?.status || "no payment"}
            </span>
          </div>
        </div>

        <div className="px-4 py-3 space-y-3">
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-500">
            <span><span className="text-zinc-400">Price</span> <span className="font-medium text-zinc-700">{b.packagePrice || "—"}</span></span>
            <span><span className="text-zinc-400">Duration</span> <span className="font-medium text-zinc-700">{b.packageDuration || "—"}</span></span>
            {fullyScheduled && (
              <span><span className="text-zinc-400">Starts</span> <span className="font-medium text-emerald-700">{new Date(b.journey.startAt).toLocaleString()}</span></span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { label: "Visa PDF",   href: hasVisa    ? `${origin}${b.documents.visaPdf}`  : null },
              { label: "Other PDF",  href: hasOther   ? `${origin}${b.documents.otherPdf}` : null },
              { label: "Receipt",    href: hasReceipt ? `${origin}${b.payment.receiptPdf}` : null },
            ].map(({ label, href }) =>
              href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100 transition-colors font-medium">
                  ↗ {label}
                </a>
              ) : (
                <span key={label} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-400 border border-zinc-200">
                  {label}: missing
                </span>
              )
            )}
          </div>

          
          {awaitingDocs && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              ⏳ Waiting for user to upload: visa PDF, other PDF, and payment receipt.
            </p>
          )}
          {lockStatus && !awaitingDocs && (
            <p className="text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2">
              🔒 Status locked after payment verification / scheduling.
            </p>
          )}

         
          <div className="flex flex-wrap items-center gap-2 pt-1">
          
            <button type="button"
              disabled={busyId === b._id || b.status === "rejected" || fullyScheduled}
              onClick={() => setStatus(b._id, "approved")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {busyId === b._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
              Approve
            </button>

           
            <button type="button"
              disabled={busyId === b._id || lockStatus || b.status === "rejected"}
              onClick={() => setStatus(b._id, "rejected")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {busyId === b._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
              Reject
            </button>

          
            {canVerify && (
              <button type="button"
                disabled={busyId === b._id}
                onClick={() => verifyPayment(b._id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 disabled:opacity-50 transition-colors">
                {busyId === b._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                Verify payment
              </button>
            )}

          
            {b.status === "approved" && b.payment?.status === "verifying" && docsSubmitted && (
              <button type="button"
                disabled={busyId === b._id}
                onClick={() => failPayment(b._id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-700 text-white text-xs font-semibold hover:bg-red-800 disabled:opacity-50 transition-colors">
                {busyId === b._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                Fail payment
              </button>
            )}

           
            {b.status === "approved" && b.payment?.status === "verified" && (
              <button type="button"
                disabled={busyId === b._id}
                onClick={() => {
                  setScheduleFor(b._id);
                  setStartAt(b.journey?.startAt ? new Date(b.journey.startAt).toISOString().slice(0, 16) : "");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 disabled:opacity-50 transition-colors">
                <CalendarClock className="h-3.5 w-3.5" />
                {b.journey?.startAt ? "Reschedule" : "Set start date"}
              </button>
            )}

           
            {allowDeleteRejected && b.status === "rejected" && (
              <button type="button"
                disabled={busyId === b._id}
                onClick={() => removeRejected(b._id)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors ml-auto"
                title="Remove booking" aria-label="Remove booking">
                {busyId === b._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGroups = (groups, opts = {}) => {
    const { allowDeleteRejected = false } = opts;
    if (groups.length === 0) {
      return (
        <div className="bg-white rounded-xl border border-zinc-200 px-5 py-10 text-center text-sm text-zinc-400">
          No bookings found.
        </div>
      );
    }
    return (
      <div className="space-y-3">
        {groups.map(g => (
          <div key={g.user?._id || g.user?.email || "unknown"}
            className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between gap-3 bg-zinc-50">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-800 truncate">{userLabel(g.user)}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{g.bookings.length} booking{g.bookings.length !== 1 ? "s" : ""}</p>
              </div>
            </div>
            <div className="p-3 space-y-3">
              {g.bookings.map(b => (
                <BookingCard key={b._id} b={b} allowDeleteRejected={allowDeleteRejected} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const SummaryStrip = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {[
        { label: "Total",    count: totalCount,    color: "text-zinc-700",    bg: "bg-white border-zinc-200" },
        { label: "Pending",  count: pendingCount,  color: "text-amber-700",   bg: "bg-amber-50 border-amber-200" },
        { label: "Approved", count: approvedCount, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
        { label: "Rejected", count: rejectedCount, color: "text-red-700",     bg: "bg-red-50 border-red-200" },
      ].map(({ label, count, color, bg }) => (
        <div key={label} className={`rounded-xl border px-4 py-3 ${bg}`}>
          <p className="text-xs text-zinc-500 mb-1">{label}</p>
          <p className={`text-2xl font-semibold ${color}`}>{count}</p>
        </div>
      ))}
    </div>
  );

  const Section = ({ title, subtitle, count, countColor, borderColor, bgColor, badgeColor, children }) => (
    <section className={`rounded-2xl border ${borderColor} ${bgColor} p-4 sm:p-5`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
          <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
        </div>
        <span className={`text-xs font-semibold rounded-full px-3 py-1 border bg-white ${badgeColor} flex-shrink-0`}>
          {count}
        </span>
      </div>
      {children}
    </section>
  );

  return (
    <AdminLayout
      title="Bookings"
      subtitle="Approve/reject bookings, verify payments, and schedule Umrah start dates."
      headerRight={null}
    >
      <div className="space-y-5">
        {loading ? (
          <div className="bg-white rounded-2xl border border-zinc-200 px-6 py-20 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
          </div>
        ) : (
          <>
            <SummaryStrip />

            {totalCount === 0 && (
              <div className="bg-white rounded-2xl border border-zinc-200 px-6 py-16 text-center text-sm text-zinc-400">
                No bookings found.
              </div>
            )}

            {pendingCount > 0 && (
              <Section
                title="Pending" subtitle="Awaiting admin review."
                count={pendingCount} countColor="text-amber-800"
                borderColor="border-amber-200/70" bgColor="bg-amber-50/30"
                badgeColor="text-amber-800 border-amber-200"
              >
                {renderGroups(pendingGrouped)}
              </Section>
            )}

            {approvedCount > 0 && (
              <Section
                title="Approved" subtitle="Verify payment then schedule journey."
                count={approvedCount} countColor="text-emerald-800"
                borderColor="border-emerald-200/70" bgColor="bg-emerald-50/30"
                badgeColor="text-emerald-800 border-emerald-200"
              >
                {renderGroups(approvedGrouped)}
              </Section>
            )}

            {rejectedCount > 0 && (
              <Section
                title="Rejected" subtitle="Remove entries no longer needed."
                count={rejectedCount} countColor="text-red-800"
                borderColor="border-red-200/70" bgColor="bg-red-50/30"
                badgeColor="text-red-800 border-red-200"
              >
                {renderGroups(rejectedGrouped, { allowDeleteRejected: true })}
              </Section>
            )}
          </>
        )}
      </div>

      {scheduleFor && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-zinc-200 shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Schedule Umrah start</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Moves user into active journey status.</p>
              </div>
              <button type="button" onClick={() => setScheduleFor(null)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1.5">Start date & time</label>
                <input type="datetime-local" value={startAt}
                  onChange={e => setStartAt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400/30" required />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setScheduleFor(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 border border-zinc-200 hover:bg-zinc-50 transition-colors">
                  Cancel
                </button>
                <button type="button" disabled={busyId === scheduleFor || !startAt}
                  onClick={() => schedule(scheduleFor)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 transition-colors">
                  {busyId === scheduleFor && <Loader2 className="h-4 w-4 animate-spin" />}
                  {busyId === scheduleFor ? "Saving…" : "Save schedule"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}