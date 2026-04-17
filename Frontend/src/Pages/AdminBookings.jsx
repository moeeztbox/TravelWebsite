import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Loader2, CheckCircle2, XCircle, ShieldCheck,
  CalendarClock, X, Trash2, OctagonAlert,
} from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import {
  adminListBookings, adminSetBookingStatus, adminSetPaymentStatus,
  adminScheduleJourney, adminDeleteBooking,
} from "../Services/adminService";
import { getApiOrigin } from "../utils/apiOrigin";
import { useScrollLock } from "../Hooks/useScrollLock";
import ReasonDialog from "../Components/Admin/ReasonDialog";

/** True once the scheduled start time has passed or the journey has moved past "scheduled". */
function journeyHasStarted(journey) {
  if (!journey) return false;
  const inProgress = new Set([
    "flight_takeoff",
    "in_makkah",
    "in_madinah",
    "return_flight",
    "completed",
  ]);
  if (inProgress.has(journey.stage || "")) return true;
  const t = journey.startAt ? new Date(journey.startAt).getTime() : NaN;
  if (Number.isNaN(t)) return false;
  return Date.now() >= t;
}

function userLabel(user) {
  if (!user) return "Unknown user";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name ? `${name} (${user.email})` : user.email || "Unknown user";
}

function stageLabel(stage) {
  const map = {
    not_started: "Not started",
    scheduled: "Scheduled",
    flight_takeoff: "Flight takeoff",
    jeddah_airport: "Jeddah airport",
    in_jeddah: "In Jeddah",
    ziyarat: "Ziyarat",
    in_makkah: "In Makkah",
    in_madinah: "In Madinah",
    makkah_airport: "Makkah airport",
    return_flight: "Return flight",
    completed: "Completed",
  };
  return map[stage] || stage || "—";
}

function planLabel(plan) {
  const ids = Array.isArray(plan) ? plan : [];
  const cleaned = ids
    .map((s) => String(s || "").trim())
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .filter((v) => v !== "scheduled" && v !== "completed");
  if (!cleaned.length) return "—";
  return cleaned.map((id) => stageLabel(id)).join(" → ");
}

