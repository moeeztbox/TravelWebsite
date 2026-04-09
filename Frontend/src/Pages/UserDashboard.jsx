import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Save,
  FileText,
  Upload,
  ChevronDown,
  X,
  Check,
  Clock,
  Trash2,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { updateProfile } from "../Services/authService";
import {
  listMyBookings,
  uploadBookingDocuments,
  uploadPaymentReceipt,
  deleteMyBooking,
  setMyPaymentMethod,
} from "../Services/bookingService";
import {
  acceptCustomPackageRequest,
  listMyCustomPackageRequests,
} from "../Services/customPackageService";
import { getBitmojiAvatarUrl, BITMOJI_COUNT } from "../constants/bitmoji";
import { getApiOrigin } from "../utils/apiOrigin";

function StatusBadge({ status }) {
  const map = {
    pending: "bg-amber-100 text-amber-900 border-amber-200",
    approved: "bg-emerald-100 text-emerald-900 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[status] || map.pending}`}
    >
      {status === "pending" ? "Draft · Pending approval" : status}
    </span>
  );
}

function PaymentBadge({ status }) {
  const s = status || "none";
  const map = {
    none: "bg-stone-100 text-stone-700 border-stone-200",
    verifying: "bg-amber-100 text-amber-900 border-amber-200",
    verified: "bg-emerald-100 text-emerald-900 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };
  const label =
    s === "verifying"
      ? "Verifying payment"
      : s === "verified"
        ? "Payment verified"
        : s === "rejected"
          ? "Payment rejected"
          : "Payment not submitted";
  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[s] || map.none}`}
    >
      {label}
    </span>
  );
}

function stageLabel(stage) {
  const map = {
    not_started: "Not started",
    scheduled: "Scheduled",
    flight_takeoff: "Flight takeoff",
    in_makkah: "In Makkah",
    in_madinah: "In Madinah",
    return_flight: "Return flight",
    completed: "Completed",
  };
  return map[stage] || stage || "Not started";
}

function JourneyStepper({ stage }) {
  const steps = [
    { id: "scheduled", label: "Scheduled" },
    { id: "flight_takeoff", label: "Flight takeoff" },
    { id: "in_makkah", label: "In Makkah" },
    { id: "in_madinah", label: "In Madinah" },
    { id: "return_flight", label: "Return flight" },
    { id: "completed", label: "Completed" },
  ];
  const current = stage || "scheduled";
  const idx = Math.max(
    0,
    steps.findIndex((s) => s.id === current)
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        {steps.map((s, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <div key={s.id} className="flex-1 min-w-0">
              <div className="flex items-center">
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center border text-xs font-bold ${
                    done
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : active
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-white border-stone-300 text-stone-400"
                  }`}
                >
                  {done || active ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i !== steps.length - 1 ? (
                  <div
                    className={`h-[2px] flex-1 mx-2 ${
                      done ? "bg-emerald-600" : "bg-stone-200"
                    }`}
                  />
                ) : null}
              </div>
              <p
                className={`mt-2 text-[11px] font-medium truncate ${
                  active ? "text-stone-900" : "text-stone-500"
                }`}
                title={s.label}
              >
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { user, updateUser } = useAuth();
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city || "");
  const [bitmojiIndex, setBitmojiIndex] = useState(user?.bitmojiIndex ?? 0);
  const [saving, setSaving] = useState(false);
  const [overlay, setOverlay] = useState({ open: false, message: "" });
  const [bookings, setBookings] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [customRequests, setCustomRequests] = useState([]);
  const [loadingCustom, setLoadingCustom] = useState(true);
  const [uploadForId, setUploadForId] = useState(null);
  const [receiptForId, setReceiptForId] = useState(null);
  const [trackFor, setTrackFor] = useState(null);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [avatarDraft, setAvatarDraft] = useState(user?.bitmojiIndex ?? 0);

  useEffect(() => {
    setPhone(user?.phone || "");
    setAddress(user?.address || "");
    setCountry(user?.country || "");
    setCity(user?.city || "");
    setBitmojiIndex(user?.bitmojiIndex ?? 0);
    setAvatarDraft(user?.bitmojiIndex ?? 0);
  }, [user]);

  const loadBookings = async () => {
    setLoadingList(true);
    try {
      const { bookings: list } = await listMyBookings();
      setBookings(list || []);
    } catch {
      toast.error("Could not load bookings");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const loadCustom = async () => {
    setLoadingCustom(true);
    try {
      const rows = await listMyCustomPackageRequests();
      setCustomRequests(rows || []);
    } catch {
      // keep quiet; dashboard should still work without this section
    } finally {
      setLoadingCustom(false);
    }
  };

  useEffect(() => {
    loadCustom();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setOverlay({ open: true, message: "Saving…" });
    try {
      const { user: u } = await updateProfile({
        phone,
        address,
        country,
        city,
        bitmojiIndex,
      });
      updateUser(u);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
      setOverlay({ open: false, message: "" });
    }
  };

  const draftBookings = bookings.filter((b) => b.status === "pending");
  const approvedBookings = bookings.filter((b) => b.status === "approved");
  const rejectedBookings = bookings.filter((b) => b.status === "rejected");
  const origin = getApiOrigin();
  const pendingCustom = customRequests.filter((r) => r.status === "pending");
  const approvedCustom = customRequests.filter((r) => r.status === "approved");
  const rejectedCustom = customRequests.filter((r) => r.status === "rejected");
  // Once an approved custom request becomes a real booking (bookingId exists),
  // we treat it as "moved to bookings" and stop showing it in this section.
  const approvedCustomVisible = approvedCustom.filter((r) => !r.bookingId);
  const visibleCustomCount =
    pendingCustom.length + approvedCustomVisible.length + rejectedCustom.length;

  const formatPkr = (n) => `PKR ${(Number(n) || 0).toLocaleString()}`;
  const [acceptingCustomId, setAcceptingCustomId] = useState(null);

  const acceptOffer = async (reqId) => {
    setAcceptingCustomId(reqId);
    setOverlay({ open: true, message: "Accepting offer…" });
    try {
      await acceptCustomPackageRequest(reqId);
      toast.success("Offer accepted. You can upload documents now.");
      await loadCustom();
      await loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not accept offer");
    } finally {
      setAcceptingCustomId(null);
      setOverlay({ open: false, message: "" });
    }
  };

  const handleUpload = async (bookingId, e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setOverlay({ open: true, message: "Uploading documents…" });
    try {
      await uploadBookingDocuments(bookingId, fd);
      toast.success("Documents uploaded");
      setUploadForId(null);
      await loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const handleReceiptUpload = async (bookingId, e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setOverlay({ open: true, message: "Submitting receipt…" });
    try {
      await uploadPaymentReceipt(bookingId, fd);
      toast.success("Receipt submitted. Payment is verifying.");
      setReceiptForId(null);
      await loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const PAYMENT_METHODS = [
    { id: "", label: "Select payment method…" },
    { id: "jazzcash", label: "JazzCash" },
    { id: "easypaisa", label: "Easypaisa" },
    { id: "card", label: "Card" },
    { id: "bank_transfer", label: "Bank transfer" },
  ];

  const PAYMENT_DETAILS = {
    jazzcash: {
      title: "JazzCash",
      lines: ["Account number: 03258816338", "Account title: Ali Ahmad"],
    },
    easypaisa: {
      title: "Easypaisa",
      lines: ["Account number: 03144313206", "Account title: Ali Ahmad"],
    },
    card: {
      title: "Card",
      lines: ["Card number: 11310112434110", "Card title/name: Ali Ahmad"],
    },
    bank_transfer: {
      title: "Bank transfer",
      lines: [
        "Bank: Askari Bank",
        "Account title: Ali Ahmad",
        "Account number: 11310112434110",
        "IBAN: —",
      ],
    },
  };

  const handleDeleteRejected = async (id) => {
    setOverlay({ open: true, message: "Removing…" });
    try {
      await deleteMyBooking(id);
      toast.success("Removed");
      await loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Remove failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const avatarSrc = getBitmojiAvatarUrl(bitmojiIndex, user?._id || user?.email);
  const avatarSeed = user?._id || user?.email;
  const avatarOptions = useMemo(
    () =>
      Array.from({ length: BITMOJI_COUNT }, (_, i) => ({
        idx: i,
        url: getBitmojiAvatarUrl(i, avatarSeed),
      })),
    [avatarSeed]
  );

  return (
    <div className="min-h-screen bg-stone-100 pt-28 pb-16 px-4">
      {overlay.open ? (
        <div className="fixed inset-0 z-[200] bg-black/35 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full border-4 border-amber-400/30 border-t-amber-500 animate-spin" />
              <div className="text-sm font-semibold text-stone-800">
                {overlay.message || "Loading…"}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setAvatarDraft(bitmojiIndex);
                    setAvatarPickerOpen(true);
                  }}
                  className="group relative"
                  aria-label="Change profile avatar"
                >
                  <img
                    src={avatarSrc}
                    alt=""
                    className="w-28 h-28 rounded-full border-4 border-amber-100 bg-amber-50 shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap inline-flex items-center gap-1">
                    Profile avatar <ChevronDown className="w-3 h-3" />
                  </span>
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
                  {[user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
                    "Traveler"}
                </h1>
                <div className="mt-2 space-y-1 text-stone-600 text-sm">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                    {user?.email}
                  </p>
                  {user?.phone ? (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                      {user.phone}
                    </p>
                  ) : null}
                  {(user?.city || user?.country) && (
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                      {[user.address, user.city, user.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-8 space-y-6 border-t border-stone-100 pt-6">
              <h2 className="text-lg font-semibold text-stone-800">
                Edit profile
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full max-w-md rounded-xl border border-stone-200 px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  placeholder="+92 300 1234567"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="Street / area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="City"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-95 disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving…" : "Save changes"}
              </button>
            </form>
          </section>

          {loadingList || draftBookings.length > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Draft bookings
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Waiting for admin approval. You’ll be able to upload visa and
                documents after approval.
              </p>
              {loadingList ? (
                <p className="text-stone-500 text-sm">Loading…</p>
              ) : (
                <ul className="space-y-3">
                  {draftBookings.map((b) => (
                    <li
                      key={b._id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-100 bg-stone-50/80 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-stone-900">
                          {b.packageTitle}
                        </p>
                        <p className="text-xs text-stone-500">
                          {b.packagePrice} · {b.packageDuration}
                        </p>
                      </div>
                      <StatusBadge status={b.status} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}

          {loadingCustom || visibleCustomCount > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Your custom package
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Requests you submitted from the Customize Package form. Admin will
                approve/reject and may set a final amount.
              </p>

              {loadingCustom ? (
                <p className="text-stone-500 text-sm">Loading…</p>
              ) : (
                <div className="space-y-6">
                  {pendingCustom.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-stone-800 mb-2">
                      Pending
                    </h3>
                    <ul className="space-y-3">
                      {pendingCustom.map((r) => (
                        <li
                          key={r._id}
                          className="rounded-xl border border-stone-100 bg-stone-50/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3"
                        >
                          <div>
                            <p className="font-semibold text-stone-900">
                              {r.hotelCategory}★ · {r.passengers} pax
                            </p>
                            <p className="text-xs text-stone-500 mt-0.5">
                              {r.startDate
                                ? new Date(r.startDate).toLocaleDateString()
                                : "—"}
                              {r.estimate?.total
                                ? ` · Estimate ${formatPkr(r.estimate.total)}`
                                : ""}
                            </p>
                          </div>
                          <StatusBadge status="pending" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                  {approvedCustomVisible.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-stone-800 mb-2">
                      Approved
                    </h3>
                    <ul className="space-y-3">
                      {approvedCustomVisible.map((r) => {
                        const linkedBooking = r.bookingId
                          ? bookings.find((b) => b._id === r.bookingId)
                          : null;
                        return (
                        <li
                          key={r._id}
                          className="rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-stone-900">
                                {r.hotelCategory}★ · {r.passengers} pax
                              </p>
                              <p className="text-xs text-stone-600 mt-0.5">
                                {r.startDate
                                  ? new Date(r.startDate).toLocaleDateString()
                                  : "—"}
                              </p>
                              {r.adminTotal?.amount ? (
                                <p className="text-sm font-semibold text-emerald-900 mt-2">
                                  Final amount: {formatPkr(r.adminTotal.amount)}
                                  {r.adminExtra?.amount ? (
                                    <span className="text-xs text-stone-600 font-medium">
                                      {" "}
                                      (Extra {formatPkr(r.adminExtra.amount)})
                                    </span>
                                  ) : null}
                                </p>
                              ) : (
                                <p className="text-xs text-stone-600 mt-2">
                                  Admin approved. Final amount will be updated soon.
                                </p>
                              )}
                              {r.adminNote ? (
                                <p className="text-xs text-stone-600 mt-2 whitespace-pre-wrap">
                                  {r.adminNote}
                                </p>
                              ) : null}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <StatusBadge status="approved" />
                              {r.bookingId ? (
                                linkedBooking ? (
                                  <div className="flex flex-col items-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setUploadForId(linkedBooking._id);
                                        document
                                          .getElementById(
                                            `booking-${linkedBooking._id}`
                                          )
                                          ?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                          });
                                      }}
                                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-amber-600 px-4 py-2 rounded-xl hover:bg-amber-700"
                                    >
                                      Upload documents
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReceiptForId(linkedBooking._id);
                                        document
                                          .getElementById(
                                            `booking-${linkedBooking._id}`
                                          )
                                          ?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                          });
                                      }}
                                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-800"
                                    >
                                      Submit receipt
                                    </button>
                                    <span className="text-[11px] text-stone-500">
                                      Added to bookings
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-stone-500">
                                    Added to bookings
                                  </span>
                                )
                              ) : (
                                <button
                                  type="button"
                                  disabled={
                                    acceptingCustomId === r._id ||
                                    !r.adminTotal?.amount
                                  }
                                  onClick={() => acceptOffer(r._id)}
                                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-800 disabled:opacity-60"
                                >
                                  {acceptingCustomId === r._id
                                    ? "Accepting…"
                                    : "Accept offer"}
                                </button>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                      })}
                    </ul>
                  </div>
                ) : null}

                {rejectedCustom.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-stone-800 mb-2">
                      Rejected
                    </h3>
                    <ul className="space-y-3">
                      {rejectedCustom.map((r) => (
                        <li
                          key={r._id}
                          className="rounded-xl border border-red-100 bg-red-50/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3"
                        >
                          <div>
                            <p className="font-semibold text-stone-900">
                              {r.hotelCategory}★ · {r.passengers} pax
                            </p>
                            <p className="text-xs text-stone-600 mt-0.5">
                              {r.startDate
                                ? new Date(r.startDate).toLocaleDateString()
                                : "—"}
                            </p>
                            {r.adminNote ? (
                              <p className="text-xs text-red-700 mt-2 whitespace-pre-wrap">
                                {r.adminNote}
                              </p>
                            ) : null}
                          </div>
                          <StatusBadge status="rejected" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                </div>
              )}
            </section>
          ) : null}

          {loadingList || rejectedBookings.length > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Rejected bookings
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Remove a rejected booking and try again.
              </p>
              {loadingList ? (
                <p className="text-stone-500 text-sm">Loading…</p>
              ) : (
                <ul className="space-y-3">
                  {rejectedBookings.map((b) => (
                    <li
                      key={b._id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50/40 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-stone-900">
                          {b.packageTitle}
                        </p>
                        <p className="text-xs text-stone-600">
                          {b.packagePrice} · {b.packageDuration}
                        </p>
                        {b.statusReason ? (
                          <p className="text-xs text-red-700 mt-1">
                            {b.statusReason === "payment_failed"
                              ? "Rejected: payment verification failed"
                              : "Rejected by admin"}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={b.status} />
                        <button
                          type="button"
                          onClick={() => handleDeleteRejected(b._id)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-red-200 text-red-700 hover:bg-red-50"
                          aria-label="Remove rejected booking"
                          title="Remove"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}

          {loadingList || approvedBookings.length > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Approved bookings
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                After admin approval, upload your visa PDF, another document PDF,
                and payment receipt.
              </p>
              {loadingList ? (
                <p className="text-stone-500 text-sm">Loading…</p>
              ) : (
                <ul className="space-y-4">
                  {approvedBookings.map((b) => {
                  const journeyLocked = Boolean(b.journey?.startAt);
                  const showDocsForm =
                    !journeyLocked &&
                    (!b.documents?.visaPdf || !b.documents?.otherPdf);
                  const showReceiptForm =
                    !journeyLocked &&
                    b.payment?.status !== "verified" &&
                    !b.payment?.receiptPdf;
                  const canSetMethod =
                    !journeyLocked && b.payment?.status !== "verified";
                  const method = b.payment?.method || "";
                  const details = method ? PAYMENT_DETAILS[method] : null;
                  return (
                    <li
                      id={`booking-${b._id}`}
                      key={b._id}
                      className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-stone-900">
                          {b.packageTitle}
                        </p>
                        <p className="text-xs text-stone-600">
                          {b.packagePrice} · {b.packageDuration}
                        </p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <PaymentBadge status={b.payment?.status} />
                      {b.payment?.receiptPdf ? (
                        <a
                          href={`${origin}${b.payment.receiptPdf}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-amber-700 hover:underline text-sm"
                        >
                          <FileText className="w-4 h-4" /> Payment receipt
                        </a>
                      ) : null}
                    </div>

                    {b.payment?.status === "verified" && b.journey?.startAt ? (
                      <div className="rounded-xl border border-emerald-200 bg-white/70 px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-sm text-stone-800">
                          <p className="font-semibold text-emerald-900">
                            Umrah starts on
                          </p>
                          <p className="text-sm text-stone-700 flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4 text-emerald-700" />
                            {new Date(b.journey.startAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTrackFor(b)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-800"
                        >
                          Track your status
                        </button>
                      </div>
                    ) : null}
                    {b.documents?.visaPdf || b.documents?.otherPdf ? (
                      <div className="text-sm text-stone-600 space-y-1 mb-3">
                        {b.documents?.visaPdf ? (
                          <a
                            href={`${origin}${b.documents.visaPdf}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-amber-700 hover:underline"
                          >
                            <FileText className="w-4 h-4" /> Visa PDF
                          </a>
                        ) : null}
                        {b.documents?.otherPdf ? (
                          <a
                            href={`${origin}${b.documents.otherPdf}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-amber-700 hover:underline"
                          >
                            <FileText className="w-4 h-4" /> Other document
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                    {showDocsForm ? (
                      <form
                        onSubmit={(e) => handleUpload(b._id, e)}
                        className="space-y-3 border-t border-emerald-100 pt-3 mt-2"
                      >
                        <p className="text-xs font-medium text-stone-700">
                          Upload required documents (PDF)
                        </p>
                        {!b.documents?.visaPdf ? (
                          <div>
                            <label className="block text-xs text-stone-600 mb-1">
                              Visa (PDF)
                            </label>
                            <input
                              name="visaPdf"
                              type="file"
                              accept="application/pdf"
                              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-stone-700 hover:file:bg-stone-200"
                              required
                            />
                          </div>
                        ) : null}
                        {!b.documents?.otherPdf ? (
                          <div>
                            <label className="block text-xs text-stone-600 mb-1">
                              Other document (PDF)
                            </label>
                            <input
                              name="otherPdf"
                              type="file"
                              accept="application/pdf"
                              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-stone-700 hover:file:bg-stone-200"
                              required
                            />
                          </div>
                        ) : null}
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
                        >
                          <Upload className="w-4 h-4" />
                          Upload documents
                        </button>
                      </form>
                    ) : null}

                    {/* Payment method */}
                    <div className="mt-3">
                      {canSetMethod ? (
                        <div className="space-y-3 border-t border-emerald-100 pt-3">
                          <p className="text-xs font-medium text-stone-700">
                            Payment method
                          </p>
                          <select
                            value={method}
                            onChange={async (e) => {
                              const next = e.target.value;
                              setOverlay({
                                open: true,
                                message: "Saving payment method…",
                              });
                              try {
                                await setMyPaymentMethod(b._id, next);
                                toast.success("Payment method saved");
                                await loadBookings();
                              } catch (err) {
                                toast.error(
                                  err.response?.data?.message || "Save failed"
                                );
                              } finally {
                                setOverlay({ open: false, message: "" });
                              }
                            }}
                            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          >
                            {PAYMENT_METHODS.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.label}
                              </option>
                            ))}
                          </select>
                          {details ? (
                            <div className="rounded-xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-700">
                              <p className="font-semibold text-stone-900">
                                {details.title}
                              </p>
                              <ul className="mt-2 space-y-1 text-sm text-stone-700">
                                {details.lines.map((line) => (
                                  <li key={line}>{line}</li>
                                ))}
                              </ul>
                              <p className="text-[11px] text-stone-500 mt-2">
                                After payment, upload the receipt PDF below.
                              </p>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>

                    {/* Payment receipt */}
                    <div className="mt-3">
                      {showReceiptForm ? (
                        <form
                          onSubmit={(e) => handleReceiptUpload(b._id, e)}
                          className="space-y-3 border-t border-emerald-100 pt-3"
                        >
                          <p className="text-xs font-medium text-stone-700">
                            Upload payment receipt (PDF)
                          </p>
                          <input
                            name="receiptPdf"
                            type="file"
                            accept="application/pdf"
                            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-stone-700 hover:file:bg-stone-200"
                            required
                          />
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
                          >
                            <Upload className="w-4 h-4" />
                            Submit receipt
                          </button>
                        </form>
                      ) : null}
                    </div>
                    </li>
                  );
                  })}
                </ul>
              )}
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-2xl shadow border border-stone-200 p-6">
            <h3 className="font-semibold text-stone-900 mb-2">Profile tips</h3>
            <p className="text-sm text-stone-600">
              Add your phone number and pick an avatar so we can recognize your
              account easily. After a booking is approved, return here to upload
              visa and travel documents as PDFs.
            </p>
            <div className="mt-4 h-2 rounded-full bg-stone-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    25 +
                      (user?.phone ? 25 : 0) +
                      (bitmojiIndex != null ? 25 : 0) +
                      (user?.city ? 25 : 0)
                  )}%`,
                }}
              />
            </div>
            <p className="text-xs text-stone-500 mt-2">Profile completeness</p>
          </div>

          <div className="bg-white rounded-2xl shadow border border-stone-200 p-6">
            <h3 className="font-semibold text-stone-900 mb-2">
              Share your journey
            </h3>
            <p className="text-sm text-stone-600">
              Share your Hajj/Umrah experience as a story (text or video). After
              admin approval, it will be published on the Stories page.
            </p>
            <Link
              to="/stories/submit"
              className="mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800"
            >
              Submit a story
            </Link>
          </div>
        </aside>
      </div>

      {avatarPickerOpen ? (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  Choose profile avatar
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Pick one. Click Save to apply.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-500"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {avatarOptions.map((a) => (
                  <button
                    key={a.idx}
                    type="button"
                    onClick={() => setAvatarDraft(a.idx)}
                    className={`relative rounded-2xl border transition-all p-3 hover:shadow-md ${
                      avatarDraft === a.idx
                        ? "border-amber-400 ring-2 ring-amber-200 bg-amber-50/40"
                        : "border-stone-200 bg-white hover:border-amber-200"
                    }`}
                  >
                    <img
                      src={a.url}
                      alt=""
                      className="w-full aspect-square rounded-xl bg-stone-50"
                    />
                    {avatarDraft === a.idx ? (
                      <span className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-white shadow">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setBitmojiIndex(avatarDraft);
                  setAvatarPickerOpen(false);
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-95"
              >
                <Save className="w-4 h-4" />
                Save avatar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {trackFor ? (
        <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  Track your status
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {trackFor.packageTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTrackFor(null)}
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-500"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
                  <p className="text-xs font-medium text-stone-600">
                    Start date
                  </p>
                  <p className="text-sm font-semibold text-stone-900 mt-2">
                    {trackFor.journey?.startAt
                      ? new Date(trackFor.journey.startAt).toLocaleString()
                      : "Not scheduled yet"}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-2">
                    This is set by the admin when your Umrah journey is scheduled.
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white px-5 py-4">
                  <p className="text-xs font-medium text-stone-600">
                    Current status
                  </p>
                  <p className="text-sm font-semibold text-emerald-800 mt-2">
                    {stageLabel(trackFor.journey?.stage)}
                  </p>
                  {trackFor.journey?.updatedAt ? (
                    <p className="text-[11px] text-stone-500 mt-2">
                      Updated {new Date(trackFor.journey.updatedAt).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-[11px] text-stone-500 mt-2">
                      Waiting for admin updates.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-5 py-4">
                <p className="text-xs font-medium text-stone-600">
                  Journey progress
                </p>
                <div className="mt-4">
                  <JourneyStepper stage={trackFor.journey?.stage} />
                </div>
                <p className="text-[11px] text-stone-500 mt-3">
                  The admin updates your status during your journey (flight, stay, etc.).
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-stone-100 flex justify-end">
              <button
                type="button"
                onClick={() => setTrackFor(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
