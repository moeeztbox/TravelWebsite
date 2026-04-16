import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle, OctagonAlert, Trash2 } from "lucide-react";
import AdminLayout from "../Components/Admin/AdminLayout";
import {
  adminListTransportationBookings,
  adminSetTransportationStatus,
  adminSetTransportationPaymentStatus,
  adminDeleteTransportationBooking,
} from "../Services/adminService";
import { getApiOrigin } from "../utils/apiOrigin";

function userLabel(user) {
  if (!user) return "—";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name ? `${name} (${user.email})` : user.email;
}

export default function AdminTransportation() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const origin = getApiOrigin();

  const load = useCallback(async (silent) => {
    if (!silent) setLoading(true);
    try {
      const list = await adminListTransportationBookings("all");
      setRows(list);
    } catch {
      toast.error("Failed to load transportation requests");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id, status) => {
    setBusyId(id);
    try {
      await adminSetTransportationStatus(id, status);
      toast.success(`Request ${status}`);
      await load(true);
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const verifyPay = async (id) => {
    setBusyId(id);
    try {
      await adminSetTransportationPaymentStatus(id, "verified");
      toast.success("Payment verified");
      await load(true);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    } finally {
      setBusyId(null);
    }
  };

  const failPay = async (id) => {
    setBusyId(id);
    try {
      await adminSetTransportationPaymentStatus(id, "rejected");
      toast.success("Payment marked failed");
      await load(true);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    } finally {
      setBusyId(null);
    }
  };

  const removeCancelled = async (id) => {
    setBusyId(id);
    try {
      await adminDeleteTransportationBooking(id);
      toast.success("Cancelled booking removed");
      await load(true);
    } catch (e) {
      toast.error(e.response?.data?.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  const receiptUrl = (name) =>
    name ? `${origin}/uploads/misc-receipts/${encodeURIComponent(name)}` : "";

  return (
    <AdminLayout
      title="Transportation bookings"
      subtitle="Approve requests, then verify payment from an uploaded receipt or from Stripe (no PDF)."
    >
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </div>
      ) : (
        <ul className="space-y-4">
          {rows.map((b) => (
            <li
              key={b._id}
              id={`admin-tr-${b._id}`}
              className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="font-semibold text-stone-900">
                    {b.selectedOption?.title}
                  </p>
                  <p className="text-xs text-stone-500">{userLabel(b.user)}</p>
                  <p className="text-sm text-stone-600 mt-1">
                    {b.form?.pickup} → {b.form?.dropoff} ·{" "}
                    {b.form?.pickupDate} {b.form?.pickupTime} · {b.form?.passengers}{" "}
                    pax
                  </p>
                </div>
                <div className="text-right text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      b.status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : b.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {b.status}
                  </span>
                  <p className="text-amber-700 font-medium mt-1">
                    {b.selectedOption?.priceLabel}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {b.status === "pending" ? (
                  <>
                    <button
                      type="button"
                      disabled={busyId === b._id}
                      onClick={() => setStatus(b._id, "approved")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve
                    </button>
                    <button
                      type="button"
                      disabled={busyId === b._id}
                      onClick={() => setStatus(b._id, "rejected")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>
                  </>
                ) : null}
                {b.status !== "cancelled" ? (
                  <button
                    type="button"
                    disabled={busyId === b._id}
                    onClick={() => setStatus(b._id, "cancelled")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold"
                    title="cancel"
                  >
                    <OctagonAlert className="h-4 w-4" />
                    cancel
                  </button>
                ) : null}
                {b.status === "cancelled" ? (
                  <button
                    type="button"
                    disabled={busyId === b._id}
                    onClick={() => removeCancelled(b._id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-800 text-xs font-semibold hover:bg-zinc-50"
                    title="Remove cancelled booking"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                ) : null}

                {b.status === "approved" && b.payment?.status === "verifying" ? (
                  <>
                    {b.payment?.receiptPdf ? (
                      <a
                        href={receiptUrl(b.payment.receiptPdf)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-amber-700 underline"
                      >
                        View receipt
                      </a>
                    ) : b.payment?.method === "stripe" ? (
                      <span className="text-xs text-stone-600">
                        Paid with Stripe — no PDF receipt to view
                      </span>
                    ) : (
                      <span className="text-xs text-amber-800">
                        Receipt PDF not uploaded yet
                      </span>
                    )}
                    <button
                      type="button"
                      disabled={busyId === b._id}
                      onClick={() => verifyPay(b._id)}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold"
                    >
                      Verify payment
                    </button>
                    <button
                      type="button"
                      disabled={busyId === b._id}
                      onClick={() => failPay(b._id)}
                      className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 text-xs font-semibold"
                    >
                      Reject payment
                    </button>
                  </>
                ) : null}

                {b.payment?.status === "verified" ? (
                  <span className="text-xs font-medium text-emerald-700">
                    Payment verified
                  </span>
                ) : null}
              </div>
            </li>
          ))}
          {!rows.length ? (
            <p className="text-stone-500 text-sm">No transportation requests yet.</p>
          ) : null}
        </ul>
      )}
    </AdminLayout>
  );
}