export default function AdminBookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [scheduleFor, setScheduleFor] = useState(null);
  const [startAt, setStartAt] = useState("");
  // Journey plan is chosen by the user at booking time.
  const [reasonDialog, setReasonDialog] = useState({
    open: false,
    bookingId: null,
    status: "",
  });
  const origin = getApiOrigin();

  useEffect(() => {
    // Keep native scroll behavior (avoid page-level overrides that can fight scroll-lock).
  }, []);

  const load = useCallback(async (opts = {}) => {
    const silent = Boolean(opts.silent);
    if (!silent) setLoading(true);
    try {
      const rows = await adminListBookings("all");
      setBookings(rows);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useScrollLock(Boolean(scheduleFor || reasonDialog.open));

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
  const cancelledGrouped = useMemo(() => grouped(bookings.filter(b => b.status === "cancelled")), [bookings, grouped]);

  const pendingCount  = useMemo(() => bookings.filter(b => b.status === "pending").length,  [bookings]);
  const approvedCount = useMemo(() => bookings.filter(b => b.status === "approved").length, [bookings]);
  const rejectedCount = useMemo(() => bookings.filter(b => b.status === "rejected").length, [bookings]);
  const cancelledCount = useMemo(() => bookings.filter(b => b.status === "cancelled").length, [bookings]);
  const totalCount = pendingCount + approvedCount + rejectedCount + cancelledCount;

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = window.innerWidth >= 1024 ? 96 : 80; // match fixed top nav spacing
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const setStatus = async (id, status) => {
    const needsReason = status === "cancelled" || status === "rejected";
    if (needsReason) {
      setReasonDialog({ open: true, bookingId: id, status });
      return;
    }
    setBusyId(id);
    try {
      await adminSetBookingStatus(id, status, "");
      toast.success(`Booking ${status}`);
      await load({ silent: true });
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const confirmReason = async (text) => {
    const { bookingId, status } = reasonDialog;
    if (!bookingId || !status) {
      setReasonDialog({ open: false, bookingId: null, status: "" });
      return;
    }
    setBusyId(bookingId);
    try {
      await adminSetBookingStatus(bookingId, status, String(text || ""));
      toast.success(`Booking ${status}`);
      setReasonDialog({ open: false, bookingId: null, status: "" });
      await load({ silent: true });
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
      await load({ silent: true });
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally { setBusyId(null); }
  };

  const failPayment = async (id) => {
    setBusyId(id);
    try {
      await adminSetPaymentStatus(id, "rejected");
      toast.success("Payment marked failed");
      await load({ silent: true });
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
      await load({ silent: true });
    } catch (e) {
      toast.error(e.response?.data?.message || "Schedule failed");
    } finally { setBusyId(null); }
  };

  const removeRejected = async (id) => {
    setBusyId(id);
    try {
      await adminDeleteBooking(id);
      toast.success("Rejected booking removed");
      await load({ silent: true });
    } catch (e) {
      toast.error(e.response?.data?.message || "Remove failed");
    } finally { setBusyId(null); }
  };

  const removeCancelled = async (id) => {
    setBusyId(id);
    try {
      await adminDeleteBooking(id);
      toast.success("Cancelled booking removed");
      await load({ silent: true });
    } catch (e) {
      toast.error(e.response?.data?.message || "Remove failed");
    } finally {
      setBusyId(null);
    }
  };

  const methodLabel = (m) =>
    m === "jazzcash"
      ? "JazzCash"
      : m === "easypaisa"
        ? "Easypaisa"
        : m === "card"
          ? "Card"
          : m === "bank_transfer"
            ? "Bank transfer"
            : m === "stripe"
              ? "Stripe"
              : m || "—";

  const BookingCard = ({ b, allowDeleteRejected, allowDeleteCancelled }) => {
    const hasVisa    = Boolean(b.documents?.visaPdf);
    const hasOther   = Boolean(b.documents?.otherPdf);
    const hasReceipt = Boolean(b.payment?.receiptPdf);
    const isStripe   = b.payment?.method === "stripe";
    const hasStripePaymentProof =
      isStripe && Boolean(b.payment?.stripePaymentIntentId);
    const paymentProofComplete = hasReceipt || hasStripePaymentProof;
    const docsSubmitted  = hasVisa && hasOther && paymentProofComplete;
    const awaitingDocs   = b.status === "approved" && !docsSubmitted;
    const canVerify      = b.status === "approved" && b.payment?.status === "verifying" && docsSubmitted;
    const lockStatus     = b.payment?.status === "verified" || Boolean(b.journey?.startAt);
    const fullyScheduled = b.status === "approved" && b.payment?.status === "verified" && b.journey?.startAt;
    const rescheduleLocked = journeyHasStarted(b.journey);

    const statusColors = {
      approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      pending:  "bg-amber-50 text-amber-800 border-amber-200",
      cancelled: "bg-zinc-100 text-zinc-700 border-zinc-200",
    };
    const payColors = {
      verified:  "bg-emerald-50 text-emerald-700 border-emerald-200",
      verifying: "bg-amber-50 text-amber-800 border-amber-200",
      rejected:  "bg-red-50 text-red-700 border-red-200",
    };

    return (
      <div
        id={`admin-booking-${b._id}`}
        className="bg-white rounded-xl border border-zinc-200 overflow-hidden scroll-mt-24"
      >
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
            {b.payment?.method ? (
              <span
                title={
                  isStripe
                    ? "Paid via Stripe — no PDF receipt from the user"
                    : undefined
                }
                className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                  isStripe
                    ? "bg-violet-50 text-violet-800 border-violet-200"
                    : "bg-white text-zinc-600 border-zinc-200"
                }`}
              >
                {methodLabel(b.payment.method)}
              </span>
            ) : null}
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

          <div className="text-xs text-zinc-600">
            <span className="text-zinc-400">Journey selected:</span>{" "}
            <span className="font-medium text-zinc-800">
              {planLabel(b.journey?.plan)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { label: "Visa PDF",   href: hasVisa    ? `${origin}${b.documents.visaPdf}`  : null },
              { label: "Other PDF",  href: hasOther   ? `${origin}${b.documents.otherPdf}` : null },
            ].map(({ label, href }) =>
              href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100 transition-colors font-medium">
                  ↗ {label}
                </a>
              ) : (
                <span key={label} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-400 border border-zinc-200">
                  {label}: missing
                </span>
              )
            )}
            {isStripe ? (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-lg bg-violet-50 text-violet-800 border border-violet-200 font-medium"
                title="Payment method is Stripe — no PDF receipt upload"
              >
                Payment receipt: not required (Stripe)
              </span>
            ) : hasReceipt ? (
              <a
                href={`${origin}${b.payment.receiptPdf}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100 transition-colors font-medium"
              >
                ↗ Receipt PDF
              </a>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-400 border border-zinc-200">
                Receipt PDF: missing
              </span>
            )}
          </div>

          
          {awaitingDocs && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              ⏳ Waiting for user:{" "}
              {[
                !hasVisa ? "visa PDF" : null,
                !hasOther ? "other PDF" : null,
                !paymentProofComplete
                  ? isStripe
                    ? "Stripe payment completion"
                    : "payment receipt PDF"
                  : null,
              ]
                .filter(Boolean)
                .join(", ") || "required documents"}
              .
            </p>
          )}
          {lockStatus && !awaitingDocs && (
            <p className="text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2">
              🔒 Status locked after payment verification / scheduling.
            </p>
          )}

         
          <div className="flex flex-wrap items-center gap-2 pt-1">
          
            <button type="button"
              disabled={busyId === b._id || b.status !== "pending" || fullyScheduled}
              onClick={() => setStatus(b._id, "approved")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {busyId === b._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
              Approve
            </button>

           
            <button type="button"
              disabled={busyId === b._id || lockStatus || b.status !== "pending"}
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
                disabled={busyId === b._id || rescheduleLocked}
                title={rescheduleLocked ? "Cannot reschedule after the journey has started." : undefined}
              onClick={() => {
                  setScheduleFor(b._id);
                  setStartAt(b.journey?.startAt ? new Date(b.journey.startAt).toISOString().slice(0, 16) : "");
                  const plan = Array.isArray(b.journey?.plan) ? b.journey.plan : [];
                  // Default selection (admin can uncheck)
                  setSelectedStages(
                    plan.length
                      ? plan.filter((s) => s !== "scheduled" && s !== "completed")
                      : [
                          "flight_takeoff",
                          "jeddah_airport",
                          "in_jeddah",
                          "in_makkah",
                          "in_madinah",
                          "ziyarat",
                          "return_flight",
                        ]
                  );
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <CalendarClock className="h-3.5 w-3.5" />
                {b.journey?.startAt ? "Reschedule" : "Set start date"}
              </button>
            )}

{b.status !== "cancelled" ? (
              <button
                type="button"
                disabled={busyId === b._id}
                onClick={() => setStatus(b._id, "cancelled")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="cancel"
              >
                {busyId === b._id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <OctagonAlert className="h-3.5 w-3.5" />
                )}
                cancel
              </button>
            ) : null}
           
            {allowDeleteRejected && b.status === "rejected" && (
              <button type="button"
                disabled={busyId === b._id}
                onClick={() => removeRejected(b._id)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors ml-auto"
                title="Remove booking" aria-label="Remove booking">
                {busyId === b._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              </button>
            )}
            {allowDeleteCancelled && b.status === "cancelled" && (
              <button
                type="button"
                disabled={busyId === b._id}
                onClick={() => removeCancelled(b._id)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors ml-auto"
                title="Remove cancelled booking"
                aria-label="Remove cancelled booking"
              >
                {busyId === b._id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </div>

          {b.status === "approved" && b.payment?.status === "verified" && rescheduleLocked ? (
            <p className="text-xs text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2">
              Journey has started — rescheduling is disabled.
            </p>
          ) : null}
        </div>
      </div>
    );
  };

  const renderGroups = (groups, opts = {}) => {
    const { allowDeleteRejected = false, allowDeleteCancelled = false } = opts;
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
                <BookingCard
                  key={b._id}
                  b={b}
                  allowDeleteRejected={allowDeleteRejected}
                  allowDeleteCancelled={allowDeleteCancelled}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const SummaryStrip = () => (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      {[
        { label: "Total",    count: totalCount,    color: "text-zinc-700",    bg: "bg-white border-zinc-200" },
        { label: "Pending",  count: pendingCount,  color: "text-amber-700",   bg: "bg-amber-50 border-amber-200", scrollId: "pending-requests" },
        { label: "Approved", count: approvedCount, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", scrollId: "approved-bookings" },
        { label: "Rejected", count: rejectedCount, color: "text-red-700",     bg: "bg-red-50 border-red-200", scrollId: "rejected-requests" },
        { label: "Cancelled", count: cancelledCount, color: "text-zinc-700", bg: "bg-zinc-50 border-zinc-200", scrollId: "cancelled-requests" },
      ].map(({ label, count, color, bg }) => (
        label === "Total" ? (
          <div key={label} className={`rounded-xl border px-4 py-3 ${bg}`}>
            <p className="text-xs text-zinc-500 mb-1">{label}</p>
            <p className={`text-2xl font-semibold ${color}`}>{count}</p>
          </div>
        ) : (
          <button
            key={label}
            type="button"
            onClick={() => scrollToSection(
              label === "Pending"
                ? "pending-requests"
                : label === "Approved"
                  ? "approved-bookings"
                  : label === "Rejected"
                    ? "rejected-requests"
                    : "cancelled-requests"
            )}
            className={`rounded-xl border px-4 py-3 ${bg} text-left hover:shadow-sm active:scale-[0.99] transition`}
            aria-label={`Scroll to ${label} section`}
          >
            <p className="text-xs text-zinc-500 mb-1">{label}</p>
            <p className={`text-2xl font-semibold ${color}`}>{count}</p>
            <p className="text-[11px] text-zinc-500 mt-1">Click to view</p>
          </button>
        )
      ))}
    </div>
  );

  const Section = ({ id, title, subtitle, count, countColor, borderColor, bgColor, badgeColor, children }) => (
    <section
      id={id}
      className={`rounded-2xl border ${borderColor} ${bgColor} p-4 sm:p-5 scroll-mt-24`}
    >
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
      <ReasonDialog
        open={reasonDialog.open}
        title={
          reasonDialog.status === "rejected"
            ? "Reject booking"
            : reasonDialog.status === "cancelled"
              ? "Cancel booking"
              : "Provide a reason"
        }
        description="Enter a reason (optional). It will be visible to the user."
        confirmText="OK"
        cancelText="Cancel"
        hideCancel={reasonDialog.status === "rejected"}
        busy={busyId === reasonDialog.bookingId}
        onCancel={() => setReasonDialog({ open: false, bookingId: null, status: "" })}
        onConfirm={confirmReason}
      />
      <div className="space-y-5">
        {loading ? (
          <div className="bg-white rounded-2xl border border-zinc-200 px-6 py-20 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
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
                id="pending-requests"
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
                id="approved-bookings"
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
                id="rejected-requests"
                title="Rejected" subtitle="Remove entries no longer needed."
                count={rejectedCount} countColor="text-red-800"
                borderColor="border-red-200/70" bgColor="bg-red-50/30"
                badgeColor="text-red-800 border-red-200"
              >
                {renderGroups(rejectedGrouped, { allowDeleteRejected: true })}
              </Section>
            )}

            {cancelledCount > 0 && (
              <Section
                id="cancelled-requests"
                title="Cancelled"
                subtitle="Emergency-cancelled bookings. You can remove entries no longer needed."
                count={cancelledCount}
                countColor="text-zinc-700"
                borderColor="border-zinc-200/70"
                bgColor="bg-zinc-50/30"
                badgeColor="text-zinc-700 border-zinc-200"
              >
                {renderGroups(cancelledGrouped, { allowDeleteCancelled: true })}
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
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30" required />
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 px-4 py-3">
                <p className="text-xs font-medium text-zinc-700">
                  Journey options are based on what the user selected at booking time.
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  You only need to set the start date/time here.
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setScheduleFor(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 border border-zinc-200 hover:bg-zinc-50 transition-colors">
                  Cancel
                </button>
                <button type="button" disabled={busyId === scheduleFor || !startAt}
                  onClick={() => schedule(scheduleFor)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 transition-colors">
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